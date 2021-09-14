//  TODO: Card should be imported from ../cards/Card (finish implementing later).
import Card from "../cards/Card";
import { useTheme } from "../../contexts/ThemeContext";

const CardsList = ({ cards, cardsDispatch }) => {
  // TODO: the container should have no visible style (except probably for margins, etc. ) to make the app style and layout SIMPLER
  //       White background (for white theme) all the way to the left & right edges of the viewport.
  return (
    <div className="container" >
      {cards.map((card, key) => (
        <Card key={key} card={card} cardsDispatch={cardsDispatch} />
      ))}
    </div>
  );
};

export default CardsList;
