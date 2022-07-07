import { Breadcrumbs, Link, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

interface collectionCardsViewProps {
  collectionTitle: string;
  loading: boolean;
  error: Error | undefined;
}

export const CollectionCardsView: React.FC<collectionCardsViewProps> = ({
  collectionTitle,
  loading,
  error,
}) => {
  const BC = (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 3, ml: 5 }}>
      {/* <Link underline="hover" color="inherit"> */}
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Collections
        </Link>
      {/* </Link> */}
      <Typography color="text.primary">{collectionTitle}</Typography>
    </Breadcrumbs>
  )
  return (
    <>
      <Header />
      {loading ? (
        <>
          <LinearProgress />
          {BC}
          <CardsSkeleton />
        </>
      ) : error ? (
        <FetchError />
      ) : (
        <>
          {BC }
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
