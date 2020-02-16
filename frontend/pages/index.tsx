import React from "react";
import { NextPage } from "next";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

interface Props {}

const Home: NextPage<Props> = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Home Page</Typography>
      <Typography variant="subtitle1">try this</Typography>
    </Container>
  );
};

export default Home;
