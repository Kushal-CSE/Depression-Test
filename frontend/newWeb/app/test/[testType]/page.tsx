'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuestionnaire } from '@/lib/contexts/QuestionnaireContext';
import { getTestConfig } from '@/lib/data/testConfigs';
import { submitAssessment, saveAssessmentToHistory, submitToMLAPI } from '@/lib/api/mlClient';
import { getScoringFunction } from '@/lib/utils/scoring';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { QuestionCard } from '@/components/QuestionCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testType = params.testType as string;

  const {
    selectTest,
    testConfig,
    currentQuestionIndex,
    answers,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    canProceed,
  } = useQuestionnaire();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize test on mount
  useEffect(() => {
    console.log('[v0] Test page mounted with testType:', testType);
    if (testType) {
      selectTest(testType as any);
    }
  }, [testType, selectTest]);

  // Redirect if test not found
  useEffect(() => {
    if (testType && !getTestConfig(testType)) {
      router.push('/');
    }
  }, [testType, router]);

  const handleSubmit = useCallback(async () => {
    if (!testConfig) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let result;

      // For calculated tests (PHQ-9, BDI-2, CES-D), use local scoring
      if (testType === 'phq9' || testType === 'bdi2' || testType === 'cesd') {
        console.log('[v0] Using local scoring for', testType);
        const scoringFunction = getScoringFunction(testType as any);
        const scoringResult = scoringFunction(answers);
        
        result = {
          id: Date.now().toString(),
          testType: testType as any,
          prediction: scoringResult.severity,
          confidenceScore: 0.95, // High confidence for calculated scores
          mentalHealthTips: [
            'Consider speaking with a mental health professional for personalized guidance.',
            'Practice self-care activities that bring you joy and relaxation.',
            'Maintain regular social connections and reach out for support when needed.'
          ],
          date: new Date().toISOString(),
          _scoreLabel: scoringResult.label, // Store label for display
        };
      } else {
        // For "All 59 Questions", use the ML API
        console.log('[v0] Using ML API for complete assessment');
        result = await submitToMLAPI(answers);
      }
      
      // Save to localStorage
      saveAssessmentToHistory(result);
      
      // Redirect to results
      console.log('[v0] Redirecting to results with result:', result.id);
      router.push(`/results?id=${result.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit assessment';
      setError(errorMessage);
      console.error('[v0] Error submitting assessment:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [testType, answers, testConfig, router]);

  if (!testConfig) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-0 shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading assessment...</p>
          </Card>
        </div>
      </main>
    );
  }

  const currentQuestion = testConfig.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === testConfig.questions.length - 1;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Tests
          </Link>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{testConfig.name}</h1>
                <p className="text-gray-600 text-sm mt-1">{testConfig.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {currentQuestionIndex + 1}
                </div>
                <div className="text-xs text-gray-500">of {testConfig.questions.length}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / testConfig.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Card className="border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 p-6 mb-6 shadow-sm">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-red-900 mb-1">Submission Error</h3>
                <p className="text-red-700 text-sm mb-2">{error}</p>
                <p className="text-red-600 text-xs">
                  Make sure your Flask server is running on http://localhost:5000
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Question Card */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={(value) => answerQuestion(currentQuestion.id, value)}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={testConfig.questions.length}
          />
        </div>

        {/* Navigation */}
        <div className="mb-12">
          <NavigationButtons
            onPrevious={previousQuestion}
            onNext={nextQuestion}
            onSubmit={handleSubmit}
            canPrevious={currentQuestionIndex > 0}
            canNext={currentQuestionIndex < testConfig.questions.length - 1 && canProceed()}
            canSubmit={canProceed()}
            isLoading={isSubmitting}
            isLastQuestion={isLastQuestion}
          />
        </div>

        {/* Mini Progress Grid */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Progress Overview</h3>
          <div className="grid grid-cols-10 gap-2 mb-4">
            {testConfig.questions.map((q, idx) => (
              <div
                key={q.id}
                className={`w-full aspect-square rounded-lg font-semibold text-xs flex items-center justify-center transition-all ${
                  answers[q.id] !== undefined
                    ? 'bg-green-500 text-white'
                    : idx === currentQuestionIndex
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300 ring-offset-2'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>
              <span className="font-semibold text-green-600">{Object.keys(answers).length}</span> of <span className="font-semibold">{testConfig.questions.length}</span> answered
            </span>
            <span className="text-gray-500">
              {Math.round((Object.keys(answers).length / testConfig.questions.length) * 100)}% complete
            </span>
          </div>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
