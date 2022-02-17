import { ImgHTMLAttributes } from "react";
import type { FitEnum } from "sharp";

export interface ImageProps {
  src: string; // a path within the assets/images directory, can be a nested path
  width?: number; // either width or height is required
  height?: number;
  fit?: keyof FitEnum; // contain is default
}
export function Image({ src, width, height, fit, ...other }: ImageProps) {
  const query = new URLSearchParams();
  if (width) {
    query.set("w", width.toString());
  }
  if (height) {
    query.set("h", height.toString());
  }
  if (fit) {
    query.set("fit", fit);
  }
  return (
    <img
      src={`/assets/resize/${src}?${query.toString()}`}
      {...{ width, height, ...other }}
    />
  );
}

type ImageComponentProps = ImgHTMLAttributes<HTMLImageElement> & {
  path: string;
};

export const ImageComponent = (props: ImageComponentProps) => {
  // console.log("the image props:", props);
  const basePath = "/assets/resize";

  const imageFileName = props.src?.split("/")?.slice?.(-1)?.[0] ?? "";
  // console.log("imageFileName:", imageFileName);

  const fullPathName = `${basePath}/${imageFileName}?path=${props.path}`;

  return <img src={imageFileName ? fullPathName : ""} alt={props.alt ?? ""} />;
};
