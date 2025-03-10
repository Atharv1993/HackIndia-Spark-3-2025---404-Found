import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  IconButton,
  Paper,
  Grid,
  Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { usePresentation } from '../../context/PresentationContext';

const LAYOUT_OPTIONS = [
  { value: 'title', label: 'Title Slide' },
  { value: 'bullets', label: 'Bullet Points' },
  { value: 'text-image', label: 'Text with Image (Right)' },
  { value: 'image-text', label: 'Image with Text (Left)' },
  { value: 'quote', label: 'Quote' },
  { value: 'chart', label: 'Chart or Diagram' }
];

const SlideEditor = () => {
  const { presentation, currentSlideIndex, updateSlide } = usePresentation();
  
  if (!presentation || !presentation.slides[currentSlideIndex]) {
    return <Typography>No slide selected</Typography>;
  }
  
  const currentSlide = presentation.slides[currentSlideIndex];
  
  const handleTitleChange = (e) => {
    updateSlide(currentSlide.id, { title: e.target.value });
  };
  
  const handleLayoutChange = (e) => {
    updateSlide(currentSlide.id, { layout: e.target.value });
  };
  
  const handleContentChange = (index, value) => {
    const newContent = [...currentSlide.content];
    newContent[index] = value;
    updateSlide(currentSlide.id, { content: newContent });
  };
  
  const addContentItem = () => {
    const newContent = [...currentSlide.content, 'New point'];
    updateSlide(currentSlide.id, { content: newContent });
  };
  
  const removeContentItem = (index) => {
    const newContent = currentSlide.content.filter((_, i) => i !== index);
    updateSlide(currentSlide.id, { content: newContent });
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Slide Editor
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Slide Title"
            value={currentSlide.title || ''}
            onChange={handleTitleChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="slide-layout-label">Slide Layout</InputLabel>
            <Select
              labelId="slide-layout-label"
              id="slide-layout"
              value={currentSlide.layout}
              onChange={handleLayoutChange}
              label="Slide Layout"
            >
              {LAYOUT_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Content</Typography>
            <Button 
              startIcon={<AddIcon />} 
              onClick={addContentItem}
              size="small"
              variant="outlined"
            >
              Add Point
            </Button>
          </Box>
          
          {currentSlide.content.map((content, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2 
              }}
            >
              <TextField
                fullWidth
                multiline
                label={currentSlide.layout === 'bullets' ? `Bullet Point ${index + 1}` : `Content ${index + 1}`}
                value={content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                variant="outlined"
                size="small"
              />
              <IconButton 
                color="error" 
                onClick={() => removeContentItem(index)}
                disabled={currentSlide.content.length <= 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Grid>
        
        {(currentSlide.layout === 'image-text' || currentSlide.layout === 'text-image') && (
          <Grid item xs={12}>
            <Paper 
              variant="outlined"
              sx={{ 
                p: 2, 
                mt: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200
              }}
            >
              <ImageIcon sx={{ fontSize: 50, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Image Placeholder
              </Typography>
              <Button variant="outlined" startIcon={<AddIcon />}>
                Add Image
              </Button>
            </Paper>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Speaker Notes"
            value={currentSlide.notes || ''}
            onChange={(e) => updateSlide(currentSlide.id, { notes: e.target.value })}
            variant="outlined"
            margin="normal"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SlideEditor;