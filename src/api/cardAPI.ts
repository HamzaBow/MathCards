import { fetchGetData, init } from "api/utils";
import { CardData, CardPatchData } from "api/types"

const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

export const fetchAllCards = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchCard = async (_id: string) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}`,
  });
};

export const fetchCreateCard = async (cardData: CardData) => {
  return await fetchGetData({
    url         : baseUrl,
    initParams  : init("POST", cardData),
  });
};

export const fetchUpdateCardPUT = async (_id: string, cardData: CardData) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}`,
    initParams  : init("PUT", cardData),
  });
};

export const fetchUpdateCardPATCH = async (
  _id: string,
  cardPatchData: CardPatchData
) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}`,
    initParams  : init("PUT", cardPatchData),
  });
};

export const fetchDeleteCard = async (_id: string) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}`,
    initParams  : init("DELETE"),
  });
};
