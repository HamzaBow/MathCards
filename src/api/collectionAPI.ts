import { CollectionData, CollectionPatchData } from "./types";

export const fetchAllCollections = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections`);
  const data = await res.json();
  return data;
};

export const fetchCollection = async (_id: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections/${_id}`);
  const data = await res.json();
  return data;
};

export const fetchCreateCollection = async (collectionData: CollectionData) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(collectionData),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateCollectionPUT = async (_id: string, collectionData: CollectionData) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections/${_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(collectionData),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateCollectionPATCH = async (_id: string, collectionPatchData: CollectionPatchData) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(collectionPatchData),
  });
  const data = await res.json();
  return data;
};

export const fetchDeleteCollection = async (_id: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

//******************************************************************************
//************************   CARDS INSIDE COLLECTION   *************************
//******************************************************************************

export const fetchAddCardToCollection = async (_id: string, cardId: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections/${_id}/cards`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ cardId }),
  });
  const data = await res.json();
  return data;
}

export const fetchDeleteCardFromCollection = async (_id: string, cardId: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/collections/${_id}/cards`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ cardId }),
  });
  const data = await res.json();
  return data;
}