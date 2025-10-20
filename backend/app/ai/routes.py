from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from .gemini_service import GeminiService
from ..models import Transaction, Product
import json

ai_bp = Blueprint('ai', __name__)

# Initialize Gemini service
try:
    gemini = GeminiService()
except ValueError as e:
    print(f"Warning: {e}")
    gemini = None

@ai_bp.route('/recognize-product', methods=['POST'])
@jwt_required()
def recognize_product():
    """
    AI Feature 1: Product Recognition from Image
    POST /api/ai/recognize-product
    Body: { "image": "base64_encoded_image_data" }
    """
    if not gemini:
        return jsonify({"error": "AI service not configured. Please set GEMINI_API_KEY"}), 503

    try:
        data = request.get_json()
        image_data = data.get('image')

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        # Call Gemini Vision API
        result = gemini.recognize_product(image_data)

        # Parse JSON response from Gemini
        try:
            # Extract JSON from markdown code blocks if present
            if '```json' in result:
                result = result.split('```json')[1].split('```')[0].strip()
            elif '```' in result:
                result = result.split('```')[1].split('```')[0].strip()

            product_data = json.loads(result)
            return jsonify(product_data), 200

        except json.JSONDecodeError:
            # If Gemini returns plain text instead of JSON
            return jsonify({
                "product_name": "Unknown Product",
                "confidence": 0.0,
                "description": result
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ai_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    """
    AI Feature 2: Shopping Assistant Chatbot
    POST /api/ai/chat
    Body: { "message": "user message", "history": [...] }
    """
    if not gemini:
        return jsonify({"error": "AI service not configured. Please set GEMINI_API_KEY"}), 503

    try:
        data = request.get_json()
        user_message = data.get('message')
        history = data.get('history', [])

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Call Gemini Chat API
        response = gemini.chat_assistant(user_message, history)

        return jsonify({
            "response": response,
            "timestamp": "now"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ai_bp.route('/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    """
    AI Feature 4: Smart Product Recommendations
    GET /api/ai/recommendations
    """
    if not gemini:
        return jsonify({"error": "AI service not configured. Please set GEMINI_API_KEY"}), 503

    try:
        user_id = get_jwt_identity()

        # Get user's purchase history
        user_transactions = Transaction.query.filter_by(user_id=user_id).order_by(Transaction.created_at.desc()).limit(10).all()

        history_summary = []
        for trans in user_transactions:
            for item in trans.items:
                history_summary.append({
                    "product": item.product.name,
                    "quantity": item.quantity,
                    "price": item.price_at_purchase
                })

        # Get current cart (optional - could pass cart items)
        current_cart = request.args.get('cart', None)

        # Generate recommendations
        result = gemini.generate_recommendations(history_summary, current_cart)

        # Parse JSON response
        try:
            if '```json' in result:
                result = result.split('```json')[1].split('```')[0].strip()
            elif '```' in result:
                result = result.split('```')[1].split('```')[0].strip()

            recommendations = json.loads(result)
            return jsonify(recommendations), 200

        except json.JSONDecodeError:
            return jsonify({"recommendations": [], "error": "Failed to parse recommendations"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@ai_bp.route('/fraud-check', methods=['POST'])
@jwt_required()
def fraud_check():
    """
    AI Feature 3: Fraud Detection
    POST /api/ai/fraud-check
    Body: { "scan_data": {...}, "behavior": {...} }
    """
    if not gemini:
        return jsonify({"error": "AI service not configured. Please set GEMINI_API_KEY"}), 503

    try:
        data = request.get_json()
        scan_data = data.get('scan_data', {})
        user_behavior = data.get('behavior', {})

        # Call Gemini Fraud Detection
        result = gemini.detect_fraud_patterns(scan_data, user_behavior)

        # Parse JSON response
        try:
            if '```json' in result:
                result = result.split('```json')[1].split('```')[0].strip()
            elif '```' in result:
                result = result.split('```')[1].split('```')[0].strip()

            fraud_analysis = json.loads(result)
            return jsonify(fraud_analysis), 200

        except json.JSONDecodeError:
            return jsonify({
                "risk_level": "unknown",
                "confidence": 0.0,
                "error": "Failed to analyze"
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
