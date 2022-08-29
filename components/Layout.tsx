import { PropsWithChildren } from "react"
import { Footer } from "./Footer"

export const Layout = (props: PropsWithChildren<any>) => {
  return (
    <div className="relative min-h-screen px-4 py-3 md:mx-auto md:max-w-3xl">
      <div className="pb-[90px]">{props.children}</div>
      <Footer />
    </div>
  )
}
