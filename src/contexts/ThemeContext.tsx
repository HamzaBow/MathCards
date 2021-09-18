import React, { useContext } from 'react'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import useLocalStorage from "hooks/useLocalStorage";

const ThemeUpdateContext = React.createContext({})

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

interface Props {
  children: JSX.Element;
}
const ThemeProvider: React.FC<Props> = ({children}) => {
    type Theme = "device-theme" | "light" | "dark" | "charcoal";

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [chosenTheme, setChosenTheme] = useLocalStorage(
      "theme",
      "device-theme"
    ) as [Theme, Function];

    const theme = React.useMemo(() => {
      switch (chosenTheme) {
        case "light":
          return createTheme({
            palette: {
              type: "light",
            },
          });
        case "dark":
          return createTheme({
            palette: {
              type: "dark",
            },
          });
        case "charcoal":
          return createTheme({
            palette: {
              type: "dark",
              background: {
                default: "#242729",
                paper: "#323638",
              },
            },
          });
        default:
          //devide-theme
          return createTheme({
            palette: {
              type: prefersDarkMode ? "dark" : "light",
            },
          });
      }
    }, [prefersDarkMode, chosenTheme]);

    return (
          <MuiThemeProvider theme={theme}>
            <ThemeUpdateContext.Provider value={setChosenTheme}>
                {children}
            </ThemeUpdateContext.Provider>
          </MuiThemeProvider>
    )

}

export default ThemeProvider;





