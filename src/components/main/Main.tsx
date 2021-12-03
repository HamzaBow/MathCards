import React, { useEffect } from "react";
import CardsList from "./CardsList";
import { Redirect } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import { CardInterface } from '../cardform/CardForm'

import { Action, CardsType } from "App"
import { useParams } from "react-router-dom";
import { useCards, useUpdateCards } from "contexts/CardsContext";

interface Props {
  setCardsType: Function;
  setCollectionId?: Function;
}

const Main : React.FC<Props> = ({ setCardsType, setCollectionId }) => {

  const cards = useCards()
  const cardsDispatch = useUpdateCards();

  interface RouteParams {
    id: string;
  }
  const params = useParams<RouteParams>();


  useEffect(() => {

    if (window.location.pathname.startsWith("/collection/")) {
      if (setCollectionId !== undefined) {
        setCollectionId(params.id);
      } else {
        throw new Error("setCollectionId function is undefined");
      }
      
      if (setCardsType !== undefined) {
        setCardsType(CardsType.CollectionCards);
      } else {
        throw new Error("setCardsType function is undefined");
      }
    } else if (window.location.pathname.startsWith("/my_cards")) {
        setCardsType(CardsType.UserCards);
    } else {
      if (setCardsType !== undefined) {
      setCardsType(CardsType.AllCards)
      } else {
        throw new Error("setCardsType function is undefined");
      }
    }
  })

  const { currentUser } = useAuth() || { currentUser: undefined }
  return (
    <main>
      {currentUser ?
        <>
          <CardsList />
        </>
        :
        <Redirect to='/login' />
      }
    </main>
  );
};

export default Main;
