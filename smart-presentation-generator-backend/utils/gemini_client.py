# utils/gemini_client.py
import google.generativeai as genai
from config import GEMINI_API_KEY

# Initialize the Gemini API
genai.configure(api_key=GEMINI_API_KEY)

def get_gemini_response(prompt):
    """Get a response from Gemini API."""
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(prompt)
    return response.text