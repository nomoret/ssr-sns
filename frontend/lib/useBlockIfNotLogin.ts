import Router from "next/router";
import { NextPageContext } from "next";

const useBlockIfNotLogin = (ctx: NextPageContext): void => {
  const { me } = ctx.store.getState().user;

  const isClient = typeof window !== "undefined";
  if (!me) {
    const redirectOnError = () =>
      isClient ? Router.push("/") : ctx.res?.writeHead(302, { Location: "/" });
    redirectOnError();
    isClient && ctx.res?.end();
  }
};

export default useBlockIfNotLogin;
