import React, { useEffect } from "react";
import CardsList from "./CardsList";
import { Redirect } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import { CardInterface } from '../cardform/CardForm'

import { Action, CardsType } from "App"
import { useParams } from "react-router-dom";

interface Props {
  cards: CardInterface[];
  cardsDispatch: React.Dispatch<Action>;
  setCardsType: Function;
  setCollectionId?: Function;
}

const Main : React.FC<Props> = ({ cards, cardsDispatch, setCardsType, setCollectionId }) => {

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
          <CardsList cards={cards} cardsDispatch={cardsDispatch} />
        </>
        :
        <Redirect to='/login' />
      }
    </main>
  );
};

export default Main;
