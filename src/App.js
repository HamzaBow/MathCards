import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import CardsList from "./components/main/CardsList"
import DarkBackGr from "./components/main/DarkBackGr"
import Maincard from "./components/main/Maincard"
import NewCardForm from "./components/main/NewCardForm"
import Navbar from "./components/Navbar"
import NewCardButton from "./components/NewCardButton"

function App() {
  const [showAll, setShowAll] = useState(true);
  const [frontIsShown, setFrontIsShown] = useState(true);
  const [chosenCardId, setChosenCardId] = useState(1);
  const [cards, setCards] = useState([
    {
      id: 1,
      front: {
        question: "What is the solution to the quadratic Equation?",
        formula: "ax^2+bx+c=0",
      },
      back: {
        formula: "x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}",
        comment: ""
      },
    },
    {
      id: 2,
      front: {
        question: "Solve this DE",
        formula: "\\frac{d^2y}{dt} = -\\omega^2 y",
      },
      back: {
        formula: "y = C_1 \\cos(\\omega t + \\phi) + C_2  \\sin(\\omega t + \\phi)",
        comment: ""
      },
    },
  ])


  const flipMainCard = () => {
    if (frontIsShown == true) {
      document.getElementById("opened-card").childNodes[0].style =
        "transform: rotateY(180deg);";
      setFrontIsShown(false);
    } else {
      document.getElementById("opened-card").childNodes[0].style =
        "transform: rotateY(0deg);";
      setFrontIsShown(true);
    }
  };


  const showAllCards = () => {
    setShowAll(true);
    document.getElementById("new-card-form").style =
      "visibility: hidden; opacity: 0;";
    document.getElementById("opened-card").style =
      "visibility: hidden; opacity: 0;";
    document.getElementById("dark-backgr").style =
      "visibility: hidden; opacity: 0;";
  };

  const handleKeyPress = (event) => {

    if (event.key == " ") {
      if (showAll == false) {
        flipMainCard();
      }
    }

  }


  return (
    <div className="App" onKeyPress={handleKeyPress} tabIndex={0} >
      <Header />
      <Navbar />
      <NewCardButton setShowAll={setShowAll} />
      <CardsList cards={cards} setShowAll={setShowAll} setFrontIsShown={setFrontIsShown} setChosenCardId={setChosenCardId} />
      <NewCardButton setShowAll={setShowAll} />
      <Footer />

      <DarkBackGr showAllCards={showAllCards} />
      <Maincard flipMainCard={flipMainCard} chosenCardId={chosenCardId} cards={cards} />
      <NewCardForm />
    </div>
  );
}

export default App;

