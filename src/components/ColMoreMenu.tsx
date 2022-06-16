import React, { MouseEventHandler } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { UserActions, useUserUpdate } from "contexts/UserContext";
import { fetchDeleteCollection } from "api/collectionAPI";
import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "contexts/SnackbarContext";

interface Props {
  collectionId: string | null;
  collectionTitle: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorEl: HTMLElement | null;
  handleEdit: Function;
}

const ColMoreMenu: React.FC<Props> = ({ open, setOpen, anchorEl, collectionTitle, collectionId, handleEdit }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const userDispatch = useUserUpdate();
  const { currentUser } = useAuth();
  const displaySnackBar = useSnackbar();
  const handleDelete = async () => {

    const idToken = await currentUser?.getIdToken(true);
    if (typeof idToken === "undefined") {
      throw new Error(`idToken cannot be undefined`);
    }
    if (!collectionId) {
      throw new Error(`cannot delete collection, collectionId cannot be ${collectionId}`)
    }
    const res = await fetchDeleteCollection(collectionId, idToken);
    if (!res.ok) {
      displaySnackBar("error", "Couldn't delete card. Some error happened!");
      return;
    }
    userDispatch({
      type: UserActions.DeleteCollection,
      payload: {
        collectionId,
      }
    })
    displaySnackBar("success", "Collection deleted successfully");
    setOpen(false);
  }

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      sx={{ zIndex: "1" }}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper variant="outlined">
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                // onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={(event) => handleEdit(event, collectionTitle )}>
                  <BiEditAlt style={{ marginRight: "0.7rem" }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={handleDelete}>
                  <AiOutlineDelete style={{ marginRight: "0.7rem" }} />
                  Delete
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default ColMoreMenu;