import { addStyles } from "react-mathquill";
import { useState } from "react";
import { Backdrop, Fade, Popper } from "@mui/material";
import MaincardCore from "./MaincardCore";

addStyles();

interface Props {
  cardId: string;
  mainCardOpen: boolean;
  setMainCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Maincard: React.FC<Props> = ({
  cardId,
  mainCardOpen,
  setMainCardOpen,
}) => {



  // TODO: useEffect( ... , []) which is on mount, press <space> flips the card, addEventListener

  // const mainCardStyle = {
  //   visibility: mainCardActive ? "visible" : "hidden",
  //   opacity: mainCardActive ? "1" : "0",
  // };
  const [frontDisplayed, setFrontDisplayed] = useState(true);
  function handleClose(e: MouseEvent | TouchEvent | KeyboardEvent) {
    console.log('set mainCardOpen to false')
    setMainCardOpen(false)
    setTimeout(() => {
      setFrontDisplayed(true)
    }, 300);
  }

  return (
    <Popper
      open={mainCardOpen}
      role={undefined}
      transition
      disablePortal
      style={{ zIndex: 1 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Backdrop open={true}>
              <MaincardCore
                cardId={cardId}
                mainCardOpen={mainCardOpen}
                frontDisplayed={frontDisplayed}
                setFrontDisplayed={setFrontDisplayed}
                handleClose={handleClose}
              />
          </Backdrop>
        </Fade>
      )}
    </Popper>
  );
};

export default Maincard;
