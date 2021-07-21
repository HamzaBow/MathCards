import Card from "./Card";

const CardsList = ({ cards, setShowAll, setFrontIsShown }) => {
  return (
    <div className="container">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          setShowAll={setShowAll}
          setFrontIsShown={setFrontIsShown}
          cards={cards}
        />
      ))}
    </div>
  );
};

export default CardsList;
