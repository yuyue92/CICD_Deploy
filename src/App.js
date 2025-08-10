import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Box, Divider, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import menuList from './menuList';
import useStore from './store';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';

const drawerWidthOpen = 200;
const drawerWidthClosed = 60;

export default function App() {
  const location = useLocation();
  const { user, setUser, isMenuOpen, toggleMenu } = useStore();

  const handleLogout = () => setUser(null);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {location.pathname !== '/login' && (
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton color="inherit" onClick={toggleMenu} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              React + MUI 后台管理
            </Typography>
            {user && (
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      )}

      {location.pathname !== '/login' && (
        <Drawer
          variant="permanent"
          sx={{
            width: isMenuOpen ? drawerWidthOpen : drawerWidthClosed,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isMenuOpen ? drawerWidthOpen : drawerWidthClosed,
              boxSizing: 'border-box',
              transition: 'width 0.3s'
            }
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {menuList.map((menu) => (
              <ListItemButton
                key={menu.path}
                component={Link}
                to={menu.path}
                selected={location.pathname === menu.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': { color: 'white' }
                  }
                }}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                {isMenuOpen && <ListItemText primary={menu.label} />}
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: location.pathname === '/login' ? 0 : 3,
          mt: location.pathname === '/login' ? 0 : 8,
          height: location.pathname === '/login' ? '100vh' : 'calc(100vh - 64px)',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9'
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          {menuList.map((menu) => (
            <Route
              key={menu.path}
              path={menu.path}
              element={
                <PrivateRoute>
                  {menu.element}
                </PrivateRoute>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}
