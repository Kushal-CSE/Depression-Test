# Depression Assessment Platform

A modern, user-friendly web application for mental health assessments using validated questionnaires and AI-powered predictions. Built with Next.js 16, React 19, and integrated with a Flask ML backend.

## Features

### Assessment Options
- **PHQ-9**: Patient Health Questionnaire (9 questions)
- **BDI-2**: Beck Depression Inventory (21 questions)
- **CES-D**: Center for Epidemiological Studies Depression Scale (20 questions)
- **UCLA-8**: UCLA Loneliness Scale (8 questions)
- **Complete Assessment**: All 59 questions combined

### Core Functionality
- Interactive multi-step questionnaire interface
- Real-time answer tracking and progress visualization
- AI-powered depression severity prediction (0-3 scale)
- Confidence score for each prediction
- Personalized mental health recommendations
- Assessment history with persistence
- Dashboard for tracking trends
- Fully responsive design (mobile, tablet, desktop)

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI**: React 19 with shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Persistence**: Browser LocalStorage

### Backend Integration
- **Flask**: Python backend for ML predictions (runs on port 5000)
- **API**: RESTful endpoint at `/predict` for assessment submissions

## Project Structure

```
app/
├── page.tsx                 # Landing page with test selection
├── layout.tsx              # Root layout with providers
├── test/[testType]/        # Dynamic questionnaire pages
├── results/                # Results display page
└── dashboard/              # Assessment history dashboard

components/
├── QuestionCard.tsx        # Individual question component
├── NavigationButtons.tsx   # Previous/Next navigation
├── ResultsDisplay.tsx      # Results visualization
├── TestSelector.tsx        # Test selection UI
└── HistoryList.tsx        # Assessment history list

lib/
├── types/                  # TypeScript type definitions
├── data/testConfigs.ts    # All question configurations (59 questions)
├── contexts/              # React Context for state management
├── api/mlClient.ts        # Flask API integration

```

## Getting Started

### Prerequisites
- Node.js 18+ with pnpm
- Flask backend running on `http://localhost:5000`

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start the development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   - Visit `http://localhost:3000`

### Ensure Flask Backend is Running

The application communicates with a Flask backend for ML predictions:

```bash
# In your Flask project directory
python app.py
```

The backend should be running on `http://localhost:5000` and expose the `/predict` endpoint.

## How It Works

### Assessment Flow
1. **Landing Page**: User selects a questionnaire type
2. **Questionnaire**: Questions are displayed one at a time with scale options
3. **Progress Tracking**: Real-time progress bar and question counter
4. **Submission**: Answers are compiled and sent to Flask backend
5. **Results**: ML model returns severity score (0-3) and confidence
6. **Display**: Beautiful results page with interpretation and recommendations
7. **History**: Results saved to localStorage for future reference

### Flask Backend Integration

The application expects the Flask `/predict` endpoint to accept POST requests with the following structure:

```json
{
  "Feature_Name_1": 0,
  "Feature_Name_2": 1,
  "Feature_Name_3": 2,
  ...
}
```

And return responses like:

```json
{
  "prediction": 2,
  "confidence_score": 0.85,
  "mental_health_tip": ["Get professional help", "Practice self-care", ...]
}
```

## Usage Examples

### Taking an Assessment
1. Click on any of the 5 test cards on the landing page
2. Answer questions by clicking on the scale options
3. Click "Next" to proceed through questions
4. On the final question, click "Submit Assessment"
5. Wait for ML prediction and view results

### Viewing History
- Click "View Your Assessment History" on the landing page
- Dashboard shows all past assessments with severity levels
- Filter by date or severity
- Click "View Details" to see full results

### Data Persistence
- All assessment results are saved to browser's LocalStorage
- History persists across browser sessions
- Results can be cleared from the dashboard

## Severity Levels

The ML model returns predictions on a 0-3 scale:

- **0 - Minimal/Normal** (Green): No significant depressive symptoms
- **1 - Mild** (Yellow): Mild depressive symptoms, consider professional guidance
- **2 - Moderate** (Orange): Moderate depressive symptoms, recommend professional help
- **3 - Severe/Extreme** (Red): Severe depressive symptoms, seek immediate professional help

## API Integration Details

### Feature Mapping
Questions are mapped to backend features:
- Each questionnaire has its unique set of questions
- Questions are mapped to 59 backend features for the ML model
- Some features may have default values if not answered in that specific test
- Feature values are normalized to the model's expected ranges

### Error Handling
- Network errors show clear user messages
- Missing Flask backend shows instructive error
- Invalid answers are prevented with validation
- All errors are logged for debugging

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color-coded severity indicators with text descriptions
- Clear contrast ratios for readability
- Responsive design for all screen sizes

## Security & Privacy

- All assessments stored locally in browser (no server-side storage)
- No personal information collected or transmitted
- Results are encrypted in localStorage
- Compliant with privacy best practices
- Disclaimer shown to users about not replacing professional advice

## Customization

### Adding New Questions
Edit `lib/data/testConfigs.ts` and update:
1. Add new questions to the desired test configuration
2. Map each question to backend feature names
3. Define answer scales and values

### Changing Styling
- Tailwind CSS configuration in `tailwind.config.ts`
- Color palette defined in `lib/types/index.ts` (SEVERITY_LABELS)
- Component styles in respective component files

### Modifying Flask Integration
- Update API endpoint URL in `lib/api/mlClient.ts`
- Adjust feature mapping logic in `mapAnswersToFeatures()`
- Update response parsing in `submitAssessment()`

## Troubleshooting

### Flask Connection Error
- Ensure Flask backend is running on port 5000
- Check CORS configuration in Flask app
- Verify network connectivity

### Questions Not Loading
- Check `testConfigs.ts` for proper data structure
- Verify test type parameter in URL matches config names
- Check browser console for errors

### Results Not Saving
- Check browser LocalStorage is enabled
- Clear browser cache if storage issues persist
- Check browser developer tools Storage tab

## Mental Health Resources

If you or someone you know needs support:

- **National Suicide Prevention Lifeline**: 988 (call or text)
- **Crisis Text Line**: Text HOME to 741741
- **NAMI Helpline**: 1-800-950-NAMI
- **Mental Health America**: https://www.mentalhealth.gov/

## License

This project is for educational and research purposes.

## Support

For issues or questions, please check:
1. Browser console for error messages
2. Flask server logs for backend errors
3. Ensure both frontend and backend are running properly

---

**Note**: This application is for informational purposes only and should not be used as a substitute for professional medical advice. Always consult with a healthcare provider for diagnosis and treatment.
