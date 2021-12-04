import { User } from "@firebase/auth";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { CardsType } from "App";
import React from "react";
import { Redirect } from "react-router";
import Header from "./header/Header";
import Main from "./main/Main";

interface Props {
  currentUser: User | null;
  loading: boolean;
  error: Error | undefined;
}

const CardsView: React.FC<Props> = ({
  currentUser,
  loading,
  error,
}) => {
  return (
    <>
      {currentUser ? (
        <>
          <Header />
          {loading ? (
            <LinearProgress />
          ) : error ? (
            <FetchError />
          ) : (
            <>
              <Main />
            </>
          )}
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

function FetchError() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "70vh" }}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ display: "inline-flex" }}
      >
        <AlertTitle>Sorry!</AlertTitle>
        Data couldn't be fetched from the server.
      </Alert>
    </Box>
  );
}

export default CardsView;
