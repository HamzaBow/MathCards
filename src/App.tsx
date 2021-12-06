import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "components/utilities/PrivateRoute";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "pages/home"
import CollectionView from "pages/CollectionView";
import UserCardsView from "pages/UserCardsView";

import Signup from "components/authentication/Signup";
import Login from "components/authentication/Login";
import ForgotPassword from "components/authentication/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />

          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>

          <Route exact path="/search">
            <Home />
          </Route>

          <PrivateRoute exact path="/collection/:id">
            <CollectionView />
          </PrivateRoute>

          <PrivateRoute exact path="/user_cards">
            <UserCardsView />
          </PrivateRoute>

          <Route path="/signup" component={Signup} />

          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    </Router>
  );
}

export default App;
