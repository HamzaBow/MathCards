import Card from "./Card";

const CardsList = ({
  cards,
  setShowAll,
  setFrontIsShown,
  setChosenCardId,
  setDarkBgActive,
  setMainCardActive,
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
          setMainCardActive={setMainCardActive}
          cards={cards}
        />
      ))}
    </div>
  );
};

export default CardsList;
