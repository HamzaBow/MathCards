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
        formula: "d²y/dt = -w²y",
      },
      back: {
        formula: "y = C1 * cos(wt + phi) + C2 * sin(wt + phi)",
        comment: ""
      },
    },
  ])




  return (
    <div className="App">
      <Header />
      <Navbar />
      <NewCardButton />
      <CardsList cards={cards} setShowAll={setShowAll} setFrontIsShown={setFrontIsShown} />
      <NewCardButton />
      <Footer />

      <DarkBackGr setShowAll={setShowAll} />
      <Maincard frontIsShown={frontIsShown} setFrontIsShown={setFrontIsShown} />
      <NewCardForm />
    </div>
  );
}

export default App;

