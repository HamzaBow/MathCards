import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/system/Box";
import { CollectionCardsView } from "components/CardsView";
import Header from "components/header/Header";
import { CardsActions, useUpdateCards } from "contexts/CardsContext";
import { Collection, useUser } from "contexts/UserContext";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router";


interface Props {
  title: string;
  cardsIds: string[];
}

const CollectionViewInner: React.FC<Props> = ({ title, cardsIds }) => {
  const cardsDispatch = useUpdateCards();

  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();
  const { loading, error, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/cards?cardsids=${cardsIds?.join(',')}`,
    {},
    [params.id]
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
      {data instanceof Array && data.length === 0 ? (
        <EmptyCollectionView />
      ) : (
        <CollectionCardsView collectionTitle={title} loading={loading} error={error} />
      )}
    </>
  );
};

const EmptyCollectionView: React.FC = () => {
  const cardsDispatch = useUpdateCards();
  cardsDispatch({
    type: CardsActions.ResetCard
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
  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();
  const collections = user?.collections?.filter(
    (col: Collection) => col._id === params.id)

  return (
    <>
      {user.collections !== undefined &&
      collections !== undefined &&
      collections.length === 1 &&
      collections[0].cardsIds !== undefined &&
      collections[0].cardsIds.length > 0 ? (
        <CollectionViewInner title={collections[0].title} cardsIds={collections[0].cardsIds as string[]} />
      ) : (
        <EmptyCollectionView />
      )}
    </>
  );
}

export default CollectionView;
