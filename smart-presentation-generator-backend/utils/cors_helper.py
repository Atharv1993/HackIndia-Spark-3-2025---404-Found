# utils/cors_helper.py
from flask import request, make_response, jsonify

def setup_response_headers(response):
    """Add CORS headers to response."""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def handle_preflight():
    """Handle CORS preflight requests."""
    if request.method == 'OPTIONS':
        response = make_response()
        response = setup_response_headers(response)
        return response
    return None