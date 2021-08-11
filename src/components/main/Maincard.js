import { addStyles, StaticMathField } from "react-mathquill";

addStyles();

const Maincard = ({ cards, chosenCardId, flipMainCard }) => {
  let chosenCard = cards.filter((card) => card.id == chosenCardId)[0];

  // it would be equal to undefined if data was not yet fetched
  // TODO: should figure how to make the component not render until useEffect has finished.

  if (typeof chosenCard == "undefined") {
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
  // TODO:
  //    * remove id="opened-card"
  //    * remove 'className' and use local 'style={..}' instead
  //        - bring the styles from index.css
  //    * change the visibility of this component using a state.
  //    * Remove ALL expressions "document.getElementById(..)" from this
  //      project and use 'states' instead.
  return (
    <div
      id="opened-card"
      className="container-item"
      onClick={() => flipMainCard()}
    >
      <div className="card">
        <div className="front">
          <h2>{chosenCard.front.question}</h2>
          <StaticMathField style={{ fontSize: "2em" }}>
            {chosenCard.front.formula}
          </StaticMathField>
        </div>

        <div className="back">
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
