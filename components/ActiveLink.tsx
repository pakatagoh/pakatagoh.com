import { useRouter } from "next/router"
import Link, { LinkProps } from "next/link"
import React, { useState, useEffect, ReactNode } from "react"

type ActiveLinkProps = LinkProps & {
  children: ReactNode
  activeClassName: string
  className?: string
}

export const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter()

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname

      const isActive = linkPathname === activePathname

      setIsActive(isActive)
    }
  }, [asPath, isReady, props.as, props.href])

  return (
    <Link {...props} className={isActive ? activeClassName : className}>
      {children}
    </Link>
  )
}
