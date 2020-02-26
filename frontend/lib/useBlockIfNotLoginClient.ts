import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";

const useBlockIfNotLoginClient = (): void => {
  const { me } = useSelector<RootState, UserState>(state => state.user);

  useEffect(() => {
    if (!me) {
      Router.push("/");
    }
  }, []);
};

export default useBlockIfNotLoginClient;
