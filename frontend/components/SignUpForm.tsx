import React, { useCallback, useState } from "react";
import { Button, InputLabel, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import useInput from "../lib/useInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
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

  const [loading, setLoading] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(true);

  const userNameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const passwordCheckInput = useInput("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(e, userNameInput.bind, passwordInput.bind);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        if (passwordInput.value === passwordCheckInput.value) {
          console.log("암호 굿");

          axios.post(`http://localhost:8000/users/signup`, {
            username: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
          });
          setPasswordValidate(true);
        } else {
          console.log("암호 배드");
          setPasswordValidate(false);
        }

        // userNameInput.clear();
        // passwordInput.clear();
      }, 2000);
    },
    [userNameInput, passwordInput]
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
          autoFocus
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
          disabled={loading}
        >
          Sign Up
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </form>
      <p style={{ color: "red" }}>* hey!!!</p>
      {/* {validate && <p>hey!!!</p>} */}
    </div>
  );
};

export default SignUpForm;
