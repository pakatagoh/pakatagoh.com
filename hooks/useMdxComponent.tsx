import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"
import { components } from "../components/mdx"

export const useMdxComponent = ({ code }: { code: string }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return function MyMdxComponent() {
    return (
      <Component
        // @ts-ignore
        components={{ ...components }}
      />
    )
  }
}
