import React, { useState } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import {
  useUser,
  useUserUpdate,
  UserActions,
} from "../../contexts/UserContext";
import { fetchCreateCollection } from "api/collectionAPI";

interface Props {
  setCreatingNewCollection: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewCollectionForm: React.FC<Props> = ({
  setCreatingNewCollection,
}) => {
  const [newCollectionTitle, setNewCollectionTitle] = useState("");

  const user = useUser();
  const userDispatch = useUserUpdate();
  const saveNewCollection = async () => {
    const collection = await fetchCreateCollection({
      ownerId: user._id,
      title: newCollectionTitle,
    });
    userDispatch({
      type: UserActions.AddCollection,
      payload: { newCollection: collection },
    });
    setNewCollectionTitle("");
    setCreatingNewCollection(false);
  };

  return (
    <ListItem style={{ display: "flex", justifyContent: "center" }}>
      <TextField
        placeholder="Collection title"
        value={newCollectionTitle}
        onChange={(e) => setNewCollectionTitle(e.target.value)}
        autoFocus
      />
      <Button onClick={saveNewCollection}>Save</Button>
      <Button onClick={() => setCreatingNewCollection(false)}>Cancel</Button>
    </ListItem>
  );
};

export default NewCollectionForm;
