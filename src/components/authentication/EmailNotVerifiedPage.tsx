import { useAuth } from "contexts/AuthContext";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import Logo from "components/Logo";

const EmailNotVerifiedPage = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (currentUser?.emailVerified) {
      history.push("/");
    }
  }, [currentUser?.emailVerified]);
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "70vh" }}>
      <Paper elevation={3} sx={{ p: 4, display: "grid", placeItems: "center", mx: 2 }}>
        <Logo />
        <Divider sx={{ width: 1, my: 3 }} />
        <Typography
          textAlign="center"
          variant="body1"
          component="h2"
          sx={{ my: 1 }}
        >
          A verification link has been sent to your email account.
        </Typography>
        <Typography textAlign="center" variant="body1" component="h2">
          Please, check out your email and click on the verification link so that you can
          start using the app.
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmailNotVerifiedPage;
