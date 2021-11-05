interface UserData {
  uid: string;
  following: string[];
  collectionsIds: string[];
}
interface UserPatchData {
  uid?: string;
  following?: string[];
  collectionsIds?: string[];
}

export const fetchAllUsers = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
  const data = await res.json();
  return data;
};

export const fetchUser = async (_id: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`);
  const data = await res.json();
  return data;
};

export const fetchCreateUser = async (uid: string) => {
  //uid is the id given by auth service provider
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateUserPUT = async (_id: string, userData: UserData) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateUserPATCH = async (_id: string, userPatchData: UserPatchData) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userPatchData),
  });
  const data = await res.json();
  return data;
};

export const fetchDeleteUser = async (_id: string) => {
  //uid is the id given by auth service provider
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
