import React, { useEffect } from "react";
import CardsList from "./CardsList";
import { Redirect } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import { CardInterface } from '../cardform/CardForm'

import { Action, CardsType } from "App"
import { useParams } from "react-router-dom";

// this is used only for test purposes
import { useSnackbar } from "contexts/SnackbarContext"

interface Props {
  cards: CardInterface[];
  cardsDispatch: React.Dispatch<Action>;
  setCardsType: Function;
  setCollectionId?: Function;
}

const Main : React.FC<Props> = ({ cards, cardsDispatch, setCardsType, setCollectionId }) => {

  // this is used only for test purposes
  const displaySnackbar = useSnackbar()

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
          {/* this is used only for test purposes*/}
          <button onClick={() => displaySnackbar("success", "This is a success")}>success</button>
          <button onClick={() => displaySnackbar("info", "This is an info")}>info</button>
          <button onClick={() => displaySnackbar("warning", "This is a warning")}>warning</button>
          <button onClick={() => displaySnackbar("error", "This is an error")}>error</button>
        </>
        :
        <Redirect to='/login' />
      }
    </main>
  );
};

export default Main;
