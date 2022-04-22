import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import Header from "./header/Header";
import CardsSkeleton from "./main/CardsSkeleton";
import Main from "./main/Main";

interface Props {
  loading: boolean;
  error: Error | undefined;
}

const CardsView: React.FC<Props> = ({
  loading,
  error,
}) => {
  return (
    <>
      <Header />
      {loading ? (
        <>
          <LinearProgress />
          <CardsSkeleton />
        </>
      ) : error ? (
        <FetchError />
      ) : (
        <>
          <Main />
        </>
      )}
    </>
  );
};

export function FetchError() {
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
