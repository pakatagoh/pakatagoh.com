import { ImgHTMLAttributes } from "react";

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
