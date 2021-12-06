import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/system/Box";
import CardsView from "components/CardsView";
import Header from "components/header/Header";
import { CARDS_ACTIONS } from "Constants";
import { useUpdateCards } from "contexts/CardsContext";
import { Collection, useUser } from "contexts/UserContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const CollectionViewInner: React.FC = () => {
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

const EmptyCollectionView: React.FC = () => {
  const cardsDispatch = useUpdateCards();
  cardsDispatch({
    type: CARDS_ACTIONS.RESET_CARDS
  })
  return (
    <>
      <Header />
      <Box sx={{ display: "grid", placeItems: "center", height: "70vh" }}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ display: "inline-flex" }}
        >
          <AlertTitle>Collection is empty</AlertTitle>
          This collection doesn't contain any cards
        </Alert>
      </Box>
    </>
  )
}

const CollectionView: React.FC = () => {
  const user = useUser();
  return (
    <>
      { user.collections !== undefined &&
         user.collections.length !== 0 ? (
           <CollectionViewInner />
         )
         :
           <EmptyCollectionView />
      }
    </>
  );
}

export default CollectionView;
