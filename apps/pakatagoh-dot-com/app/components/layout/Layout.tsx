import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren<any>) => {
  return <div className="container mx-auto px-3 py-6">{props.children}</div>;
};
