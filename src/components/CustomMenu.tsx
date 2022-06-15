import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";

interface Props {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  handleClose: (event: MouseEvent | TouchEvent) => void;
}

const CustomMenu: React.FC<Props> = ({ open, anchorRef, handleClose }) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
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
                {/* <MenuItem onClick={handleEdit}> */}
                <MenuItem>
                  <BiEditAlt style={{ marginRight: "0.7rem" }} />
                  Edit
                </MenuItem>

                {/* <MenuItem onClick={handleDelete}> */}
                <MenuItem>
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

export default CustomMenu;