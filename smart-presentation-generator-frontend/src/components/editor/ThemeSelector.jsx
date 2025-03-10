import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Divider 
} from '@mui/material';
import { usePresentation } from '../../context/PresentationContext';

// Sample themes
const SAMPLE_THEMES = [
  {
    id: 'default',
    name: 'Default Theme',
    primaryColor: '#3f51b5',
    secondaryColor: '#f50057',
    backgroundColor: '#ffffff',
    textColor: '#212121',
    fontFamily: 'Roboto, sans-serif'
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    primaryColor: '#bb86fc',
    secondaryColor: '#03dac6',
    backgroundColor: '#121212',
    textColor: '#ffffff',
    fontFamily: 'Roboto, sans-serif'
  },
  {
    id: 'nature',
    name: 'Nature Theme',
    primaryColor: '#4caf50',
    secondaryColor: '#ff9800',
    backgroundColor: '#f5f5f5',
    textColor: '#2e7d32',
    fontFamily: 'Georgia, serif'
  },
  {
    id: 'tech',
    name: 'Tech Theme',
    primaryColor: '#00bcd4',
    secondaryColor: '#ff4081',
    backgroundColor: '#eceff1',
    textColor: '#263238',
    fontFamily: 'Courier New, monospace'
  },
  {
    id: 'elegant',
    name: 'Elegant Theme',
    primaryColor: '#9c27b0',
    secondaryColor: '#ffc107',
    backgroundColor: '#ffffff',
    textColor: '#424242',
    fontFamily: 'Playfair Display, serif'
  },
  {
    id: 'corporate',
    name: 'Corporate Theme',
    primaryColor: '#1976d2',
    secondaryColor: '#f57c00',
    backgroundColor: '#f8f9fa',
    textColor: '#37474f',
    fontFamily: 'Arial, sans-serif'
  }
];

const ThemeSelector = () => {
  const { presentation, changeTheme } = usePresentation();
  
  if (!presentation) {
    return <Typography>No presentation loaded</Typography>;
  }

  const handleThemeChange = (theme) => {
    changeTheme(theme);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select a Theme
      </Typography>
      
      <Grid container spacing={3}>
        {SAMPLE_THEMES.map((theme) => (
          <Grid item xs={12} sm={6} md={4} key={theme.id}>
            <Paper 
              elevation={presentation.theme.id === theme.id ? 8 : 1}
              sx={{ 
                p: 2, 
                cursor: 'pointer',
                border: presentation.theme.id === theme.id ? 2 : 0,
                borderColor: 'primary.main',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleThemeChange(theme)}
            >
              <Typography 
                variant="subtitle1" 
                gutterBottom 
                sx={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}
              >
                {theme.name}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Box sx={{ width: 24, height: 24, bgcolor: theme.primaryColor, borderRadius: 1 }} />
                <Box sx={{ width: 24, height: 24, bgcolor: theme.secondaryColor, borderRadius: 1 }} />
                <Box sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: theme.backgroundColor, 
                  borderRadius: 1,
                  border: '1px solid #e0e0e0'
                }} />
              </Box>
              
              <Box 
                sx={{ 
                  bgcolor: theme.backgroundColor,
                  p: 1.5,
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.primaryColor, 
                    fontFamily: theme.fontFamily,
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}
                >
                  Sample Title
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.textColor, 
                    fontFamily: theme.fontFamily,
                    fontSize: '0.7rem'
                  }}
                >
                  Sample content with the {theme.name} styling applied to show how your slides will look.
                </Typography>
              </Box>
              
              {presentation.theme.id === theme.id && (
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="small"
                  sx={{ mt: 1 }}
                  disabled
                >
                  Selected
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h6" gutterBottom>
        Custom Theme
      </Typography>
      
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Customize your presentation's colors, fonts, and visual elements.
        </Typography>
        
        <Button variant="outlined" fullWidth>
          Create Custom Theme
        </Button>
      </Paper>
    </Box>
  );
};

export default ThemeSelector;