import { fetchGetData, init, validateArray, validateString } from "api/utils";
import { CardData, CardPatchData } from "api/types"

const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

export const fetchAllCards = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchCardsForUser = async (userId: string) => {
  validateString(userId, 'userId')
  return await fetchGetData({
    url: `${baseUrl}?userid=${userId}`,
  });
};

export const fetchCardsFromCardsIds = async (cardsIds: string[]) => {
  validateArray(cardsIds, 'cardsIds')
  return await fetchGetData({
    url: `${baseUrl}?cardsids=${cardsIds.join(',')}`,
  });
};

export const fetchCard = async (cardId: string) => {
  validateString(cardId, 'cardId')
  return await fetchGetData({
    url: `${baseUrl}/${cardId}`,
  });
};

export const fetchCreateCard = async (cardData: CardData) => {
  return await fetchGetData({
    url         : baseUrl,
    initParams  : init("POST", cardData),
  });
};

export const fetchUpdateCardPUT = async (cardId: string, cardData: CardData) => {
  validateString(cardId, 'cardId')
  return await fetchGetData({
    url         : `${baseUrl}/${cardId}`,
    initParams  : init("PUT", cardData),
  });
};

export const fetchUpdateCardPATCH = async (
  cardId        : string,
  cardPatchData : CardPatchData
) => {
  validateString(cardId, 'cardId')
  return await fetchGetData({
    url         : `${baseUrl}/${cardId}`,
    initParams  : init("PUT", cardPatchData),
  });
};

export const fetchDeleteCard = async (cardId: string) => {
  validateString(cardId, 'cardId')
  return await fetchGetData({
    url         : `${baseUrl}/${cardId}`,
    initParams  : init("DELETE"),
  });
};
