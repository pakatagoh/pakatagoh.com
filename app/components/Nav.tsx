import { RemixNavLinkProps } from "@remix-run/react/components";
import { PropsWithChildren } from "react";
import { NavLink } from "remix";
import { Theme, useTheme } from "../utils/theme-provider";

export const Nav = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex justify-between">
      <nav className="mb-6">
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
        <button
          className="dark:hidden"
          onClick={() => {
            setTheme?.(Theme.DARK);
          }}
        >
          Make Dark
        </button>
        <button
          className="hidden dark:block"
          onClick={() => {
            setTheme?.(Theme.LIGHT);
          }}
        >
          Make Light
        </button>
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
