import { CollectionData, CollectionPatchData } from "./types";
import { fetchGetData, validateString } from "api/utils";

const baseUrl = `${process.env.REACT_APP_API_URL}/collections`;

export const fetchAllCollections = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchCollectionsForUser = async (userId: string) => {
  validateString(userId, 'userId')
  return await fetchGetData({
    url: `${baseUrl}?userid=${userId}`,
  });
};

export const fetchCollection = async (collectionId: string) => {
  validateString(collectionId, 'collectionId')
  return await fetchGetData({
    url: `${baseUrl}/${collectionId}`,
  });
};

export const fetchCreateCollection = async (collectionData: CollectionData, idToken: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + idToken,
    },
    body: JSON.stringify(collectionData),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateCollectionPUT = async (collectionId: string, collectionData: CollectionData, idToken: string) => {
  validateString(collectionId, 'collectionId')
  const res = await fetch(`${baseUrl}/${collectionId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + idToken,
    },
    body: JSON.stringify(collectionData),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateCollectionPATCH = async (collectionId: string, collectionPatchData: CollectionPatchData, idToken: string) => {
  validateString(collectionId, 'collectionId')
  const res = await fetch(`${baseUrl}/${collectionId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + idToken,
    },
    body: JSON.stringify(collectionPatchData),
  });
  const data = await res.json();
  return data;
};

export const fetchDeleteCollection = async (collectionId: string, idToken: string) => {
  validateString(collectionId, 'collectionId')
  return fetch(`${baseUrl}/${collectionId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + idToken,
    }
  });
};

//******************************************************************************
//************************   CARDS INSIDE COLLECTION   *************************
//******************************************************************************

export const fetchAddCardToCollection = async (collectionId: string, cardId: string, idToken: string) => {
  validateString(collectionId, 'collectionId')
  validateString(cardId, 'cardId')
  const res = await fetch(`${baseUrl}/${collectionId}/cards`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + idToken,
    },
    body: JSON.stringify({ cardId }),
  });
  const data = await res.json();
  return data;
}

export const fetchDeleteCardFromCollection = async (collectionId: string, cardId: string, idToken: string) => {
  validateString(collectionId, 'collectionId')
  validateString(cardId, 'cardId')

  const res = await fetch(`${baseUrl}/${collectionId}/cards`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: "Bearer " + idToken,
    },
    body: JSON.stringify({ cardId }),
  });
  const data = await res.json();
  return data;
}