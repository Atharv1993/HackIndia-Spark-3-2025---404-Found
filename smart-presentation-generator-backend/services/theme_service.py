# services/theme_service.py (enhanced version)
from utils.gemini_client import get_gemini_response
import json
import re

# Comprehensive theme definitions
THEMES = {
    "professional": {
        "background_color": (255, 255, 255),  # White
        "title_color": (0, 51, 102),  # Dark blue
        "content_color": (0, 0, 0),  # Black
        "accent_color": (0, 120, 212),  # Blue accent
        "title_font": "Arial",
        "content_font": "Arial",
        "title_font_size": 40,
        "content_font_size": 18,
        "description": "Clean and corporate look suitable for business presentations"
    },
    "creative": {
        "background_color": (240, 248, 255),  # Alice Blue
        "title_color": (70, 130, 180),  # Steel Blue
        "content_color": (47, 79, 79),  # Dark Slate Gray
        "accent_color": (255, 105, 180),  # Hot Pink
        "title_font": "Calibri",
        "content_font": "Calibri",
        "title_font_size": 44,
        "content_font_size": 20,
        "description": "Modern and artistic style for creative topics"
    },
    "minimal": {
        "background_color": (248, 248, 248),  # Off-white
        "title_color": (33, 33, 33),  # Dark gray
        "content_color": (66, 66, 66),  # Medium gray
        "accent_color": (128, 128, 128),  # Gray
        "title_font": "Helvetica",
        "content_font": "Helvetica",
        "title_font_size": 38,
        "content_font_size": 16,
        "description": "Simple, clean design focusing on content"
    },
    "vibrant": {
        "background_color": (42, 42, 64),  # Dark blue-gray
        "title_color": (255, 192, 0),  # Gold
        "content_color": (255, 255, 255),  # White
        "accent_color": (0, 204, 204),  # Teal
        "title_font": "Verdana",
        "content_font": "Verdana",
        "title_font_size": 42,
        "content_font_size": 18,
        "description": "Bold and energetic with high contrast colors"
    },
    "academic": {
        "background_color": (245, 245, 245),  # Light gray
        "title_color": (128, 0, 0),  # Maroon
        "content_color": (0, 0, 0),  # Black
        "accent_color": (169, 169, 169),  # Dark gray
        "title_font": "Georgia",
        "content_font": "Georgia",
        "title_font_size": 36,
        "content_font_size": 18,
        "description": "Traditional style suitable for educational content"
    },
    "tech": {
        "background_color": (15, 15, 35),  # Very dark blue
        "title_color": (0, 255, 153),  # Bright green
        "content_color": (204, 204, 204),  # Light gray
        "accent_color": (51, 153, 255),  # Bright blue
        "title_font": "Consolas",
        "content_font": "Consolas",
        "title_font_size": 40,
        "content_font_size": 18,
        "description": "Futuristic look ideal for technology topics"
    }
}

def get_theme_settings(theme_preference=None, topic=None):
    """
    Get theme settings based on preference and topic.
    If no specific theme is selected, suggest one based on the topic.
    """
    # If theme preference is directly specified and valid
    if theme_preference and theme_preference.lower() in THEMES:
        return THEMES[theme_preference.lower()]
    
    # If no valid theme is specified but we have a topic
    if topic and not theme_preference:
        # Ask Gemini to suggest the best theme based on the topic
        prompt = f"""
        I need to choose a presentation theme for a topic: "{topic}".
        Choose the single best matching theme from this list based on the topic:
        - professional (business, corporate, formal)
        - creative (art, design, innovation)
        - minimal (modern, simple, clean)
        - vibrant (energetic, bold, marketing)
        - academic (education, research, scholarly)
        - tech (technology, digital, futuristic)
        
        Reply with just one word: the name of the best matching theme.
        """
        
        try:
            response = get_gemini_response(prompt).strip().lower()
            # Extract theme name if it's embedded in text
            theme_match = re.search(r'(professional|creative|minimal|vibrant|academic|tech)', response)
            if theme_match:
                suggested_theme = theme_match.group(1)
                if suggested_theme in THEMES:
                    return THEMES[suggested_theme]
        except Exception as e:
            print(f"Error getting theme suggestion: {e}")
    
    # If theme preference is specified but invalid, or if suggestion fails
    if theme_preference:
        # Try to find a similar theme name
        theme_preference = theme_preference.lower()
        if "business" in theme_preference or "corp" in theme_preference:
            return THEMES["professional"]
        elif "art" in theme_preference or "design" in theme_preference:
            return THEMES["creative"]
        elif "simple" in theme_preference or "clean" in theme_preference:
            return THEMES["minimal"]
        elif "bold" in theme_preference or "color" in theme_preference:
            return THEMES["vibrant"]
        elif "edu" in theme_preference or "research" in theme_preference:
            return THEMES["academic"]
        elif "tech" in theme_preference or "digital" in theme_preference:
            return THEMES["tech"]
    
    # Default to professional if all else fails
    return THEMES["professional"]

def get_all_themes():
    """Return a list of all available themes with their descriptions."""
    return {name: {
        "name": name.capitalize(),
        "description": details["description"]
    } for name, details in THEMES.items()}