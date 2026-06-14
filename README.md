# Depression-Test

## Overview

Depression-Test is an AI-powered mental health assessment platform designed to help users evaluate depression severity using validated psychological assessment instruments and machine learning models.

The platform integrates:

* PHQ-9 Assessment
* BDI-II Assessment
* CES-D Assessment
* Machine Learning Prediction Models
* Personalized Recommendations
* Assessment History Tracking
* User Authentication and Authorization
* Web and Mobile Interfaces

The project represents the final stage of a multi-semester research initiative focused on applying Artificial Intelligence to mental health screening and support.

---

# Project Objectives

The primary goals of the system are:

1. Provide accessible mental health screening.
2. Predict depression severity using trained machine learning models.
3. Support multiple clinically recognized assessment scales.
4. Generate personalized recommendations.
5. Maintain longitudinal assessment history.
6. Enable future expansion toward explainable and personalized mental health analytics.

---

# Technology Stack

## Frontend

### Web Application

* Next.js
* React
* TypeScript
* Tailwind CSS
* Radix UI
* Recharts
* Lucide Icons

### Mobile Application

* React Native
* Expo
* TypeScript

---

## Backend

* Python
* Flask
* REST API Architecture
* JWT Authentication
* MongoDB

---

## Machine Learning

* Scikit-learn
* Pandas
* NumPy
* Joblib

Supported Models:

* Logistic Regression
* Support Vector Machine (SVM)
* Random Forest

---

## AI Recommendation Services

* Gemini API
* Ollama (Local LLM Support)

---

# System Architecture

```text
                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                 ┌────────────────────┐
                 │ Web / Mobile Front │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │ REST API Backend   │
                 └─────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
 ┌────────────┐   ┌──────────────┐   ┌─────────────┐
 │Auth Module │   │ ML Inference │   │ History DB  │
 └────────────┘   └──────┬───────┘   └─────────────┘
                          │
                          ▼
                 ┌───────────────────┐
                 │ Recommendation AI │
                 └───────────────────┘
```

---

# Repository Structure

```text
Depression-Test
│
├── newbackend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middleware/
│   │   ├── validators/
│   │   └── database/
│   │
│   ├── ml/
│   │   ├── inference/
│   │   ├── preprocessing/
│   │   ├── training/
│   │   └── trained_models/
│   │
│   └── tests/
│
├── frontend/
│   ├── newWeb/
│   └── mobileApp/
│
└── documentation/
```

---

# Core Features

## User Authentication

Features:

* User Registration
* User Login
* JWT Authentication
* Session Management
* Protected Routes

Endpoints:

```http
POST /auth/signup
POST /auth/login
GET  /dashboard
POST /predictions/predict

```

---

## Mental Health Assessments

Supported assessments:

### PHQ-9

Patient Health Questionnaire

* Depression screening
* Severity classification

### BDI-II

Beck Depression Inventory

* Clinical depression evaluation
* Cognitive symptom measurement

### CES-D

Center for Epidemiological Studies Depression Scale

* Population-level depression screening
* Emotional symptom assessment

---

## Machine Learning Prediction

The platform uses trained machine learning models to predict depression severity.

Prediction workflow:

```text
Questionnaire
      ↓
Feature Extraction
      ↓
Preprocessing
      ↓
ML Model
      ↓
Prediction
      ↓
Confidence Score
      ↓
Recommendation Engine
```

Outputs:

* Severity Level
* Confidence Score
* Risk Category
* Recommendation Set

---

# API Endpoints

## Authentication

### Signup

```http
POST /auth/signup
```

Request

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "Password"
}
```

---

### Login

```http
POST /auth/login
```

Request

```json
{
  "email": "user@example.com",
  "password": "Password"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

### Current User

```http
GET /auth/me
```

Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Prediction APIs

### Predict Depression Severity

```http
POST /predictions/predict
```

Request

```json
{
  "responses": {...}
}
```

Response

```json
{
  "prediction": 0,
  "confidence": 87.2,
  "recommendations": [...]
}
```

---

## Assessment History

Features:

* Retrieve previous assessments
* Track progress
* Analyze trends


---

# Data Flow

## Assessment Submission Flow

```text
User
 ↓
Select Assessment
 ↓
Answer Questions
 ↓
Frontend Validation
 ↓
Backend API
 ↓
Preprocessing Pipeline
 ↓
ML Prediction
 ↓
Recommendation Engine
 ↓
Database Storage
 ↓
Result Display
```

---

## Recommendation Flow

```text
Prediction
     +
Confidence Score
     +
Assessment Data
            ↓
Recommendation Engine
            ↓
Personalized Suggestions
```

Examples:

### Mild Symptoms

* Sleep improvement
* Exercise recommendations
* Mindfulness activities

### Moderate Symptoms

* Structured self-care
* Support network engagement
* Monitoring recommendations

### Severe Symptoms

* Professional consultation
* Crisis resources
* Immediate support suggestions

---

# Dashboard Features

The dashboard provides:

* Assessment history
* Depression severity trends
* Historical result comparison
* Recommendation review

---

# Security Features

* JWT Authentication
* Password Hashing
* Protected API Endpoints
* Input Validation
* Request Validation
* Environment-Based Configuration

---

# Machine Learning Pipeline

## Training

1. Dataset Collection
2. Data Cleaning
3. Feature Engineering
4. Feature Selection
5. Model Training
6. Hyperparameter Optimization
7. Evaluation

## Inference

```text
Input Responses
      ↓
Feature Mapping
      ↓
Preprocessing
      ↓
Model Loading
      ↓
Prediction
      ↓
Confidence Calculation
```

---

# Testing

The repository contains dedicated test suites for:

* Authentication
* Prediction
* Repositories
* Middleware
* Security
* Services
* ML Components
* API Integration

---

# Future Enhancements

Planned improvements include:

* Explainable AI (SHAP/LIME)
* Anxiety Prediction
* Stress Prediction
* Mobile Deployment
* Clinical Validation
* Multi-Language Support
* Chatbot Integration
* Personalized Longitudinal Learning

---

# Disclaimer

This platform is intended for educational, research, and screening purposes only.

The predictions generated by the system do not constitute medical diagnosis, psychiatric evaluation, or professional healthcare advice.

Users experiencing severe psychological distress should seek assistance from qualified mental health professionals.
