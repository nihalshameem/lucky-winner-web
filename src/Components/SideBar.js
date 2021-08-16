import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Drawer } from "@material-ui/core";
import NavBar from "./NavBar";
import { Link, useHistory } from "react-router-dom";
import {
  RiHome3Line,
  RiUser3Line,
  RiClipboardLine,
  RiTrophyLine,
  RiLoginCircleLine,
  RiTrophyFill,
  RiWallet2Line,
} from "react-icons/ri";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function SideBar({ className }) {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  function open(e) {
    setState(true);
  }
  function logoutFunc(e) {
    localStorage.removeItem("api_token");
    history.push("/login");
  }

  return (
    <div className={className}>
      <NavBar open={open} />
      <Drawer
        anchor="left"
        open={state}
        onClose={(e) => {
          setState(false);
        }}
      >
        <div
          className={clsx(classes.list)}
          role="presentation"
          onClick={(e) => {
            setState(true);
          }}
          onKeyDown={(e) => {
            setState(true);
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <RiTrophyFill />
              </ListItemIcon>
              <ListItemText primary={"Lucky winners"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <RiHome3Line />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon>
                <RiUser3Line />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button component={Link} to="/scratch-cards">
              <ListItemIcon>
                <RiClipboardLine />
              </ListItemIcon>
              <ListItemText primary={"Scratch Card"} />
            </ListItem>
            <ListItem button component={Link} to="/wallet">
              <ListItemIcon>
                <RiWallet2Line />
              </ListItemIcon>
              <ListItemText primary={"Wallet"} />
            </ListItem>
            <ListItem button component={Link} to="/winners">
              <ListItemIcon>
                <RiTrophyLine />
              </ListItemIcon>
              <ListItemText primary={"Winners"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={logoutFunc}>
              <ListItemIcon>
                <RiLoginCircleLine />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
