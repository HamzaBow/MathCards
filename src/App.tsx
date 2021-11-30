import React, { useEffect, useReducer, useState } from "react";
import Header from "components/header/Header";
import Main from "components/main/Main";
import Maincard from "components/main/Maincard";
import { CARDS_ACTIONS } from "Constants";
import { useAuth } from "contexts/AuthContext";
import Signup from "components/authentication/Signup";
import Login from "components/authentication/Login";
import ForgotPassword from "components/authentication/ForgotPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { CardInterface } from "components/cardform/CardForm";
import {
  fetchAllCards,
  fetchCardsForUser,
  fetchCardsFromCardsIds,
} from "api/cardAPI";
import { Collection, useUser } from "contexts/UserContext";

export enum CardsType {
  AllCards,
  UserCards,
  CollectionCards,
}

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
        return [];
      default:
        return cards;
    }
  }

  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  // --------------------------- END CARDS ---------------------------

  const { currentUser } = useAuth();

  const user = useUser();
  // *********************************************************************
  const [cardsType, setCardsType] = useState(CardsType.AllCards);
  const [collectionId, setCollectionId] = useState("");

  useEffect(() => {
    if (user._id === "") return;
    const getCards = async () => {
      let cardsFromServer;
      if (cardsType === CardsType.AllCards) {
        cardsFromServer = await fetchAllCards();
      }
      if (cardsType === CardsType.UserCards) {
        cardsFromServer = await fetchCardsForUser(user._id);
      }
      if (cardsType === CardsType.CollectionCards) {
        if (user.collections.length !== 0) {
          if (collectionId === "") {
            throw new Error("collection id must be specified");
          }
          const cardsIds = user?.collections?.filter(
            (col: Collection) => col._id === collectionId
          )?.[0]?.cardsIds;
          if (cardsIds === undefined) {
            throw new Error("collection doesn't exist");
          }
          cardsFromServer = await fetchCardsFromCardsIds(cardsIds);
        } else {
          cardsFromServer = [];
        }
      }
      cardsDispatch({
        type: CARDS_ACTIONS.FETCH_CARDS,
        payload: { cards: cardsFromServer },
      });
    };
    getCards();
  }, [user._id, cardsType, collectionId, user]);

  // *********************************************************************

  function CardsDisplay() {
    return (
      <>
        <Header cardsDispatch={cardsDispatch} />
        <Main
          cards={cards}
          cardsDispatch={cardsDispatch}
          setCardsType={setCardsType}
          setCollectionId={setCollectionId}
        />
      </>
    );
  }
  return (
    <Router>
      <div className="App">
        <CssBaseline />
          <Route exact path="/">
            {currentUser ? <CardsDisplay /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/collection/:id">
            {currentUser ? <CardsDisplay /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/my_cards">
            {currentUser ? <CardsDisplay /> : <Redirect to="/login" />}
          </Route>

          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    </Router>
  );
}

export default App;
