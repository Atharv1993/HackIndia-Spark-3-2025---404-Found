# services/slide_service.py (enhanced version)
from utils.ppt_generator import PPTGenerator
from services.theme_service import get_theme_settings
import os
import uuid
import re

def create_presentation(topic, slide_contents, theme=None):
    """Create a PowerPoint presentation based on provided content and theme."""
    # Get theme settings
    theme_settings = get_theme_settings(theme, topic)
    
    # Initialize PPT generator
    ppt_gen = PPTGenerator()
    
    # Add title slide
    subtitle = "Created with Smart Presentation Generator"
    ppt_gen.add_title_slide(topic, subtitle, theme_settings)
    
    # Process each slide
    for slide_data in slide_contents:
        title = slide_data.get('title', '')
        content = slide_data.get('content', [])
        
        # Check if this is likely an agenda/overview slide
        is_agenda = any(keyword in title.lower() for keyword in ['agenda', 'overview', 'outline', 'contents'])
        
        # Check if this is likely a conclusion/summary slide
        is_conclusion = any(keyword in title.lower() for keyword in ['conclusion', 'summary', 'key takeaway', 'thank you'])
        
        # Choose appropriate layout based on content
        if is_agenda:
            # Use section header for agenda
            layout_type = 2  # Section header layout
        elif is_conclusion:
            # Use title and content for conclusion
            layout_type = 1  # Title and content layout
        elif len(content) > 6:
            # Content-heavy slide
            layout_type = 1  # Title and content layout
        else:
            # Standard content slide
            layout_type = 1  # Title and content layout
        
        # Add the slide
        ppt_gen.add_content_slide(title, content, layout_type, theme_settings)
    
    # Create unique filename
    unique_id = str(uuid.uuid4())[:8]
    safe_topic = re.sub(r'[^\w\s-]', '', topic).strip().replace(' ', '_')
    file_name = f"{safe_topic}_{unique_id}.pptx"
    file_path = os.path.join('static', 'presentations', file_name)
    
    # Save the presentation
    ppt_gen.save(file_path)
    
    return file_name