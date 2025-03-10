# app.py (enhanced version)
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import os
import json
import traceback
from datetime import datetime
from services.prompt_service import generate_slide_prompts
from services.slide_service import create_presentation
from services.theme_service import get_all_themes, get_theme_settings
from utils.gemini_client import get_gemini_response
from utils.cors_helper import setup_response_headers, handle_preflight

app = Flask(__name__)
CORS(app)  # Enable CORS for your React frontend

# Create necessary directories
os.makedirs('static/presentations', exist_ok=True)

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate_presentation():
    """Generate a presentation based on the provided topic and description."""
    # Handle CORS preflight
    preflight_response = handle_preflight()
    if preflight_response:
        return preflight_response
    
    # Get request data
    data = request.json
    topic = data.get('topic', '')
    description = data.get('description', '')
    theme_preference = data.get('theme', '')
    
    # Validate input
    if not topic:
        return jsonify({
            'success': False,
            'error': 'Topic is required'
        }), 400
    
    try:
        # Log request
        print(f"[{datetime.now()}] Generating presentation for topic: {topic}")
        
        # Generate slide-by-slide content using Gemini
        slide_contents = generate_slide_prompts(topic, description)
        
        # Create the PowerPoint file
        ppt_path = create_presentation(
            topic=topic,
            slide_contents=slide_contents,
            theme=theme_preference
        )
        
        # Return the file path or content
        return jsonify({
            'success': True,
            'file_path': ppt_path,
            'download_url': f"/api/download/{ppt_path}"
        })
    except Exception as e:
        # Log error
        print(f"[{datetime.now()}] Error generating presentation: {str(e)}")
        print(traceback.format_exc())
        
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download a generated presentation file."""
    # Path where presentations are stored
    file_path = os.path.join('static', 'presentations', filename)
    
    # Check if file exists
    if not os.path.exists(file_path):
        return jsonify({
            'success': False,
            'error': 'File not found'
        }), 404
    
    return send_file(
        file_path, 
        as_attachment=True,
        download_name=filename
    )

@app.route('/api/themes', methods=['GET'])
def get_themes():
    """Get a list of available presentation themes."""
    themes = get_all_themes()
    return jsonify({
        'success': True,
        'themes': themes
    })

@app.route('/api/suggest-theme', methods=['POST', 'OPTIONS'])
def suggest_theme():
    """Suggest a theme based on presentation topic."""
    # Handle CORS preflight
    preflight_response = handle_preflight()
    if preflight_response:
        return preflight_response
    
    data = request.json
    topic = data.get('topic', '')
    
    if not topic:
        return jsonify({
            'success': False,
            'error': 'Topic is required'
        }), 400
    
    try:
        # Get theme settings based on topic
        theme_settings = get_theme_settings(None, topic)
        theme_name = next((name for name, settings in get_all_themes().items() 
                           if settings["description"] == theme_settings["description"]), "professional")
        
        return jsonify({
            'success': True,
            'suggested_theme': theme_name,
            'theme_description': theme_settings["description"]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))