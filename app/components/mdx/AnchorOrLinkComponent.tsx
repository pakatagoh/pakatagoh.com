import { AnchorHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { Link } from "remix";

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const AnchorOrLink = forwardRef<HTMLAnchorElement, AnchorProps>(
  function AnchorOrLink(props, ref) {
    const { href, children, ...rest } = props;

    const isUseInternalLink = href?.startsWith("/");
    const isHeaderLink = href?.startsWith("#");

    if (isHeaderLink) {
      return (
        <a
          className="text-blue-700 no-underline hover:underline dark:text-orange-200"
          href={href}
          {...rest}
          ref={ref}
        >
          {children}
        </a>
      );
    }

    if (isUseInternalLink) {
      return (
        <Link
          className="text-blue-600 no-underline hover:underline dark:text-orange-300"
          to={href ?? ""}
          {...rest}
          ref={ref}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        className="text-blue-600 no-underline hover:underline dark:text-orange-300"
        href={href}
        {...rest}
        ref={ref}
      >
        {children}
      </a>
    );
  }
);
