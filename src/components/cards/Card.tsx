import React, { useState } from 'react'
import { StaticMathField } from "react-mathquill"
import { CARDS_ACTIONS } from '../../Constants';
import { MdMoreHoriz } from "react-icons/md"
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { CgPlayListAdd } from 'react-icons/cg'
import SaveToPrompt from './SaveToPrompt';
import { CardInterface } from '../cardform/CardForm'
interface Props {
  card: CardInterface;
  cardsDispatch: Function;
  size?: 'medium' | 'small' | 'large';
  layout?: 'fixed-size' | 'hug-content';
  dimentions?: number[];
  flippable?: boolean;
}

const Card: React.FC<Props> = ({ card, cardsDispatch,/* size, layout, dimentions*/ flippable }) => {
  const history = useHistory();

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
  const displayMainCard = (id: string) => {
    history.push(`/maincard/${card._id}`)
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLElement>(null);
  const saveRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>): void => {
    if (anchorRef?.current && anchorRef?.current?.contains?.(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  const handleEdit = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    history.push(`/cardform/edit/${card._id}`);
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
    fetch(`${process.env.REACT_APP_API_URL}/cards/${card._id}`, {
      method: 'DELETE'
    })

    cardsDispatch({ type: CARDS_ACTIONS.REMOVE_CARD, payload: { id: card._id } })

  }

  function handleListKeyDown(event: any) {
    if (event.key === 'Tab') {
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
  }



  return (
    <div
      className="container-item"
      // style={containerItemStyle}
    >
      <Paper elevation={3}>
      <div className="card">
        <div>
          {/* @ts-ignore: No idea what this error is */}
          <Button
            className='btn-more'
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ float: "right", width: "0.2rem" }}
          >
            <MdMoreHoriz style={{ width: "5rem", height: "2rem" }} />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper variant="outlined">
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                      <MenuItem onClick={handleEdit}>
                        <BiEditAlt style={{ marginRight: '0.7rem' }} />
                        Edit
                      </MenuItem>

                      <MenuItem onClick={handleDelete}>
                        <AiOutlineDelete style={{ marginRight: '0.7rem' }} />
                        Delete
                      </MenuItem>

                      <MenuItem onClick={saveToHandle} ref={saveRef}>
                        <CgPlayListAdd style={{ marginRight: '0.7rem' }} />
                        Save to ...
                      </MenuItem>
                    </MenuList>



                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <SaveToPrompt saveToPromptOpen={saveToPromptOpen} setSaveToPromptOpen={setSaveToPromptOpen} saveRef={saveRef.current} />
        </div>
        <div className="front" onClick={() => displayMainCard(card._id)} >
          {card.front.map((field, key) => {
            if (field.type === 'MATH') {
              return <StaticMathField key={key} style={{ fontSize: "2rem" }}>{field.latex}</StaticMathField>
            }
            if (field.type === 'TEXT') {
              return <div key={key} dangerouslySetInnerHTML={{ __html: field.htmlContent || '' }}></div>
            }
            return <></>
          })
          }
        </div>

        {(() => {
          if (flippable) {
            return (
              <div className="face back">
                {card.back.map((field, key) => {
                  if (field.type === 'MATH') {
                    return <StaticMathField key={key} style={{ fontSize: "2rem" }}>{field.latex}</StaticMathField>
                  }
                  if (field.type === 'TEXT') {
                    return <div key={key} dangerouslySetInnerHTML={{ __html: field.htmlContent || '' }}></div>
                  }
                  return <></>
                })
                }
              </div>
            );
          }
        })()}

      </div>
      </Paper>
    </div>
  );
}

export default Card
