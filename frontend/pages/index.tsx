import React, { useState } from "react";
import { NextPage } from "next";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";
import Auth from "../containers/Auth";

interface Props {}

const Home: NextPage<Props> = () => {
  const { me } = useSelector<RootState, UserState>(state => state.user);

  return (
    <Container maxWidth="sm">
      <>
        <Typography variant="h3">Home Page</Typography>
        {!me ? <Auth /> : <Typography variant="subtitle1">try this</Typography>}
      </>
    </Container>
  );
};

export default Home;
