import Card from "./Card";

const CardsList = ({
  cards,
  setShowAll,
  setFrontIsShown,
  setChosenCardId,
  setDarkBgActive,
}) => {
  return (
    <div className="container">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          setShowAll={setShowAll}
          setFrontIsShown={setFrontIsShown}
          setChosenCardId={setChosenCardId}
          setDarkBgActive={setDarkBgActive}
          cards={cards}
        />
      ))}
    </div>
  );
};

export default CardsList;
