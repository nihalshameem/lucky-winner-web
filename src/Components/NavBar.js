import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "initial",
  },
}));

export default function NavBar({ open }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "#fff", color: "#000" }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                open();
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Lucky Winners
            </Typography>
            <div>
            <Typography variant="p" color="inherit">
              0.00
            </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
