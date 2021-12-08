import React, { useState } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import useEventListener from "hooks/useEventListener";
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
  const [errorText, setErrorText] = useState("")

  const user = useUser();
  const userDispatch = useUserUpdate();

  const saveNewCollection = async () => {
    if (newCollectionTitle.trim() === "") {
      setErrorText("Collection title cannot be empty.")
      return
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCollectionTitle(e.target.value)
    if (e.target.value.trim() !== "") {
      setErrorText("")
    }
  }
  return (
    <ListItem style={{ display: "flex", justifyContent: "center" }}>
      <TextField
        placeholder="Collection title"
        value={newCollectionTitle}
        onChange={handleChange}
        autoFocus
        helperText={errorText}
        error={!!errorText}
      />
      <Button onClick={saveNewCollection}>Save</Button>
      <Button onClick={() => setCreatingNewCollection(false)}>Cancel</Button>
    </ListItem>
  );
};

export default NewCollectionForm;
