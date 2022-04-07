import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import {
  AppBar,
  MenuItem,
  Button,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box
} from '@mui/material';


function createNavBarItem(label, path, type = 'relative') {
  return {
    label: label,
    path: path,
    type: type
  }
}


export function Navbar() {
  const items = [
    createNavBarItem('Home', '/'),
    createNavBarItem('Stats', '/lookup'),
    createNavBarItem('Team', '/team-balancing'),
    createNavBarItem('Random', '/random-player-pick'),
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const icon = <img
    src='https://upload.wikimedia.org/wikipedia/commons/5/55/Overwatch_circle_logo.svg'
    className={styles.icon}
    alt='logo'
  />;

  return (
    <AppBar
      position='static'
      className={styles.navbar}
    >
      <Container
        maxWidth="xl"
        className={styles.container_background}
      >
        <Toolbar
          disableGutters
          color='inherit'
        >
          <Box>
            <IconButton
              size="small"
              aria-label="Icon"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              {icon}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {items.map((nav_item) => (
                <Link
                  to={nav_item.path}
                  className={[styles.link, styles.inherit_color].join(' ')}
                  key={nav_item.label}
                >
                  <MenuItem
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      textAlign="center"
                      className={styles.text_color}
                    >
                      {nav_item.label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {icon}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {items.map((nav_item) => (
              <Link
                key={nav_item.label}
                to={nav_item.path}
                className={styles.link}
              >
                <Button
                  key={nav_item.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                >
                  <div className={styles.text_color}>{nav_item.label}</div>
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
