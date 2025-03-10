import React, { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
  Avatar
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Determine if we're on the editor or preview page
  const isEditorView = location.pathname === '/editor' || location.pathname === '/preview';
  
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box 
            component="span" 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              p: 0.5, 
              borderRadius: 1, 
              mr: 1,
              fontSize: '0.9rem'
            }}
          >
            SP
          </Box>
          Smart Presentation
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {isEditorView ? (
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              component={Link} 
              to="/"
              startIcon={<AddIcon />}
              sx={{ ml: 1 }}
            >
              New Presentation
            </Button>
          </Box>
        )}
        
        <IconButton color="inherit" sx={{ ml: 1 }}>
          <HelpIcon />
        </IconButton>
        
        <IconButton 
          color="inherit" 
          onClick={handleMenuOpen}
          sx={{ ml: 1 }}
        >
          <AccountCircleIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;