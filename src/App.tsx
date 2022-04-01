import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "components/utilities/PrivateRoute";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "pages/home"
import CollectionView from "pages/CollectionView";
import UserCardsView from "pages/UserCardsView";

import Signup from "components/authentication/Signup";
import Login from "components/authentication/Login";
import ForgotPassword from "components/authentication/ForgotPassword";
import CardsSearchView from "pages/CardsSearchView";
import EmailNotVerifiedPage from "components/authentication/EmailNotVerifiedPage";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />

          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>

          <PrivateRoute exact path="/search">
            <CardsSearchView />
          </PrivateRoute>

          <PrivateRoute exact path="/collection/:id">
            <CollectionView />
          </PrivateRoute>

          <PrivateRoute exact path="/user_cards">
            <UserCardsView />
          </PrivateRoute>

          {/* <PrivateRoute exact path="/email-not-verified">
            <EmailNotVerifiedPage />
          </PrivateRoute> */}

          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />

          <Route path="/email-not-verified" component={EmailNotVerifiedPage} />
      </div>
    </Router>
  );
}

export default App;
