//  TODO: Card should be imported from ../cards/Card (finish implementing later).
import CardForm  from "components/cardform/CardForm";
import Subheader from "components/Subheader";
import { useState } from "react";
import Card from "../cards/Card";
import Maincard from "./Maincard";
import { useCards } from "contexts/CardsContext";

const CardsList: React.FC = () => {
  // TODO: the container should have no visible style (except probably for margins, etc. ) to make the app style and layout SIMPLER
  //       White background (for white theme) all the way to the left & right edges of the viewport.

  const cards = useCards()

  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [cardId, setCardId] = useState<string>(""); // this cardId is going to be used to edit card in cardForm
                                                    // or open Maincard
  const [mainCardOpen, setMainCardOpen] = useState(false);
  return (
    <>
      <Subheader />
      <div className="container">
        {cards.map((card, key) => (
          <Card
            key={key}
            card={card}
            setCardFormOpen={setCardFormOpen}
            setMainCardOpen={setMainCardOpen}
            setCardId={setCardId}
          />
        ))}
      </div>
      <CardForm
        operationType="edit"
        cardId={cardId}
        cardFormOpen={cardFormOpen}
        setCardFormOpen={setCardFormOpen}
      />
      <Maincard
        cards={cards}
        cardId={cardId}
        mainCardOpen={mainCardOpen}
        setMainCardOpen={setMainCardOpen}
      />
    </>
  );
};

export default CardsList;
