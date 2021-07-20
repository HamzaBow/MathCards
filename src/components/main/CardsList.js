import Card from "./Card";

const cards = [
  {
    font: {
      question: "What is the solution to the quadratic Equation?",
      formula: "ax²+bx+c=0",
    },
    back: {
      formula: "x = (-b±sqrt(b²-4ac)/2a",
    },
  },
];

const CardsList = () => {
  return (
    <div className="container">
      {cards.map((card) => (
        <Card front={card.font} back={card.back} />
      ))}
    </div>
  );
};

export default CardsList;
