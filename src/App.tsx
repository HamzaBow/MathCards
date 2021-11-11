import React, { useEffect, useReducer } from "react";

import Header from "components/header/Header";
import Main from "components/main/Main";

import Maincard from "components/main/Maincard";
import CardForm from "components/cardform/CardForm";

import { CARDS_ACTIONS } from "Constants";
import { useAuth } from "contexts/AuthContext";
import Signup from "components/authentication/Signup";
import Login from "components/authentication/Login";
import ForgotPassword from "components/authentication/ForgotPassword";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import { CardInterface } from "components/cardform/CardForm";
import { fetchCardsForUser } from "api/cardAPI";
import { useUser } from "contexts/UserContext";

export type Theme = "device-theme" | "light" | "dark" | "charcoal";

export interface Action {
  type: string;
  payload?: any;
}
function App() {

  // ----------------------------- CARDS -----------------------------

  function cardsReducer(cards: CardInterface[], action: Action) {
    switch (action.type) {
      case CARDS_ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      //---------------------------------
      case CARDS_ACTIONS.NEW_CARD:
        return [...cards, action.payload.card];
      //---------------------------------
      case CARDS_ACTIONS.REMOVE_CARD:
        return cards.filter((card) => card._id !== action.payload.id);
      //---------------------------------
      case CARDS_ACTIONS.UPDATE_CARD:
        return cards.map((card) => {
          if (card._id === action.payload.card._id) {
            return action.payload.card;
          }
          return card;
        });
      //---------------------------------
      case CARDS_ACTIONS.RESET_CARDS:
        return []
      default:
        return cards;
    }
  }

  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  // --------------------------- END CARDS ---------------------------

  const { currentUser } = useAuth() || { currentUser: undefined };
  const user = useUser()
  // *********************************************************************

  useEffect(() => {
    // @ts-ignore
    if(user._id !== "") {
      const getCards = async () => {
        // @ts-ignore
        const cardsFromServer = await fetchCardsForUser(user._id);
        cardsDispatch({
          type: CARDS_ACTIONS.FETCH_CARDS,
          payload: { cards: cardsFromServer },
        });
      };
      getCards();
    }
  }, [ user ]);

  // *********************************************************************
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <Route exact path="/">
          {currentUser ? (
            <>
              <Header cardsDispatch={cardsDispatch} />
              <Main cards={cards} cardsDispatch={cardsDispatch} />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/maincard/:id">
          <Main cards={cards} cardsDispatch={cardsDispatch} />
          <Maincard cards={cards} />{" "}
          {/* --------------------------------------------  Maincard */}
        </Route>

        <Route path="/cardform/new">
          <Main cards={cards} cardsDispatch={cardsDispatch} />
          <CardForm operationType="create" cardsDispatch={cardsDispatch} />
        </Route>

        <Route path="/cardform/edit/:id">
          <Main cards={cards} cardsDispatch={cardsDispatch} />
          <CardForm
            operationType="edit"
            cards={cards}
            cardsDispatch={cardsDispatch}
          />{" "}
          {/* ----  CardForm */}
        </Route>

        <Route path="/signup" component={Signup} />

        <Route path="/login" component={Login} />

        <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    </Router>
  );
}

export default App;
