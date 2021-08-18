import { useState, useEffect, useReducer } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CardsList from "./components/main/CardsList";
import DarkUnderlay from "./components/main/DarkUnderlay";
import Maincard from "./components/main/Maincard";
import CardForm from "./components/main/CardForm";
import Navbar from "./components/Navbar";
import NewCardButton from "./components/NewCardButton";

// TODO: to toggle Dark/Light theme, use useContext, themeContext = react.createContext()
// TODO: find where hooks (useMemo, useCallback, useReducer, custom hooks) can be used to
// TODO: improve performance and make the code cleaner.
// TODO: make cards scrollable (horizontally and vertically) if overflown
// TODO: or just make text and math fields schrollable

// TODO: Put components "DarkUnderlay", "NewCardForm" and "Maincard" inside an if statement within JSX
// TODO: and when showAllCards=true (e.g. clicking on darkBackGr), Remove components from the DOM, not just hide them (unless it effects performance.)
// the above TODO probably shouldn't be implemented, because it would likely effect performance.
// TODO: Add a CHANGELOG.md file
// TODO: Start using git branches when working on a separate features
// TODO: Start using git tags (semantic versionning)
// TODO: git stash
// TODO: start pushing changes to github
// TODO: remove old junk commits, 
// TODO: first commit should be the one where the code is clean enough (most junk removed)
// TODO: change the code to TypeScript in all components.
// TODO: propTypes. // probably not if using typescript
// TODO: transitions effects when showing or hiding MainCard or NewCardForm;

export const ACTIONS = {
  FETCH_CARDS: "FETCH_CARDS",
  SET_MAIN_CARD: "SET_MAIN_CARD",
  ADD_TO_COLLECTION: "ADD_TO_COLLECTION",
  SET_TAGS: "SET_TAGS",
  SET_DIFFICULTIES: "SET_DIFFICULTIES"
}

function App() {

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
  console.log("cards", cards);

  return (
    <div className="App" >
      <Header />
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
    </div>
  );
}

export default App;
