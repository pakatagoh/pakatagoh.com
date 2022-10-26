import { AnchorOrLink } from "./AnchorOrLink"
import Image, { ImageProps } from "next/image"

const ResponsiveImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} />
}

export const components = {
  a: AnchorOrLink,
  Image: ResponsiveImage,
}
