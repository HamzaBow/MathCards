import React, { useState } from "react";
import { StaticMathField } from "react-mathquill";
import { CARDS_ACTIONS } from "../../Constants";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { CgPlayListAdd } from "react-icons/cg";
import SaveToPrompt from "./SaveToPrompt";
import { CardInterface, FieldType } from "../cardform/CardForm";
import { fetchDeleteCard } from "api/cardAPI";
import makeStyles from "@mui/styles/makeStyles";
import { useUpdateCards } from "contexts/CardsContext";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $buttonMore": {
      visibility: "visible",
    },
  },
  buttonMore: {
    padding: 0,
    minWidth: "40px",
    float: "right",
    visibility: "hidden",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#5a5a5a" : "#eee",
    },
  },
  moreIcon: {
    color: theme.palette.text.secondary,
  },
}));

interface Props {
  card: CardInterface;
  setCardFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMainCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  size?: "medium" | "small" | "large";
  layout?: "fixed-size" | "hug-content";
  dimentions?: number[];
  flippable?: boolean;
}

const Card: React.FC<Props> = ({
  card,
  setCardFormOpen,
  setMainCardOpen,
  setCardId,
  /* size, layout, dimentions*/ flippable,
}) => {

  const cardsDispatch = useUpdateCards();

  const classes = useStyles();
  const [saveToPromptOpen, setSaveToPromptOpen] = useState(false);

  // ********************* Smart Defaults.**********************
  // layout = layout ?? CARD_LAYOUT.HUG_CONTENT;
  // size = size ?? CARD_SIZE.MEDIUM;
  // flippable = flippable ?? false;

  // card = (typeof card === "object" && card !== null) ? card : {}

  // if (layout === CARD_LAYOUT.FIXED_SIZE) {
  //   switch (size) {

  //     case CARD_SIZE.SMALL:
  //       dimentions = dimentions ?? { width: "10rem", height: "15rem" }
  //       break;

  //     case CARD_SIZE.MEDIUM:
  //       dimentions = dimentions ?? { width: "20rem", height: "30rem" }
  //       break;

  //     case CARD_SIZE.LARGE:
  //       dimentions = dimentions ?? { width: "30rem", height: "45rem" }
  //       break;

  //     default: // set it to medium
  //       dimentions = dimentions ?? { width: "20rem", height: "30rem" }
  //       break;
  //   }
  // }
  // ****************** End of Smart Defaults ******************

  // let width = "auto";
  // let height = "auto";

  // if (layout === CARD_LAYOUT.FIXED_SIZE) {
  //   width = dimentions.width;
  //   height = dimentions.height;
  // }

  // // TODO:
  // const containerItemStyle = {
  //   width,
  //   height,
  // };

  // TODO: the rest of the code is to be refactored, it was copied and pasted from the old Card.js component
  const displayMainCard = () => {
    setCardId(card._id)
    setMainCardOpen(true)
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const saveRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: MouseEvent | TouchEvent): void => {
    if (
      anchorRef?.current &&
      anchorRef?.current?.contains?.(event.target as Node)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleEdit = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setCardId(card._id);
    setCardFormOpen(true);
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
    fetchDeleteCard(card._id);
    cardsDispatch({
      type: CARDS_ACTIONS.REMOVE_CARD,
      payload: { id: card._id },
    });
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef<boolean>(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef?.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const saveToHandle = () => {
    setSaveToPromptOpen(true);
  };

  return (
    <div
      className={classes.cardContainer}
      // style={containerItemStyle}
    >
      <Paper elevation={3}>
        <div className="card">
          <div>
            <Button
              className={classes.buttonMore}
              id="btn-more"
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MoreHorizIcon className={classes.moreIcon} />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
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
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleEdit}>
                          <BiEditAlt style={{ marginRight: "0.7rem" }} />
                          Edit
                        </MenuItem>

                        <MenuItem onClick={handleDelete}>
                          <AiOutlineDelete style={{ marginRight: "0.7rem" }} />
                          Delete
                        </MenuItem>

                        <MenuItem onClick={saveToHandle} ref={saveRef}>
                          <CgPlayListAdd style={{ marginRight: "0.7rem" }} />
                          Save to ...
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            <SaveToPrompt
              cardId={card._id}
              saveToPromptOpen={saveToPromptOpen}
              setSaveToPromptOpen={setSaveToPromptOpen}
              saveRef={saveRef.current}
            />
          </div>
          <div className="front" onClick={displayMainCard}>
            {card.front.map((field, key) => {
              if (field.type === FieldType.Math) {
                return (
                  <StaticMathField key={key} style={{ fontSize: "2rem" }}>
                    {field.latex}
                  </StaticMathField>
                );
              }
              if (field.type === FieldType.Text) {
                return (
                  <div
                    key={key}
                    dangerouslySetInnerHTML={{
                      __html: field.htmlContent || "",
                    }}
                  ></div>
                );
              }
              return <></>;
            })}
          </div>

          {(() => {
            if (flippable) {
              return (
                <div className="face back">
                  {card.back.map((field, key) => {
                    if (field.type === FieldType.Math) {
                      return (
                        <StaticMathField key={key} style={{ fontSize: "2rem" }}>
                          {field.latex}
                        </StaticMathField>
                      );
                    }
                    if (field.type === FieldType.Text) {
                      return (
                        <div
                          key={key}
                          dangerouslySetInnerHTML={{
                            __html: field.htmlContent || "",
                          }}
                        ></div>
                      );
                    }
                    return <></>;
                  })}
                </div>
              );
            }
          })()}
        </div>
      </Paper>
    </div>
  );
};

export default Card;
