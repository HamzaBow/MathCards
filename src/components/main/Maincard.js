import { addStyles, StaticMathField } from "react-mathquill";
import { useState, useEffect, useRef } from "react";

addStyles();

const Maincard = ({ chosenCard }) => {
  // let chosenCard = cards.filter((card) => card.id === chosenCardId)[0];
  const [frontDisplayed, setFrontDisplayed] = useState(true);
  const divToRotate = useRef();
  // it would be equal to undefined if data was not yet fetched
  // TODO: should figure how to make the component not render until useEffect has finished.

  useEffect(() => {
    if (frontDisplayed) {
      divToRotate.current.style.transform = "rotateY(0deg)";
    } else {
      divToRotate.current.style.transform = "rotateY(180deg)";
    }
  }, [frontDisplayed]);

  // TODO: useEffect( ... , []) which is on mount, press <space> flips the card, addEventListener

  // const mainCardStyle = {
  //   visibility: mainCardActive ? "visible" : "hidden",
  //   opacity: mainCardActive ? "1" : "0",
  // };

  return (
    <div
      id="opened-card"
      className="container-item"
      // style={mainCardStyle}
      onClick={() => {
        // setFrontIsShown((shown) => !shown);
        setFrontDisplayed((displayed) => !displayed);
      }}
    >
      <div ref={divToRotate} className="card">
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
