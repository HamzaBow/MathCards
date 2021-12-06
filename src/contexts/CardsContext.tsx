import { CardInterface } from "components/cardform/CardForm";
import { CARDS_ACTIONS } from "Constants";
import React, { useContext, useReducer } from "react";

const CardsContext       = React.createContext({});
const CardsUpdateContext = React.createContext({});

export const useCards = () => {
  return useContext(CardsContext) as CardInterface[];
};

export const useUpdateCards = () => {
  return useContext(CardsUpdateContext) as React.Dispatch<Action>;
};

export enum CardsActions {
  FetchCards,
  NewCard,
  RemoveCard,
  UpdateCard,
  ResetCard,
}

export interface Action {
  type: CardsActions;
  payload?: any;
}

interface Props {
  children: JSX.Element;
}

const CardsProvider: React.FC<Props> = ({ children }) => {
  function cardsReducer(cards: CardInterface[], action: Action) {
    switch (action.type) {
      case CardsActions.FetchCards:
        return action.payload.cards;
      //---------------------------------
      case CardsActions.NewCard:
        return [...cards, action.payload.card];
      //---------------------------------
      case CardsActions.RemoveCard:
        return cards.filter((card) => card._id !== action.payload.id);
      //---------------------------------
      case CardsActions.UpdateCard:
        return cards.map((card) => {
          if (card._id === action.payload.card._id) {
            return action.payload.card;
          }
          return card;
        });
      //---------------------------------
      case CardsActions.ResetCard:
        return [];
      default:
        return cards;
    }
  }

  const [cards, cardsDispatch] = useReducer(cardsReducer, []);
  return (
    <CardsContext.Provider value={cards}>
      <CardsUpdateContext.Provider value={cardsDispatch}>
        {children}
      </CardsUpdateContext.Provider>
    </CardsContext.Provider>
  );
};

export default CardsProvider;
