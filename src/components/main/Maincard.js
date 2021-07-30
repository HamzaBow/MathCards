import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

const Maincard = ({ flipMainCard, chosenCardId, cards }) => {
  const chosenCard = cards.filter((card) => card.id == chosenCardId)[0];
  return (
    <div
      id="opened-card"
      className="container-item"
      onClick={() => flipMainCard()}
    >
      <div className="card">
        <div className="front">
          <h2>{chosenCard.front.question}</h2>
          {/* <h2>{card.front.formula}</h2> */}
          <StaticMathField style={{ fontSize: "2em" }}>
            {chosenCard.front.formula}
          </StaticMathField>
        </div>

        <div className="back">
          {/* <h2>{card.back.formula}</h2> */}
          <StaticMathField style={{ fontSize: "2em" }}>
            {chosenCard.back.formula}
          </StaticMathField>
          <h2>{chosenCard.back.comment}</h2>
        </div>
      </div>
    </div>
  );
};

export default Maincard;
