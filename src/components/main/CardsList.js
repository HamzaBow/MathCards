//  TODO: Card should be imported from ../cards/Card (finish implementing later).
import Card from "../cards/Card";
import { useTheme } from "../../ThemeContext";

const CardsList = ({ cards, cardsDispatch }) => {
  // TODO: the container should have no visible style (except probably for margins, etc. ) to make the app style and layout SIMPLER
  //       White background (for white theme) all the way to the left & right edges of the viewport.
  const darkTheme = useTheme();
  const containerStyle = {
    backgroundColor: darkTheme ? '#010409' : "#f0f2f5",
    color: darkTheme ? "white" : "black",
  };

  return (
    <div className="container" style={containerStyle}>
      {cards.map((card, key) => (
        <Card key={key} card={card} cardsDispatch={cardsDispatch} />
      ))}
    </div>
  );
};

export default CardsList;
