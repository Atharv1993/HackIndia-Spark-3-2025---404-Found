import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Box, CircularProgress } from '@mui/material';
import { usePresentation } from '../context/PresentationContext';
import { useNavigate } from 'react-router-dom';


const PresentationViewer = () => {
  const { presentationData } = usePresentation();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = () => {
    if (presentationData.downloadUrl) {
      setIsDownloading(true);
      
      // Create a full URL to the backend API endpoint
      const downloadUrl = `http://127.0.0.1:5000${presentationData.downloadUrl}`;
      
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', presentationData.filePath); // Use the filename from the response
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  // Check if we have presentation data
  if (!presentationData || !presentationData.downloadUrl) {
    return (
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            No Presentation Available
          </Typography>
          <Typography variant="body1" paragraph>
            You haven't generated a presentation yet or the session has expired.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/')}
          >
            Create a Presentation
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box py={8}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Your Presentation is Ready
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {presentationData.filePath}
          </Typography>
          
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography variant="body1" color="textSecondary">
              Your presentation has been generated and is ready to download.
            </Typography>
          </Box>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleDownload}
              disabled={isDownloading}
              startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isDownloading ? 'Downloading...' : 'Download Presentation'}
            </Button>
            
            <Button 
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
            >
              Create Another
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PresentationViewer;