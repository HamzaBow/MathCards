
import { HiLightBulb } from "react-icons/hi";
import { FieldType } from '../cardform/CardForm'
import useEventListener from "hooks/useEventListener";
import { StaticMathField } from "react-mathquill";
import { useCards } from "contexts/CardsContext";

import { ClickAwayListener, Paper} from "@mui/material";
import { useEffect, useRef } from "react";

interface Props {
  cardId: string;
  mainCardOpen: boolean;
  frontDisplayed: boolean;
  setFrontDisplayed:  React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: (e: MouseEvent | TouchEvent | KeyboardEvent) => void;
}
const MaincardCore: React.FC<Props> = ({
  cardId,
  mainCardOpen,
  frontDisplayed,
  setFrontDisplayed,
  handleClose
}) => {
  const cardIconStyle: any = {
    color: "yellow",
    width: "3rem",
    height: "3rem",
    position: "absolute",
    top: "-3.5rem",
  };

  const divToRotate = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make card's front and back faces the same size (width and height)
    if (frontRef?.current && backRef?.current) {
      const frontWidth = window
        .getComputedStyle(frontRef?.current)
        .getPropertyValue("width");
      const frontHeight = window
        .getComputedStyle(frontRef?.current)
        .getPropertyValue("height");
      const backWidth = window
        .getComputedStyle(backRef?.current)
        .getPropertyValue("width");
      const backHeight = window
        .getComputedStyle(backRef?.current)
        .getPropertyValue("height");

      const maxWidth = Math.max(
        parseFloat(frontWidth.slice(0, -2)),
        parseFloat(backWidth.slice(0, -2))
      );
      const maxHeight = Math.max(
        parseFloat(frontHeight.slice(0, -2)),
        parseFloat(backHeight.slice(0, -2))
      );

      frontRef.current.style.width = maxWidth + "px";
      backRef.current.style.width = maxWidth + "px";
      frontRef.current.style.height = maxHeight + "px";
      backRef.current.style.height = maxHeight + "px";
    }
  }, [cardId, mainCardOpen]);

  useEffect(() => {
    if (divToRotate?.current) {
      if (frontDisplayed) {
        divToRotate.current.style.transform = "rotateY(0deg)";
      } else {
        divToRotate.current.style.transform = "rotateY(180deg)";
      }
    } else {
      console.error("cant rotate card, check divToRotate");
    }
  }, [frontDisplayed, cardId]);
  const cards = useCards();

  const chosenCard = cards.find((card) => card._id === cardId);

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose(e)
    }
    if ((e.key === " ") || (e.key === "Enter")) {
      setFrontDisplayed((displayed) => !displayed);
    }
    if (e.key === "Tab"){
      e.preventDefault();
    }
  });

  const openedCardRef = useRef<HTMLDivElement>(null)
  openedCardRef.current?.focus()

  return (
    <ClickAwayListener onClickAway={(e) => {handleClose(e)}}>
      <div
        ref={openedCardRef}
        id="opened-card"
        className="container-item"
        // style={mainCardStyle}
        tabIndex={-1}
        onClick={() => {
          // setFrontIsShown((shown) => !shown);
          setFrontDisplayed((displayed) => !displayed);
        }}
      >
        <div ref={divToRotate} className="card">
          <Paper ref={frontRef} className="front">
            {chosenCard?.front.map((field, key) => {
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
          </Paper>

          <Paper ref={backRef} className="back">
            <HiLightBulb style={cardIconStyle} />
            {chosenCard?.back.map((field, key) => {
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
          </Paper>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default MaincardCore;
