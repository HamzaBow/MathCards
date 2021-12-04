import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { CardsType } from "App";
import Header from "components/header/Header";
import Main from "components/main/Main";
import { CARDS_ACTIONS } from "Constants";
import { useAuth } from "contexts/AuthContext";
import { useUpdateCards } from "contexts/CardsContext";
import { useUser } from "contexts/UserContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { Redirect } from "react-router";

interface Props {
  setCardsType: React.Dispatch<React.SetStateAction<CardsType>>;
  setCollectionId: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<Props> = ({ setCardsType, setCollectionId }) => {
  const { currentUser } = useAuth();
  const cardsDispatch = useUpdateCards();
  const user = useUser();

  const { loading, error, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/cards`,
    {},
    []
  );

  useEffect(() => {
    if (data === undefined || user._id === "") return;
    cardsDispatch({
      type: CARDS_ACTIONS.FETCH_CARDS,
      payload: { cards: data },
    });
  }, [data]);

  return (
    <>
      {currentUser ? (
        <>
          <Header />
          {loading ? (
            <LinearProgress />
          ) : error ? (
            <Box sx={{display: "grid", placeItems: "center", height: "70vh"}}>
              <Alert variant="filled" severity="error" sx={{display: "inline-flex"}}>
                <AlertTitle>Sorry!</AlertTitle>
                Data couldn't be fetched from the server.
              </Alert>
            </Box>
          ) : (
            <>
              <Main
                setCardsType={setCardsType}
                setCollectionId={setCollectionId}
              />
            </>
          )}
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Home;
