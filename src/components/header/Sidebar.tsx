import React, { MouseEventHandler, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { List as ListIcon } from "@mui/icons-material/";
// import { Feedback, Help } from "@mui/icons-material/";
import { ImSigma } from "react-icons/im";
import { Collapse, IconButton, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore, Add } from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";
import { FaHammer } from "react-icons/fa";
// import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Collection, useUser } from "contexts/UserContext";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";
import NewCollectionForm from "./NewCollectionForm";
import MoreVert from "@mui/icons-material/MoreVert";
import CustomMenu from "components/CustomMenu";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

interface Props {
  displaySidebar: boolean;
  setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ displaySidebar, setDisplaySidebar }) => {
  const classes = useStyles();

  const history = useHistory();

  const user = useUser();

  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const [creatingNewCollection, setCreatingNewCollection] = useState(false);

  const [open, setOpen] = React.useState(false);


  function handleCollectionClick(
    collecId: string
  ): MouseEventHandler<HTMLDivElement> {
    return () => {
      setDisplaySidebar(false);
      setTimeout(() => {
        history.push(`/collection/${collecId}`);
      }, 300);
    };
  }
  const handleCreatedCardsClick = () => {
    setDisplaySidebar((prev) => !prev);
    setTimeout(() => {
      history.push("/user_cards");
    }, 300);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleColMoreBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(event.target as HTMLElement);
    setOpen(true);
  }
  const handleClose = (event: MouseEvent | TouchEvent): void => {
    setOpen(false);
  };

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
              {user.collections?.map((collection: Collection, key: number) => (
                <ListItem
                  key={key}
                  button
                  className={classes.nested}
                  onClick={handleCollectionClick(collection._id)}
                >
                  <ListItemIcon>
                    <ImSigma />
                  </ListItemIcon>
                  <ListItemText primary={collection.title} />

                  <IconButton size="small" onClick={handleColMoreBtn}>
                    <MoreVert />
                  </IconButton>
                </ListItem>
              ))}
              <CustomMenu
                anchorEl={anchorEl}
                open={open}
                setOpen={setOpen}
              />

              {creatingNewCollection ? (
                <NewCollectionForm
                  setCreatingNewCollection={setCreatingNewCollection}
                />
              ) : (
                <Tooltip title={`Create new collection.`} placement="top">
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
                </Tooltip>
              )}
            </List>
          </Collapse>

          <Divider />

          {/*
          <Divider />

          <ListItem button key="Topics">
            <ListItemIcon>
              <VerticalSplitIcon style={{ transform: "rotate(180deg)" }} />
            </ListItemIcon>
            <ListItemText primary="Topics" />
          </ListItem>
          */}

          <ListItem
            button
            key="Created Cards"
            onClick={handleCreatedCardsClick}
          >
            <ListItemIcon>
              <FaHammer size={23} />
            </ListItemIcon>
            <ListItemText primary="Created Cards" />
          </ListItem>

          {/*
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
          */}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
