import sharp from "sharp";
import type { FitEnum } from "sharp";

export const getResizedBlurredBase64EcondedImage = async ({
  input,
}: {
  input?: string | Buffer;
}) => {
  const resizedImageBuf = await sharp(input as any)
    .resize({
      width: 40,
      fit: "cover",
    })
    .png({ quality: 80 })
    .blur(0.3)
    .toBuffer();

  return resizedImageBuf.toString("base64");
};

export const getSharpTransformForPipe = ({
  width,
  height,
  fit = "cover",
  blur,
  isAcceptWebp,
  imageExtension,
}: {
  width: number | undefined;
  height: number | undefined;
  blur?: number | null;
  fit: keyof FitEnum;
  isAcceptWebp: boolean;
  imageExtension: string;
}) => {
  const defaultSharpTransforms = sharp().resize({
    width,
    height,
    fit,
  });

  let sharpTransforms = defaultSharpTransforms;

  if (isAcceptWebp) {
    sharpTransforms = sharpTransforms.toFormat("webp");
  } else {
    switch (imageExtension) {
      case "png":
        sharpTransforms = sharpTransforms.png({ quality: 80 });
        break;
      case "jpeg":
      default:
        sharpTransforms = sharpTransforms.jpeg({ mozjpeg: true, quality: 80 });
    }
  }

  if (blur) {
    sharpTransforms = sharpTransforms.blur(blur);
  }

  return sharpTransforms;
};
