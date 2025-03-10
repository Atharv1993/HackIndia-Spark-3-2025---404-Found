import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button, 
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { usePresentation } from '../context/PresentationContext';

// Mock data for presentations
const MOCK_PRESENTATIONS = [
  {
    id: '1',
    title: 'Company Overview Q1 2025',
    slides: 12,
    lastEdited: new Date('2025-03-01'),
    thumbnail: null
  },
  {
    id: '2',
    title: 'Product Launch Strategy',
    slides: 8,
    lastEdited: new Date('2025-02-28'),
    thumbnail: null
  },
  {
    id: '3',
    title: 'Team Building Workshop',
    slides: 15,
    lastEdited: new Date('2025-02-25'),
    thumbnail: null
  },
  {
    id: '4',
    title: 'Annual Sales Report',
    slides: 20,
    lastEdited: new Date('2025-02-15'),
    thumbnail: null
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const { setPresentation } = usePresentation();
  const navigate = useNavigate();
  
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(id);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu('');
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleNewPresentation = () => {
    navigate('/');
  };
  
  const filteredPresentations = MOCK_PRESENTATIONS.filter(
    pres => pres.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            My Presentations
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleNewPresentation}
          >
            New Presentation
          </Button>
        </Box>
        
        <Box mb={4}>
          <TextField
            fullWidth
            placeholder="Search presentations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab label="All Presentations" id="dashboard-tab-0" />
            <Tab label="Recent" id="dashboard-tab-1" />
            <Tab label="Shared with me" id="dashboard-tab-2" />
          </Tabs>
        </Box>
        
        {/* {filteredPresentations.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={10}>
            <SlideshowIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No presentations found
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {searchTerm ? 
                `No results matching "${searchTerm}"` : 
                "You haven't created any presentations yet"}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              onClick={handleNewPresentation}
            >
              Create New Presentation
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredPresentations.map((presentation) => (
              <Grid item xs={12} sm={6} md={4} key={presentation.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 160,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      // In a real app, we would load the presentation here
                      navigate('/editor');
                    }}
                  >
                    {presentation.thumbnail ? (
                      <img 
                        src={presentation.thumbnail} 
                        alt={`Thumbnail for ${presentation.title}`}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                    ) : (
                      <SlideshowIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                    )}
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      noWrap
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate('/editor')}
                    >
                      {presentation.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {presentation.slides} slides • Last edited: {formatDate(presentation.lastEdited)}
                    </Typography>
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      onClick={() => navigate('/editor')}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<SlideshowIcon />}
                      onClick={() => navigate('/preview')}
                    >
                      Present
                    </Button>
                    
                    <Box flexGrow={1} />
                    
                    <IconButton 
                      size="small"
                      onClick={(e) => handleMenuOpen(e, presentation.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Rename
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <FolderIcon fontSize="small" sx={{ mr: 1 }} />
            Move to folder
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Duplicate
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu> */}
      </Box>
    </Container>
  );
};

export default Dashboard;