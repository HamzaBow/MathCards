import React, { useState, useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

import DarkUnderlay from "./components/main/DarkUnderlay";
import Maincard from "./components/main/Maincard";
import CardForm from "./components/main/CardForm";

import { ACTIONS } from "./Constants";
import { ThemeProvider } from "./ThemeContext";

export const ThemeContext = React.createContext();

function App() {
  //*-------------------------------- States --------------------------------*
  const [display, setDisplay] = useState({
    mainCard: false,
    cardForm: false,
  });
  const [chosenCard, setChosenCard] = useState(false);
  const [cards, dispatch] = useReducer(reducer, [])
  //*------------------------------------------------------------------------*

  function reducer(cards, action) {
    switch (action.type) {
      case ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      //------------------------
      case ACTIONS.SET_MAIN_CARD:
        setChosenCard(cards.filter((card) => card.id === action.payload.cardId)[0]);
        setDisplay({ mainCard: true, cardForm: false })
        return cards;
      //------------------------
      default:
        return cards;
    }
  }

  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards();
      dispatch({ type: ACTIONS.FETCH_CARDS, payload: { cards: cardsFromServer } });
    };
    getCards();
  }, []);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/cards");
    const data = await res.json();
    return data;
  };

  const conditionnallyRender = (display) => {
          if (display.mainCard && !display.cardForm) {
            return (
              <>
                <DarkUnderlay display={display} setDisplay={setDisplay} />
                <Maincard chosenCard={chosenCard} />
              </>
            )
          }

          if (!display.mainCard && display.cardForm) {
            return (
              <>
                <DarkUnderlay display={display} setDisplay={setDisplay} />
                <CardForm />
              </>
            )
          }

          if (display.mainCard && display.cardForm) {
            throw new Error("display.mainCard and display.cardForm can't be both true")
          }


  }

  return (
    <div className="App" >
      <ThemeProvider>
        <Header />
        <Main setDisplay={setDisplay} cards={cards} dispatch={dispatch}/>
        <Footer />
        {conditionnallyRender(display)}
      </ThemeProvider>
    </div>
  );
}

export default App;
