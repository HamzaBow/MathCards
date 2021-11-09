import { CollectionData, CollectionPatchData } from "./types";
import { fetchGetData, init } from "api/utils";

const baseUrl = `${process.env.REACT_APP_API_URL}/collections`;

export const fetchAllCollections = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchCollectionsForUser = async (userId: string) => {
  return await fetchGetData({
    url: `${baseUrl}?userid=${userId}`,
  });
};

export const fetchCollection = async (_id: string) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}`,
  });
};

export const fetchCreateCollection = async (collectionData: CollectionData) => {
  return await fetchGetData({
    url: 'baseUrl',
    initParams: init("POST", collectionData),
  });
};

export const fetchUpdateCollectionPUT = async (_id: string, collectionData: CollectionData) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}`,
    initParams: init("PUT", collectionData),
  });
};

export const fetchUpdateCollectionPATCH = async (_id: string, collectionPatchData: CollectionPatchData) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}`,
    initParams: init("PATCH", collectionPatchData),
  });
};

export const fetchDeleteCollection = async (_id: string) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}`,
    initParams: init("DELETE"),
  });
};

//******************************************************************************
//************************   CARDS INSIDE COLLECTION   *************************
//******************************************************************************

export const fetchAddCardToCollection = async (_id: string, cardId: string) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}/cards`,
    initParams: init("POST", { cardId }),
  });
}

export const fetchDeleteCardFromCollection = async (_id: string, cardId: string) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}/cards`,
    initParams: init("DELETE", { cardId }),
  });
}