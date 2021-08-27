import React from "react";
import NewCardButton from "../NewCardButton";
import CardsList from "./CardsList";

const Main = ({ cards, cardsDispatch}) => {
  return (
    <main>
      <NewCardButton />
      <CardsList cardsDispatch={cardsDispatch} />
    </main>
  );
};

export default Main;
