import React from "react";
import CardsList from "./CardsList";

const Main = ({ cards, cardsDispatch}) => {
  return (
    <main>
      <CardsList cards={cards} cardsDispatch={cardsDispatch} />
    </main>
  );
};

export default Main;
