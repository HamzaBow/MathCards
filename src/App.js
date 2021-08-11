import { useState, useEffect } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import CardsList from "./components/main/CardsList"
import DarkBackGr from "./components/main/DarkBackGr"
import Maincard from "./components/main/Maincard"
import NewCardForm from "./components/main/NewCardForm"
import Navbar from "./components/Navbar"
import NewCardButton from "./components/NewCardButton"
// import { cardToRotate } from "./components/main/Maincard"

function App() {
  const [showAll, setShowAll] = useState(true);
  const [frontIsShown, setFrontIsShown] = useState(true);
  const [chosenCardId, setChosenCardId] = useState("1");
  const [cards, setCards] = useState([]);
  const [darkBgActive, setDarkBgActive] = useState(false);
  const [mainCardActive, setMainCardActive] = useState(false);
  const [cardFormActive, setCardFormActive] = useState(false);

  useEffect(() => {
    const getCards = async () => {
      const cardsFromServer = await fetchCards();
      setCards(cardsFromServer);
    }

    getCards();

  }, [])

  const fetchCards = async () => {
    const res = await fetch('http://localhost:5000/cards');
    const data = await res.json();
    return data;
  }


  const flipMainCard = () => {
    if (frontIsShown) {
      document.querySelector("#opened-card .card").style.transform = "rotateY(180deg)";
      setFrontIsShown(false);
    } else {

      document.querySelector("#opened-card .card").style.transform = "rotateY(0deg)";

      setFrontIsShown(true);
    }
  };


  const showAllCards = () => {
    setShowAll(true);
    setCardFormActive(false)
    setMainCardActive(false);
    setDarkBgActive(false);
  };

  const handleKeyPress = (event) => {

    if (event.key === " ") {
      event.preventDefault(); // prevent scroll after pressing space, and flip the card instead.
      if (!showAll) {
        flipMainCard();
      }
    }

  }


  return (
    <div className="App" onKeyPress={handleKeyPress} tabIndex={0} >
      <Header />
      <Navbar />
      <NewCardButton setShowAll={setShowAll} setDarkBgActive={setDarkBgActive} setCardFormActive={setCardFormActive} />
      <CardsList cards={cards} setShowAll={setShowAll} setFrontIsShown={setFrontIsShown} setChosenCardId={setChosenCardId} setDarkBgActive={setDarkBgActive} setMainCardActive={setMainCardActive} />
      <NewCardButton setShowAll={setShowAll} setDarkBgActive={setDarkBgActive} setCardFormActive={setCardFormActive} />
      <Footer />

      <DarkBackGr darkBgActive={darkBgActive} showAllCards={showAllCards} />
      <Maincard cards={cards} chosenCardId={chosenCardId} flipMainCard={flipMainCard} mainCardActive={mainCardActive} />
      <NewCardForm cardFormActive={cardFormActive} />
    </div>
  );
}

export default App;

