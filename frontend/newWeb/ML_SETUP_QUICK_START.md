# ML Integration - Quick Start Guide

## 3-Minute Setup

### Step 1: Configure Environment Variables

Create/update `.env.local`:

```bash
# Point to your Flask ML service (default port 5000)
NEXT_PUBLIC_ML_SERVICE_URL=http://localhost:5000

# Enable ML predictions
NEXT_PUBLIC_USE_ML_PREDICTIONS=true
```

### Step 2: Start Your Flask ML Service

```bash
cd your-ml-service
python app.py
# Flask service running at http://localhost:5000
```

### Step 3: Start the Next.js Frontend

```bash
cd depression-assessment-platform
pnpm dev
# Frontend running at http://localhost:3000
```

### Step 4: Test It

1. Visit http://localhost:3000
2. Sign up
3. Take a test
4. Your ML model prediction (0, 1, 2, 3) will be used for scoring
5. Results show: Score, Severity Level, Confidence %, and Recommendations

---

## What Happens When User Takes a Test

```
User Submits Answers
    ↓
Frontend calls: POST /api/tests/predict
    ↓
Backend calls your Flask service: POST http://localhost:5000/predict
    ↓
Flask returns: {
  "prediction": 0|1|2|3,
  "confidence_score": 0.0-1.0
}
    ↓
Backend maps to severity and saves to Supabase
    ↓
Results displayed with:
  • Prediction score (0, 1, 2, or 3)
  • Severity label (Minimal, Mild, Moderate, Severe)
  • Confidence percentage (e.g., 87%)
  • AI-generated recommendations
```

---

## Your Flask Service Expected Format

### Input
Your service receives the user's test answers:
```json
{
  "q1": 0,
  "q2": 1,
  "q3": 2,
  ...
}
```

### Output
Your service must return:
```json
{
  "prediction": 2,
  "confidence_score": 0.87,
  "mental_health_tip": "Optional: Your insight here"
}
```

### Prediction Values Explained
- `0` = Minimal depressive indicators
- `1` = Mild depressive indicators  
- `2` = Moderate depressive indicators
- `3` = Severe depressive indicators (shows crisis resources)

---

## Automatic Mapping

The platform automatically maps ML predictions to:

| Prediction | → | Severity | Recommendations |
|---|---|---|---|
| 0 | → | Minimal | General wellness tips |
| 1 | → | Mild | Self-care practices |
| 2 | → | Moderate | Seek professional help |
| 3 | → | Severe | Crisis resources + professional help |

---

## Testing Your Integration

### Option 1: Through the UI
1. http://localhost:3000
2. Sign up → Take test → Submit
3. Check browser console for logs: `[v0] Calling ML prediction service`

### Option 2: Direct API Test
```bash
# After getting an auth token from login
curl -X POST http://localhost:3000/api/tests/predict \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "testType": "phq9",
    "answers": {"q1": 0, "q2": 1, "q3": 2, "q4": 1, "q5": 0, "q6": 1, "q7": 0, "q8": 1, "q9": 2}
  }'
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| "ML service not configured" | Check `NEXT_PUBLIC_ML_SERVICE_URL` in .env.local |
| "ML service returned 404" | Ensure Flask is running on correct port |
| "Confidence showing NaN" | Flask must return `confidence_score` as float 0.0-1.0 |
| Tests working but no ML predictions | Check `NEXT_PUBLIC_USE_ML_PREDICTIONS=true` |

---

## Files Modified for ML Integration

```
✅ .env.local.example - Added ML service URL config
✅ app/api/tests/predict/route.ts - New API endpoint
✅ app/tests/[testType]/page.tsx - Calls ML prediction
✅ components/result-card.tsx - Shows confidence %
✅ lib/types.ts - Added confidence percentage type
✅ ML_INTEGRATION.md - Full integration guide
```

---

## Next Steps

1. **Verify Flask service response format** matches expected output
2. **Test with sample answers** to ensure predictions work
3. **Deploy Flask service** to production (Railway, Render, AWS, etc.)
4. **Update NEXT_PUBLIC_ML_SERVICE_URL** to production URL
5. **Deploy Next.js** to Vercel or your hosting

---

## Full Documentation

For advanced configuration, troubleshooting, and deployment:
→ See `ML_INTEGRATION.md`

For all backend APIs:
→ See `BACKEND_SETUP.md`

For deployment:
→ See `DEPLOYMENT.md`
