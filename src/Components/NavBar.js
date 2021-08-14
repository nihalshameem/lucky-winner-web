import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { walletApi } from "./APIConst";
import { RiMenu2Fill } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    zIndex: 100,
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
  const [wallet, setWallet] = useState("");
  useEffect(() => {
    walletApi().then((res) => {
      setWallet(res.data.wallet);
    });
  }, []);

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
              <RiMenu2Fill />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Lucky Winners
            </Typography>
            <div>
              <b>Wallet:</b>{" "}
              <small className="btn btn-light btn-sm" aria-disabled>
                {wallet}
              </small>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
