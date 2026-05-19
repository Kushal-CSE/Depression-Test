# Backend Setup Guide - Depression Assessment Platform

## Overview

The platform now features a complete production-ready backend powered by **Supabase** with PostgreSQL. All authentication, data storage, and API endpoints are fully functional.

## Database Schema

### Tables Created

#### 1. `profiles` Table
Stores user profile information linked to Supabase Auth.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

**Row Level Security (RLS):** Users can only see/edit their own profile.

#### 2. `test_results` Table
Stores all depression assessment test results.

```sql
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL CHECK (test_type IN ('phq9', 'bdi2', 'cesd', 'ai-test')),
  score INTEGER NOT NULL,
  severity_level TEXT NOT NULL,
  interpretation TEXT,
  recommendations TEXT[] DEFAULT '{}',
  answers JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

**Indexes:** Optimized for user_id and created_at queries for fast retrieval.
**RLS:** Users can only see their own test results.

## API Endpoints

All endpoints require authentication except `/auth/signup` and `/auth/login`.

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "username": "johnsmith"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Signup successful! Please check your email to confirm.",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST `/api/auth/login`
Sign in with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johnsmith"
  }
}
```

#### POST `/api/auth/logout`
Sign out the current user.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/api/auth/me`
Get current user profile information. **Requires authentication.**

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johnsmith",
    "createdAt": "2026-05-10T10:00:00Z"
  }
}
```

### Test Endpoints

#### POST `/api/tests/submit`
Submit a completed test and save results. **Requires authentication.**

**Request Body:**
```json
{
  "testType": "phq9",
  "score": 15,
  "severityLevel": "Moderate",
  "interpretation": "Your responses suggest elevated depressive indicators...",
  "recommendations": [
    "Consider speaking with a mental health professional",
    "Practice daily self-care activities"
  ],
  "answers": {
    "q1": 1,
    "q2": 2,
    "q3": 1
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Test results saved successfully",
  "result": {
    "id": "uuid",
    "testType": "phq9",
    "score": 15,
    "severityLevel": "Moderate",
    "interpretation": "...",
    "recommendations": [...],
    "createdAt": "2026-05-10T10:00:00Z"
  }
}
```

#### GET `/api/tests/history`
Retrieve user's test history. **Requires authentication.**

**Query Parameters:**
- `testType` (optional): Filter by test type ('phq9', 'bdi2', 'cesd', 'ai-test')
- `limit` (default: 50): Number of results
- `offset` (default: 0): Pagination offset

**Example:** `/api/tests/history?testType=phq9&limit=10&offset=0`

**Response (200):**
```json
{
  "results": [
    {
      "id": "uuid",
      "testType": "phq9",
      "score": 15,
      "severityLevel": "Moderate",
      "interpretation": "...",
      "recommendations": [...],
      "createdAt": "2026-05-10T10:00:00Z"
    }
  ],
  "total": 5,
  "limit": 10,
  "offset": 0
}
```

#### GET `/api/tests/results/[id]`
Retrieve a specific test result. **Requires authentication.**

**Response (200):**
```json
{
  "result": {
    "id": "uuid",
    "testType": "phq9",
    "score": 15,
    "severityLevel": "Moderate",
    "interpretation": "...",
    "recommendations": [...],
    "answers": {...},
    "createdAt": "2026-05-10T10:00:00Z",
    "updatedAt": "2026-05-10T10:00:00Z"
  }
}
```

### Profile Endpoints

#### POST `/api/profile/update`
Update user profile information. **Requires authentication.**

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "profile": {
    "username": "newusername",
    "email": "newemail@example.com"
  }
}
```

## Authentication Flow

### Sign Up Flow
1. User submits signup form with email, password, and username
2. Frontend calls `POST /api/auth/signup`
3. Supabase creates user in `auth.users` table
4. Backend creates profile in `profiles` table
5. Confirmation email sent to user
6. User confirms email, gets redirected to `/auth/signup-success`
7. User can then log in

### Login Flow
1. User submits login form with email and password
2. Frontend calls `POST /api/auth/login`
3. Supabase authenticates user
4. Session token stored in HTTP-only cookie
5. User redirected to `/dashboard`

### Protected Routes
All dashboard and test routes are protected with middleware:
- Middleware checks for valid session
- Redirects to `/auth/login` if not authenticated
- Refreshes tokens automatically

## Environment Variables

Required environment variables (automatically set by Supabase integration):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Optional for development:
```
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Validation & Error Handling

### Frontend Validation
- React Hook Form + Zod validation
- Real-time error feedback
- User-friendly error messages

### Backend Validation
- Zod schema validation on all routes
- SQL constraints at database level
- RLS policies enforce authorization

### Error Responses

**Validation Error (400):**
```json
{
  "error": "Invalid email address"
}
```

**Authentication Error (401):**
```json
{
  "error": "Not authenticated"
}
```

**Server Error (500):**
```json
{
  "error": "An unexpected error occurred"
}
```

## Security Features

✅ **Row Level Security (RLS)** - Users only see their own data
✅ **Password Hashing** - Bcrypt via Supabase Auth
✅ **JWT Tokens** - Secure, HTTP-only cookies
✅ **CORS Protection** - Restricted origins
✅ **Input Validation** - Zod schemas on all endpoints
✅ **SQL Injection Prevention** - Parameterized queries via Supabase
✅ **Rate Limiting Ready** - Middleware support for future implementation

## Data Structure

### Test Result Schema
```typescript
interface TestResult {
  id: string;
  user_id: string;
  test_type: 'phq9' | 'bdi2' | 'cesd' | 'ai-test';
  score: number;
  severity_level: string;
  interpretation: string;
  recommendations: string[];
  answers: Record<string, number>;
  created_at: string;
  updated_at: string;
}
```

### User Profile Schema
```typescript
interface Profile {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
```

## Testing the Backend

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "username": "testuser"
  }'
```

**Submit Test:**
```bash
curl -X POST http://localhost:3000/api/tests/submit \
  -H "Content-Type: application/json" \
  -d '{
    "testType": "phq9",
    "score": 15,
    "severityLevel": "Moderate",
    "interpretation": "Test interpretation...",
    "recommendations": ["Recommendation 1"],
    "answers": {"q1": 1, "q2": 2}
  }'
```

## Troubleshooting

### Common Issues

**"Not authenticated" error**
- Make sure you've logged in first
- Check that cookies are enabled
- Verify session token in browser dev tools

**"Profile not found" error**
- Ensure profile creation trigger is enabled
- Check RLS policies are correctly configured
- Verify user exists in auth.users table

**CORS errors**
- Check Supabase CORS settings
- Verify application URL in Supabase dashboard

## Future Enhancements

- [ ] Rate limiting on sensitive endpoints
- [ ] Audit logging for test submissions
- [ ] Email notifications for new test results
- [ ] Analytics dashboard for aggregated stats
- [ ] Export test results as PDF
- [ ] Webhooks for test result notifications
- [ ] Admin dashboard for user management
