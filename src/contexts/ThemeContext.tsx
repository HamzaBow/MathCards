import React, { useContext } from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import useLocalStorage from "hooks/useLocalStorage";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const ThemeUpdateContext = React.createContext({})
const ThemeStringContext = React.createContext({})

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext)
}
export function useTheme() {
    return useContext(ThemeStringContext)
}

export type ThemeString = "device-theme" | "light" | "dark";

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
      if ( themeString === "dark" || 
          ( themeString === "device-theme" && prefersDarkMode )) {
            return createTheme({
              palette: {
                mode: "dark",
                background: {
                  default: "#242729",
                  paper: "#323638",
                },
              },
            });
        }
        return createTheme({
          palette: {
            mode: "light",
          },
        });
    }, [prefersDarkMode, themeString]);

    return (
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeStringContext.Provider value={ themeString }>
            <ThemeUpdateContext.Provider value={setThemeString}>
              {children}
            </ThemeUpdateContext.Provider>
          </ThemeStringContext.Provider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    );

}

export default ThemeProvider;





