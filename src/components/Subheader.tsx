import { Box, Typography } from "@mui/material";
import { useUser } from "contexts/UserContext";
import React, { useEffect, useState } from "react";
import { Collection } from "contexts/UserContext"

const Subheader = () => {

  const user = useUser()
  const [collectionTitle, setCollectionTitle] = useState("")


  useEffect(() => {
    if(user.collections.length === 0) { return ; }
    const pathName = window.location.pathname
    if (pathName.startsWith("/collection/")) {
      const collectionId = pathName.slice(12)
      const currentCollection = user.collections.filter(
        (collection: Collection) => collection._id === collectionId
      )?.[0];
      setCollectionTitle(currentCollection.title)
    } else {
      setCollectionTitle("")
    }
  }, [user._id, user.collections])

  return (
    <div id="subheader">
      { collectionTitle &&
        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: 2, ml: 2, textAlign: "center", display: "inline-block", color: "text.secondary"}}
        >
          Collection:
          <Box
          sx={{ fontWeight: "medium", ml: 1, display: "inline-block", color: "text.primary" }}
          >
          {collectionTitle}
          </Box>
        </Typography>
      }
    </div>
  );
};

export default Subheader;
