# Requirements Generator
A web application that uses AI to generate software requirements based on project descriptions.


## Overview
This tool helps software development teams quickly create requirements documents by:

- Analyzing project descriptions
- Identifying user roles
- Generating user stories
- Converting stories into formal requirements

## Tech Stack

- Frontend: React
- Backend: Flask
- AI: Google Vertex AI (Gemini 2.0)

## Setup

**Install dependencies**
```
pip install flask flask-cors python-dotenv google-cloud-aiplatform
```

**Set environment variables (create .env file)**
- PROJECT_ID=your-google-cloud-project-id
- LOCATION=us-central1

**Run server**
```
python app.py # or python3
```

**Install dependencies**
```
npm install
```

**Run development server**
```
npm start
```
## How to Use

- Enter your project description
- Select or customize user roles
- Generate user stories and requirements
- Review and export your requirements document
