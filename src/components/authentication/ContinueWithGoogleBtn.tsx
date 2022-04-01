import React from "react";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  continueWithGoogle: {
    margin: theme.spacing(3, 0, 2),
  }
}))

interface Props {
  isSubmitting: boolean;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContinueWithGoogleBtn: React.FC<Props> = ({
  isSubmitting,
  loading,
  setError,
  setLoading,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { signInWithGoogleAuth } = useAuth();
  async function handleContinueWithGoogle() {
    try {
      setError("");
      setLoading(true);
      const o = await signInWithGoogleAuth();
      console.log("o:", o);
      history.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError((err as Error).message);
      } else {
        setError("Failed to continue with Google");
      }
    }
    setLoading(false);
  }
  return (
    <Button
      type="button"
      disabled={isSubmitting || loading}
      variant="outlined"
      onClick={handleContinueWithGoogle}
      className={classes.continueWithGoogle}
      startIcon={<FcGoogle size={30} />}
      size="large"
      sx={{
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      Continue With Google
    </Button>
  );
};

export default ContinueWithGoogleBtn;
