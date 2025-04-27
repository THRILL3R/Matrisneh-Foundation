from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Configure CORS with specific origins
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5000", "http://127.0.0.1:5000", "http://localhost:8000", "http://127.0.0.1:8000", "file://"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# MongoDB connection
try:
    client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
    db = client['matri_sneh_db']  # Database name
    donations = db['donations']    # Collection name
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")
    raise

@app.route('/api/donation', methods=['POST', 'OPTIONS'])
def submit_donation():
    logger.info("Received request to /api/donation")
    
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS request")
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
        
    try:
        logger.info("Processing POST request")
        data = request.get_json()
        logger.info(f"Received data: {data}")
        
        if not data:
            logger.error("No data received in request")
            return jsonify({
                'success': False,
                'message': 'No data received'
            }), 400
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'age', 'qualification', 'city', 'nationality', 'phone', 'aadhar']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return jsonify({
                'success': False,
                'message': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        # Add timestamp to the data
        data['submitted_at'] = datetime.utcnow()
        
        # Insert into MongoDB
        result = donations.insert_one(data)
        logger.info(f"Successfully inserted document with ID: {result.inserted_id}")
        
        response = jsonify({
            'success': True,
            'message': 'Donation form submitted successfully',
            'id': str(result.inserted_id)
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 201
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        response = jsonify({
            'success': False,
            'message': str(e)
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000) 