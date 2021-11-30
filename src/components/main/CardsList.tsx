//  TODO: Card should be imported from ../cards/Card (finish implementing later).
import { Action } from "App";
import CardForm, { CardInterface } from "components/cardform/CardForm";
import Subheader from "components/Subheader";
import { useState } from "react";
import Card from "../cards/Card";

interface Props {
  cards: CardInterface[];
  cardsDispatch: React.Dispatch<Action>;
}

const CardsList: React.FC<Props> = ({ cards, cardsDispatch }) => {
  // TODO: the container should have no visible style (except probably for margins, etc. ) to make the app style and layout SIMPLER
  //       White background (for white theme) all the way to the left & right edges of the viewport.
  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [cardId, setCardId] = useState<string>(""); // this cardId is going to be used to edit card in cardForm
                                                    // or open Maincard
  return (
    <>
      <Subheader />
      <div className="container">
        {cards.map((card, key) => (
          <Card
            key={key}
            card={card}
            cardsDispatch={cardsDispatch}
            setCardFormOpen={setCardFormOpen}
            setCardId={setCardId}
          />
        ))}
      </div>
      <CardForm
        operationType="edit"
        cards={cards}
        cardId={cardId}
        cardsDispatch={cardsDispatch}
        cardFormOpen={cardFormOpen}
        setCardFormOpen={setCardFormOpen}
      />
    </>
  );
};

export default CardsList;
