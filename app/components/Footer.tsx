import { AnchorOrLink } from "./mdx/AnchorOrLinkComponent";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex h-[90px] flex-col-reverse justify-center gap-3 pb-6 pt-6 text-sm md:mx-auto md:max-w-3xl md:flex-row md:items-center md:justify-start md:gap-10">
      <p className="dark:text-gray-400">
        © {new Date().getFullYear()} Pakata Goh
      </p>
      <ul className="flex list-none items-center gap-4">
        <li className="opacity-90 hover:opacity-100">
          <AnchorOrLink
            href="https://drive.google.com/file/d/1cOIAXVd5Pq5cPVLAa7WSWTHDj0moCTE6/view"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Résumé"
          >
            Résumé
          </AnchorOrLink>
        </li>
        <li className="opacity-90 hover:opacity-100">
          <AnchorOrLink
            href="https://linkedin.com/in/pakata-goh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
          >
            LinkedIn
          </AnchorOrLink>
        </li>
        <li className="opacity-90 hover:opacity-100">
          <AnchorOrLink
            href="https://github.com/pakatagoh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
          >
            Github
          </AnchorOrLink>
        </li>
        <li className="opacity-90 hover:opacity-100">
          <AnchorOrLink
            href="https://github.com/pakatagoh/pakatagoh.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="source"
          >
            View Source
          </AnchorOrLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
