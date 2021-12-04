import CardsView from "components/CardsView";
import { CARDS_ACTIONS } from "Constants";
import { useUpdateCards } from "contexts/CardsContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const cardsDispatch = useUpdateCards();

  const { loading, error, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/cards`,
    {},
    []
  );

  useEffect(() => {
    if (data === undefined) return;
    cardsDispatch({
      type: CARDS_ACTIONS.FETCH_CARDS,
      payload: { cards: data },
    });
  }, [data]);

  return (
    <CardsView
      loading={loading}
      error={error}
    />
  );
};

export default Home;