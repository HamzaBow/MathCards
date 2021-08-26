import React, { useState, useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

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

  useEffect(() => {
    if(display.cardForm && display.mainCard){
      throw new Error('display.cardForm and display.mainCard cannot be both true.')
    }
  }, [display])

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/cards");
    const data = await res.json();
    return data;
  };


  return (
    <div className="App" >
      <ThemeProvider>
        <Header />
        <Main setDisplay={setDisplay} cards={cards} dispatch={dispatch}/>
        <Footer />

          {(display.mainCard && !display.cardForm) && 
              <Maincard chosenCard={chosenCard} setDisplay={setDisplay} />}

          {(!display.mainCard && display.cardForm) &&
              <CardForm setDisplay={setDisplay} />}

      </ThemeProvider>
    </div>
  );
}

export default App;
