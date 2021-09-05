import React, { useEffect, useReducer } from "react";

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

import Maincard from "./components/main/Maincard";
import CardForm from "./components/cardform/CardForm";

import { CARDS_ACTIONS } from "./Constants";
import { ThemeProvider } from "./ThemeContext";

import { BrowserRouter as Router, Route } from "react-router-dom";


export const ThemeContext = React.createContext();

function App() {

  // ----------------------------- CARDS -----------------------------

  function cardsReducer(cards, action) {
    switch (action.type) {
      case CARDS_ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      //---------------------------------
      case CARDS_ACTIONS.NEW_CARD:
        return [...cards, action.payload.card]
      //---------------------------------
      case CARDS_ACTIONS.REMOVE_CARD:
        return cards.filter((card) => card.id !== action.payload.id)
      //---------------------------------
      case CARDS_ACTIONS.UPDATE_CARD:
        return cards.map((card) => {
          if(card.id === action.payload.data.id){
            return action.payload.data;
          }
          return card;
        })
      //---------------------------------
      default:
        return cards;
    }
  }

  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  // --------------------------- END CARDS ---------------------------

  

  // *********************************************************************
  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards();
      cardsDispatch({ type: CARDS_ACTIONS.FETCH_CARDS, payload: { cards: cardsFromServer } });
    };
    getCards();
  }, []);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/cards");
    const data = await res.json();
    return data;
  };
  // *********************************************************************


  return (
    <Router>
      <Route path='/' >

          <div className="App">
            <ThemeProvider>
              <Header />
              <Main cards={cards} cardsDispatch={cardsDispatch} />              

              <Route path='/maincard/:id' >
                <Maincard cards={cards} /> {/* --------------------------------------------  Maincard */}
              </Route>
             
              <Route path="/cardform/new" >
                <CardForm operationType="create" cardsDispatch={cardsDispatch} />  {/* ----  CardForm */}
              </Route>

              <Route path="/cardform/edit/:id" >
                <CardForm operationType="edit" cards={cards} cardsDispatch={cardsDispatch} />  {/* ----  CardForm */}
              </Route>

              <Footer />
            </ThemeProvider>
          </div>

      </Route>
    </Router>
  );
}

export default App;
