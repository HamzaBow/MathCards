import React from "react";
import NewCardButton from "../NewCardButton";
import CardsList from "./CardsList";

const Main = ({ cards, dispatch}) => {
  return (
    <main>
      <NewCardButton />
      <CardsList cards={cards} dispatch={dispatch} />
    </main>
  );
};

export default Main;
