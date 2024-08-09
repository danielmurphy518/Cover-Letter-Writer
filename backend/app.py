import logging
from flask import Flask, jsonify, request
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
 
links = []

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

@app.route('/api/upload_file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully', 'file_path': file_path})

@app.route('/api/get_files', methods=['GET'])
def get_files():
    try:
        files = os.listdir(app.config['UPLOAD_FOLDER'])
        return jsonify({'files': files})
    except Exception as e:
        app.logger.error(f"Error listing files: {e}")
        return jsonify({'error': 'Failed to list files'}), 500

@app.route('/api/process_file', methods=['GET'])
def process_file():
    file_name = request.args.get('name')
    if not file_name:
        return jsonify({'error': 'File name is required'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    try:
        found_keywords = {}
        keywords = load_keywords()
        app.logger.error(keywords)
        
        if file_name.lower().endswith('.pdf'):
            doc = fitz.open(file_path)
            content = ''
            for page in doc:
                content += page.get_text()
            doc.close()

            found_keywords = {keyword: content.lower().count(keyword.lower()) for keyword in keywords}
        
        return jsonify({
            'file_name': file_name,
            'found_keywords': found_keywords
        })
    except Exception as e:
        app.logger.error(f"Error processing file: {e}")
        return jsonify({'error': 'Failed to process the file'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Make sure Flask listens on all interfaces
