import CardsView from "components/CardsView";
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
    <CardsView
      loading={loading}
      error={error}
    />
  );
};

export default Home;