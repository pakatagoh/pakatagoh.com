import { AnchorOrLink } from "./AnchorOrLink"
import Image, { ImageProps } from "next/legacy/image"

const ResponsiveImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} layout="responsive" />
}

export const components = {
  a: AnchorOrLink,
  Image: ResponsiveImage,
}
