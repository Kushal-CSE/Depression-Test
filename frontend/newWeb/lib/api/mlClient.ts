import {
  TestType,
  PredictionResponse,
  AssessmentResult,
  TestConfig,
} from "../types";
import { getTestConfig } from "../data/testConfigs";

// const FLASK_API_URL = 'http://127.0.0.1:5000';
const FLASK_API_URL = "http://127.0.0.1:5000";

/**
 * Maps answers from our UI format to the ML model's expected feature format
 */
function mapAnswersToFeatures(
  answers: Record<string, number>,
  testConfig: TestConfig,
): Record<string, number> {
  const features: Record<string, number> = {};

  testConfig.questions.forEach((question) => {
    const value = answers[question.id];
    if (value !== undefined && question.featureNames) {
      question.featureNames.forEach((featureName) => {
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
function fillDefaultFeatures(
  features: Record<string, number>,
): Record<string, number> {
  // Default feature values when not provided
  const defaultFeatures: Record<string, number> = {
    Gender: 0,
    Relationship_Status_Divorced: 0,
    "Relationship_Status_In a Relationship": 0,
    Relationship_Status_Married: 0,
    Relationship_Status_Single: 0,
    Age: 22,
    "Academic Status": 2,
    Work_While_Study: 0,
    Residential_Area_Hall: 0,
    "Residential_Area_With family": 0,
    "Residential_Area_Outside Hall": 0,
    "Social Economic Status": 2,
    Financial_Pressure: 0,
    Has_Debts: 0,
    Satisfied_Living_Environment: 1,
    Lost_Someone_Recently: 0,
    Physical_Activity: 1,
    Significant_Ailments: 0,
    On_Medication: 0,
    Smoking: 0,
    Alcohol_Consumption: 0,
    Sleep_Duration: 7,
    Social_Media_Hours: 2,
    Workload_Academic_Demand: 1,
    Melancholic: 0,
    Future_Hopelessness: 0,
    Self_Perceived_Failure: 0,
    Interest_Loss: 0,
    Meaninglessness: 0,
    Hopelessness_EndFeeling: 0,
    Feeling_Insignificant: 0,
    Self_Confidence_Erosion: 0,
    Suicidal_Thoughts: 0,
    Crying_Frequency: 0,
    Agitation_Level: 0,
    Social_Withdrawal: 0,
    Indecisiveness: 0,
    Anhedonia_No_Joy: 0,
    Fatigue_Frequency: 0,
    Insomnia: 0,
    Irritability: 0,
    Low_Appetite: 0,
    Difficulty_Focusing: 0,
    Easy_Fatigue: 0,
    Low_Concentration: 0,
    Difficulty_Speaking_Socially: 0,
    High_Appetite: 0,
    Restlessness: 0,
    Life_Feels_Hard: 0,
    Fear_Something_Bad: 0,
    Recent_Abuse_Experience: 0,
    Feels_Pitied: 0,
    Lack_of_Pleasure: 0,
    Feeling_Down: 0,
    Feels_Others_Are_Kind: 1,
    Performance_Decline: 0,
    Share_Feelings_Lack: 0,
    Social_LeftOut_Level: 0,
    Isolation_Frequency: 0,
    No_Support_Frequency: 0,
    Loneliness_Frequency: 0,
    Emotional_Alignment_Frequency: 2,
    Presence_Not_Genuine_Frequency: 2,
    Relationships_Unimportant_Level: 2,
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
// export async function submitToMLAPI(
//   answers: Record<string, number>,
//   token: string
// ): Promise<AssessmentResult> {
//   // Map UI answers to ML model features
//   let mlFeatures = mapAnswersToFeatures(answers, getTestConfig('all59')!);

//   // Fill in default values for missing features
//   mlFeatures = fillDefaultFeatures(mlFeatures);
//   console.log(Object.keys(mlFeatures));
//   // console.log("[v0] Sending assessment to Flask API:", {
//   //   url: `${FLASK_API_URL}/predictions/predict`,
//   //   featureCount: Object.keys(mlFeatures).length,
//   //   sampleFeatures: Object.keys(mlFeatures).slice(0, 5)
//   // });

//   try {
//     const response = await fetch(`${FLASK_API_URL}/predictions/predict`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(mlFeatures),
//     });

//     console.log("[v0] Flask API response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("[v0] Flask API error response:", errorText);
//       try {
//         const errorData = JSON.parse(errorText);
//         throw new Error(`Flask API error: ${errorData.error || errorText}`);
//       } catch {
//         throw new Error(`Flask API error (${response.status}): ${errorText}`);
//       }
//     }

//     const data: PredictionResponse = await response.json();
//     console.log("[v0] Flask API response data:", data);

//     // Normalize mental_health_tip to array
//     const tips = Array.isArray(data.mental_health_tip)
//       ? data.mental_health_tip
//       : [data.mental_health_tip];

//     const result: AssessmentResult = {
//       id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       testType: 'all59',
//       date: new Date().toISOString(),
//       answers,
//       prediction: data.prediction as 0 | 1 | 2 | 3,
//       confidenceScore: data.confidence_score,
//       mentalHealthTips: tips,
//     };

//     console.log("[v0] Assessment result received:", result);
//     return result;
//   }
//   catch (error) {
//     console.error('[v0] Error submitting assessment:', error);
//     throw error;
//   }
// }
// Define the exact 64 feature keys present in your working Postman body
const EXACT_64_POSTMAN_FEATURES = [
  "Gender",
  "Relationship_Status_Single",
  "Relationship_Status_In a Relationship",
  "Relationship_Status_Married",
  "Relationship_Status_Divorced",
  "Age",
  "Academic Status",
  "Work_While_Study",
  "Residential_Area_Hall",
  "Residential_Area_Outside Hall",
  "Residential_Area_With family",
  "Social Economic Status",
  "Financial_Pressure",
  "Has_Debts",
  "Satisfied_Living_Environment",
  "Lost_Someone_Recently",
  "Physical_Activity",
  "Significant_Ailments",
  "On_Medication",
  "Smoking",
  "Alcohol_Consumption",
  "Sleep_Duration",
  "Social_Media_Hours",
  "Workload_Academic_Demand",
  "Melancholic",
  "Future_Hopelessness",
  "Self_Perceived_Failure",
  "Interest_Loss",
  "Meaninglessness",
  "Hopelessness_EndFeeling",
  "Feeling_Insignificant",
  "Self_Confidence_Erosion",
  "Crying_Frequency",
  "Agitation_Level",
  "Social_Withdrawal",
  "Indecisiveness",
  "Anhedonia_No_Joy",
  "Fatigue_Frequency",
  "Insomnia",
  "Irritability",
  "Low_Appetite",
  "Difficulty_Focusing",
  "Easy_Fatigue",
  "Low_Concentration",
  "Difficulty_Speaking_Socially",
  "High_Appetite",
  "Restlessness",
  "Life_Feels_Hard",
  "Fear_Something_Bad",
  "Recent_Abuse_Experience",
  "Feels_Pitied",
  "Lack_of_Pleasure",
  "Feeling_Down",
  "Feels_Others_Are_Kind",
  "Performance_Decline",
  "Share_Feelings_Lack",
  "Social_LeftOut_Level",
  "Isolation_Frequency",
  "No_Support_Frequency",
  "Loneliness_Frequency",
  "Emotional_Alignment_Frequency",
  "Presence_Not_Genuine_Frequency",
  "Relationships_Unimportant_Level",
  "Suicidal_Thoughts",
];

interface PostmanPredictionResponse {
  success: boolean;
  message: string;
  data: {
    bdi: { confidence: number; score: number };
    cesd: { confidence: number; score: number };
    phq9: { confidence: number; score: number };
  };
}

export async function submitToMLAPI(
  answers: Record<string, number>,
  token: string,
): Promise<AssessmentResult> {
  // 1. Map user inputs through your existing config parser
  let rawMappedFeatures = mapAnswersToFeatures(
    answers,
    getTestConfig("all59")!,
  );
  rawMappedFeatures = fillDefaultFeatures(rawMappedFeatures);

  // 2. Strict Filter: Force-reconstruct the payload matching Postman precisely
  const cleanPayload: Record<string, number> = {};
  EXACT_64_POSTMAN_FEATURES.forEach((key) => {
    const val = rawMappedFeatures[key];
    cleanPayload[key] = val !== undefined && val !== null ? val : 0;
  });
  console.log(JSON.stringify(token));
  console.log("Contains newline?", token.includes("\n"));
  console.log("Token length:", token.length);
  console.log("Trimmed length:", token.trim().length);
  console.log("AUTH HEADER:", `Bearer ${token?.trim()}`);
  console.log(
    "[ML Client] Cleaned payload prepared with exact 64 features.",
    cleanPayload,
  );
  console.log(
    "[ML Client] Target verified. Feature Count:",
    Object.keys(cleanPayload).length,
  );

  // Enforce absolute fallback to 127.0.0.1 if your env variable is missing/wrong
  const targetUrl = "http://127.0.0.1:5000/predictions/predict";
  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify(cleanPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[v0] API returned failure status:",
        response.status,
        errorText,
      );
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const resBody: PostmanPredictionResponse = await response.json();
    console.log("[v0] Raw Flask API response body received:", resBody);

    // Using BDI metrics as your default screen values for UI compatibility
    const targetMetrics = resBody.data.bdi || resBody.data.phq9;

    const result: AssessmentResult = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      testType: "all59",
      date: new Date().toISOString(),
      answers,
      prediction: targetMetrics.score as 0 | 1 | 2 | 3,
      confidenceScore: targetMetrics.confidence,
      mentalHealthTips: [
        "Assessment complete. Review scale specific metrics via history data breakdown.",
      ],
    };

    return result;
  } catch (error) {
    console.error("[v0] Network exception in submitToMLAPI:", error);
    throw error;
  }
}
/**
 * Submit assessment - routes to appropriate handler
 * (kept for backward compatibility)
 */
export async function submitAssessment(
  testType: TestType,
  answers: Record<string, number>,
): Promise<AssessmentResult> {
  if (testType === "all59") {
    return submitToMLAPI(answers);
  }
  // For calculated tests, this shouldn't be called
  // They handle scoring locally in the test page
  throw new Error(`Use local scoring for test type: ${testType}`);
}

/**
 * Get the progress percentage for a test
 */
export function getProgressPercentage(
  currentIndex: number,
  totalQuestions: number,
): number {
  return Math.round(((currentIndex + 1) / totalQuestions) * 100);
}

/**
 * Save assessment result to localStorage
 */
// export function saveAssessmentToHistory(result: AssessmentResult): void {
//   try {
//     const history = getAssessmentHistory();
//     history.push(result);
//     localStorage.setItem("assessmentHistory", JSON.stringify(history));
//     console.log("[v0] Assessment saved to history");
//   } catch (error) {
//     console.error("[v0] Error saving assessment to history:", error);
//   }
// }

// /**
//  * Get assessment history from localStorage
//  */
// export function getAssessmentHistory(): AssessmentResult[] {
//   try {
//     const history = localStorage.getItem("assessmentHistory");
//     return history ? JSON.parse(history) : [];
//   } catch (error) {
//     console.error("[v0] Error retrieving assessment history:", error);
//     return [];
//   }
// }

// /**
//  * Clear assessment history from localStorage
//  */
// export function clearAssessmentHistory(): void {
//   try {
//     localStorage.removeItem("assessmentHistory");
//     console.log("[v0] Assessment history cleared");
//   } catch (error) {
//     console.error("[v0] Error clearing assessment history:", error);
//   }
// }

// /**
//  * Get latest assessment result for a specific test type
//  */
// export function getLatestAssessment(
//   testType?: TestType,
// ): AssessmentResult | null {
//   const history = getAssessmentHistory();
//   if (testType) {
//     const filtered = history.filter((a) => a.testType === testType);
//     return filtered.length > 0 ? filtered[filtered.length - 1] : null;
//   }
//   return history.length > 0 ? history[history.length - 1] : null;
// }

// /**
//  * Get statistics from assessment history
//  */
// export function getAssessmentStatistics() {
//   const history = getAssessmentHistory();
//   if (history.length === 0) {
//     return null;
//   }

//   const testTypeCounts: Record<TestType, number> = {
//     phq9: 0,
//     bdi2: 0,
//     cesd: 0,
//     all59: 0,
//   };

//   const severityCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

//   history.forEach((assessment) => {
//     testTypeCounts[assessment.testType]++;
//     severityCounts[assessment.prediction]++;
//   });

//   return {
//     totalAssessments: history.length,
//     testTypeCounts,
//     severityCounts,
//     averageConfidence:
//       history.reduce((sum, a) => sum + a.confidenceScore, 0) / history.length,
//     lastAssessmentDate: history[history.length - 1].date,
//   };
// }
export interface ApiResponseHistoryItem {
  date: string;
  prediction_value: {
    bdi: { confidence: number; score: number };
    cesd: { confidence: number; score: number };
    phq9: { confidence: number; score: number };
  };
  recommendation: string;
}

interface DashboardApiResponse {
  success: boolean;
  data: {
    user: { id: string; name: string; email: string };
    history: ApiResponseHistoryItem[];
  };
}

const DASHBOARD_API_URL = "http://127.0.0.1:5000/dashboard";

/**
 * Helper to map the remote backend history items into your local AssessmentResult interface
 */
function mapApiHistoryToAssessmentResults(
  apiHistory: ApiResponseHistoryItem[],
): AssessmentResult[] {
  return apiHistory.map((item, index) => {
    const targetMetrics =
  item.prediction_value.bdi ||
  item.prediction_value.phq9 ||
  item.prediction_value.cesd;
    let testType: TestType = "all59";

    if (
      item.prediction_value.phq9 &&
      !item.prediction_value.bdi &&
      !item.prediction_value.cesd
    ) {
      testType = "phq9";
    } else if (
      item.prediction_value.bdi &&
      !item.prediction_value.phq9 &&
      !item.prediction_value.cesd
    ) {
      testType = "bdi2";
    } else if (
      item.prediction_value.cesd &&
      !item.prediction_value.phq9 &&
      !item.prediction_value.bdi
    ) {
      testType = "cesd";
    }
    return {
      id: `remote-${index}-${new Date(item.date).getTime()}`,
      testType: testType,
      date: item.date,
      answers: {}, // The dashboard endpoint payload doesn't return raw question blocks
      prediction: targetMetrics.score as 0 | 1 | 2 | 3,
      confidenceScore: targetMetrics.confidence,
      mentalHealthTips: [item.recommendation],
    };
  });
}

/**
 * Get assessment history from the Flask API instead of localStorage
 * Kept the name, added token tracking for the Authorization header
 */
export async function getAssessmentHistory(
  token: string,
): Promise<AssessmentResult[]> {
  try {
    console.log("[v0] Fetching assessment history from API with token:", token);
    if (!token)
      throw new Error("Authentication token is required to fetch history.");

    const response = await fetch(DASHBOARD_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.trim()}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const resBody: DashboardApiResponse = await response.json();

    if (resBody.success && resBody.data?.history) {
      return mapApiHistoryToAssessmentResults(resBody.data.history);
    }

    return [];
  } catch (error) {
    console.error("[v0] Error retrieving assessment history from API:", error);
    return [];
  }
}

/**
 * Kept the name. Since submitToMLAPI handles data registration via POST,
 * this can act as a placeholder or log indicator.
 */
export async function saveAssessmentToHistory(
  result: AssessmentResult,
  token?: string,
): Promise<void> {
  console.log(
    "[v0] saveAssessmentToHistory is handled server-side during evaluation.",
  );
}

/**
 * Kept the name. Clears remote references if needed, or logs action.
 */
export async function clearAssessmentHistory(token?: string): Promise<void> {
  console.log(
    "[v0] Clear requested. Persistent history is managed by backend database.",
  );
}

/**
 * Kept the name. Retrieves latest assessment data directly using the new API processor.
 */
export async function getLatestAssessment(
  token: string,
  testType?: TestType,
): Promise<AssessmentResult | null> {
  const history = await getAssessmentHistory(token);
  if (testType) {
    const filtered = history.filter((a) => a.testType === testType);
    return filtered.length > 0 ? filtered[filtered.length - 1] : null;
  }
  return history.length > 0 ? history[history.length - 1] : null;
}

/**
 * Kept the name. Aggregates data blocks dynamically returned by the server endpoint.
 */
export async function getAssessmentStatistics(token: string) {
  const history = await getAssessmentHistory(token);
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

  history.forEach((assessment) => {
    testTypeCounts[assessment.testType]++;
    if (severityCounts[assessment.prediction] !== undefined) {
      severityCounts[assessment.prediction]++;
    }
  });

  return {
    totalAssessments: history.length,
    testTypeCounts,
    severityCounts,
    averageConfidence:
      history.reduce((sum, a) => sum + a.confidenceScore, 0) / history.length,
    lastAssessmentDate: history[history.length - 1].date,
  };
}
