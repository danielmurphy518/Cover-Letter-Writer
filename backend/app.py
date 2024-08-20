import json
from flask import Flask, jsonify, request, send_file, Response
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import os
import fitz  # PyMuPDF for PDF processing

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'  # Directory to save uploaded files
KEYWORDS_FILE_PATH = 'backend/keywords.txt'  # Path to the keywords file
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load keywords from the keywords.txt file
def load_keywords():
    with open('keywords.txt', 'r') as file:
        lines = []
        for line in file:
            line = line.strip()
            lines.append(line)
    return lines

# Sample data
items = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"}
]
 
links = [
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    },
    {
        "link": "https://www.seek.co.nz/job/77566387?ref=search-standalone&type=promoted&origin=jobTitle#sol=4c4a049305f3d6d02095b3506690c9adc7dd2fd4",
        "title": "Senior Developer - Microsoft Job in Wellington Central, Wellington - SEEK",
        "found_keywords": {
            "Angular": 1,
            "HTML": 1,
            "Azure": 1,
            "Git": 1,
            "Android": 1,
            "iOS": 1
        }
    }
]

@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((i for i in items if i['id'] == item_id), None)
    if item is None:
        return jsonify({'error': 'Item not found'}), 404
    return jsonify(item)

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.json
    new_item = {
        'id': len(items) + 1,
        'name': data['name']
    }
    items.append(new_item)
    return jsonify(new_item), 201

@app.route('/api/links', methods=['GET'])
def get_links():
    app.logger.error(links)
    return jsonify(links)

@app.route('/api/links', methods=['POST'])
def add_link():
    data = request.json
    url = data.get('link')

    if not url:
        return jsonify({'error': 'Link is required'}), 400

    # Process the link
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Scrape the title of the webpage
        title = soup.title.string if soup.title else 'No title found'

        # Search for keywords in the entire soup content
        keywords = load_keywords()
        content = soup.get_text()
        found_keywords = {
            keyword: count 
            for keyword, count in ((keyword, content.lower().count(keyword.lower())) for keyword in keywords) 
            if count > 0
        }

        # Create the link object
        link_obj = {
            'link': url,
            'title': title,
            'found_keywords': found_keywords
        }

        # Append the link object to the list
        links.append(link_obj)

        return jsonify(link_obj), 201

    except requests.RequestException as e:
        app.logger.error(f"Error fetching the URL: {e}")
        return jsonify({'error': 'Failed to fetch the URL'}), 500


@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    item = next((i for i in items if i['id'] == item_id), None)
    if item is None:
        return jsonify({'error': 'Item not found'}), 404
    item['name'] = data['name']
    return jsonify(item)

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [i for i in items if i['id'] != item_id]
    return jsonify({'message': 'Item deleted'})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Assuming the uploaded file is a JSON file
    try:
        # Read the file and parse the JSON content
        file_content = file.read().decode('utf-8')
        json_data = json.loads(file_content)

        # Ensure that the JSON data is a list
        if isinstance(json_data, list):
            global links
            links = json_data  # Update the links variable with the parsed JSON data
        else:
            return jsonify({'error': 'Invalid JSON format'}), 400

        return get_links() 
    except Exception as e:
        app.logger.error(f"Error processing file: {e}")
        return jsonify({'error': 'Failed to process the file'}), 500

@app.route('/api/export', methods=['GET'])
def download_links_json():
    # Convert the links list to JSON string
    links_json = json.dumps(links, indent=4)
    
    # Create a response object with the JSON data as a file
    response = Response(
        links_json,
        mimetype='application/json',
        headers={'Content-Disposition': 'attachment;filename=links.json'}
    )

    return response



@app.route('/api/get_files', methods=['GET'])
def get_files():
    try:
        files = os.listdir(app.config['UPLOAD_FOLDER'])
        return jsonify({'files': files})
    except Exception as e:
        app.logger.error(f"Error listing files: {e}")
        return jsonify({'error': 'Failed to list files'}), 500

@app.route('/api/get_requirements', methods=['GET'])
def get_requirements():
    try:
        with open('keywords.txt', 'r') as file:
            content = file.read()
        return jsonify({"content": content})
    except FileNotFoundError:
        return jsonify(404, description="File not found")

@app.route('/api/save_requirements', methods=['POST'])
def save_requirements():
    content = request.json.get('content')
    if content is None:
        return jsonify({"error": "No content provided"}), 400
    try:
        with open('keywords.txt', 'w') as file:
            file.write(content)
        return jsonify({"message": "File saved successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/requirements', methods=['POST'])
def update_requirements():
    try:
        content = request.json.get('content')
        with open('keywords.txt', 'w') as file:
            file.write(content)
        return jsonify({'message': 'File updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Make sure Flask listens on all interfaces
