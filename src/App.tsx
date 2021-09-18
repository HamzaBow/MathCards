import React, { useEffect, useReducer } from "react";

import Header from "./components/header/Header";
import Main from "./components/main/Main";

import Maincard from "./components/main/Maincard";
import CardForm from "./components/cardform/CardForm";

import { CARDS_ACTIONS } from "./Constants";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";

import AuthProvider, { useAuth } from "./contexts/AuthContext";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import ForgotPassword from "./components/authentication/ForgotPassword";
import useLocalStorage from "./hooks/useLocalStorage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { CardInterface } from "./components/cardform/CardForm";

export type Theme = "device-theme" | "light" | "dark" | "charcoal";

export interface Action {
  type: string;
  payload: any;
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [chosenTheme, setChosenTheme] = useLocalStorage(
    "theme",
    "device-theme"
  ) as [Theme, Function];

  const theme = React.useMemo(() => {
    switch (chosenTheme) {
      case "light":
        return createTheme({
          palette: {
            type: "light",
          },
        });
      case "dark":
        return createTheme({
          palette: {
            type: "dark",
          },
        });
      case "charcoal":
        return createTheme({
          palette: {
            type: "dark",
            background: {
              default: "#242729",
              paper: "#323638",
            },
          },
        });
      default:
        //devide-theme
        return createTheme({
          palette: {
            type: prefersDarkMode ? "dark" : "light",
          },
        });
    }
  }, [prefersDarkMode, chosenTheme]);
  // ----------------------------- CARDS -----------------------------

  interface Action {
    type: string;
    payload: any;
  }

  function cardsReducer(cards: CardInterface[], action: Action) {
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
  }, []);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/cards");
    const data = await res.json();
    return data;
  };
  // *********************************************************************

  return (
    <Router>
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider>
            <UserProvider>
              <AuthProvider>
                <Route exact path="/">
                  {currentUser ? (
                    <Redirect to="/" />
                  ) : (
                    <>
                      <Header
                        chosenTheme={chosenTheme}
                        setChosenTheme={setChosenTheme}
                      />
                      <Main cards={cards} cardsDispatch={cardsDispatch} />
                    </>
                  )}
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
                  />
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
        </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default App;
