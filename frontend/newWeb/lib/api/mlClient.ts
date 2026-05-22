import { TestType, PredictionResponse, AssessmentResult, TestConfig } from '../types';
import { getTestConfig } from '../data/testConfigs';

const FLASK_API_URL = 'http://127.0.0.1:5000';

/**
 * Maps answers from our UI format to the ML model's expected feature format
 */
function mapAnswersToFeatures(
  answers: Record<string, number>,
  testConfig: TestConfig
): Record<string, number> {
  const features: Record<string, number> = {};
  
  testConfig.questions.forEach(question => {
    const value = answers[question.id];
    if (value !== undefined && question.featureNames) {
      question.featureNames.forEach(featureName => {
        features[featureName] = value;
      });
    }
  });

  return features;
}

/**
 * Fills in default values for features that weren't answered
 * This is needed because the ML model expects all 59 features
 */
function fillDefaultFeatures(features: Record<string, number>): Record<string, number> {
  // Default feature values when not provided
  const defaultFeatures: Record<string, number> = {
    'Gender': 0,
    'Relationship_Status_Divorced': 0,
    'Relationship_Status_In a Relationship': 0,
    'Relationship_Status_Married': 0,
    'Relationship_Status_Single': 0,
    'Age': 22,
    'Academic Status': 2,
    'Work_While_Study': 0,
    'Residential_Area_Hall': 0,
    'Residential_Area_With family': 0,
    'Residential_Area_Outside Hall': 0,
    'Social Economic Status': 2,
    'Financial_Pressure': 0,
    'Has_Debts': 0,
    'Satisfied_Living_Environment': 1,
    'Lost_Someone_Recently': 0,
    'Physical_Activity': 1,
    'Significant_Ailments': 0,
    'On_Medication': 0,
    'Smoking': 0,
    'Alcohol_Consumption': 0,
    'Sleep_Duration': 7,
    'Social_Media_Hours': 2,
    'Workload_Academic_Demand': 1,
    'Melancholic': 0,
    'Future_Hopelessness': 0,
    'Self_Perceived_Failure': 0,
    'Interest_Loss': 0,
    'Meaninglessness': 0,
    'Hopelessness_EndFeeling': 0,
    'Feeling_Insignificant': 0,
    'Self_Confidence_Erosion': 0,
    'Suicidal_Thoughts': 0,
    'Crying_Frequency': 0,
    'Agitation_Level': 0,
    'Social_Withdrawal': 0,
    'Indecisiveness': 0,
    'Anhedonia_No_Joy': 0,
    'Fatigue_Frequency': 0,
    'Insomnia': 0,
    'Irritability': 0,
    'Low_Appetite': 0,
    'Difficulty_Focusing': 0,
    'Easy_Fatigue': 0,
    'Low_Concentration': 0,
    'Difficulty_Speaking_Socially': 0,
    'High_Appetite': 0,
    'Restlessness': 0,
    'Life_Feels_Hard': 0,
    'Fear_Something_Bad': 0,
    'Recent_Abuse_Experience': 0,
    'Feels_Pitied': 0,
    'Lack_of_Pleasure': 0,
    'Feeling_Down': 0,
    'Feels_Others_Are_Kind': 1,
    'Performance_Decline': 0,
    'Share_Feelings_Lack': 0,
    'Social_LeftOut_Level': 0,
    'Isolation_Frequency': 0,
    'No_Support_Frequency': 0,
    'Loneliness_Frequency': 0,
    'Emotional_Alignment_Frequency': 2,
    'Presence_Not_Genuine_Frequency': 2,
    'Relationships_Unimportant_Level': 2,
  };

  // Merge provided features with defaults
  return { ...defaultFeatures, ...features };
}

/**
 * Sends assessment answers to Flask ML model for prediction
 */
/**
 * Submit assessment to the ML API
 * Used for "All 59 Questions" test type
 */
export async function submitToMLAPI(
  answers: Record<string, number>
): Promise<AssessmentResult> {
  // Map UI answers to ML model features
  let mlFeatures = mapAnswersToFeatures(answers, getTestConfig('all59')!);
  
  // Fill in default values for missing features
  mlFeatures = fillDefaultFeatures(mlFeatures);

  console.log("[v0] Sending assessment to Flask API:", {
    url: `${FLASK_API_URL}/predict`,
    featureCount: Object.keys(mlFeatures).length,
    sampleFeatures: Object.keys(mlFeatures).slice(0, 5)
  });

  try {
    const response = await fetch(`${FLASK_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlFeatures),
    });

    console.log("[v0] Flask API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[v0] Flask API error response:", errorText);
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(`Flask API error: ${errorData.error || errorText}`);
      } catch {
        throw new Error(`Flask API error (${response.status}): ${errorText}`);
      }
    }

    const data: PredictionResponse = await response.json();
    console.log("[v0] Flask API response data:", data);

    // Normalize mental_health_tip to array
    const tips = Array.isArray(data.mental_health_tip)
      ? data.mental_health_tip
      : [data.mental_health_tip];

    const result: AssessmentResult = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      testType: 'all59',
      date: new Date().toISOString(),
      answers,
      prediction: data.prediction as 0 | 1 | 2 | 3,
      confidenceScore: data.confidence_score,
      mentalHealthTips: tips,
    };

    console.log("[v0] Assessment result received:", result);
    return result;
  } catch (error) {
    console.error('[v0] Error submitting assessment:', error);
    throw error;
  }
}

/**
 * Submit assessment - routes to appropriate handler
 * (kept for backward compatibility)
 */
export async function submitAssessment(
  testType: TestType,
  answers: Record<string, number>
): Promise<AssessmentResult> {
  if (testType === 'all59') {
    return submitToMLAPI(answers);
  }
  
  // For calculated tests, this shouldn't be called
  // They handle scoring locally in the test page
  throw new Error(`Use local scoring for test type: ${testType}`);
}

/**
 * Get the progress percentage for a test
 */
export function getProgressPercentage(currentIndex: number, totalQuestions: number): number {
  return Math.round(((currentIndex + 1) / totalQuestions) * 100);
}

/**
 * Save assessment result to localStorage
 */
export function saveAssessmentToHistory(result: AssessmentResult): void {
  try {
    const history = getAssessmentHistory();
    history.push(result);
    localStorage.setItem('assessmentHistory', JSON.stringify(history));
    console.log('[v0] Assessment saved to history');
  } catch (error) {
    console.error('[v0] Error saving assessment to history:', error);
  }
}

/**
 * Get assessment history from localStorage
 */
export function getAssessmentHistory(): AssessmentResult[] {
  try {
    const history = localStorage.getItem('assessmentHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('[v0] Error retrieving assessment history:', error);
    return [];
  }
}

/**
 * Clear assessment history from localStorage
 */
export function clearAssessmentHistory(): void {
  try {
    localStorage.removeItem('assessmentHistory');
    console.log('[v0] Assessment history cleared');
  } catch (error) {
    console.error('[v0] Error clearing assessment history:', error);
  }
}

/**
 * Get latest assessment result for a specific test type
 */
export function getLatestAssessment(testType?: TestType): AssessmentResult | null {
  const history = getAssessmentHistory();
  if (testType) {
    const filtered = history.filter(a => a.testType === testType);
    return filtered.length > 0 ? filtered[filtered.length - 1] : null;
  }
  return history.length > 0 ? history[history.length - 1] : null;
}

/**
 * Get statistics from assessment history
 */
export function getAssessmentStatistics() {
  const history = getAssessmentHistory();
  if (history.length === 0) {
    return null;
  }

  const testTypeCounts: Record<TestType, number> = {
    phq9: 0,
    bdi2: 0,
    cesd: 0,
    all59: 0,
  };

  const severityCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

  history.forEach(assessment => {
    testTypeCounts[assessment.testType]++;
    severityCounts[assessment.prediction]++;
  });

  return {
    totalAssessments: history.length,
    testTypeCounts,
    severityCounts,
    averageConfidence: history.reduce((sum, a) => sum + a.confidenceScore, 0) / history.length,
    lastAssessmentDate: history[history.length - 1].date,
  };
}
