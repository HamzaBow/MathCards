import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "contexts/AuthContext";
import ThemeProvider from "contexts/ThemeContext";
import UserProvider from "contexts/UserContext";
import { StyledEngineProvider } from "@mui/material/styles";
import SnackbarProvider from "contexts/SnackbarContext";
import CardsProvider from "contexts/CardsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <UserProvider>
            <CardsProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
            </CardsProvider>
          </UserProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
