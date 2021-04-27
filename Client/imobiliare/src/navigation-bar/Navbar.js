import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import React, { useContext, useState } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Home } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  white: {
    color: theme.palette.common.white,
  },
  right: {
    position: 'absolute',
    right: theme.spacing(4),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { token, userInfo, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Home className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          <Link href="/" color="inherit" underline="none">
            iMobiliare
          </Link>
        </Typography>
        { token ? (
          <div className={classes.right}>
            <Avatar
              src={userInfo.avatarSrc}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            />
          </div>
        )
          : (
            <div className={classes.right}>
              <Link
                href="/login"
                color="inherit"
                underline="none"
              >
                LOGIN
              </Link>
            </div>
          )}
      </Toolbar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => setAnchorEl(null)}
        >
          <Link
            href="/myprofile"
            color="inherit"
            underline="none"
          >
            Profilul meu
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => setAnchorEl(null)}
        >
          <Link
            href="/mylistings"
            color="inherit"
            underline="none"
          >
            Anunturile mele
          </Link>
        </MenuItem>
        <Link
          href="/login"
          color="inherit"
          underline="none"
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              logout();
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>

    </AppBar>
  );
};
export default Navbar;
