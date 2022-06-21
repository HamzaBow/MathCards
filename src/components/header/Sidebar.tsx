import React, { MouseEventHandler, useEffect, useState } from "react";
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
import CollectionForm from "./CollectionForm";
import MoreVert from "@mui/icons-material/MoreVert";
import ColMoreMenu from "components/ColMoreMenu";

export type CollectionOpType = "CREATE" | "UPDATE";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collectionItem: {
    paddingLeft: theme.spacing(4),
    "&:hover $buttonMore": {
      visibility: "visible"
    }
  },
  buttonMore: {
    visibility: "hidden",
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

  const [collectionFormOpen, setCollectionFormOpen] = useState(false);

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
  const [collectionId, setCollectionId] = useState<string|null>(null);
  const [collectionTitle, setCollectionTitle] = useState<string>("");

  const handleColMoreBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    collectionId: string,
    colTitle: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.target as HTMLElement);
    setOpen(true);
    setCollectionId(collectionId)
    setCollectionTitle(colTitle)
  };

  const [colFormOpType, setColFormOpType] = useState<CollectionOpType>("CREATE")
  const [formColTitle, setFormColTitle] = useState<string>("")

  const handleEdit = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, title: string) => {
    setOpen(false)
    setCollectionFormOpen(true);
    setColFormOpType("UPDATE");
    setFormColTitle(title)
  }
  const handleNewCollection = () => {
    setCollectionId(null);
    setColFormOpType('CREATE')
    setCollectionFormOpen(true);
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
              {user.collections?.map((collection: Collection, key: number) => {
                if (collectionFormOpen && colFormOpType === "UPDATE" && collectionId === collection._id) {
                  return (
                    <CollectionForm
                      operationType={colFormOpType}
                      collectionId={collectionId}
                      setCollectionFormOpen={setCollectionFormOpen}
                      formColTitle={formColTitle}
                      setFormColTitle={setFormColTitle}
                    />
                  )
                }
                return (
                  <ListItem
                    key={key}
                    button
                    className={classes.collectionItem}
                    onClick={handleCollectionClick(collection._id)}
                  >
                    <ListItemIcon>
                      <ImSigma />
                    </ListItemIcon>
                    <ListItemText primary={collection.title} />

                    <IconButton className={classes.buttonMore} size="small" onClick={(event) => handleColMoreBtn(event, collection._id, collection.title)}>
                      <MoreVert />
                    </IconButton>
                  </ListItem>
                )
                })
              }
              <ColMoreMenu
                collectionId={collectionId}
                collectionTitle={collectionTitle}
                anchorEl={anchorEl}
                open={open}
                setOpen={setOpen}
                handleEdit={handleEdit}
              />

              {collectionFormOpen && colFormOpType === "CREATE" ? (
                <CollectionForm
                  operationType={colFormOpType}
                  collectionId={collectionId}
                  setCollectionFormOpen={setCollectionFormOpen}
                  formColTitle={formColTitle}
                  setFormColTitle={setFormColTitle}
                />
              ) : (
                <Tooltip title={`Create new collection.`} placement="top">
                  <ListItem
                    button
                    className={classes.nested}
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={handleNewCollection}
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
