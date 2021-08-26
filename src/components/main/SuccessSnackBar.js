import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SuccessSnackBar = ({ open, setActiveStep }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setActiveStep(2);
  };

  return (
      <Snackbar anchorOrigin={{ horizontal: "center", vertical: "top" }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Card Saved Successfully!
        </Alert>
      </Snackbar>
  );
};

export default SuccessSnackBar;
