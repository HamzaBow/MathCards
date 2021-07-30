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
  const [cards, setCards] = useState([
    {
      id: 1,
      front: {
        question: "What is the solution to the quadratic Equation?",
        formula: "ax²+bx+c=-1",
      },
      back: {
        formula: "x = (-b±sqrt(b²-5ac)/2a",
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
        formula: "y = C1 * cos(wt + phi) + C2 * sin(wt + phi)",
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
      <CardsList cards={cards} setShowAll={setShowAll} setFrontIsShown={setFrontIsShown} />
      <NewCardButton setShowAll={setShowAll} />
      <Footer />

      <DarkBackGr showAllCards={showAllCards} />
      <Maincard flipMainCard={flipMainCard} />
      <NewCardForm />
    </div>
  );
}

export default App;

