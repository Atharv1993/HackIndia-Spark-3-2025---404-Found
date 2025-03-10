import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ShareIcon from '@mui/icons-material/Share';
import { usePresentation } from '../context/PresentationContext';

const Preview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { presentation } = usePresentation();
  const navigate = useNavigate();
  
  if (!presentation) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <Typography variant="h5" gutterBottom>
          No presentation to preview
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    );
  }
  
  const totalSlides = presentation.slides.length;
  const currentSlide = presentation.slides[currentIndex];
  
  const handlePrevSlide = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentIndex(prev => Math.min(totalSlides - 1, prev + 1));
  };
  
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  
  const handleExportClick = () => {
    setExportOpen(true);
  };
  
  const handleExportClose = () => {
    setExportOpen(false);
  };
  
  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleShareClose = () => {
    setAnchorEl(null);
  };
  
  const renderSlideContent = () => {
    switch (currentSlide.layout) {
      case 'title':
        return (
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center"
            height="100%"
            textAlign="center"
            px={4}
          >
            <Typography variant="h3" gutterBottom component="div" sx={{ color: presentation.theme.primaryColor }}>
              {currentSlide.title}
            </Typography>
            {currentSlide.content[0] && (
              <Typography variant="h5" color="text.secondary">
                {currentSlide.content[0]}
              </Typography>
            )}
          </Box>
        );
      
      case 'bullets':
        return (
          <Box p={4} height="100%" display="flex" flexDirection="column">
            <Typography variant="h4" gutterBottom component="div" sx={{ color: presentation.theme.primaryColor }}>
              {currentSlide.title}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mt: 2 }}>
              {currentSlide.content.map((point, idx) => (
                <Box component="li" key={idx} sx={{ mb: 2 }}>
                  <Typography variant="h6">{point}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );
      
      case 'text-image':
        return (
          <Box p={4} height="100%" display="flex" flexDirection="column">
            <Typography variant="h4" gutterBottom component="div" sx={{ color: presentation.theme.primaryColor }}>
              {currentSlide.title}
            </Typography>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid item xs={6}>
                <Box>
                  {currentSlide.content.map((text, idx) => (
                    <Typography key={idx} variant="body1" paragraph>
                      {text}
                    </Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    bgcolor: 'grey.200',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1
                  }}
                >
                  <Typography color="text.secondary">Image Placeholder</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 'image-text':
        return (
          <Box p={4} height="100%" display="flex" flexDirection="column">
            <Typography variant="h4" gutterBottom component="div" sx={{ color: presentation.theme.primaryColor }}>
              {currentSlide.title}
            </Typography>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    bgcolor: 'grey.200',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1
                  }}
                >
                  <Typography color="text.secondary">Image Placeholder</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  {currentSlide.content.map((text, idx) => (
                    <Typography key={idx} variant="body1" paragraph>
                      {text}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 'quote':
        return (
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center"
            height="100%"
            textAlign="center"
            px={8}
          >
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                mb: 4,
                fontStyle: 'italic',
                color: presentation.theme.primaryColor,
                '&::before': { content: '"\\201C"', mr: 1 },
                '&::after': { content: '"\\201D"', ml: 1 }
              }}
            >
              {currentSlide.content[0]}
            </Typography>
            {currentSlide.content[1] && (
              <Typography variant="h6" color="text.secondary">
                — {currentSlide.content[1]}
              </Typography>
            )}
          </Box>
        );
      
      default:
        return (
          <Box p={4}>
            <Typography variant="h4" gutterBottom component="div" sx={{ color: presentation.theme.primaryColor }}>
              {currentSlide.title}
            </Typography>
            {currentSlide.content.map((text, idx) => (
              <Typography key={idx} variant="body1" paragraph>
                {text}
              </Typography>
            ))}
          </Box>
        );
    }
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: fullscreen ? '100vh' : 'calc(100vh - 64px)',
      bgcolor: fullscreen ? 'black' : 'background.default',
      position: 'relative'
    }}>
      {/* Controls and toolbar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 1,
        bgcolor: fullscreen ? 'rgba(0,0,0,0.5)' : 'background.paper',
        color: fullscreen ? 'white' : 'text.primary',
        ...(fullscreen && {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10
        })
      }}>
        <Box>
          <IconButton 
            onClick={() => navigate('/editor')}
            color={fullscreen ? 'inherit' : 'primary'}
          >
            <EditIcon />
          </IconButton>
        </Box>
        
        <Typography>
          Slide {currentIndex + 1} of {totalSlides}
        </Typography>
        
        <Box>
          <IconButton onClick={handleExportClick} color={fullscreen ? 'inherit' : 'primary'}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={handleShareClick} color={fullscreen ? 'inherit' : 'primary'}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={toggleFullscreen} color={fullscreen ? 'inherit' : 'primary'}>
            {fullscreen ? <CloseIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>
      </Box>
      
      {/* Main slide display */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: fullscreen ? 0 : 4
      }}>
        <Paper 
          elevation={fullscreen ? 0 : 3}
          sx={{ 
            width: fullscreen ? '100%' : '75%',
            height: fullscreen ? '100%' : '75%',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: presentation.theme.backgroundColor,
            color: presentation.theme.textColor,
            fontFamily: presentation.theme.fontFamily
          }}
        >
          {renderSlideContent()}
          
          {/* Navigation buttons */}
          <Box 
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <IconButton 
              onClick={handlePrevSlide} 
              disabled={currentIndex === 0}
              sx={{ 
                bgcolor: 'rgba(0,0,0,0.1)', 
                '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' } 
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton 
              onClick={handleNextSlide} 
              disabled={currentIndex === totalSlides - 1}
              sx={{ 
                bgcolor: 'rgba(0,0,0,0.1)', 
                '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' } 
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
      
      {/* Export Dialog */}
      <Dialog open={exportOpen} onClose={handleExportClose}>
        <DialogTitle>Export Presentation</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Choose export format:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              PowerPoint (.pptx)
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              PDF Document (.pdf)
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Image Series (.zip)
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExportClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      
      {/* Share Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleShareClose}
      >
        <MenuItem onClick={handleShareClose}>
          <Typography>Copy Link</Typography>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <Typography>Email</Typography>
        </MenuItem>
        <MenuItem onClick={handleShareClose}>
          <Typography>Embed</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Preview;