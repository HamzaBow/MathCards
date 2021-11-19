//  TODO: Card should be imported from ../cards/Card (finish implementing later).
import { Action } from "App";
import { CardInterface } from "components/cardform/CardForm";
import Subheader from "components/Subheader";
import Card from "../cards/Card";

interface Props {
  cards: CardInterface[];
  cardsDispatch: React.Dispatch<Action>;
}

const CardsList: React.FC<Props> = ({ cards, cardsDispatch }) => {
  // TODO: the container should have no visible style (except probably for margins, etc. ) to make the app style and layout SIMPLER
  //       White background (for white theme) all the way to the left & right edges of the viewport.
  return (
    <>
      <Subheader />
      <div className="container">
        {cards.map((card, key) => (
          <Card key={key} card={card} cardsDispatch={cardsDispatch} />
        ))}
      </div>
    </>
  );
};

export default CardsList;
