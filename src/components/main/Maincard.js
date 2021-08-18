import { addStyles, StaticMathField } from "react-mathquill";
import { useState, useEffect, useRef } from "react";

addStyles();

const Maincard = ({ chosenCard }) => {
  const [frontDisplayed, setFrontDisplayed] = useState(true);
  const divToRotate = useRef();

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
          <h3>{chosenCard.front.question}</h3>
          <StaticMathField style={{ fontSize: "2rem" }}>
            {chosenCard.front.formula}
          </StaticMathField>
        </div>

        <div className="back">
          <StaticMathField style={{ fontSize: "2rem" }}>
            {chosenCard.back.formula}
          </StaticMathField>
          <h3>{chosenCard.back.comment}</h3>
        </div>
      </div>
    </div>
  );
};

export default Maincard;
