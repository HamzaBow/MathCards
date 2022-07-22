import { APP_NAME } from "Constants";
import { ImSigma } from "react-icons/im";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  logoName: {
    fontSize: "1.5rem",
    fontFamily: "Ubuntu",
    fontWeight: "400",
    display: "inline",
    margin: "0 0.5rem 0",
    color: theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.8)"
  },
  sigmaContainer: {
    width: "2rem",
    height: "2rem",
    borderRadius: "0.5rem",
    display: "inline-grid",
    placeItems: "center",
    backgroundColor: theme.palette.primary.main,
  }
}));
export const logoStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.2rem",

  marginTop: "0.5rem",
  marginBottom: "0.5rem",
};

export const SigmaIconStyle = {

  width: "1rem",
  height: "1rem",
  transform: "rotate(-20deg)",
  color: "white",
};

const Logo = () => {
  const classes = useStyles();
  return (
    <div>
      <div style={logoStyle}>
        <span className={classes.sigmaContainer}>
          <ImSigma style={SigmaIconStyle} />
        </span>
        <h6 className={classes.logoName} >{APP_NAME}</h6>
      </div>
    </div>
  );
};

export default Logo;
