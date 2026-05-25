/**
 * Scoring utilities for calculated depression tests
 * These tests calculate severity based on scores, not API prediction
 */

export type TestType = 'phq9' | 'bdi2' | 'cesd';

export interface ScoringResult {
  score: number;
  severity: 0 | 1 | 2 | 3;
  label: string;
}

/**
 * PHQ-9 Scoring
 * 0–4: Minimal / None (0)
 * 5–9: Mild (1)
 * 10–14: Moderate (2)
 * 15–19: Moderately Severe (2)
 * 20–27: Severe (3)
 */
export function scorePHQ9(answers: Record<string, number>): ScoringResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  let severity: 0 | 1 | 2 | 3;
  let label: string;

  if (score <= 4) {
    severity = 0;
    label = 'Minimal';
  } else if (score <= 9) {
    severity = 1;
    label = 'Mild';
  } else if (score <= 14) {
    severity = 2;
    label = 'Moderate';
  } else if (score <= 19) {
    severity = 2;
    label = 'Moderately Severe';
  } else {
    severity = 3;
    label = 'Severe';
  }

  return { score, severity, label };
}

/**
 * BDI-II Scoring
 * 0–13: Minimal (0)
 * 14–19: Mild (1)
 * 20–28: Moderate (2)
 * 29–63: Severe (3)
 */
export function scoreBDI2(answers: Record<string, number>): ScoringResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  let severity: 0 | 1 | 2 | 3;
  let label: string;

  if (score <= 13) {
    severity = 0;
    label = 'Minimal';
  } else if (score <= 19) {
    severity = 1;
    label = 'Mild';
  } else if (score <= 28) {
    severity = 2;
    label = 'Moderate';
  } else {
    severity = 3;
    label = 'Severe';
  }

  return { score, severity, label };
}

/**
 * CES-D Scoring
 * 0–15: No or Minimal Depressive Symptoms (0)
 * 16–23: Mild to Moderate Depression (1)
 * 24+: Significant / Major Depression Symptoms (3)
 */
export function scoreCESD(answers: Record<string, number>): ScoringResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  let severity: 0 | 1 | 2 | 3;
  let label: string;

  if (score <= 15) {
    severity = 0;
    label = 'No or Minimal';
  } else if (score <= 23) {
    severity = 1;
    label = 'Mild to Moderate';
  } else {
    severity = 3;
    label = 'Significant/Major';
  }

  return { score, severity, label };
}

/**
 * Get the appropriate scoring function for a test type
 */
export function getScoringFunction(testType: TestType): (answers: Record<string, number>) => ScoringResult {
  switch (testType) {
    case 'phq9':
      return scorePHQ9;
    case 'bdi2':
      return scoreBDI2;
    case 'cesd':
      return scoreCESD;
    default:
      throw new Error(`Unknown test type: ${testType}`);
  }
}
