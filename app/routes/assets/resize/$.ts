/**
 * An on the fly image resizer
 *
 * Since most of our images are served via a CDN, we don't have to save the resized images.
 * Instead we set cache headers for them and let the cdn cache them for us.
 *
 * sharp uses a highly performant native package called libvips.
 * it's written in C and is extremely fast.
 *
 * The implementation of the demo uses a stream based approach where the image is never stored in memory.
 * This means it's very good at handling images of any size, and is extremely performant.
 * Further improvements could be done by implementing ETags, but that is out of scope for this demo.
 */

import type { LoaderFunction } from "remix";
import type { Params } from "react-router";
import type { ReadStream } from "fs";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";
import type { FitEnum } from "sharp";
import sharp from "sharp";
import { getOneBlogImages } from "../../../utils/github.server";
import { getSharpTransformForPipe } from "../../../utils/image.server";

interface ResizeParams {
  src: string;
  width: number | undefined;
  height: number | undefined;
  fit: keyof FitEnum;
  blur?: number | null;
  slug?: string | null;
}

const ASSETS_ROOT = "assets";

export const loader: LoaderFunction = async ({ params, request }) => {
  // extract all the parameters from the url
  const isAcceptWebp = request.headers.get("Accept")?.includes("image/webp");

  const { src, width, height, fit, slug, blur } = extractParams(
    params,
    request
  );
  const imageExtension =
    src.split(".").pop() ?? (isAcceptWebp ? "webp" : "jpeg");

  // if (!slug && !path) {
  //   throw new Error("no slug or path provided");
  // }

  try {
    if (slug) {
      const { imageDownloadUrl } = await getOneBlogImages({
        slug,
        fileName: src,
      });

      if (imageDownloadUrl) {
        const res = await fetch(imageDownloadUrl);
        const imageStream = res.body as unknown as ReadStream;

        if (imageStream) {
          return streamingResize({
            imageStream,
            width,
            height,
            fit,
            blur,
            isAcceptWebp: Boolean(isAcceptWebp),
            imageExtension,
          });
        }
      }
    } else {
      const readStream = readFileAsStream(src);

      return streamingResize({
        imageStream: readStream,
        width,
        height,
        fit,
        blur,
        isAcceptWebp: Boolean(isAcceptWebp),
        imageExtension,
      });
    }

    // read the image as a stream of bytes
    // const readStream = readFileAsStream(src);
    // read the image from the file system and stream it through the sharp pipeline
    // return streamingResize(readStream, width, height, fit);
  } catch (error: unknown) {
    // if the image is not found, or we get any other errors we return different response types
    return handleError(error);
  }
};

function extractParams(params: Params<string>, request: Request): ResizeParams {
  const src = params["*"] as string;
  const searchParams = new URL(request.url).searchParams;

  const width = searchParams.has("w")
    ? Number.parseInt(searchParams.get("w") ?? "0")
    : undefined;
  const height = searchParams.has("h")
    ? Number.parseInt(searchParams.get("h") ?? "0")
    : undefined;
  const blur = searchParams.has("blur")
    ? Number.parseInt(searchParams.get("blur") ?? "0")
    : undefined;
  const slug = searchParams.has("slug") ? searchParams.get("slug") : undefined;

  const fitEnum = ["contain", "cover", "fill", "inside", "outside"];
  let fit: keyof FitEnum = sharp.fit.contain;
  if (searchParams.has("fit")) {
    const fitParam = searchParams.get("fit") ?? "";
    if (fitEnum.includes(fitParam)) {
      fit = fitParam as keyof FitEnum;
    }
  }
  return { src, width, height, fit, slug, blur };
}

function readFileAsStream(src: string): ReadStream {
  // Local filesystem

  // check that file exists
  const srcPath = path.join(ASSETS_ROOT, src);
  const fileStat = fs.statSync(srcPath);

  if (!fileStat.isFile()) {
    throw new Error(`${srcPath} is not a file`);
  }
  // create a readable stream from the image file
  return fs.createReadStream(srcPath);
}

function streamingResize({
  imageStream,
  width,
  height,
  fit = "cover",
  blur,
  isAcceptWebp,
  imageExtension,
}: {
  imageStream: ReadStream;
  width: number | undefined;
  height: number | undefined;
  blur?: number | null;
  fit: keyof FitEnum;
  isAcceptWebp: boolean;
  imageExtension: string;
}) {
  // create the sharp transform pipline
  // https://sharp.pixelplumbing.com/api-resize
  // you can also add watermarks, sharpen, blur, etc.
  const sharpTransforms = getSharpTransformForPipe({
    width,
    height,
    fit,
    blur,
    isAcceptWebp,
    imageExtension,
  });

  // create a pass through stream that will take the input image
  // stream it through the sharp pipeline and then output it to the response
  // without buffering the entire image in memory
  const passthroughStream = new PassThrough();

  imageStream.pipe(sharpTransforms).pipe(passthroughStream);

  const getImageType = () => {
    if (isAcceptWebp) {
      return "webp";
    }

    return imageExtension;
  };
  const imageType = getImageType();

  return new Response(passthroughStream as any, {
    headers: {
      "Content-Type": `image/${imageType}`,
      "Cache-Control": "public, max-age=31536000, s-max-age=120, immutable",
    },
  });
}

function handleError(error: unknown) {
  // error needs to be typed
  const errorT = error as Error & { code: string };
  // if the read stream fails, it will have the error.code ENOENT
  if (errorT.code === "ENOENT") {
    return new Response("image not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  // if there is an error proccessing the image, we return a 500 error
  return new Response(errorT.message, {
    status: 500,
    statusText: errorT.message,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
