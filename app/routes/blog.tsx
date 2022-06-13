import { Outlet } from "@remix-run/react";
import { Layout } from "../components/layout/Layout";
import { Nav } from "../components/Nav";

const BlogRoot = () => {
  return (
    <Layout>
      <Nav />
      <Outlet />
    </Layout>
  );
};

export default BlogRoot;
