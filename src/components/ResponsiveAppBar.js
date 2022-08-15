import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { useNavigate } from 'react-router-dom';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const paths = [
  { key: 'stations', path: '/stations', title: 'Stations' },
  { key: 'journeys', path: '/journeys', title: 'Journeys' }
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickMenu = (path) => {
    navigate(path)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#E5BD1A', marginBottom: 6 }}>
      <Container maxWidth={'xxl'}>
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleClickMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}>
              {paths.map(path => (
                <MenuItem
                  key={path.key}
                  onClick={() => handleClickMenu(path.path)}>
                  <Typography textAlign="center">{path.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              height: 40,
              width: 'auto',
              display: { xs: 'flex', md: 'none' }
            }}>
          </Typography>

          <Box sx={{
            display: 'flex',
            paddingY: '0px',
            width: '100%',
            alignItems: 'center',
            display: { xs: 'none', md: 'flex' }
          }}>
            <Box sx={theme => ({
              color: theme.palette.primary.main,
              marginRight: 6,
              fontSize: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            })}>
              <PedalBikeIcon fontSize='large' sx={{ marginRight: 1, marginTop: '-5px' }} />
              <Typography>CITYBIKES</Typography>
            </Box>
            {paths.map(path => (
              <Button
                key={path.key}
                onClick={() => handleClickMenu(path.path)}
                sx={theme => ({
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: 0.5,
                  color: theme.palette.primary.dark,
                })}>
                {path.title}
              </Button>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }} >
              {/* theme selector */}
            </Box>
          </Box>

          <Box hidden sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}></IconButton>
            </Tooltip>

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
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleClickMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
};


export default ResponsiveAppBar;
