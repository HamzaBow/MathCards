export const CARDS_ACTIONS = {
  FETCH_CARDS: "FETCH_CARDS",
  SET_MAIN_CARD: "SET_MAIN_CARD",
  ADD_TO_COLLECTION: "ADD_TO_COLLECTION",
  SET_TAGS: "SET_TAGS",
  SET_DIFFICULTIES: "SET_DIFFICULTIES",
  NEW_CARD: "NEW_CARD",
  UPDATE_CARD: "UPDATE_CARD",
  REMOVE_CARD: "REMOVE_CARD",
};

export const CARD_FORM_ACTIONS = {
  ADD_TEXT_QUILL: "ADD_TEXT_QUILL",
  ADD_MATH_QUILL: "ADD_MATH_QUILL",
  UPDATE_LATEX: "UPDATE_LATEX",
  UPDATE_HTML_CONTENT: "UPDATE_HTML_CONTENT",
  SET_FIELDS: "SET_FIELDS",
}

export const USER_ACTIONS = {
  NEW_COLLECTION: "NEW_COLLECTION",
  FETCH_COLLECTIONS: "FETCH_COLLECTIONS"
}

export const FIELD_TYPE = {
  MATH: "MATH",
  TEXT: "TEXT",
}

export const CARD_LAYOUT = {
    HUG_CONTENT: "hug-content",
    FIXED_SIZE: "fixed-size"
}

export const CARD_SIZE = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
}

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