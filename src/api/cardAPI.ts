import { fetchGetData, init } from "api/utils";
import { CardData, CardPatchData } from "api/types"

const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

export const fetchAllCards = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchCardsForUser = async (userId: string) => {
  return await fetchGetData({
    url: `${baseUrl}?userid=${userId}`,
  });
};

export const fetchCardsFromCardsIds = async (cardsIds: string[]) => {
  return await fetchGetData({
    url: `${baseUrl}?cardsids=${cardsIds.join(',')}`,
  });
};

export const fetchCard = async (cardId: string) => {
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
  return await fetchGetData({
    url         : `${baseUrl}/${cardId}`,
    initParams  : init("PUT", cardData),
  });
};

export const fetchUpdateCardPATCH = async (
  cardId: string,
  cardPatchData: CardPatchData
) => {
  return await fetchGetData({
    url         : `${baseUrl}/${cardId}`,
    initParams  : init("PUT", cardPatchData),
  });
};

export const fetchDeleteCard = async (cardId: string) => {
  return await fetchGetData({
    url         : `${baseUrl}/${cardId}`,
    initParams  : init("DELETE"),
  });
};
