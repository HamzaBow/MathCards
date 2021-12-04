import Signup from "components/authentication/Signup";
import Login from "components/authentication/Login";
import ForgotPassword from "components/authentication/ForgotPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "pages/home"
import CollectionView from "pages/collection";
import UserCardsView from "pages/user-cards";
import PrivateRoute from "components/utilities/PrivateRoute";

export interface Action {
  type: string;
  payload?: any;
}
function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>

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
