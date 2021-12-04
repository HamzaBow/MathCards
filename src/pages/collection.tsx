import CardsView from "components/CardsView";
import { CARDS_ACTIONS } from "Constants";
import { useUpdateCards } from "contexts/CardsContext";
import { Collection, useUser } from "contexts/UserContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const CollectionView: React.FC = () => {
  const cardsDispatch = useUpdateCards();
  const user = useUser();

  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();
  const cardsIds = user?.collections?.filter(
    (col: Collection) => col._id === params.id)?.[0]?.cardsIds;
  if (cardsIds === undefined) {
    throw new Error("collection doesn't exist");
  }
  if (cardsIds.length === 0) {
    throw new Error("collection is empty");
  }
  const { loading, error, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/cards?cardsids=${cardsIds.join(',')}`,
    {},
    [params.id]
  );

  useEffect(() => {
    if (data === undefined || user._id === "") return;
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

export default CollectionView;
