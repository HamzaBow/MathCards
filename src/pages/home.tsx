import CardsView from "components/CardsView";
import { CardsActions, useUpdateCards } from "contexts/CardsContext";
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
      type: CardsActions.FetchCards,
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
