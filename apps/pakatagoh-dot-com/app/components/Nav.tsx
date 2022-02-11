import { Link } from "remix";

export const Nav = () => {
  return (
    <nav className="mb-3">
      <ul className="flex gap-2">
        <li>
          <Link to="/" className="opacity-60 hover:opacity-100">
            Home
          </Link>
        </li>
        <li>
          <Link to="/blog" className="opacity-60 hover:opacity-100">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/about" className="opacity-60 hover:opacity-100">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
