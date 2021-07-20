import Footer from "./components/Footer"
import Header from "./components/Header"
import CardsList from "./components/main/CardsList"
import Navbar from "./components/Navbar"
import NewCardButton from "./components/NewCardButton"

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <NewCardButton />
      <CardsList />
      <NewCardButton />
      <Footer/>
    </div>
  );
}

export default App;

