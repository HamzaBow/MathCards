export const ACTIONS = {
  FETCH_CARDS: "FETCH_CARDS",
  SET_MAIN_CARD: "SET_MAIN_CARD",
  ADD_TO_COLLECTION: "ADD_TO_COLLECTION",
  SET_TAGS: "SET_TAGS",
  SET_DIFFICULTIES: "SET_DIFFICULTIES",
};

const PRIMARY_HUE = 196;

export const COLORS = {
  PRIMARY:       `hsl(${PRIMARY_HUE}, 62%, 83%)`,
  PRIMARY_LIGHT: `hsl(${PRIMARY_HUE}, 62%, 93%)`,
  PRIMARY_DARK:  `hsl(${PRIMARY_HUE}, 62%, 62%)`,

  GRAY_LIGHT:  "hsl(0, 0%, 96%)",
  GRAY:        "hsl(0, 0%, 50%)",
  GRAY_DARK:   "hsl(0, 0%, 30%)",
  GRAY_DARKER: "hsl(0, 0%, 20%)",
};


// TODO: after finishing the 1st version of the app, put a 3 sliders in the UI to change the hue, saturation and lightness of PRIMARY in order to find the best color to fit the website