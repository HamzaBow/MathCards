import React, { useState, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Check from "@mui/icons-material/Check";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useAuth } from "contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Logo from "components/Logo";
import { Brightness3, ExitToApp, Settings } from "@mui/icons-material";
import { ThemeString, useTheme } from "contexts/ThemeContext";
import { useThemeUpdate } from "contexts/ThemeContext";
import { UserActions, useUserUpdate } from "contexts/UserContext";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CardForm from "components/cardform/CardForm";
import { CardsActions, useUpdateCards } from "contexts/CardsContext";
import SearchBar from "./SearchBar";
import { APP_NAME } from "Constants";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    padding: 0,
  },
}));

const Header: React.FC = () => {

  const cardsDispatch = useUpdateCards();

  const logoRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLButtonElement | null>(null);
  const themeString = useTheme();
  const setThemeString = useThemeUpdate() as Function;

  const [cardFormOpen, setCardFormOpen] = useState(false);

  const classes = useStyles();
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const history = useHistory();
  const { logout, currentUser } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isThemeMenuOpen = Boolean(themeAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setThemeAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleThemeMenuOpen = () => {
    setThemeAnchorEl(anchorEl);
    setAnchorEl(null);
  };
  const handleChooseTheme = (selectedTheme: ThemeString) => {
    handleMenuClose();
    setThemeString(selectedTheme);
  };

  const userDispatch = useUserUpdate();

  const handleSignOut = () => {
    handleMenuClose();
    userDispatch({ type: UserActions.ResetUser });
    cardsDispatch({ type: CardsActions.ResetCard});
    logout();
    // TODO: the two expressions above have to happen together or not happen at all
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{ list: classes.list }}
    >
      <Paper variant="outlined">
        <Box mt={1}>
          <Typography variant="body1" align="center">
            {" "}
            Signed in as:{" "}
          </Typography>
        </Box>
        <Box sx={{ mx: 3, my: 1 }}>
          <Typography variant="h6" style={{ fontWeight: 800 }}>
            {currentUser && (currentUser.displayName || currentUser.email)}
          </Typography>
        </Box>

        <Divider sx={{ mt: "8px", mb: "8px" }} />

        {/*
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <Box sx={{ mr: 5 }}>
            <ListItemText primary="Profile" />
          </Box>
        </MenuItem>
        */}
        <MenuItem onClick={handleThemeMenuOpen}>
          <ListItemIcon>
            <Brightness3 />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </MenuItem>

        {/*
        <MenuItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        */}

        <Divider />

        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Paper>
    </Menu>
  );
  const handleThemeBackBtn = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(accountRef.current);
    setThemeAnchorEl(null);
  };
  const themeMenu = (
    <Menu
      anchorEl={themeAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      keepMounted
      open={isThemeMenuOpen}
      onClose={handleMenuClose}
      classes={{ list: classes.list }}
    >
      <Paper variant="outlined">
        <MenuItem onClick={handleThemeBackBtn}>
          <ListItemIcon>
            <ArrowBack />
          </ListItemIcon>
          <ListItemText>Back</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => handleChooseTheme("device-theme")}
          selected={themeString === "device-theme"}
        >
          {themeString === "device-theme" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          <ListItemText inset={themeString !== "device-theme"}>
            Device theme
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleChooseTheme("light")}
          selected={themeString === "light"}
        >
          {themeString === "light" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          <ListItemText inset={themeString !== "light"}>Light</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleChooseTheme("dark")}
          selected={themeString === "dark"}
        >
          {themeString === "dark" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          <ListItemText inset={themeString !== "dark"}>Dark</ListItemText>
        </MenuItem>
      </Paper>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      classes={{ list: classes.list }}
    >
      <Paper variant="outlined">
        <MenuItem
          onClick={() => {
            setCardFormOpen(true);
            setMobileMoreAnchorEl(null)
          }}
        >
          <IconButton
            aria-label="create a new card"
            color="inherit"
            size="large"
          >
            <AddCircleIcon />
          </IconButton>
          <p>New card</p>
        </MenuItem>
        {/*
        <MenuItem>
          <IconButton
            aria-label="show 11 new notifications"
            color="inherit"
            size="large"
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        */}
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            size="large"
          >
            {currentUser?.photoURL ? (
              <Avatar
                alt={currentUser?.displayName || ""}
                src={currentUser?.photoURL}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <p>Account</p>
        </MenuItem>
      </Paper>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          {currentUser?.emailVerified && (
            <Tooltip title="Sidebar Navigation" enterDelay={1000}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  setDisplaySidebar((prev) => !prev);
                }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={`${APP_NAME} Home`} enterDelay={1000}>
            <div ref={logoRef} style={{ transition: "width 500ms" }}>
              <IconButton
                style={{ borderRadius: "0.3rem", paddingLeft: "0.3rem" }}
                size="small"
                onClick={() => {
                  history.push("/");
                }}
              >
                <Logo />
              </IconButton>
            </div>
          </Tooltip>

          <SearchBar logoRef={logoRef} />

          <div className={classes.grow} />

          {currentUser?.emailVerified ? (
            <>
              <div className={classes.sectionDesktop}>
                <Tooltip title="Create a new card">
                  <IconButton
                    aria-label="create a new card"
                    color="inherit"
                    onClick={() => {
                      setCardFormOpen(true);
                    }}
                    size="large"
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>

                {/* <Tooltip title="Notifications">
              <IconButton
                aria-label="show 2 new notifications"
                color="inherit"
                size="large"
              >
                <Badge badgeContent={2} color="error" sx={{ zIndex: "0" }}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            */}

                <Tooltip title="Account and Settings">
                  <IconButton
                    ref={accountRef}
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    size="large"
                  >
                    {currentUser?.photoURL ? (
                      <Avatar
                        alt={currentUser?.displayName || ""}
                        src={currentUser?.photoURL}
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                  size="large"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ mr: 1, whiteSpace: "nowrap" }}
                onClick={() => history.push("/login")}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                sx={{ whiteSpace: "nowrap" }}
                onClick={() => history.push("/signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {themeMenu}
      <Sidebar
        displaySidebar={displaySidebar}
        setDisplaySidebar={setDisplaySidebar}
      />
      <CardForm
        operationType="create"
        cardFormOpen={cardFormOpen}
        setCardFormOpen={setCardFormOpen}
      />
    </div>
  );
};

export default Header;
