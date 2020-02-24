import React, { useCallback, useState } from "react";
import { Button, InputLabel, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import useInput from "../lib/useInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
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
const LogInForm: React.FC<Props> = () => {
  const classes = useStyles();

  const { isLoggingIn, isLoggingOut, me } = useSelector<RootState, UserState>(
    state => state.user
  );

  const dispatch = useDispatch();

  const userNameInput = useInput("");
  const passwordInput = useInput("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          username: userNameInput.value,
          password: passwordInput.value
        }
      });
    },
    [userNameInput, passwordInput]
  );

  const handleLogOutClick = (e: any) => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputLabel>username</InputLabel>
        <TextField
          placeholder=""
          {...userNameInput.bind}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
        />
        <InputLabel>password</InputLabel>
        <TextField
          type="password"
          placeholder=""
          {...passwordInput.bind}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoggingIn}
        >
          Log In
        </Button>
        {isLoggingIn && (
          <CircularProgress size={48} className={classes.buttonProgress} />
        )}
      </form>
      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoggingOut}
          onClick={handleLogOutClick}
        >
          Log out
        </Button>
        {isLoggingOut && (
          <CircularProgress size={48} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default LogInForm;
