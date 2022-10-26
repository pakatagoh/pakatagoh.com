import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5"
import { ActiveLink } from "./ActiveLink"

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

interface DarkModeToggleProps {
  onToggle: () => void
  theme?: Theme
}

const DarkModeToggle = (props: DarkModeToggleProps) => {
  const { onToggle, theme } = props

  const isDarkMode = theme === Theme.DARK
  return (
    <>
      <button role="switch" aria-checked={isDarkMode} onClick={onToggle}>
        <span className="text-2xl dark:hidden">
          <IoSunnyOutline title="light" />
        </span>
        <span className="hidden text-2xl dark:inline">
          <IoMoonOutline title="dark" />
        </span>
      </button>
      <label className="sr-only">Dark Mode</label>
    </>
  )
}

export const Nav = () => {
  const { setTheme, theme } = useTheme()

  const [isMounted, setIsMounted] = useState(false)
  // When mounted on client, now we can show the UI
  useEffect(() => setIsMounted(true), [])

  return (
    <div className="mb-6 flex items-center justify-between">
      <nav>
        <ul className="flex gap-4">
          <li>
            <ActiveLink
              href="/"
              activeClassName="opacity-100"
              className="opacity-60 hover:opacity-100"
            >
              Home
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/blog"
              activeClassName="opacity-100"
              className="opacity-60 hover:opacity-100"
            >
              Blog
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/about"
              activeClassName="opacity-100"
              className="opacity-60 hover:opacity-100"
            >
              About
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/uses"
              activeClassName="opacity-100"
              className="opacity-60 hover:opacity-100"
            >
              Uses
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/contact"
              activeClassName="opacity-100"
              className="opacity-60 hover:opacity-100"
            >
              Contact
            </ActiveLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        {isMounted ? (
          <DarkModeToggle
            theme={theme as Theme}
            onToggle={() => {
              setTheme?.(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
            }}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
