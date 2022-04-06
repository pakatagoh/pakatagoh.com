import {
  cloneElement,
  ImgHTMLAttributes,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

export interface BlurrableImageProps {
  blurDataUrl: string;
  alt?: string;
  img: ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
}

const useSSRLayoutEffect =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  typeof window === "undefined" ? () => {} : useLayoutEffect;

// https://kentcdodds.com/blog/building-an-awesome-image-loading-experience
export function BlurrableImage({ blurDataUrl, img, alt }: BlurrableImageProps) {
  const [visible, setVisible] = useState(false);
  const jsImgElRef = useRef<HTMLImageElement>(null);

  // make this happen asap
  // if it's alrady loaded, don't bother fading it in.
  useSSRLayoutEffect(() => {
    if (jsImgElRef.current?.complete) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!jsImgElRef.current) return;
    if (jsImgElRef.current.complete) {
      setVisible(true);
    }

    let current = true;
    jsImgElRef.current.addEventListener("load", () => {
      if (!jsImgElRef.current || !current) return;
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });

    return () => {
      current = false;
    };
  }, []);

  const jsImgEl = cloneElement(img, {
    // @ts-expect-error no idea 🤷‍♂️
    ref: jsImgElRef,
    className: clsx(img.props.className, "transition-opacity", {
      "opacity-0": !visible,
    }),
  });

  return (
    <>
      <img
        src={blurDataUrl}
        className="m-0 object-cover object-center"
        alt={alt}
      />
      <div className="w-full backdrop-blur-xl transition"></div>
      {jsImgEl}
    </>
  );
}
