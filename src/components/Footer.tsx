import Typography from "@mui/material/Typography";
import { Link as UiLink } from "@mui/material/";
import { APP_NAME } from "Constants";

const footerStyle = {
    // textAlign: 'center',
    backgroundColor: "gray",
    paddingTop: "30px",
    paddingBottom: "30px",
}

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <UiLink color="inherit" href="https://www.mathcards.com/">
        {APP_NAME}
      </UiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
    return (
        <footer>
            {/* <h1 style={footerStyle} >Footer</h1>             */}
        </footer>
    )
}

export default Footer
