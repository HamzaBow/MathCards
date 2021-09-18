import React, { useContext } from 'react'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import useLocalStorage from "hooks/useLocalStorage";

const ThemeUpdateContext = React.createContext({})

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}

export type ThemeString = "device-theme" | "light" | "dark" | "charcoal";

interface Props {
  children: JSX.Element;
}
const ThemeProvider: React.FC<Props> = ({children}) => {

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [themeString, setThemeString] = useLocalStorage(
      "themeString",
      "device-theme"
    ) as [ThemeString, Function];

    const theme = React.useMemo(() => {
      switch (themeString) {
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
    }, [prefersDarkMode, themeString]);

    return (
          <MuiThemeProvider theme={theme}>
            <ThemeUpdateContext.Provider value={setThemeString}>
                {children}
            </ThemeUpdateContext.Provider>
          </MuiThemeProvider>
    )

}

export default ThemeProvider;





