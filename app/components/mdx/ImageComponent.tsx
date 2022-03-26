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

export const ImageComponentMdx = (props: ImageComponentProps) => {
  const src = props.src;

  const srcSets = [`${src}&w=500 500w`, `${src}&w=900 900w`];

  return (
    <img
      {...props}
      className="w-full object-center"
      srcSet={srcSets.join(", ")}
      sizes="(min-width:820px) 736px, 93.6vw"
    />
  );
};
