import React, { useCallback, useState } from "react";

import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";

interface Props {}

const Auth: React.FC<Props> = () => {
  return (
    <div>
      <LogInForm />
      <SignUpForm />
    </div>
  );
};

export default Auth;
