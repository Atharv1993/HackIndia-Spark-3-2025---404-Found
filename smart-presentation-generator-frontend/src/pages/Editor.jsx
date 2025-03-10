import React, { useState } from 'react';
import { Box, Grid, Paper, Tabs, Tab, IconButton, Typography, Divider, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { usePresentation } from '../context/PresentationContext';
import { useNavigate } from 'react-router-dom';

// Import editor components once they're created
// import SlideEditor from '../components/editor/SlideEditor';
// import ThemeSelector from '../components/editor/ThemeSelector';
// import SlidePreview from '../components/editor/SlidePreview';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`editor-tabpanel-${index}`}
      aria-labelledby={`editor-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Editor = () => {
  const [tabValue, setTabValue] = useState(0);
  const { 
    presentation, 
    currentSlideIndex, 
    setCurrentSlideIndex,
    addSlide,
    deleteSlide,
    updateSlide 
  } = usePresentation();
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
          No presentation loaded
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddSlide = () => {
    addSlide({
      title: 'New Slide',
      content: ['Add your content here'],
      layout: 'text-image'
    });
    setCurrentSlideIndex(presentation.slides.length);
  };

  const handleDeleteSlide = () => {
    if (presentation.slides.length <= 1) return;
    
    const slideToDelete = presentation.slides[currentSlideIndex];
    deleteSlide(slideToDelete.id);
    
    setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };

  const handleSlideSelect = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      {/* Top toolbar */}
      <Paper sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{presentation.title}</Typography>
        <Box>
          <IconButton onClick={() => console.log('Save clicked')}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => navigate('/preview')}>
            <SlideshowIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Main content area */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Left sidebar - slide thumbnails */}
        <Paper sx={{ width: 200, overflowY: 'auto', borderRight: 1, borderColor: 'divider' }}>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
            <IconButton size="small" onClick={handleAddSlide}>
              <AddIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleDeleteSlide}
              disabled={presentation.slides.length <= 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ p: 1 }}>
            {presentation.slides.map((slide, index) => (
              <Paper
                key={slide.id}
                elevation={currentSlideIndex === index ? 3 : 1}
                sx={{
                  p: 1,
                  my: 1,
                  cursor: 'pointer',
                  bgcolor: currentSlideIndex === index ? 'primary.light' : 'background.paper',
                  color: currentSlideIndex === index ? 'white' : 'inherit',
                }}
                onClick={() => handleSlideSelect(index)}
              >
                <Typography variant="body2" noWrap>
                  {slide.title || `Slide ${index + 1}`}
                </Typography>
                <Typography variant="caption" color={currentSlideIndex === index ? 'white' : 'text.secondary'}>
                  {slide.layout}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>

        {/* Main editing area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="editor tabs">
              <Tab label="Edit" id="editor-tab-0" aria-controls="editor-tabpanel-0" />
              <Tab label="Design" id="editor-tab-1" aria-controls="editor-tabpanel-1" />
              <Tab label="Transitions" id="editor-tab-2" aria-controls="editor-tabpanel-2" />
            </Tabs>
          </Box>
          
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <TabPanel value={tabValue} index={0}>
              {/* Content Editing Tab - Temporarily a placeholder */}
              <Typography>Content editor will go here</Typography>
              <pre>{JSON.stringify(presentation.slides[currentSlideIndex], null, 2)}</pre>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              {/* Design Tab */}
              <Typography>Theme selector will go here</Typography>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              {/* Transitions Tab */}
              <Typography>Transitions options will go here</Typography>
            </TabPanel>
          </Box>
        </Box>

        {/* Right sidebar - preview */}
        <Paper sx={{ width: 300, p: 2, overflowY: 'auto', borderLeft: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>Preview</Typography>
          <Box 
            sx={{ 
              width: '100%', 
              height: 200, 
              bgcolor: 'grey.100', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2 
            }}
          >
            <Typography>Slide preview will go here</Typography>
          </Box>
          
          <Typography variant="subtitle2" gutterBottom>Current Slide:</Typography>
          <Typography variant="body2">
            {presentation.slides[currentSlideIndex]?.title || `Slide ${currentSlideIndex + 1}`}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle2" gutterBottom>Layout:</Typography>
          <Typography variant="body2">
            {presentation.slides[currentSlideIndex]?.layout || 'Default'}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Editor;