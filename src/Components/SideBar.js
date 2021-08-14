import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Drawer } from "@material-ui/core";
import NavBar from "./NavBar";
import {
  RiHome3Line,
  RiUser3Line,
  RiClipboardLine,
  RiTrophyLine,
  RiLoginCircleLine,
} from "react-icons/ri";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function SideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  function open() {
    setState(true);
  }

  return (
    <div>
      <NavBar open={open} />
      <Drawer
        anchor="left"
        open={state}
        onClose={() => {
          setState(false);
        }}
        onOpen={() => {
          setState(true);
        }}
      >
        <div
          className={clsx(classes.list)}
          role="presentation"
          onClick={() => {
            setState(true);
          }}
          onKeyDown={() => {
            setState(true);
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Lucky winners"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <RiHome3Line />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <RiUser3Line />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <RiClipboardLine />
              </ListItemIcon>
              <ListItemText primary={"Scratch Card"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <RiTrophyLine />
              </ListItemIcon>
              <ListItemText primary={"Winners"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
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
