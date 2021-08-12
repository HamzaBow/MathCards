import { addStyles, StaticMathField } from "react-mathquill";
import { useEffect, useRef } from "react";

addStyles();

const Maincard = ({
  cards,
  chosenCardId,
  mainCardActive,
  frontIsShown,
  setFrontIsShown,
}) => {
  let chosenCard = cards.filter((card) => card.id === chosenCardId)[0];
  const cardToRotateRef = useRef();
  // it would be equal to undefined if data was not yet fetched
  // TODO: should figure how to make the component not render until useEffect has finished.

  if (typeof chosenCard === "undefined") {
    // initialize chosenCard to a dummy object
    chosenCard = {
      front: {
        question: "",
        formula: "",
      },
      back: {
        formula: "",
        comment: "",
      },
    };
  }

  useEffect(() => {
    if (frontIsShown) {
      cardToRotateRef.current.style.transform = "rotateY(0deg)";
    } else {
      cardToRotateRef.current.style.transform = "rotateY(180deg)";
    }
  }, [frontIsShown]);

  const mainCardStyle = {
    visibility: mainCardActive ? "visible" : "hidden",
    opacity: mainCardActive ? "1" : "0",
  };

  return (
    <div
      id="opened-card"
      className="container-item"
      style={mainCardStyle}
      onClick={() => {
        setFrontIsShown((shown) => !shown);
      }}
    >
      <div ref={cardToRotateRef} className="card">
        <div className="front">
          <h2>{chosenCard.front.question}</h2>
          <StaticMathField style={{ fontSize: "2rem" }}>
            {chosenCard.front.formula}
          </StaticMathField>
        </div>

        <div className="back">
          <StaticMathField style={{ fontSize: "2rem" }}>
            {chosenCard.back.formula}
          </StaticMathField>
          <h2>{chosenCard.back.comment}</h2>
        </div>
      </div>
    </div>
  );
};

export default Maincard;
