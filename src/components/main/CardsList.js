import Card from "./Card";

const CardsList = ({ cards, dispatch }) => {
  // TODO: the container should have no visible style (except probably for margins, etc. ) to make the app style and layout SIMPLER
  //       White background (for white theme) all the way to the left & right edges of the viewport.
  return (
    <div className="container">
      {cards.map((card, key) => (
        <Card key={key} card={card} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default CardsList;
