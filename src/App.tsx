import React, { useEffect, useReducer, useState } from "react";

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

import CssBaseline from "@mui/material/CssBaseline";

import { CardInterface } from "components/cardform/CardForm";
import { fetchCardsForUser, fetchCardsFromCardsIds } from "api/cardAPI";
import { useUser } from "contexts/UserContext";
import Subheader from "components/Subheader";

export enum CardsType {
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
  // @ts-ignore
  const [cardsType, setCardsType] = useState(CardsType.UserCards)
  const [collectionId, setCollectionId] = useState("")

  useEffect(() => {
    // @ts-ignore
    if(user._id === "") return
    const getCards = async () => {
      // @ts-ignore
      let cardsFromServer
      if (cardsType === CardsType.UserCards) {
      // @ts-ignore
        cardsFromServer = await fetchCardsForUser(user._id);
      }
      if (cardsType === CardsType.CollectionCards) {
        // @ts-ignore
        if (user.collections.length !== 0) {
          if ( collectionId === ""){
            throw new Error("collection id must be specified")
          }
          // @ts-ignore
          const cardsIds = user?.collections?.filter((col) => col._id === collectionId)?.[0]?.cardsIds
          if (cardsIds === undefined){
            throw new Error("collection doesn't exist")
          }
          cardsFromServer = await fetchCardsFromCardsIds(cardsIds)
        } else {
          cardsFromServer = []
        }
      }
      cardsDispatch({
        type: CARDS_ACTIONS.FETCH_CARDS,
        payload: { cards: cardsFromServer },
      });
    };
    getCards();
    // @ts-ignore
  }, [ user._id, cardsType, collectionId, user ]);

  // *********************************************************************

  function CardsDisplay(){
    return (
      <>
        <Subheader />
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
        <Header cardsDispatch={cardsDispatch} />

        <div id="displayCardRoutes">
          <Route exact path="/">
            {currentUser ?
              <CardsDisplay />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route exact path="/collection/:id">
            {/* { setCardsType(CardsType.CollectionCards)} */}
            {currentUser ? (
              <CardsDisplay />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route path="/maincard/:id">
            <Maincard cards={cards} />{" "}
            {/* --------------------------------------------  Maincard */}
          </Route>

          <Route path="/cardform/new">
            <CardsDisplay />
            <CardForm operationType="create" cardsDispatch={cardsDispatch} />
          </Route>

          <Route path="/cardform/edit/:id">
            <CardsDisplay />
            <CardForm
              operationType="edit"
              cards={cards}
              cardsDispatch={cardsDispatch}
            />{" "}
            {/* ----  CardForm */}
          </Route>
        </div>

        <div id="authRoutes">
          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />
        </div>
      </div>
    </Router>
  );
}

export default App;
