# Mental Health Assessment Platform - Complete Guide

## Overview

This is a **Mental Health Prediction Platform** powered by a Flask ML model that predicts user mental health states using severity levels 0-3 with confidence scoring and personalized recommendations.

## Platform Features

### 1. **ML-Powered Predictions**
- **Prediction Scale**: 0-3 severity levels
  - 0 = Minimal depressive indicators
  - 1 = Mild depressive indicators
  - 2 = Moderate depressive indicators
  - 3 = Severe depressive indicators with crisis resources

- **Confidence Scoring**: 0-100% showing model certainty
- **Personalized Recommendations**: Tailored advice based on severity level
- **Mental Health Tips**: AI-generated insights from your assessment

### 2. **Assessment Tests**
Four comprehensive mental health assessments:
- **PHQ-9** (Patient Health Questionnaire-9) - 9 questions
- **BDI-II** (Beck Depression Inventory-II) - 21 questions
- **CES-D** (Center for Epidemiologic Studies Depression Scale) - 20 questions
- **AI Depression Test** - 8 custom questions

### 3. **User Features**
- ✅ User authentication (signup/login)
- ✅ Dashboard with mental health status
- ✅ Complete assessment history
- ✅ Profile management
- ✅ Previous assessment tracking
- ✅ Personalized recommendations

### 4. **Result Visualization**
Enhanced UI displays:
- Severity level with color coding
- Confidence percentage with progress bar
- Numbered recommendations (1-5)
- Crisis resources for severe cases
- Model insights and tips

## Architecture

### Frontend (Next.js + React)
```
/components
  ├── mental-health-result.tsx      # Enhanced result display
  ├── mental-health-summary.tsx     # Dashboard summary
  ├── test-form-section.tsx         # Test form UI
  └── result-card.tsx               # Basic result card

/app
  ├── /tests/[testType]             # Test page
  ├── /dashboard                    # Dashboard
  ├── /profile                      # User profile
  └── /api/tests/predict            # ML prediction endpoint
```

### Backend (Flask + ML Model)
```python
Flask endpoints:
POST /predict                # ML predictions (0-3 scale)
POST /auth/signup           # User registration
POST /auth/login            # User login
GET /auth/me                # Get current user
```

## Prediction Severity Levels

### Level 0: Minimal 😊
- **Description**: Minimal depressive indicators
- **Color**: Green (#10B981)
- **Recommendations**:
  - Continue healthy lifestyle
  - Maintain exercise routine
  - Stay connected with community
  - Practice mindfulness

### Level 1: Mild 🙂
- **Description**: Mild depressive symptoms
- **Color**: Yellow (#F59E0B)
- **Recommendations**:
  - Talk to trusted people
  - Engage in enjoyable activities
  - Maintain healthy sleep
  - Monitor mood patterns

### Level 2: Moderate 😐
- **Description**: Moderate depressive symptoms
- **Color**: Orange (#F97316)
- **Recommendations**:
  - Speak with mental health professional
  - Establish daily routine
  - Limit social media
  - Consider therapy

### Level 3: Severe 😞
- **Description**: Significant depressive symptoms
- **Color**: Red (#EF4444)
- **Recommendations**:
  - Contact mental health professional immediately
  - Call crisis helpline
  - Reach out to trusted contacts
  - Seek emergency support if needed
  - **Crisis Resources**:
    - National Helpline: 988 (US)
    - Crisis Text Line: Text HOME to 741741

## ML Integration

### Input Format
```json
{
  "q1": 0, "q2": 1, "q3": 2, "q4": 1, "q5": 0,
  "q6": 1, "q7": 0, "q8": 1, "q9": 2
}
```

### Output Format
```json
{
  "prediction": 2,
  "confidence_score": 0.87,
  "mental_health_tip": "Optional insight"
}
```

### Confidence Percentage
- Converted from 0-1 float to 0-100% integer
- Displayed as progress bar in UI
- Used to assess model reliability

## Enhanced UI Components

### Mental Health Result Card
Large, attractive result display with:
- Emoji representation (😊, 🙂, 😐, 😞)
- Color-coded severity level
- Prediction score (0-3)
- Confidence percentage with bar
- Numbered recommendations
- Crisis resources (for level 3)
- Action buttons (Save, Share)

### Test Form Section
Clean test interface with:
- Progress bar at top
- Large readable question
- Interactive answer buttons
- Question counter
- Visual selection feedback
- Progress summary

### Mental Health Summary
Dashboard card showing:
- Latest assessment status
- Confidence percentage
- Time of assessment
- Total tests completed
- Quick insights

## Configuration

### Environment Variables
```bash
# ML Service
NEXT_PUBLIC_ML_SERVICE_URL=http://localhost:5000
NEXT_PUBLIC_USE_ML_PREDICTIONS=true

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Flask Server Setup
```bash
# Install dependencies
pip install flask flask-cors joblib pandas scikit-learn

# Run server
python app.py  # Listens on http://localhost:5000
```

### Next.js Server Setup
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev  # Runs on http://localhost:3000
```

## API Endpoints

### Prediction Endpoint
```
POST /api/tests/predict

Request:
{
  "testType": "phq9",
  "answers": { "q1": 0, "q2": 1, ... }
}

Response:
{
  "result": {
    "score": 2,
    "severityLevel": "moderate",
    "interpretation": "Your responses indicate moderate depressive symptoms",
    "recommendations": ["...", "...", ...],
    "confidencePercentage": 87
  }
}
```

### Test Submit Endpoint
```
POST /api/tests/submit

Saves assessment results to Supabase database
```

## Database Schema

### test_results Table
```sql
- id (UUID)
- user_id (UUID, FK to auth.users)
- test_type (phq9, bdi2, cesd, ai-test)
- score (integer 0-100)
- severity_level (text: minimal, mild, moderate, severe)
- interpretation (text)
- recommendations (array of strings)
- confidence_score (float 0-1)
- created_at (timestamp)
```

## User Flow

1. **Landing Page** → Sign up / Login
2. **Dashboard** → View mental health status
3. **Select Test** → Choose from 4 assessments
4. **Answer Questions** → Respond to questions
5. **ML Prediction** → Flask model predicts (0-3)
6. **View Results** → See score, confidence, recommendations
7. **Save to Database** → Store assessment in Supabase
8. **Track History** → View all past assessments

## UI/UX Best Practices

### Colors
- **Minimal (0)**: Green (#10B981)
- **Mild (1)**: Yellow (#F59E0B)
- **Moderate (2)**: Orange (#F97316)
- **Severe (3)**: Red (#EF4444)

### Typography
- **Headings**: Bold, large font (24-32px)
- **Body**: Clear, readable (16px base)
- **Labels**: Small, capitalized (12px)

### Spacing
- **Cards**: Rounded (12px), shadow
- **Buttons**: 8px padding, 4px radius
- **Gaps**: 16px, 24px standard spacing

### Interactive Elements
- Progress bars
- Animated transitions
- Hover states on buttons
- Visual feedback on selection

## Security Considerations

- ✅ User authentication required
- ✅ RLS (Row Level Security) on database
- ✅ Input validation on both frontend and backend
- ✅ HTTPS in production
- ✅ Secure password hashing
- ✅ JWT token management

## Troubleshooting

### ML Predictions Not Working
1. Check Flask server is running: `http://localhost:5000`
2. Verify `NEXT_PUBLIC_ML_SERVICE_URL` in .env
3. Ensure `NEXT_PUBLIC_USE_ML_PREDICTIONS=true`
4. Check network tab for API errors

### Database Not Saving
1. Verify Supabase connection
2. Check RLS policies
3. Ensure user is authenticated
4. Check API endpoint: `/api/tests/submit`

### UI Not Displaying Correctly
1. Clear browser cache
2. Restart dev server: `pnpm dev`
3. Check component imports
4. Verify Tailwind CSS is compiled

## Future Enhancements

- [ ] Trend analytics (view improvement over time)
- [ ] Comparison charts (test results over months)
- [ ] Export results as PDF
- [ ] Share with healthcare providers
- [ ] Multiple language support
- [ ] Mobile app version
- [ ] Social features (anonymous communities)
- [ ] Integration with therapy platforms

## Support Resources

- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

---

This platform is designed to provide supportive, non-judgmental mental health assessment with compassionate language and crisis resources.
