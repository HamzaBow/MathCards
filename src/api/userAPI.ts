import { UserData, UserPatchData } from "./types";
import { fetchGetData, init } from "api/utils";

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

export const fetchAllUsers = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchUser = async (_id: string) => {
  return await fetchGetData({
    url: `${baseUrl}/${_id}`,
  });
};

export const fetchCreateUser = async (authId: string) => {
  //authId is the id given by auth service provider
  return await fetchGetData({
    url         : baseUrl,
    initParams  : init("POST", { authId }),
  });
};

export const fetchUpdateUserPUT = async (_id: string, userData: UserData) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}`,
    initParams  : init("PUT", userData),
  });
};

export const fetchUpdateUserPATCH = async (_id: string, userPatchData: UserPatchData) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}`,
    initParams  : init("PATCH", userPatchData),
  });
};

export const fetchDeleteUser = async (_id: string) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}`,
    initParams  : init("DELETE"),
  });
};

//***********************************************************
//**********************   FOLLOWING   **********************
//***********************************************************

export const fetchAddFollowedToUser = async (_id: string, followedId: string) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}/following`,
    initParams  : init("POST", { followedId }),
  });
}

export const fetchDeleteFollowedFromUser = async (_id: string, followedId: string) => {
  return await fetchGetData({
    url         : `${baseUrl}/${_id}/following`,
    initParams  : init("DELETE", { followedId }),
  });
}
