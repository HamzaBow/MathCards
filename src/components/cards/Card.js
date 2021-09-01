import React from 'react'
import { StaticMathField } from "react-mathquill"
import { CARD_LAYOUT, CARD_SIZE } from '../../Constants';
import { COLORS } from "../../Constants"
import { MdMoreHoriz } from "react-icons/md"
import { useTheme } from "../../ThemeContext"
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


const Card = ({ card, size, layout, dimentions, flippable }) => {
  const history = useHistory();

  const darkTheme = useTheme();

  // ********************* Smart Defaults.**********************
  layout = layout ?? CARD_LAYOUT.HUG_CONTENT;
  size = size ?? CARD_SIZE.MEDIUM;
  flippable = flippable ?? false;

  card = (typeof card === "object" && card !== null) ? card : {}

  if (layout === CARD_LAYOUT.FIXED_SIZE) {
    switch (size) {

      case CARD_SIZE.SMALL:
        dimentions = dimentions ?? { width: "10rem", height: "15rem" }
        break;

      case CARD_SIZE.MEDIUM:
        dimentions = dimentions ?? { width: "20rem", height: "30rem" }
        break;

      case CARD_SIZE.LARGE:
        dimentions = dimentions ?? { width: "30rem", height: "45rem" }
        break;

      default: // set it to medium
        dimentions = dimentions ?? { width: "20rem", height: "30rem" }
        break;
    }
  }
  // ****************** End of Smart Defaults ******************

  let width = "auto";
  let height = "auto";

  if (layout === CARD_LAYOUT.FIXED_SIZE) {
    width = dimentions.width;
    height = dimentions.height;
  }

  // TODO: 
  const containerItemStyle = {
    width,
    height,

    boxShadow: darkTheme ? "none" : "0.5px 1.5px 10px gray",
    color: darkTheme ? COLORS.GRAY_LIGHT : COLORS.GRAY_DARK,
    backgroundColor: darkTheme ? COLORS.GRAY_DARKER : COLORS.GRAY_LIGHT,
  };


  // TODO: the rest of the code is to be refactored, it was copied and pasted from the old Card.js component
  const displayMainCard = (id) => {
    history.push(`/maincard/${card.id}`)
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);



  return (
    <div
      className="container-item"
      style={containerItemStyle}
    >
      <div className="card">

        <div>
          <Button
            className='btn-more'
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{ float: "right", width: "0.2rem"}}
          >
            <MdMoreHoriz style={{ width: "5rem", height: "2rem" }} />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}><BiEditAlt       style={{marginRight: '0.7rem'}} />Edit  </MenuItem>
                      <MenuItem onClick={handleClose}><AiOutlineDelete style={{marginRight: '0.7rem'}} />Delete</MenuItem>
                      <MenuItem onClick={handleClose}><CgPlayListAdd   style={{marginRight: '0.7rem'}} />Save to ...</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <div className="front" onClick={() => displayMainCard(card.id)} >
          {card.front.map((field, key) => {
            if (field.type === 'MATH') {
              return <StaticMathField key={key} style={{ fontSize: "2rem" }}>{field.latex}</StaticMathField>
            }
            if (field.type === 'TEXT') {
              return <div key={key} dangerouslySetInnerHTML={{ __html: field.htmlContent }}></div>
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
                    return <div key={key} dangerouslySetInnerHTML={{ __html: field.htmlContent }}></div>
                  }
                  return <></>
                })
                }
              </div>
            );
          }
        })()}

      </div>
    </div>
  );
}

export default Card
