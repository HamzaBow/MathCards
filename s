[38;5;11m[0m[93m─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────[0m
[93mmodified: src/components/header/Header.tsx
[93m─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────[0m
[1;35m@ src/components/header/Header.tsx:382 @[1m[1;38;5;146m const Header: React.FC<Props> = ({ cardsDispatch }) => {[0m
      <AppBar position="static" color="inherit">[m
        <Toolbar>[m
          <Tooltip title="Sidebar Navigation" enterDelay={1000}>[m
[1;31m[1;31m          <IconButton[m[0m
[1;31m[1;31m            edge="start"[m[0m
[1;31m[1;31m            className={classes.menuButton}[m[0m
[1;31m[1;31m            color="inherit"[m[0m
[1;31m[1;31m            aria-label="open drawer"[m[0m
[1;31m[1;31m            onClick={() => {[m[0m
[1;31m[1;31m              setDisplaySidebar((prev) => !prev);[m[0m
[1;31m[1;31m            }}[m[0m
[1;31m[1;31m            size="large"[m[0m
[1;31m[1;31m          >[m[0m
[1;31m[1;31m            <MenuIcon />[m[0m
[1;31m[1;31m          </IconButton>[m[0m
[1;31m[1;31m          </Tooltip>[m[0m
[7m[1;31m [m
[1;31m[1;31m          <Tooltip title="MathCards Home" enterDelay={1000}>[m[0m
[1;31m[1;31m          <div ref={logoRef} style={{ transition: "width 500ms" }}>[m[0m
            <IconButton[m
[1;31m[1;31m              style={{ borderRadius: "0.3rem", paddingLeft: "0.3rem" }}[m[0m
[1;31m[1;31m              size="small"[m[0m
[1;32m[1;32m[m[1;32m              edge="start"[m[0m
[1;32m[1;32m[m[1;32m              className={classes.menuButton}[m[0m
[1;32m[1;32m[m[1;32m              color="inherit"[m[0m
[1;32m[1;32m[m[1;32m              aria-label="open drawer"[m[0m
              onClick={() => {[m
[1;31m[1;31m                [m[1;31;48;5;52mhistory.push("/"[m[1;31m);[m[0m
[1;32m[1;32m                [m[1;32;48;5;22msetDisplaySidebar((prev) => !prev[m[1;32m);[m[0m
              }}[m
[1;32m[1;32m[m[1;32m              size="large"[m[0m
            >[m
[1;31m[1;31m              <[m[1;31;48;5;52mLogo[m[1;31m />[m[0m
[1;32m[1;32m              <[m[1;32;48;5;22mMenuIcon[m[1;32m />[m[0m
            </IconButton>[m
[1;31m[1;31m          </div>[m[0m
[1;32m[1;32m[m[1;32m          </Tooltip>[m[0m
[7m[1;32m [m
[1;32m[1;32m[m[1;32m          <Tooltip title="MathCards Home" enterDelay={1000}>[m[0m
[1;32m[1;32m[m[1;32m            <div ref={logoRef} style={{ transition: "width 500ms" }}>[m[0m
[1;32m[1;32m[m[1;32m              <IconButton[m[0m
[1;32m[1;32m[m[1;32m                style={{ borderRadius: "0.3rem", paddingLeft: "0.3rem" }}[m[0m
[1;32m[1;32m[m[1;32m                size="small"[m[0m
[1;32m[1;32m[m[1;32m                onClick={() => {[m[0m
[1;32m[1;32m[m[1;32m                  history.push("/");[m[0m
[1;32m[1;32m[m[1;32m                }}[m[0m
[1;32m[1;32m[m[1;32m              >[m[0m
[1;32m[1;32m[m[1;32m                <Logo />[m[0m
[1;32m[1;32m[m[1;32m              </IconButton>[m[0m
[1;32m[1;32m[m[1;32m            </div>[m[0m
          </Tooltip>[m
          <div className={classes.search}>[m
            <div className={classes.searchIcon}>[m
[1;35m@ src/components/header/Header.tsx:427 @[1m[1;38;5;146m const Header: React.FC<Props> = ({ cardsDispatch }) => {[0m
          <div className={classes.grow} />[m
          <div className={classes.sectionDesktop}>[m
            <Tooltip title="Create a new card">[m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m<IconButton[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31maria-label="create a new card"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31mcolor="inherit"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31monClick={() => {[m[0m
[1;31m[1;31m                [m[1;31;48;5;52m[m[1;31mhistory.push("/cardform/new");[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m}}[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31msize="large"[m[0m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m>[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m<AddCircleIcon />[m[0m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m</IconButton>[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m<IconButton[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32maria-label="create a new card"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32mcolor="inherit"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32monClick={() => {[m[0m
[1;32m[1;32m                [m[1;32;48;5;22m  [m[1;32mhistory.push("/cardform/new");[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m}}[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32msize="large"[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m>[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m<AddCircleIcon />[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m</IconButton>[m[0m
            </Tooltip>[m
[m
            <Tooltip title="Notifications">[m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m<IconButton[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31maria-label="show 2 new notifications"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31mcolor="inherit"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31msize="large"[m[0m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m>[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m<Badge badgeContent={2} color="error" sx={{ zIndex: "0" }}>[m[0m
[1;31m[1;31m                [m[1;31;48;5;52m[m[1;31m<NotificationsIcon />[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m</Badge>[m[0m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m</IconButton>[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m<IconButton[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32maria-label="show 2 new notifications"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32mcolor="inherit"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32msize="large"[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m>[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m<Badge badgeContent={2} color="error" sx={{ zIndex: "0" }}>[m[0m
[1;32m[1;32m                [m[1;32;48;5;22m  [m[1;32m<NotificationsIcon />[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m</Badge>[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m</IconButton>[m[0m
            </Tooltip>[m
[m
            <Tooltip title="Account and Settings">[m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m<IconButton[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31mref={accountRef}[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31medge="end"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31maria-label="account of current user"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31maria-controls={menuId}[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31maria-haspopup="true"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31monClick={handleProfileMenuOpen}[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31mcolor="inherit"[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31msize="large"[m[0m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m>[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m{currentUser?.photoURL ? ([m[0m
[1;31m[1;31m                [m[1;31;48;5;52m[m[1;31m<Avatar[m[0m
[1;31m[1;31m                  [m[1;31;48;5;52m[m[1;31malt={currentUser?.displayName && currentUser?.email}[m[0m
[1;31m[1;31m                  [m[1;31;48;5;52m[m[1;31msrc={currentUser?.photoURL}[m[0m
[1;31m[1;31m                [m[1;31;48;5;52m[m[1;31m/>[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m) : ([m[0m
[1;31m[1;31m                [m[1;31;48;5;52m[m[1;31m<AccountCircle />[m[0m
[1;31m[1;31m              [m[1;31;48;5;52m[m[1;31m)}[m[0m
[1;31m[1;31m            [m[1;31;48;5;52m[m[1;31m</IconButton>[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m<IconButton[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32mref={accountRef}[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32medge="end"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32maria-label="account of current user"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32maria-controls={menuId}[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32maria-haspopup="true"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32monClick={handleProfileMenuOpen}[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32mcolor="inherit"[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32msize="large"[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m>[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m{currentUser?.photoURL ? ([m[0m
[1;32m[1;32m                [m[1;32;48;5;22m  [m[1;32m<Avatar[m[0m
[1;32m[1;32m                  [m[1;32;48;5;22m  [m[1;32malt={currentUser?.displayName && currentUser?.email}[m[0m
[1;32m[1;32m                  [m[1;32;48;5;22m  [m[1;32msrc={currentUser?.photoURL}[m[0m
[1;32m[1;32m                [m[1;32;48;5;22m  [m[1;32m/>[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m) : ([m[0m
[1;32m[1;32m                [m[1;32;48;5;22m  [m[1;32m<AccountCircle />[m[0m
[1;32m[1;32m              [m[1;32;48;5;22m  [m[1;32m)}[m[0m
[1;32m[1;32m            [m[1;32;48;5;22m  [m[1;32m</IconButton>[m[0m
            </Tooltip>[m
          </div>[m
          <div className={classes.sectionMobile}>[m
