import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessSnackBar = ({ open, setActiveStep }) => {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };
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
