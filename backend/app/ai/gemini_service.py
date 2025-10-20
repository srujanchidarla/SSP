import google.generativeai as genai
import os
from PIL import Image
import io
import base64

class GeminiService:
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key or api_key == 'your-gemini-api-key-here':
            raise ValueError("Please set GEMINI_API_KEY in your .env file")

        genai.configure(api_key=api_key)

        # Initialize models
        self.vision_model = genai.GenerativeModel('gemini-2.0-flash-exp')
        self.text_model = genai.GenerativeModel('gemini-1.5-flash')

    def recognize_product(self, image_data):
        """
        AI Feature 1: Product Recognition using Computer Vision
        Identifies products from images when barcodes are not available
        """
        try:
            # Decode base64 image
            if isinstance(image_data, str) and image_data.startswith('data:image'):
                # Remove data URL prefix
                image_data = image_data.split(',')[1]

            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))

            prompt = """You are a product recognition AI for a smart self-checkout system.
            Analyze this image and identify the product.

            Respond ONLY in this JSON format:
            {
                "product_name": "exact product name",
                "confidence": 0.95,
                "category": "category name",
                "description": "brief description"
            }

            If you cannot identify the product with high confidence, set confidence below 0.7"""

            response = self.vision_model.generate_content([prompt, image])
            return response.text

        except Exception as e:
            raise Exception(f"Product recognition failed: {str(e)}")

    def chat_assistant(self, user_message, conversation_history=None):
        """
        AI Feature 2: Shopping Assistant Chatbot
        Helps users find products, answers questions, provides recommendations
        """
        try:
            system_prompt = """You are a helpful shopping assistant for SmartScan Pro, a smart self-checkout application.

            Your capabilities:
            - Help users find products in the store
            - Answer questions about products, prices, and promotions
            - Provide shopping tips and suggestions
            - Assist with checkout process
            - Handle customer service inquiries

            Be friendly, concise, and helpful. If you don't know something, admit it politely.
            """

            # Build conversation context
            messages = []
            if conversation_history:
                messages.extend(conversation_history)

            messages.append({
                "role": "user",
                "content": f"{system_prompt}\n\nUser: {user_message}"
            })

            response = self.text_model.generate_content(user_message)
            return response.text

        except Exception as e:
            raise Exception(f"Chat assistant failed: {str(e)}")

    def generate_recommendations(self, user_history, current_cart=None):
        """
        AI Feature 4: Smart Recommendations
        Generates personalized product recommendations based on shopping history and current cart
        """
        try:
            prompt = f"""You are a smart recommendation engine for a grocery store.

            User's shopping history: {user_history}
            Current cart items: {current_cart if current_cart else 'Empty'}

            Based on this data, suggest 3-5 products the user might want to buy.
            Consider:
            - Frequently bought together items
            - Complementary products
            - Similar items they've purchased before
            - Seasonal relevance

            Respond in JSON format:
            {{
                "recommendations": [
                    {{"product": "Product Name", "reason": "why recommend this"}},
                    ...
                ]
            }}
            """

            response = self.text_model.generate_content(prompt)
            return response.text

        except Exception as e:
            raise Exception(f"Recommendations generation failed: {str(e)}")

    def detect_fraud_patterns(self, scan_data, user_behavior):
        """
        AI Feature 3: Fraud Detection
        Analyzes scanning patterns and user behavior to detect potential fraud
        """
        try:
            prompt = f"""You are a fraud detection AI for a self-checkout system.

            Analyze this data for suspicious patterns:

            Scan Data: {scan_data}
            User Behavior: {user_behavior}

            Look for:
            - Unusual scanning patterns (too fast, skipped items)
            - Mismatched product types
            - High-value items scanned as low-value items
            - Repeated failed scans
            - Suspicious timing patterns

            Respond in JSON format:
            {{
                "risk_level": "low/medium/high",
                "confidence": 0.85,
                "flags": ["list of suspicious patterns found"],
                "recommendation": "action to take"
            }}

            If no suspicious activity, return risk_level: "low" with empty flags.
            """

            response = self.text_model.generate_content(prompt)
            return response.text

        except Exception as e:
            raise Exception(f"Fraud detection failed: {str(e)}")
