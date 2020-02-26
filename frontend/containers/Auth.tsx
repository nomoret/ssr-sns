import React, { useCallback, useState } from "react";

import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

interface Props {}

const Auth: React.FC<Props> = () => {
  const [logInMode, setLogInMode] = useState(true);
  const router = useRouter();

  return (
    <div>
      {logInMode ? <LogInForm /> : <SignUpForm />}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => setLogInMode(!logInMode)}
      >
        {!logInMode ? "Log In" : "Sign Up"}
      </Button>
    </div>
  );
};

export default Auth;
