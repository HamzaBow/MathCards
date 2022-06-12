import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { FetchError } from "components/CardsView";
// import CardsView  from "components/CardsView";
import Header from "components/header/Header";
import CardsSkeleton from "components/main/CardsSkeleton";
import Main from "components/main/Main";
import { CardsActions, useUpdateCards } from "contexts/CardsContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

const Home: React.FC = () => {
  const { search } = useLocation();
  const searchParams = new window.URLSearchParams(search);
  const cardsDispatch = useUpdateCards();
  const searchQuery = searchParams.get("q") || ""

  const { loading, error, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/cards?q=${searchQuery}`,
    {},
    [searchQuery]
  );

  useEffect(() => {
    if (data === undefined) return;
    cardsDispatch({
      type: CardsActions.FetchCards,
      payload: { cards: data },
    });
  }, [data]);

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
      ) : data?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            height: "50vh",
          }}
        >
          <Typography variant="h5" component="h2" textAlign="center">
            No results found
          </Typography>
          <Typography variant="subtitle1" component="h3" textAlign="center">
            Try different keywords
          </Typography>
        </Box>
      ) : (
        <>
          <Main />
        </>
      )}
    </>
  );
};

export default Home;