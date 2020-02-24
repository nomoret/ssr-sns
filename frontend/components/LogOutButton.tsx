import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
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

const LogOutButton: React.FC<Props> = () => {
  const classes = useStyles();

  const { isLoggingOut } = useSelector<RootState, UserState>(
    state => state.user
  );

  const dispatch = useDispatch();
  const handleLogOutClick = (e: any) => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  };
  return (
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
  );
};

export default LogOutButton;
