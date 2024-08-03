import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import os


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


UPLOAD_FOLDER = 'uploads'  # Directory to save uploaded files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Sample data
items = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"}
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

@app.route('/api/link', methods=['POST'])
def process_link():
    data = request.json
    url = data['link']
    app.logger.info(f"Processing link: {url}")

    try:
        # Fetch the webpage
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        app.logger.info(soup)

        # Example: Scrape the title of the webpage
        title = soup.title.string if soup.title else 'No title found'

        # Example: Scrape all paragraphs
        paragraphs = [p.get_text() for p in soup.find_all('p')]

        # Search for keywords in the entire soup content
        keywords = ['Azure']
        content = soup.get_text()
        found_keywords = {keyword: content.lower().count(keyword.lower()) for keyword in keywords}

        return jsonify({
            'found_keywords': found_keywords
        })
    except requests.RequestException as e:
        app.logger.error(f"Error fetching the URL: {e}")
        return jsonify({'error': 'Failed to fetch the URL'}), 500


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
    app.logger.error("HELLO WORLD")
    try:
        files = os.listdir(app.config['UPLOAD_FOLDER'])
        app.logger.error(files)
        return jsonify({'files': files})
    except Exception as e:
        app.logger.error(f"Error listing files: {e}")
        return jsonify({'error': 'Failed to list files'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Make sure Flask listens on all interfaces
