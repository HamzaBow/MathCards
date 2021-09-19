import React, { useState, useRef } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { useAuth } from "contexts/AuthContext";
import { Avatar, Box, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core";
import Logo from  "components/Logo";
import { Brightness3, ExitToApp, Settings } from "@material-ui/icons";
import { ThemeString } from "contexts/ThemeContext"
import { useThemeUpdate } from "contexts/ThemeContext"

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    borderWidth: "1px",
    backgroundColor: theme.palette.background.default,
    borderColor:
      theme.palette.type === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.25),
    borderStyle: "solid",
    "&:hover": {
      borderColor:
        theme.palette.type === "dark"
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
    padding: theme.spacing(0, 2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
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

  const logoRef = useRef<HTMLDivElement>(null);
  const setThemeString = useThemeUpdate() as Function;

  const classes = useStyles();
  const [displaySidebar, setDisplaySidebar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [themeAnchorEl, setThemeAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

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
    setThemeAnchorEl(anchorEl)
    setAnchorEl(null)
  }
  const handleChooseTheme = (selectedTheme: ThemeString) => {
    handleMenuClose();
    setThemeString(selectedTheme);
  } 

  const handleSignOut = () => {
    handleMenuClose();
    logout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        classes={{list: classes.list}}
      >
    <Paper variant="outlined">
        <Box mt={1}>
          <Typography variant="body1" align="center">
            {" "}
            Signed in as:{" "}
          </Typography>
        </Box>
        <Box sx={{ mx: 3, my: 1 }}>
          <Typography variant="h6" style={{fontWeight: 800}} >
            {currentUser && (currentUser.displayName || currentUser.email)}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <Box sx={{ mr: 5 }}>
            <ListItemText primary="Profile" />
          </Box>
        </MenuItem>
        <MenuItem onClick={handleThemeMenuOpen}>
          <ListItemIcon>
            <Brightness3 />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </MenuItem>

        <MenuItem onClick={handleThemeMenuOpen}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

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

  const themeMenu = (
    <Menu
      anchorEl={themeAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      keepMounted
      open={isThemeMenuOpen}
      onClose={handleMenuClose}
      classes={{list: classes.list}}
    >

    <Paper variant="outlined">
      <MenuItem onClick={() => handleChooseTheme('device-theme')}>Device theme</MenuItem>
      <MenuItem onClick={() => handleChooseTheme('light')}>Light</MenuItem>
      <MenuItem onClick={() => handleChooseTheme('dark')}>Dark</MenuItem>
      <MenuItem onClick={() => handleChooseTheme('charcoal')}>Charcoal (dark)</MenuItem>
    </Paper>
    </Menu>
  )

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
      classes={{list: classes.list}}
    >
    <Paper variant="outlined">
      <MenuItem>
        <IconButton aria-label="create a new card" color="inherit">
          <AddCircleIcon />
        </IconButton>
        <p>New card</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {currentUser?.photoURL ? (
            <Avatar
              alt={currentUser.displayName}
              src={currentUser.photoURL}
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

  function handleSearbarFocus(){
    if(window.innerWidth < 600 && logoRef?.current?.style){
      logoRef.current.style.width = '0px';
    }
  }
  function handleSearbarBlur(){
    if(logoRef?.current?.style){
      logoRef.current.style.width = '100%';
    }
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setDisplaySidebar((prev) => !prev);
            }}
          >
            <MenuIcon />
          </IconButton>
          <div ref={logoRef} style={{ transition: "width 500ms" }}>
            <IconButton style={{borderRadius: "0.3rem", paddingLeft: "0.3rem"}} size="small" onClick={() => {history.push("/")}}>
              <Logo />
            </IconButton>
          </div>
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
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="create a new card"
              color="inherit"
              onClick={() => {
                history.push("/cardform/new");
              }}
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser?.photoURL ? (
                <Avatar
                  alt={currentUser?.displayName && currentUser?.email}
                  src={currentUser?.photoURL}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {themeMenu}
      <Sidebar
        displaySidebar={displaySidebar}
        setDisplaySidebar={setDisplaySidebar}
      />
    </div>
  );
}

export default Header;