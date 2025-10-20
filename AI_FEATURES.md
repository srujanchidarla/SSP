# SmartScan Pro - AI Features Documentation

## Overview
SmartScan Pro now includes 4 powerful AI features powered by Google Gemini API, making it an intelligent self-checkout system.

## AI Features

### 1. AI Product Recognition (Computer Vision)
**Location**: Products Page
**Purpose**: Identify products from images when barcodes are unavailable or damaged

**How it works**:
- Click "Take Photo" or "Upload Image" button on the Products page
- The AI analyzes the image using Google Gemini Vision
- Returns product name, category, description, and confidence score
- Products with confidence ≥ 70% are automatically identified

**Use Cases**:
- Fresh produce without barcodes
- Damaged or missing barcode labels
- Bulk items
- Custom or handmade products

---

### 2. AI Shopping Assistant (Chatbot)
**Location**: Floating chat button (bottom-right, available on all pages)
**Purpose**: Intelligent shopping assistant to help customers

**Capabilities**:
- Answer product questions
- Help find items in store
- Provide price information
- Suggest products
- Handle customer service inquiries
- Give shopping tips and advice

**How to use**:
- Click the purple/pink floating chat button
- Type your question or request
- Press Enter or click Send
- AI responds in real-time with helpful information

**Example Questions**:
- "Where can I find milk?"
- "What's on sale today?"
- "I need ingredients for pasta, what should I buy?"
- "How much is this product?"

---

### 3. Smart Product Recommendations
**Location**: Cart Page (at the top)
**Purpose**: Personalized product suggestions based on shopping history and current cart

**How it works**:
- Click "Get Suggestions" button in the cart
- AI analyzes your purchase history
- Considers items currently in your cart
- Generates 3-5 personalized recommendations with reasons

**Recommendation Logic**:
- Frequently bought together items
- Complementary products
- Similar items from past purchases
- Seasonal relevance
- Popular combinations

---

### 4. AI Fraud Detection (Backend)
**Location**: Backend API (runs automatically)
**Purpose**: Detect suspicious scanning patterns and potential fraud

**What it monitors**:
- Scanning speed (too fast = suspicious)
- Skipped items detection
- High-value items scanned as low-value
- Repeated failed scans
- Unusual behavioral patterns

**Risk Levels**:
- **Low**: Normal shopping behavior
- **Medium**: Slightly suspicious, monitor closely
- **High**: Alert staff for verification

**API Endpoint**: `POST /api/ai/fraud-check`

---

## Setup Instructions

### Prerequisites
- Google Account with Gemini API access
- Google Pro subscription (you mentioned you have this!)

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure Backend

1. Open `backend/.env` file
2. Find the line: `GEMINI_API_KEY=your-gemini-api-key-here`
3. Replace `your-gemini-api-key-here` with your actual API key
4. Save the file

Example:
```env
GEMINI_API_KEY=AIzaSyDxxx...your-actual-key-here...xxx
```

### Step 3: Restart Backend Server

```bash
cd backend
source venv/Scripts/activate  # Windows: venv\Scripts\activate
python run.py
```

### Step 4: Test AI Features

1. **Test Product Recognition**:
   - Go to Products page
   - Click "Take Photo" or "Upload Image"
   - Take/upload a product image
   - AI should identify it

2. **Test Chatbot**:
   - Click the floating chat icon (bottom-right)
   - Type "Hello" or ask a question
   - AI should respond

3. **Test Recommendations**:
   - Add items to cart
   - Go to Cart page
   - Click "Get Suggestions"
   - AI should provide recommendations

---

## API Endpoints

### Product Recognition
```
POST /api/ai/recognize-product
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

Response:
{
  "product_name": "Apple iPhone 15",
  "confidence": 0.95,
  "category": "Electronics",
  "description": "Latest model smartphone"
}
```

### Chat Assistant
```
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Where can I find milk?",
  "history": []
}

Response:
{
  "response": "You can find milk in the dairy section...",
  "timestamp": "2025-01-20T10:30:00"
}
```

### Smart Recommendations
```
GET /api/ai/recommendations
Authorization: Bearer <token>

Response:
{
  "recommendations": [
    {
      "product": "Eggs",
      "reason": "Frequently bought with milk"
    },
    ...
  ]
}
```

### Fraud Detection
```
POST /api/ai/fraud-check
Authorization: Bearer <token>
Content-Type: application/json

{
  "scan_data": {...},
  "behavior": {...}
}

Response:
{
  "risk_level": "low",
  "confidence": 0.88,
  "flags": [],
  "recommendation": "No action needed"
}
```

---

## Technology Stack

- **AI Model**: Google Gemini (gemini-2.0-flash-exp for vision, gemini-1.5-flash for text)
- **Backend**: Python with `google-generativeai` SDK
- **Frontend**: React/Next.js with TypeScript
- **Camera Access**: WebRTC (getUserMedia API)
- **Image Processing**: Base64 encoding

---

## Cost & Usage

- **Google Gemini Free Tier**:
  - 60 requests per minute
  - 1,500 requests per day
  - Perfect for development and testing

- **Gemini Pro (your subscription)**:
  - Higher rate limits
  - Better performance
  - More reliable for production

---

## Troubleshooting

### "AI service not configured" error
- Check that `GEMINI_API_KEY` is set in `backend/.env`
- Restart the backend server after adding the key

### Camera not working
- Grant camera permissions in your browser
- Check if HTTPS is required (some browsers only allow camera on HTTPS)
- Try "Upload Image" as alternative

### Poor recognition accuracy
- Ensure good lighting when taking photos
- Center the product in the frame
- Try multiple angles if first attempt fails

### Chatbot not responding
- Check backend console for errors
- Verify API key is valid
- Check internet connection

---

## Future Enhancements

1. **Voice Shopping Assistant**: Add voice input/output to chatbot
2. **Multilingual Support**: Support multiple languages
3. **Receipt Analysis**: AI to review and validate receipts
4. **Predictive Shopping Lists**: AI suggests what you'll need based on habits
5. **Price Comparison**: AI finds best deals across products
6. **Nutritional Analysis**: AI provides health insights for food items

---

## Credits

Powered by **Google Gemini AI** - State-of-the-art multimodal AI model
