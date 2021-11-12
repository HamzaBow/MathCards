import { CollectionData, CollectionPatchData } from "./types";
import { fetchGetData, init, validateString } from "api/utils";

const baseUrl = `${process.env.REACT_APP_API_URL}/collections`;

export const fetchAllCollections = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchCollectionsForUser = async (userId: string) => {
  validateString(userId)
  return await fetchGetData({
    url: `${baseUrl}?userid=${userId}`,
  });
};

export const fetchCollection = async (collectionId: string) => {
  validateString(collectionId)
  return await fetchGetData({
    url: `${baseUrl}/${collectionId}`,
  });
};

export const fetchCreateCollection = async (collectionData: CollectionData) => {
  return await fetchGetData({
    url         : baseUrl,
    initParams  : init("POST", collectionData),
  });
};

export const fetchUpdateCollectionPUT = async (collectionId: string, collectionData: CollectionData) => {
  validateString(collectionId)
  return await fetchGetData({
    url         : `${baseUrl}/${collectionId}`,
    initParams  : init("PUT", collectionData),
  });
};

export const fetchUpdateCollectionPATCH = async (collectionId: string, collectionPatchData: CollectionPatchData) => {
  validateString(collectionId)
  return await fetchGetData({
    url         : `${baseUrl}/${collectionId}`,
    initParams  : init("PATCH", collectionPatchData),
  });
};

export const fetchDeleteCollection = async (collectionId: string) => {
  validateString(collectionId)
  return await fetchGetData({
    url         : `${baseUrl}/${collectionId}`,
    initParams  : init("DELETE"),
  });
};

//******************************************************************************
//************************   CARDS INSIDE COLLECTION   *************************
//******************************************************************************

export const fetchAddCardToCollection = async (collectionId: string, cardId: string) => {
  validateString(collectionId)
  validateString(cardId)
  return await fetchGetData({
    url         : `${baseUrl}/${collectionId}/cards`,
    initParams  : init("POST", { cardId }),
  });
}

export const fetchDeleteCardFromCollection = async (collectionId: string, cardId: string) => {
  validateString(collectionId)
  validateString(cardId)
  return await fetchGetData({
    url         : `${baseUrl}/${collectionId}/cards`,
    initParams  : init("DELETE", { cardId }),
  });
}