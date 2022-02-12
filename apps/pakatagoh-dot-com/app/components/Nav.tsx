import { RemixNavLinkProps } from "@remix-run/react/components";
import { PropsWithChildren } from "react";
import { NavLink } from "remix";

export const Nav = () => {
  return (
    <nav className="mb-3">
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
  );
};

const CustomLink = ({ to, ...rest }: PropsWithChildren<RemixNavLinkProps>) => {
  return (
    <NavLink
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
