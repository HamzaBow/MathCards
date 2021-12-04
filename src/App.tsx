import { useState } from "react";
import Signup from "components/authentication/Signup";
import Login from "components/authentication/Login";
import ForgotPassword from "components/authentication/ForgotPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "pages/home"
import CollectionView from "pages/collection";
import UserCardsView from "pages/user-cards";

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
  const [cardsType, setCardsType] = useState(CardsType.AllCards);
  const [collectionId, setCollectionId] = useState("");
  return (
    <Router>
      <div className="App">
        <CssBaseline />
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/collection/:id">
            <CollectionView />
          </Route>

          <Route exact path="/user_cards">
            <UserCardsView />
          </Route>

          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    </Router>
  );
}

export default App;
