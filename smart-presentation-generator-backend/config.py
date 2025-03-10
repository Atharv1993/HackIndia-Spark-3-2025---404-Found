# config.py
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Application settings
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload