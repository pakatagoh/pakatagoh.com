import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren<any>) => {
  return (
    <div className="px-4 py-3 md:mx-auto md:max-w-3xl">{props.children}</div>
  );
};
