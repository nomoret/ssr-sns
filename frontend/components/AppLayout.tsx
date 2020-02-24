import React from "react";
import Link from "next/link";
import {
  AppBar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import PieChartIcon from "@material-ui/icons/PieChart";

import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";

import LogOutButton from "../components/LogOutButton";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { me } = useSelector<RootState, UserState>(state => state.user);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {me && (
        <>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Front Website
              </Typography>
              <LogOutButton />
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {["Home", "Classfication", "Word2Vec"].map((text, index) => {
                const href = index === 0 ? "/" : `/${text.toLowerCase()}`;
                return (
                  <Link key={index} href={href}>
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index === 0 ? <HomeIcon /> : <PieChartIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
            <Divider />
          </Drawer>
        </>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
