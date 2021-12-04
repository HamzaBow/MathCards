import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import { CardsType } from "App";
import CardsView from "components/CardsView";
import { CARDS_ACTIONS } from "Constants";
import { useAuth } from "contexts/AuthContext";
import { useUpdateCards } from "contexts/CardsContext";
import { useUser } from "contexts/UserContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";

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
    <CardsView currentUser={currentUser} loading={loading} error={error} setCardsType={setCardsType} setCollectionId={setCollectionId} />
  );
};

export default Home;
