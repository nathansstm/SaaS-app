import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ComponentDrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const toggleDrawer = (state) => (event) => {
    setOpen(state);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  // Navigation function
  const navigateOpen = (path) => {
    navigate(path); // Use navigate to change the route
    setOpen(false); // Close the drawer after navigation
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
        <MenuIcon sx={{ color: '#007FFF', fontSize: 30 }} />
      </IconButton>

      <Drawer 
        anchor="left" 
        open={open} 
        onClose={toggleDrawer(false)} 
        sx={{ 
          bgcolor: 'black', // This applies a background color to the drawer area
          '& .MuiDrawer-paper': { // This targets the drawer paper specifically
            bgcolor: 'black', // Set the drawer paper background to black
            color: '#007FFF', // Set the text color for drawer items
          },
        }} 
      >
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => navigateOpen('/app')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={toggleServices}>
            <ListItemText primary="Services" />
            <ArrowDropDownIcon sx={{ color: '#007FFF' }} />
          </ListItem>
          {servicesOpen && (
            <>
              <ListItem button onClick={() => navigateOpen('/app/app')}>
                <ListItemText primary="Create App" />
              </ListItem>
              <ListItem button onClick={() => navigateOpen('/app/read')}>
                <ListItemText primary="Create App Read" />
              </ListItem>
              <ListItem button onClick={() => navigateOpen('/app/carousel')}>
                <ListItemText primary="Create App Carousel" />
              </ListItem>
              <ListItem button onClick={() => navigateOpen('/app/saas')}>
                <ListItemText primary="Create App Service" />
              </ListItem>
            </>
          )}
          <Divider />
          <ListItem button onClick={() => navigateOpen('/app/about')}>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button onClick={() => navigateOpen('/app/contact')}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default ComponentDrawerMenu;

