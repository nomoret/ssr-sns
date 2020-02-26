import React, { useCallback, useState } from "react";
import { Button, InputLabel, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import useInput from "../lib/useInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST, SIGN_UP_REQUEST } from "../reducers/user";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    fabProgress: {
      color: green[500],
      position: "absolute",
      top: -6,
      left: -6,
      zIndex: 1
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

interface Props {}
const SignUpForm: React.FC<Props> = () => {
  const classes = useStyles();

  const [passwordValidate, setPasswordValidate] = useState(true);

  const { isSigningUp, isSignedUp, signUpErrorReason } = useSelector<
    RootState,
    UserState
  >(state => state.user);

  const userNameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const passwordCheckInput = useInput("");

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (passwordInput.value !== passwordCheckInput.value) {
        return setPasswordValidate(false);
      }

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          username: userNameInput.value,
          email: emailInput.value,
          password: passwordInput.value
        }
      });
      // userNameInput.clear();
      // passwordInput.clear();
      // emailInput.clear();
    },
    [userNameInput, emailInput, passwordInput]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="username"
          placeholder=""
          {...userNameInput.bind}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
        />
        <TextField
          type="email"
          label="email"
          placeholder=""
          {...emailInput.bind}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          type="password"
          label="password"
          placeholder=""
          {...passwordInput.bind}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          type="password"
          label="password check"
          placeholder=""
          {...passwordCheckInput.bind}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={!passwordValidate}
          helperText={!passwordValidate ? "not matched password" : null}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSigningUp}
        >
          Sign Up
        </Button>
        {isSigningUp && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
      {!isSigningUp && signUpErrorReason && (
        <p style={{ color: "red" }}>* {signUpErrorReason}</p>
      )}
    </div>
  );
};

export default SignUpForm;
