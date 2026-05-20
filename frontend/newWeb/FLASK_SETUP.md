# Flask Backend Integration

This Mental Health Prediction Platform frontend is now fully integrated with your Flask backend on port 5000. No Supabase, just pure Flask!

## Quick Start (3 Steps)

### 1. Start Flask Backend
```bash
python app.py
# Flask runs on http://localhost:5000
```

### 2. Create .env.local
```bash
cp .env.local.example .env.local
```

Content:
```
NEXT_PUBLIC_FLASK_URL=http://localhost:5000
```

### 3. Start Next.js Frontend
```bash
pnpm dev
# Frontend runs on http://localhost:3000
```

## How It Works

### Authentication Flow
1. **Sign Up** → `POST /api/auth/signup` (Flask)
2. **Login** → `POST /api/auth/login` (Flask)
3. **Token Storage** → Saved in localStorage as `flask_token`
4. **Auth Check** → `GET /api/auth/me` on app load

### Test Submission Flow
1. User answers questions on test page
2. **Submit** → Calls Flask `/api/predict` directly
3. Flask returns: `{prediction: 0-3, confidence_score: 0.0-1.0, mental_health_tip: "..."}`
4. Frontend maps to severity: 0=minimal, 1=mild, 2=moderate, 3=severe
5. **Save** → `POST /api/predictions/save` (optional)
6. Display results with confidence %

### Profile Management
- **Get Profile** → `GET /api/user/profile` (Flask)
- **Update Profile** → `POST /api/user/profile` (Flask)

## Required Flask Endpoints

Your Flask backend must have these endpoints:

### Authentication
```
POST /api/auth/signup
  Input: {email, password, username}
  Output: {id, email, username, token}

POST /api/auth/login
  Input: {email, password}
  Output: {id, email, username, token}

GET /api/auth/me
  Output: {id, email, username}
```

### Predictions
```
POST /api/predict
  Input: {q1: 0-3, q2: 0-3, ...q9: 0-3}
  Output: {prediction: 0-3, confidence_score: 0-1, mental_health_tip: "string"}

POST /api/predictions/save
  Input: {testType, prediction, confidence, answers}
  Output: {success: true, id: "..."}
```

### User
```
POST /api/user/profile
  Input: {username?, email?}
  Output: {success: true}

GET /api/user/profile
  Output: {id, email, username}
```

## Frontend Auth Context

Use the `useAuth()` hook in any component:

```tsx
import { useAuth } from '@/lib/flask-auth-context'

export function MyComponent() {
  const { user, isLoading, isAuthenticated, login, logout } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Not logged in</div>

  return <div>Welcome {user.username}!</div>
}
```

## Flask Client Library

Pre-configured Flask API client at `/lib/flask-client.ts`:

```tsx
import { authAPI, predictAPI, profileAPI } from '@/lib/flask-client'

// Login
const user = await authAPI.login('user@example.com', 'password')

// Predict
const prediction = await predictAPI.predict(answers)

// Profile
const profile = await profileAPI.getProfile()
```

## Environment Variables

For **Development**:
```
NEXT_PUBLIC_FLASK_URL=http://localhost:5000
```

For **Production**:
```
NEXT_PUBLIC_FLASK_URL=https://your-flask-backend.com
```

## Troubleshooting

### "Cannot POST /api/predict"
- Make sure Flask is running on port 5000
- Check CORS headers in Flask app
- Verify endpoint path matches your Flask routes

### "Failed to save prediction"
- This is non-blocking, results still display
- Check Flask is accessible
- Verify save endpoint exists

### Token Not Working
- Check localStorage has `flask_token`
- Verify token format matches Flask JWT expectations
- Check token expiration

## Features Now Using Flask

✅ User registration & login
✅ Mental health predictions (0-3 scale)
✅ Confidence score display
✅ Test history tracking
✅ Profile management
✅ Dashboard with stats
✅ All data persisted to your Flask database

## No More Supabase!

- Removed all Supabase dependencies
- Removed Supabase auth context
- Removed middleware.ts (Flask handles auth)
- All API calls go directly to Flask

## What's Included

**Frontend Files:**
- `lib/flask-client.ts` - API client with interceptors
- `lib/flask-auth-context.tsx` - Auth state management
- Updated all pages to use Flask auth

**Configuration:**
- `.env.local.example` - Single env var for Flask URL
- All pages configured to call Flask endpoints

Your Flask backend is now the single source of truth for the entire platform!
