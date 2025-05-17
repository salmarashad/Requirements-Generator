from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from vertexai import init
from vertexai.preview.generative_models import GenerativeModel
from vertexai.generative_models import GenerationConfig
from dotenv import load_dotenv

# init flask app 
app = Flask(__name__)
# enable CORS for all routes 
CORS(app, resources={r"/api/*": {"origins": "*"}})


load_dotenv()
project_id = os.getenv("PROJECT_ID")
location = os.getenv("LOCATION")

# init vertex ai
init(project=project_id, location=location)
model = GenerativeModel("gemini-2.0-flash-001")

default_config = GenerationConfig(
    temperature=0.7,
    top_p=1.0,
    top_k=40,
    max_output_tokens= 6144
)

def get_user_roles(description):
    prompt = f"""
You are an assistant that only outputs role names.

Given the following application description:
"{description}"

Output ONLY a numbered list (1–6) of user roles by name only, without any description or explanation.
Example format:
1. Admin
2. End User
3. Manager
4. Customer Support
5. Vendor
6. Auditor

Strictly follow this format. Do NOT include any explanation or text after the list.
"""
    response = model.generate_content(prompt, generation_config=default_config)

    # Extract only role names, clean up lines like "1. Admin"
    return [
        line.split('.', 1)[1].strip()
        for line in response.text.strip().split('\n')
        if line.strip() and '.' in line
    ]


def get_user_stories(description, roles):
    prompt = f"""Given the application "{description}" and these users: {', '.join(roles)},
generate user stories per user, formatted as:
As a <user>, I want <something> so that <benefit>.
"""
    response = model.generate_content(prompt, generation_config=GenerationConfig(max_output_tokens=6144))
    return response.text.strip().split('\n')

def convert_to_requirements(user_stories):
    prompt = f"""Convert the following user stories into a list of software requirements, divided into:
1. Functional Requirements
2. Non-Functional Requirements
User Stories:
{chr(10).join(user_stories)}
"""
    response = model.generate_content(prompt, generation_config=GenerationConfig(max_output_tokens=6144))
    return response.text.strip()

@app.route('/api/generate-requirements', methods=['POST'])
def generate_requirements():
    data = request.json
    app_description = data.get('description', '')
    
    if not app_description:
        return jsonify({'error': 'Description is required'}), 400
    
    try:
        # get user roles
        roles = get_user_roles(app_description)
        
        # use all roles as confirmed
        confirmed_roles = roles
        
        # generate user stories
        stories = get_user_stories(app_description, confirmed_roles)
        
        # convert to requirements
        requirements = convert_to_requirements(stories)
        
        # return all data
        return jsonify({
            'roles': roles,
            'stories': stories,
            'requirements': requirements
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/generate-roles', methods=['POST'])
def api_generate_roles():
    data = request.json
    app_description = data.get('description', '')
    
    if not app_description:
        return jsonify({'error': 'Description is required'}), 400
    
    try:
        roles = get_user_roles(app_description)
        return jsonify({'roles': roles})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-stories', methods=['POST'])
def api_generate_stories():
    data = request.json
    app_description = data.get('description', '')
    roles = data.get('roles', [])
    
    if not app_description or not roles:
        return jsonify({'error': 'Description and roles are required'}), 400
    
    try:
        stories = get_user_stories(app_description, roles)
        return jsonify({'stories': stories})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-requirements-from-stories', methods=['POST'])
def api_generate_requirements():
    data = request.json
    stories = data.get('stories', [])
    
    if not stories:
        return jsonify({'error': 'Stories are required'}), 400
    
    try:
        requirements = convert_to_requirements(stories)
        return jsonify({'requirements': requirements})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)