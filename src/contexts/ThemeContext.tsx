import React, { useContext, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { useLocalStorage } from "hooks/useStorage";
import { GlobalStyles, ThemeOptions } from "@mui/material";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const ThemeUpdateContext = React.createContext({});
const ThemeStringContext = React.createContext({});

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}
export function useTheme() {
  return useContext(ThemeStringContext);
}

export type ThemeString = "device-theme" | "light" | "dark";

interface Props {
  children: JSX.Element;
}
const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [mathQuillCursorColor, setMathQuillCursorColor] = useState("");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeString, setThemeString] = useLocalStorage(
    "themeString",
    "device-theme"
  ) as [ThemeString, Function];
  const otherThemeSettings: ThemeOptions = {
    typography: {
      button: {
        textTransform: "none"
      }
    },
  }

  const theme = React.useMemo(() => {
    if (
      themeString === "dark" ||
      (themeString === "device-theme" && prefersDarkMode)
    ) {
      setMathQuillCursorColor("white");
      return createTheme({
        ...otherThemeSettings,
        palette: {
          mode: "dark",
          background: {
            default: "#242729",
            paper: "#323638",
          },
        },
      });
    }
    setMathQuillCursorColor("black");
    return createTheme({
      ...otherThemeSettings,
      palette: {
        mode: "light",
        background: {
            default: "#eaeaea"
        }
      },
    });
  }, [prefersDarkMode, themeString]);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeStringContext.Provider value={themeString}>
          <ThemeUpdateContext.Provider value={setThemeString}>
            <GlobalStyles
              styles={{
                ".mq-editable-field .mq-cursor": {
                  borderLeftColor: `${mathQuillCursorColor} !important`,
                },
                ".MuiDrawer-paper": {
                  backgroundImage: "none !important",
                },
              }}
            />
            {children}
          </ThemeUpdateContext.Provider>
        </ThemeStringContext.Provider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
