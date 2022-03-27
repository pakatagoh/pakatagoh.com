import { RemixNavLinkProps } from "@remix-run/react/components";
import { PropsWithChildren } from "react";
import { NavLink } from "remix";
import { Theme, useTheme } from "../utils/theme-provider";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

interface DarkModeToggleProps {
  onToggle: () => void;
  theme?: Theme | null;
}

const DarkModeToggle = (props: DarkModeToggleProps) => {
  const { onToggle, theme } = props;

  const isDarkMode = theme === Theme.DARK;

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
  );
};

export const Nav = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="mb-6 flex justify-between">
      <nav>
        <ul className="flex gap-4">
          <li>
            <CustomLink to="/" end>
              Home
            </CustomLink>
          </li>
          <li>
            <CustomLink to="/blog">Blog</CustomLink>
          </li>
          <li>
            <CustomLink to="/about">About</CustomLink>
          </li>
        </ul>
      </nav>
      <div>
        <DarkModeToggle
          theme={theme}
          onToggle={() => {
            setTheme?.(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
          }}
        />
      </div>
    </div>
  );
};

const CustomLink = ({ to, ...rest }: PropsWithChildren<RemixNavLinkProps>) => {
  return (
    <NavLink
      prefetch="intent"
      to={to}
      className={({ isActive }) =>
        `${isActive ? `opacity-100 ` : `opacity-60 hover:opacity-100`}`
      }
      {...rest}
    >
      {rest.children}
    </NavLink>
  );
};
