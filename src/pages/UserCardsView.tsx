import CardsView from "components/CardsView";
import { CardsActions, useUpdateCards } from "contexts/CardsContext";
import { useUser } from "contexts/UserContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";

const UserCardsViewInner: React.FC = () => {
  const cardsDispatch = useUpdateCards();
  const user = useUser();

  const { loading, error, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/cards?userid=${user._id}`,
    {},
    []
  );

  useEffect(() => {
    if (data === undefined || user._id === "") return;
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

const UserCardsView: React.FC = () => {
  const user = useUser();
  return <>{user._id !== "" && <UserCardsViewInner />}</>;
}

export default UserCardsView;