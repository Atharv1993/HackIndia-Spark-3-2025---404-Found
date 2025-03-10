# AI-Powered PPT Generator

## Project Overview
This project is an AI-driven PowerPoint presentation generator that takes a user-provided description and creates a structured, slide-wise PowerPoint presentation. It utilizes Google's **Gemini-2.0-Flash** model for generating slide-wise content and the `python-pptx` library to construct and style the final PPT file. Users can input the **Title, Description, and Theme** of the presentation via the frontend, and the system automates the entire process of content generation and slide creation.

## Project Flow
1. **User Input:** The user provides the Title, Description, and Theme of the PPT on the frontend.
2. **API Call to Gemini Model:** The frontend sends the description to the Gemini-2.0-Flash model via an API call.
3. **Content Generation:** The model processes the input and returns a structured, slide-wise breakdown of the topic.
4. **PPT Creation:** The backend uses the `python-pptx` library to generate a PowerPoint file based on the structured content.
5. **Downloadable Output:** The generated PPT file is provided for the user to download.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Flask
- **AI Model:** Gemini-2.0-Flash
- **PPT Generation:** python pptx library

## How to Run the Project
### Prerequisites
- Python 3.x installed
- Node.js and npm installed
- API access to Gemini-2.0-Flash model

### Backend Setup
1. Clone the repository:
   git clone https://github.com/Atharv1993/HackIndia-Spark-3-2025---404-Found.git
   cd HackIndia-Spark-3-2025---404-Found/smart-presentation-generator-backend

2. Create a virtual environment and activate it:
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. Install required dependencies:
   pip install -r requirements.txt

4. Run the backend server:
   python app.py

### Frontend Setup
1. Navigate to the frontend folder:
   cd smart-presentation-generator-frontend

2. Install dependencies:
   npm install

3. Run the frontend application:
   npm start

### Usage untill now 
1. Open the frontend in the browser (`http://localhost:3000`).
2. Enter the **Title, Description, and Theme** of the PPT.
3. Click the **Generate PPT** button.
4. Download the AI-generated PowerPoint file.

## More Features that will be added on 2nd Day
- Support for different slide designs and animations
- Integration of images and charts based on the topic

