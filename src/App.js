import React, { useEffect, useReducer } from "react";

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

import Maincard from "./components/main/Maincard";
import CardForm from "./components/cardform/CardForm";

import { CARDS_ACTIONS } from "./Constants";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import AuthProvider, { useAuth } from "./contexts/AuthContext";
import Login from "./components/authentication/Login";

import { useHistory, Redirect } from "react-router-dom";
import ForgotPassword from "./components/authentication/ForgotPassword";

function App() {
  // ----------------------------- CARDS -----------------------------

  function cardsReducer(cards, action) {
    switch (action.type) {
      case CARDS_ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      //---------------------------------
      case CARDS_ACTIONS.NEW_CARD:
        return [...cards, action.payload.card];
      //---------------------------------
      case CARDS_ACTIONS.REMOVE_CARD:
        return cards.filter((card) => card.id !== action.payload.id);
      //---------------------------------
      case CARDS_ACTIONS.UPDATE_CARD:
        return cards.map((card) => {
          if (card.id === action.payload.data.id) {
            return action.payload.data;
          }
          return card;
        });
      //---------------------------------
      default:
        return cards;
    }
  }

  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  // --------------------------- END CARDS ---------------------------

  const { currentUser } = useAuth() || { currentUser: undefined };
  // *********************************************************************
  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards();
      cardsDispatch({
        type: CARDS_ACTIONS.FETCH_CARDS,
        payload: { cards: cardsFromServer },
      });
    };
    getCards();
    console.log("currentUser", currentUser);
  }, []);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/cards");
    const data = await res.json();
    return data;
  };
  // *********************************************************************

  const history = useHistory();

  return (
    <Router>
      <div className="App">
        <ThemeProvider>
          <UserProvider>
            <AuthProvider>

              {currentUser ?
                <Redirect to='/' />
                :
                <Redirect to='/signup' />
              }

              <Route exact path='/' >
                <Header />
                <Main cards={cards} cardsDispatch={cardsDispatch} />
              </Route>

              <Route path="/maincard/:id">
                <Main cards={cards} cardsDispatch={cardsDispatch} />
                <Maincard cards={cards} />{" "}
                {/* --------------------------------------------  Maincard */}
              </Route>

              <Route path="/cardform/new">
                <Main cards={cards} cardsDispatch={cardsDispatch} />
                <CardForm
                  operationType="create"
                  cardsDispatch={cardsDispatch}
                />{" "}
                {/* ----  CardForm */}
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

              {/* <Footer /> */}
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
