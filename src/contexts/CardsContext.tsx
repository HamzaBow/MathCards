import { Action } from "App";
import { CardInterface } from "components/cardform/CardForm";
import { CARDS_ACTIONS } from "Constants";
import React, { useContext, useReducer } from "react";

const CardsContext        = React.createContext({});
const CardsUpdateContext  = React.createContext({});

export const useCards = () => {
  return useContext(CardsContext) as CardInterface[];
};

export const useUpdateCards = () => {
  return useContext(CardsUpdateContext) as React.Dispatch<Action>;
};

interface Props {
  children: JSX.Element;
}

const CardsProvider: React.FC<Props> = ({ children }) => {
  function cardsReducer(cards: CardInterface[], action: Action) {
    switch (action.type) {
      case CARDS_ACTIONS.FETCH_CARDS:
        return action.payload.cards;
      //---------------------------------
      case CARDS_ACTIONS.NEW_CARD:
        return [...cards, action.payload.card];
      //---------------------------------
      case CARDS_ACTIONS.REMOVE_CARD:
        return cards.filter((card) => card._id !== action.payload.id);
      //---------------------------------
      case CARDS_ACTIONS.UPDATE_CARD:
        return cards.map((card) => {
          if (card._id === action.payload.card._id) {
            return action.payload.card;
          }
          return card;
        });
      //---------------------------------
      case CARDS_ACTIONS.RESET_CARDS:
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
