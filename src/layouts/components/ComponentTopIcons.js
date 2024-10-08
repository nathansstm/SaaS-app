import React from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSnackbar } from './SnackbarContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ComponentTopIcons = () => {
  const showSnackbar = useSnackbar(); // Use the custom hook
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Navigation function
  const navigateOpen = (path) => {
    navigate(path); // Use navigate to change the route
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <IconButton 
        edge="end" 
        color="inherit" 
        aria-label="search"
        onClick={() => navigateOpen('/app')}
      >
        <SearchIcon sx={{ color: '#007FFF', fontSize: 30, borderRadius: '20px', border: '1px solid gray' }} />
      </IconButton>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="github"
        onClick={() => navigateOpen('/app/github')}
      >
        <GitHubIcon
          sx={{ color: '#007FFF', fontSize: 30, borderRadius: '20px', border: '1px solid gray' }}
        />
      </IconButton>
      <IconButton 
        edge="end" 
        color="inherit" 
        aria-label="notifications"
        onClick={() => showSnackbar('This is a Notification!')}
      >
        <NotificationsIcon sx={{ color: '#007FFF', fontSize: 30, borderRadius: '20px', border: '1px solid gray' }} />
      </IconButton>
      <IconButton 
        edge="end" 
        color="inherit" 
        aria-label="settings"
        onClick={() => navigateOpen('/app/settings')}
      >
        <SettingsIcon sx={{ color: '#007FFF', fontSize: 30, borderRadius: '20px', border: '1px solid gray' }} />
      </IconButton>
    </div>
  );
};

export default ComponentTopIcons;
