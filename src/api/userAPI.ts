import { UserData, UserPatchData } from "./types";
import { fetchGetData, init, validateString } from "api/utils";

const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

export const fetchAllUsers = async () => {
  return await fetchGetData({
    url: baseUrl,
  });
};

export const fetchUser = async (userId: string) => {
  validateString(userId, 'userId')
  return await fetchGetData({
    url: `${baseUrl}/${userId}`,
  });
};

export const fetchUserFromAuthId = async (authId: string) => {
  validateString(authId, 'authId')
  let user;
  try {
    user = await fetchGetData({
      url: `${baseUrl}?authId=${authId}`,
    });
    return user;
  } catch (e) {
    return false;
  }

};

export const fetchCreateUser = async (authId: string, idToken: string) => {
  //authId is the id given by auth service provider
  validateString(authId, 'authId')
  return await fetchGetData({
    url         : baseUrl,
    initParams  : init("POST", { authId, idToken }),
  });
};

export const fetchUpdateUserPUT = async (userId: string, userData: UserData) => {
  validateString(userId, 'userId')
  return await fetchGetData({
    url         : `${baseUrl}/${userId}`,
    initParams  : init("PUT", userData),
  });
};

export const fetchUpdateUserPATCH = async (userId: string, userPatchData: UserPatchData) => {
  validateString(userId, 'userId')
  return await fetchGetData({
    url         : `${baseUrl}/${userId}`,
    initParams  : init("PATCH", userPatchData),
  });
};

export const fetchDeleteUser = async (userId: string) => {
  validateString(userId, 'userId')
  return await fetchGetData({
    url         : `${baseUrl}/${userId}`,
    initParams  : init("DELETE"),
  });
};

//***********************************************************
//**********************   FOLLOWING   **********************
//***********************************************************

export const fetchAddFollowedToUser = async (userId: string, followedId: string) => {
  validateString(userId, 'userId')
  validateString(followedId, 'followedId')
  return await fetchGetData({
    url         : `${baseUrl}/${userId}/following`,
    initParams  : init("POST", { followedId }),
  });
}

export const fetchDeleteFollowedFromUser = async (userId: string, followedId: string) => {
  validateString(userId, 'userId')
  validateString(followedId, 'followedId')
  return await fetchGetData({
    url         : `${baseUrl}/${userId}/following`,
    initParams  : init("DELETE", { followedId }),
  });
}
