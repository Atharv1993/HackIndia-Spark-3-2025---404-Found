import React, { createContext, useContext, useState } from 'react';

// Create context
const PresentationContext = createContext();

// Default theme
const defaultTheme = {
  id: 'default',
  name: 'Default Theme',
  primaryColor: '#3f51b5',
  secondaryColor: '#f50057',
  backgroundColor: '#ffffff',
  textColor: '#212121',
  fontFamily: 'Roboto, sans-serif'
};

export const PresentationProvider = ({ children }) => {
  const [presentation, setPresentation] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [presentationData, setPresentationData] = useState({
    downloadUrl: '',
    filePath: ''
  });

  const addSlide = (slide) => {
    if (!presentation) return;

    const newSlide = {
      ...slide,
      id: Date.now().toString(),
    };

    setPresentation({
      ...presentation,
      slides: [...presentation.slides, newSlide],
      lastEdited: new Date(),
    });
  };

  const updateSlide = (id, slideUpdates) => {
    if (!presentation) return;

    const updatedSlides = presentation.slides.map(slide => 
      slide.id === id ? { ...slide, ...slideUpdates } : slide
    );

    setPresentation({
      ...presentation,
      slides: updatedSlides,
      lastEdited: new Date(),
    });
  };

  const deleteSlide = (id) => {
    if (!presentation) return;

    const updatedSlides = presentation.slides.filter(slide => slide.id !== id);

    setPresentation({
      ...presentation,
      slides: updatedSlides,
      lastEdited: new Date(),
    });
  };

  const changeTheme = (theme) => {
    if (!presentation) return;

    setPresentation({
      ...presentation,
      theme,
      lastEdited: new Date(),
    });
  };

  const generateFromText = async (topic, description, theme) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          description,
          theme
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPresentationData({
          downloadUrl: data.download_url,
          filePath: data.file_path
        });
        return data;
      } else {
        throw new Error('Failed to generate presentation');
      }
    } catch (error) {
      console.error('Failed to generate presentation:', error);
      throw error;
    }
  };

  return (
    <PresentationContext.Provider
      value={{
        presentation,
        setPresentation,
        currentSlideIndex,
        setCurrentSlideIndex,
        addSlide,
        updateSlide,
        deleteSlide,
        changeTheme,
        generateFromText,
        presentationData,
        setPresentationData
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};