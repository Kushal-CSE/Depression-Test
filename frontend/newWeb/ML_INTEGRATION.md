# ML Model Integration Guide

## Overview

This document explains how to integrate your Flask ML prediction service (returning 0, 1, 2, 3 severity predictions) with the Depression Assessment Platform.

---

## Quick Start

### 1. Set Environment Variables

In your `.env.local` file:

```bash
# Flask ML service URL
NEXT_PUBLIC_ML_SERVICE_URL=http://localhost:5000

# Enable ML predictions (true/false)
NEXT_PUBLIC_USE_ML_PREDICTIONS=true
```

### 2. Start Your Services

**Terminal 1 - Start Flask ML Service:**
```bash
cd your-ml-service
python app.py
# Runs on http://localhost:5000
```

**Terminal 2 - Start Next.js Frontend:**
```bash
cd your-v0-project
pnpm dev
# Runs on http://localhost:3000
```

### 3. Test the Integration

1. Navigate to http://localhost:3000
2. Sign up or log in
3. Select a depression test (PHQ-9, BDI-II, CES-D, or AI-Test)
4. Answer all questions
5. Submit the test
6. View ML prediction results with confidence score

---

## How It Works

### Data Flow

```
User Answers (Questions 1-N)
        ↓
Frontend Test Page
        ↓
POST /api/tests/predict
        ↓
Convert Answers to Feature Format
        ↓
Call Flask ML Service (/predict)
        ↓
Flask ML Service Returns: {
  prediction: 0|1|2|3,
  confidence_score: 0.0-1.0,
  mental_health_tip: string
}
        ↓
Map to Severity Level & Save to DB
        ↓
Display Results with Confidence %
```

### Severity Mapping

The ML prediction values (0, 1, 2, 3) are automatically mapped to severity levels:

| ML Prediction | Severity Level | Label | Color |
|---------------|---|---|---|
| 0 | minimal | Minimal Depressive Indicators | Green |
| 1 | mild | Mild Depressive Indicators | Yellow |
| 2 | moderate | Moderate Depressive Indicators | Orange |
| 3 | severe | Severe Depressive Indicators | Red |

---

## API Endpoints

### Frontend API: POST /api/tests/predict

**Request:**
```json
{
  "testType": "phq9|bdi2|cesd|ai-test",
  "answers": {
    "q1": 0,
    "q2": 1,
    "q3": 2,
    ...
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Test results saved successfully",
  "result": {
    "id": "uuid",
    "testType": "phq9",
    "score": 2,
    "severityLevel": "moderate",
    "severityLabel": "Moderate Depressive Indicators",
    "interpretation": "Your responses suggest moderate depressive indicators...",
    "recommendations": [
      "Consider speaking with a mental health professional",
      "Establish a structured daily routine",
      ...
    ],
    "confidencePercentage": 87,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "ML service not configured|Not authenticated|Failed to save test results"
}
```

### Your Flask ML API: POST /predict

**Request Format:**
Your Flask service receives the answer data and returns predictions.

**Expected Request:**
```json
{
  "q1": 0,
  "q2": 1,
  "q3": 2,
  ...
}
```

**Expected Response:**
```json
{
  "prediction": 2,
  "confidence_score": 0.87,
  "mental_health_tip": "Optional insight from ML model"
}
```

---

## Recommendations Generation

Based on the ML prediction (0-3), the system automatically generates tailored recommendations:

### Level 0 (Minimal)
- Continue maintaining your current mental health practices
- Engage in regular physical activity and exercise
- Keep a consistent sleep schedule
- Stay connected with supportive friends and family

### Level 1 (Mild)
- Practice stress-reduction techniques like meditation
- Maintain a regular exercise routine
- Ensure adequate sleep (7-9 hours per night)
- Consider journaling to track your thoughts and feelings
- Reach out to friends or family for support

### Level 2 (Moderate)
- Consider speaking with a mental health professional
- Establish a structured daily routine
- Engage in activities you enjoy and find meaningful
- Practice self-compassion and be gentle with yourself
- Limit alcohol and caffeine intake
- Schedule regular check-ins with trusted people

### Level 3 (Severe)
- We strongly encourage you to speak with a mental health professional
- Consider calling 988 (Suicide & Crisis Lifeline) for immediate support
- Reach out to SAMHSA National Helpline: 1-800-662-4357
- Share your results with someone you trust
- Prioritize self-care and safety
- Explore therapy options (individual, group, or online counseling)

---

## Error Handling

### ML Service Not Configured
```
Error: "ML service not configured"
→ Check NEXT_PUBLIC_ML_SERVICE_URL in .env.local
```

### ML Service Connection Failed
```
Error: "ML service returned [status code]"
→ Ensure Flask service is running at the configured URL
→ Check CORS settings in Flask app
```

### Invalid Answer Format
```
Error: "Missing feature: [feature_name]"
→ Ensure all required answer fields are provided
→ Verify feature names match Flask model expectations
```

### Not Authenticated
```
Error: "Not authenticated"
→ User must be logged in to submit tests
→ Check Supabase auth session
```

---

## Database Schema

Test results are saved to the `test_results` table with ML prediction data:

```sql
CREATE TABLE test_results (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  test_type TEXT,
  score INTEGER,              -- ML prediction (0-3)
  severity_level TEXT,        -- Mapped from score
  interpretation TEXT,
  recommendations TEXT[],
  answers JSONB,              -- User's raw answers
  created_at TIMESTAMP
);
```

---

## Fallback to Local Scoring

If ML predictions are disabled or unavailable, the system falls back to local test scoring:

```bash
# Disable ML predictions
NEXT_PUBLIC_USE_ML_PREDICTIONS=false
```

This uses the built-in scoring logic for each test type (PHQ-9, BDI-II, CES-D).

---

## Troubleshooting

### "Module not found: Can't resolve '@supabase/ssr'"
✓ Run: `pnpm install`

### Flask service not responding
- Check Flask is running: `python app.py`
- Check port: `NEXT_PUBLIC_ML_SERVICE_URL` should match Flask port
- Check CORS: Flask must allow requests from http://localhost:3000

### ML predictions not being called
- Check: `NEXT_PUBLIC_USE_ML_PREDICTIONS=true` in .env.local
- Check browser console for API errors
- Verify user is authenticated before submitting test

### Confidence percentage showing NaN
- Ensure Flask returns `confidence_score` as a float (0.0-1.0)
- Check API response format matches expected schema

---

## Testing the Integration

### Manual Test
```bash
# 1. Sign up: http://localhost:3000/auth/signup
# 2. Take a test: http://localhost:3000/tests/phq9
# 3. Answer all questions
# 4. Submit
# 5. View results with ML prediction and confidence %
```

### API Test with cURL
```bash
# Get auth token first (from login)
TOKEN="your-jwt-token"

# Test the prediction endpoint
curl -X POST http://localhost:3000/api/tests/predict \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "testType": "phq9",
    "answers": {
      "q1": 0,
      "q2": 1,
      "q3": 2,
      "q4": 1,
      "q5": 0,
      "q6": 1,
      "q7": 0,
      "q8": 1,
      "q9": 2
    }
  }'
```

---

## Production Deployment

### Environment Variables Needed

```bash
# .env.local (or Vercel Env Vars)
NEXT_PUBLIC_ML_SERVICE_URL=https://your-ml-service.com
NEXT_PUBLIC_USE_ML_PREDICTIONS=true
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Flask Deployment Options

1. **Railway**: Deploy Flask app easily
2. **Render**: Simple Flask hosting
3. **AWS EC2**: Full control
4. **Heroku**: Legacy but simple
5. **Docker**: Containerize and deploy anywhere

### CORS Configuration

Ensure your Flask app allows requests from your frontend domain:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["https://your-domain.com"]}})
```

---

## Advanced Configuration

### Custom Severity Mapping

Edit `/app/api/tests/predict/route.ts` to customize the severity mapping:

```typescript
const SEVERITY_MAP = {
  0: { level: 'minimal', label: 'Your Label', ... },
  1: { level: 'mild', label: 'Your Label', ... },
  2: { level: 'moderate', label: 'Your Label', ... },
  3: { level: 'severe', label: 'Your Label', ... },
}
```

### Custom Recommendations

Edit the `generateRecommendations()` function to customize recommendations per severity level.

---

## Support Resources

For Level 3 (Severe) predictions, these resources are automatically shown:

- **988 Suicide & Crisis Lifeline**: Call or text 988 (US)
- **SAMHSA National Helpline**: 1-800-662-4357 (US)
- **Online Therapy Platforms**: BetterHelp, Talkspace, etc.

---

## Documentation Files

- `ML_INTEGRATION.md` - This file
- `BACKEND_SETUP.md` - Backend API documentation
- `DEPLOYMENT.md` - Deployment procedures
- `README.md` - Project overview

---

## Questions?

Refer to the Flask ML service documentation for feature requirements and model specifications.
