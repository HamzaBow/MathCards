import React, { useState, useEffect, useReducer } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CardsList from "./components/main/CardsList";
import DarkUnderlay from "./components/main/DarkUnderlay";
import Maincard from "./components/main/Maincard";
import CardForm from "./components/main/CardForm";
import Navbar from "./components/Navbar";
import NewCardButton from "./components/NewCardButton";

import { ACTIONS } from "./Constants";

export const ThemeContext = React.createContext();

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  const [display, setDisplay] = useState({
    mainCard: false,
    cardForm: false,
  });

  const [chosenCard, setChosenCard] = useState(false);

  function reducer(cards, action) {
    switch (action.type) {
      case ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      case ACTIONS.SET_MAIN_CARD:
        setChosenCard(cards.filter((card) => card.id === action.payload.cardId)[0]);
        setDisplay({ mainCard: true, cardForm: false })
        return cards;
      default:
        return cards;
    }
  }

  const [cards, dispatch] = useReducer(reducer, [])

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

  return (
    <div className="App" >
      <ThemeContext.Provider value={darkTheme}>
        <Header toggleTheme={toggleTheme} />
        <div>
        </div>
        <Navbar />
        <NewCardButton setDisplay={setDisplay} />
        <CardsList cards={cards} dispatch={dispatch} />
        <NewCardButton setDisplay={setDisplay} />
        <Footer />

        {(() => {
          if (display.mainCard) {
            if (display.cardForm) {
              // TODO: cutomise this error, e.g. throw new ValuesConflictError("...")
              throw new Error("display.mainCard and display.cardForm can't be both true")
            }
            else {
              return (
                <>
                  <DarkUnderlay display={display} setDisplay={setDisplay} />
                  <Maincard chosenCard={chosenCard} />
                </>
              )
            }
          }
          else {
            if (display.cardForm) {
              return (
                <>
                  {/* TODO: rename newCardForm to CardForm */}
                  <DarkUnderlay display={display} setDisplay={setDisplay} />
                  <CardForm />
                </>
              )
            }
          }
        }
        )()}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
