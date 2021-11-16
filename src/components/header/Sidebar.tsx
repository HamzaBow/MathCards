import React, { MouseEventHandler, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { List as ListIcon, Star, Feedback, Help } from "@mui/icons-material/";
import { AiFillHeart } from "react-icons/ai";
import { ImSigma } from "react-icons/im";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, Bookmark, Add } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";
import { FaHammer } from "react-icons/fa";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Collection } from "contexts/UserContext";

import Logo from "../Logo";

import {
  useUser,
  useUserUpdate,
  UserActions,
} from "../../contexts/UserContext";

import { TextField, Button } from "@mui/material";

import { fetchCreateCollection } from "api/collectionAPI";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface Props {
  displaySidebar: boolean;
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ displaySidebar, setDisplaySidebar }) => {
  const classes = useStyles();

  const history = useHistory();

  const user = useUser();
  const userDispatch = useUserUpdate();

  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const [creatingNewCollection, setCreatingNewCollection] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const saveNewCollection = async () => {
    //saving the new collection to the server

    const collection = await fetchCreateCollection({
      // @ts-ignore: _id should exist inside user, ????
      ownerId: user._id,
      title: newCollectionTitle,
    });
    // @ts-ignore: expression should be callable, ???
    userDispatch({
      type: UserActions.AddCollection,
      payload: { newCollection: collection },
    });
    setNewCollectionTitle("");
    setCreatingNewCollection(false);
  };

  function handleCollectionClick(
    collecId: string
  ): MouseEventHandler<HTMLDivElement> {
    return () => {
      setDisplaySidebar(false);
      history.push(`/collection/${collecId}`);
    };
  }
  return (
    <div>
      <Drawer
        anchor="left"
        open={displaySidebar}
        onClose={() => setDisplaySidebar((prev) => !prev)}
      >
        <List>
          <ListItem
            button
            key="back"
            onClick={() => setDisplaySidebar((prev) => !prev)}
            style={{
              paddingTop: "0",
              paddingBottom: "0",
              marginTop: "0",
              marginBottom: "7px",
            }}
          >
            <ArrowBack style={{ marginRight: "2rem" }} />
            <Logo />
          </ListItem>

          <Divider />

          <ListItem
            button
            key="Collections"
            onClick={() => setCollectionsOpen((prev) => !prev)}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Collections" />
            {collectionsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={collectionsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* @ts-ignore: _id should exist inside user, ???? */}
              {user.collections.map((collection: Collection, key: number) => (
                <ListItem
                key={key}
                button
                className={classes.nested}
                /* @ts-ignore: _id should exist inside user, ???? */
                  onClick={handleCollectionClick(collection._id)}
                >
                  <ListItemIcon>
                    <ImSigma />
                  </ListItemIcon>
                  <ListItemText primary={collection.title} />
                </ListItem>
              ))}

              {creatingNewCollection ? (
                <ListItem style={{ display: "flex", justifyContent: "center" }}>
                  <TextField
                    placeholder="Collection name"
                    value={newCollectionTitle}
                    onChange={(e) => setNewCollectionTitle(e.target.value)}
                  />
                  <Button onClick={saveNewCollection}>Save</Button>
                  <Button onClick={() => setCreatingNewCollection(false)}>
                    Cancel
                  </Button>
                </ListItem>
              ) : (
                <ListItem
                  button
                  className={classes.nested}
                  style={{ display: "flex", justifyContent: "center" }}
                  onClick={() => setCreatingNewCollection(true)}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                </ListItem>
              )}
            </List>
          </Collapse>

          <Divider />

          <ListItem button key="Topics">
            <ListItemIcon>
              <VerticalSplitIcon style={{ transform: "rotate(180deg)" }} />
            </ListItemIcon>
            <ListItemText primary="Topics" />
          </ListItem>

          <ListItem button key="Bookmarks">
            <ListItemIcon>
              <Bookmark />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItem>

          <ListItem button key="Created Cards">
            <ListItemIcon>
              <FaHammer size={23} />
            </ListItemIcon>
            <ListItemText primary="Created Cards" />
          </ListItem>

          <ListItem button key="Liked">
            <ListItemIcon>
              <AiFillHeart size={23} style={{ paddingLeft: "0.1rem" }} />
            </ListItemIcon>
            <ListItemText primary="Liked" />
          </ListItem>

          <ListItem button key="Starred">
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>

          <Divider />

          <ListItem button key="Following">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Following" />
          </ListItem>

          <ListItem button key="Followers">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Followers" />
          </ListItem>

          <Divider />

          <ListItem button key="Help">
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>

          <ListItem button key="Feedback">
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
