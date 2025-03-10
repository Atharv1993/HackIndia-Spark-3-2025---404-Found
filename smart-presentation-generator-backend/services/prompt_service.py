# services/prompt_service.py (enhanced version)
from utils.gemini_client import get_gemini_response
import json
import re

def generate_slide_prompts(topic, description, num_slides=None):
    """Generate content for each slide based on the topic and description."""
    # Set default number of slides if not specified
    if not num_slides:
        num_slides = "5-8"  # Default range
    
    system_prompt = f"""
    You are a presentation creation assistant. Create a professional, well-structured 
    presentation outline with detailed content for each slide.
    
    Topic: {topic}
    Description: {description}
    
    Create a presentation with approximately {num_slides} slides including:
    1. A title slide with a subtitle that captures the essence of the topic
    2. An agenda/overview slide
    3. Content slides (detailed and informative)
    4. A conclusion slide with key takeaways
    
    For each slide, provide:
    - A concise, engaging slide title (8 words or less)
    - 3-5 bullet points (each 1-2 sentences max)
    - A brief note about what visuals would enhance this slide (optional)
    
    Format your response as a JSON array where each object represents a slide with these properties:
    - "title": The slide title
    - "content": Array of bullet points as strings
    - "visual_note": A string describing suggested visuals (chart type, image concept, etc.)
    
    Make this presentation informative, professional, and compelling.
    """
    
    # Get response from Gemini
    response = get_gemini_response(system_prompt)
    
    # Parse the JSON response
    try:
        # Try to extract JSON if it's wrapped in code blocks or other text
        json_match = re.search(r'```json\s*([\s\S]*?)\s*```|```\s*([\s\S]*?)\s*```|\{\s*"[\s\S]*?\s*\}\]', response)
        if json_match:
            json_str = json_match.group(1) or json_match.group(2) or json_match.group(0)
            slides_data = json.loads(json_str)
            return slides_data
        
        # If no code blocks, try to parse the whole response
        slides_data = json.loads(response)
        return slides_data
    except json.JSONDecodeError:
        # Manual extraction as fallback
        slides = []
        current_slide = None
        
        lines = response.split('\n')
        for line in lines:
            line = line.strip()
            
            # Skip empty lines
            if not line:
                continue
            
            # Check for slide title
            if (line.startswith('# ') or line.startswith('## ') or 
                line.startswith('Slide ') or re.match(r'^\d+\.', line)):
                
                # Save the previous slide if it exists
                if current_slide and 'title' in current_slide:
                    slides.append(current_slide)
                
                # Extract title
                title = re.sub(r'^# |^## |^Slide \d+: |\d+\.\s*', '', line)
                current_slide = {'title': title, 'content': [], 'visual_note': ''}
            
            # Check for bullet points
            elif line.startswith('- ') or line.startswith('* ') or re.match(r'^\d+\)', line):
                if current_slide:
                    content = re.sub(r'^- |^\* |^\d+\)\s*', '', line)
                    current_slide['content'].append(content)
            
            # Check for visual notes
            elif line.lower().startswith('visual') or 'image:' in line.lower():
                if current_slide:
                    visual = re.sub(r'^visual:?|^visual note:?', '', line, flags=re.IGNORECASE).strip()
                    current_slide['visual_note'] = visual
        
        # Add the last slide
        if current_slide and 'title' in current_slide:
            slides.append(current_slide)
        
        return slides