import React, { useState, useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

import Maincard from "./components/main/Maincard";
import CardForm from "./components/main/CardForm";

import { ACTIONS } from "./Constants";
import { ThemeProvider } from "./ThemeContext";

import { BrowserRouter as Router, Route } from "react-router-dom";


export const ThemeContext = React.createContext();

function App() {
  //*-------------------------------- States --------------------------------*
  const [cards, cardsDispatch] = useReducer(cardsReducer, []);

  //*------------------------------------------------------------------------*

  function cardsReducer(cards, action) {
    switch (action.type) {
      case ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      //------------------------
      default:
        return cards;
    }
  }

  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards();
      cardsDispatch({ type: ACTIONS.FETCH_CARDS, payload: { cards: cardsFromServer } });
    };
    getCards();
  }, []);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/cards");
    const data = await res.json();
    return data;
  };


  return (
    <Router>
      <Route path='/' >

          <div className="App">
            <ThemeProvider>
              <Header />
              <Main cardsDispatch={cardsDispatch} />
              
              <Route path='/maincard/:id' >
                <Maincard cards={cards} />
              </Route>
             
              <Route path="/cardform" component={CardForm} />
             
              <Footer />
            </ThemeProvider>
          </div>

      </Route>
    </Router>
  );
}

export default App;
