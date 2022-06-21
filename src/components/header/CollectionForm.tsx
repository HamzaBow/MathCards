import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import useEventListener from "hooks/useEventListener";
import {
  useUser,
  useUserUpdate,
  UserActions,
} from "../../contexts/UserContext";
import { fetchCreateCollection, fetchUpdateCollectionPATCH } from "api/collectionAPI";
import { ButtonGroup } from "@mui/material";
import { useAuth } from "contexts/AuthContext";
import { CollectionOpType } from "./Sidebar";
import { useSnackbar } from "contexts/SnackbarContext";
import { LoadingButton } from "@mui/lab";

interface Props {
  operationType: CollectionOpType;
  setCollectionFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formColTitle: string;
  collectionId: string | null;
  setFormColTitle: React.Dispatch<React.SetStateAction<string>>;
}

const CollectionForm: React.FC<Props> = ({
  operationType,
  setCollectionFormOpen,
  formColTitle,
  collectionId,
  setFormColTitle,
}) => {
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUser();
  const { currentUser } = useAuth();
  const userDispatch = useUserUpdate();

  const displaySnackbar = useSnackbar()

  const handleConfirm = async () => {
    if (formColTitle.trim() === "") {
      setErrorText("Collection title cannot be empty.");
      return;
    }
    setLoading(true)
    const idToken = await currentUser?.getIdToken(true);
    if (typeof idToken === "undefined") {
      setLoading(false);
      throw new Error("idToken cannot be undefined");
    }

    if (operationType === "CREATE") {
      const collection = await fetchCreateCollection(
        {
          ownerId: user._id,
          title: formColTitle,
        },
        idToken
      );
      userDispatch({
        type: UserActions.AddCollection,
        payload: { newCollection: collection },
      });
      displaySnackbar("success", "Collection Created");
    }


    if (operationType === "UPDATE") {
      if (!collectionId) {
        console.error("collectionId cannot be null or undefined, cannot update collection")
        return
      }
      await fetchUpdateCollectionPATCH(
        collectionId,
        {
          ownerId: user._id,
          title: formColTitle,
        },
        idToken
      );
      userDispatch({
        type: UserActions.UpdateCollection,
        payload: { collectionId, collectionTitle: formColTitle, },
      });
      displaySnackbar("success", "Collection Updated");
    }
    setFormColTitle("");
    setLoading(false)
    setCollectionFormOpen(false);
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (collectionTitleRef.current !== document.activeElement) return;
    if (e.key === "Enter") {
      handleConfirm();
    }
    if (e.ctrlKey && e.key === "g") {
      e.preventDefault();
      setCollectionFormOpen(false);
    }
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormColTitle(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrorText("");
    }
  };
  const collectionTitleRef = useRef<HTMLInputElement>(null);
  return (
    <div
      style={{
        borderStyle: "solid",
        borderWidth: "0.5px",
        borderRadius: "5px",
        borderColor: "gray",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <ListItem style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          inputRef={collectionTitleRef}
          placeholder="Collection title"
          value={formColTitle}
          onChange={handleChange}
          autoFocus
          helperText={errorText}
          error={!!errorText}
        />
      </ListItem>
      <ListItem style={{ display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <LoadingButton
            variant="outlined"
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
            loadingPosition="end"
            fullWidth
          >
            {operationType === "CREATE" ? "Save" : "Save Changes"}
          </LoadingButton>
          <Button onClick={() => setCollectionFormOpen(false)} disabled={loading} sx={{ px: 3 }}>Cancel</Button>
        </ButtonGroup>
      </ListItem>
    </div>
  );
};

export default CollectionForm;
