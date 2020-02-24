import React, { useState } from "react";
import { NextPage } from "next";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Auth from "./auth";

import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";

interface Props {}

const Home: NextPage<Props> = () => {
  const { me } = useSelector<RootState, UserState>(state => state.user);

  return (
    <Container maxWidth="sm">
      {!me && (
        <>
          <Typography variant="h3">Home Page</Typography>
          <Typography variant="subtitle1">plz log in</Typography>
          <Auth />
        </>
      )}
      {me && (
        <>
          <Typography variant="h3">Home Page</Typography>
          <Typography variant="subtitle1">try this</Typography>
        </>
      )}
    </Container>
  );
};

export default Home;
