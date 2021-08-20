import React from "react";
import NewCardButton from "../NewCardButton";
import CardsList from "./CardsList";

const Main = ({ setDisplay, cards, dispatch}) => {
  return (
    <main>
      <NewCardButton setDisplay={setDisplay} />
      <CardsList cards={cards} dispatch={dispatch} />
    </main>
  );
};

export default Main;
