import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, TextField, Paper, Box, Grid, 
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { usePresentation } from '../context/PresentationContext';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const { setPresentationData } = usePresentation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: title,
          description: description,
          theme: theme
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPresentationData({
          downloadUrl: data.download_url,
          filePath: data.file_path
        });
        navigate('/viewer');
      } else {
        throw new Error('Failed to generate presentation');
      }
    } catch (error) {
      console.error('Failed to generate presentation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const themes = [
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'academic', label: 'Academic' },
    { value: 'tech', label: 'Tech' },
  ];

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Smart Presentation Generator
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Transform your ideas into beautiful, professional presentations in seconds
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Create your presentation
              </Typography>
              
              <TextField
                fullWidth
                label="Presentation Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter presentation title"
              />
              
              <TextField
                fullWidth
                multiline
                rows={8}
                label="Description"
                variant="outlined"
                margin="normal"
                placeholder="Enter content details or bullet points for your presentation"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="theme-select-label">Theme</InputLabel>
                <Select
                  labelId="theme-select-label"
                  value={theme}
                  label="Theme"
                  onChange={(e) => setTheme(e.target.value)}
                >
                  {themes.map((theme) => (
                    <MenuItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                disabled={isLoading || !title.trim() || !description.trim()}
              >
                {isLoading ? 'Generating...' : 'Generate Presentation'}
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>Convert text to beautifully designed slides</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>AI-powered design suggestions</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>Automatic content structuring</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>Smart image and icon suggestions</Typography>
                </Box>
                <Box component="li">
                  <Typography>Export to popular formats</Typography>
                </Box>
              </Box>
              
              <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
                How it works
              </Typography>
              <Box component="ol" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>Enter your presentation title and description</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>Choose a theme that fits your presentation style</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography>Our AI generates a structured presentation</Typography>
                </Box>
                <Box component="li">
                  <Typography>Download and share your presentation</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;