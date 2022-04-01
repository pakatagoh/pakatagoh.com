import type { HeadersFunction, MetaFunction } from "remix";
import { AnchorOrLink } from "../components/mdx/AnchorOrLinkComponent";
import { Nav } from "../components/Nav";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import Footer from "../components/Footer";
import { FunctionComponent, useEffect, useState } from "react";
import { IconBaseProps } from "react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const meta: MetaFunction = () => {
  return {
    title: `Contact - Pakata Goh`,
    description: "You can contact me through the following channels",
    //opengraph tags
    "og:title": "Contact - Pakata Goh",
    "og:description": "You can contact me through the following channels",
    //twitter tags
    "twitter:title": "Contact - Pakata Goh",
    "twitter:description": "You can contact me through the following channels",
  };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=43200, s-maxage=86400, stale-while-revalidate=31536000",
  };
};

const IconLink = ({
  href,
  label,
  IconComponent,
}: {
  href: string;
  label: string;
  IconComponent: FunctionComponent<IconBaseProps>;
}) => {
  return (
    <AnchorOrLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <div className="inline-flex items-center justify-center rounded-md p-2 shadow-md shadow-gray-500/50 transition-shadow hover:shadow-sm hover:shadow-gray-500/50 dark:shadow-black/60 dark:hover:shadow-black/90">
        <IconComponent className="text-xl" title={label} />
      </div>
    </AnchorOrLink>
  );
};

const Contact = () => {
  const [isCopiedCounter, setIsCopiedCounter] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsCopied(false);
    }, 700);
    return () => {
      clearInterval(timeOutId);
    };
  }, [isCopiedCounter]);

  return (
    <div className="relative flex min-h-screen flex-col items-stretch px-4 py-3 md:mx-auto md:max-w-3xl">
      <div className="flex flex-1 flex-col items-stretch pb-[90px]">
        <Nav />
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full text-base md:text-lg">
            <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl">
              Contact
            </h1>
            <div className="flex items-center gap-3">
              <a
                href="mailto:pakatagohlh@gmail.com"
                className="text-xl font-bold no-underline hover:underline sm:text-2xl"
              >
                pakatagohlh@gmail.com
              </a>
              <CopyToClipboard
                text="pakatagohlh@gmail.com"
                onCopy={() => {
                  setIsCopied(true);
                  setIsCopiedCounter((prev) => prev + 1);
                }}
              >
                <button className="text-xl">
                  <MdContentCopy title="copy email" />
                </button>
              </CopyToClipboard>
              {
                <div
                  className={`transition-opacity ${
                    isCopied ? `opacity-100` : "opacity-0 duration-[1000ms]"
                  }`}
                  aria-hidden={!isCopied}
                >
                  copied
                </div>
              }
            </div>
            <ul className="mt-4 flex items-center gap-3">
              <li>
                <IconLink
                  href="https://linkedin.com/in/pakata-goh"
                  label="linkedin"
                  IconComponent={BsLinkedin}
                />
              </li>
              <li>
                <IconLink
                  href="https://github.com/pakatagoh"
                  label="github"
                  IconComponent={BsGithub}
                />
              </li>
            </ul>
          </div>
        </main>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
