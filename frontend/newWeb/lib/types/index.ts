export type TestType = 'phq9' | 'bdi2' | 'cesd' | 'all59';
export type SeverityLevel = 0 | 1 | 2 | 3;

export interface ScaleOption {
  value: number;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  scale: ScaleOption[];
  featureNames?: string[]; // Which backend features this question maps to
}

export interface TestConfig {
  testType: TestType;
  name: string;
  description: string;
  icon: string;
  totalQuestions: number;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: number;
  featureNames?: string[];
}

export interface AssessmentResult {
  id: string;
  testType: TestType;
  date: string;
  answers: Record<string, number>;
  prediction: SeverityLevel;
  confidenceScore: number;
  mentalHealthTips: string[];
  _scoreLabel?: string; // Optional label for calculated tests (e.g., "Mild", "Moderate")
}

export interface PredictionResponse {
  prediction: SeverityLevel;
  confidence_score: number;
  mental_health_tip: string | string[];
}

export const SEVERITY_LABELS: Record<SeverityLevel, { label: string; color: string; interpretation: string }> = {
  0: {
    label: 'Minimal/Normal',
    color: 'text-green-600 bg-green-50 border-green-200',
    interpretation: 'Your assessment indicates minimal depressive symptoms. Keep maintaining healthy habits and reach out if you need support.'
  },
  1: {
    label: 'Mild',
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    interpretation: 'Your assessment indicates mild depressive symptoms. Consider talking to a mental health professional for guidance.'
  },
  2: {
    label: 'Moderate',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    interpretation: 'Your assessment indicates moderate depressive symptoms. It\'s recommended to reach out to a mental health professional.'
  },
  3: {
    label: 'Severe/Extreme',
    color: 'text-red-600 bg-red-50 border-red-200',
    interpretation: 'Your assessment indicates severe depressive symptoms. Please seek professional help immediately. You are not alone.'
  }
};
