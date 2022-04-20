import React, { useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useHistory, useLocation } from "react-router-dom";
import { useSessionStorage } from "hooks/useStorage";
import useDebounce from "hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    borderWidth: "1px",
    backgroundColor: theme.palette.background.default,
    borderColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.25),
    borderStyle: "solid",
    "&:hover": {
      borderWidth: "2px",
      borderColor:
        theme.palette.mode === "dark"
          ? alpha(theme.palette.common.white, 0.5)
          : alpha(theme.palette.common.black, 0.45),
    },
    "&:focus-within": {
      borderWidth: "3px",
      borderColor:
        theme.palette.mode === "dark"
          ? alpha(theme.palette.common.white, 0.5)
          : alpha(theme.palette.common.black, 0.45),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

interface Props {
  logoRef: React.RefObject<HTMLDivElement>;
}

const SearchBar: React.FC<Props> = ({ logoRef }) => {
  const classes = useStyles();
  const history = useHistory();
  const { search, pathname } = useLocation();
  const searchParams = new window.URLSearchParams(search);

  const [searchQuery, setSearchQuery] = useSessionStorage(
    "search-query",
    searchParams.get("q") || ""
  ) as [string, Function];

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, []);

  function handleSearbarFocus() {
    if (window.innerWidth < 600 && logoRef?.current?.style) {
      logoRef.current.style.width = "0px";
    }
  }
  function handleSearbarBlur() {
    if (logoRef?.current?.style) {
      logoRef.current.style.width = "100%";
    }
  }
  function handleSearchChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchQuery(e.target.value);
  }

  useDebounce(
    () => {
      searchParams.set("q", searchQuery);
      if (
        searchQuery !== null &&
        `${pathname}${search}` !== `/search?${searchParams.toString()}`
      ) {
        if (
          searchQuery !== "" ||
          (searchQuery === "" && pathname === "/search")
        ) {
          history.push(`/search?${searchParams.toString()}`);
        }
      }
    },
    500,
    [searchQuery]
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onFocus={handleSearbarFocus}
        onBlur={handleSearbarBlur}
        value={searchQuery}
        onChange={handleSearchChange}
        autoFocus={pathname === "/search"}
      />
    </div>
  );
};

export default SearchBar;
