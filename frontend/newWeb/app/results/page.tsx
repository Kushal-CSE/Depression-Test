'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAssessmentHistory } from '@/lib/api/mlClient';
import { AssessmentResult } from '@/lib/types';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useQuestionnaire } from '@/lib/contexts/QuestionnaireContext';

// Demo data for testing
const DEMO_RESULTS: { [key: string]: AssessmentResult } = {
  '1': {
    id: '1',
    testType: 'phq9',
    prediction: 1,
    confidenceScore: 0.87,
    mentalHealthTips: [
      'Consider regular exercise to boost your mood and energy levels',
      'Practice mindfulness meditation for 10-15 minutes daily',
      'Maintain a consistent sleep schedule of 7-8 hours per night'
    ],
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    answers: {},
    _scoreLabel: 'Mild'
  },
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectTest, resetQuestionnaire } = useQuestionnaire();

  const resultId = searchParams.get('id');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const history = getAssessmentHistory();
    if (resultId) {
      const found = history.find(r => r.id === resultId);
      // Use demo data if not found in history
      setResult(found || DEMO_RESULTS[resultId] || null);
    } else if (history.length > 0) {
      // Show latest result if no ID provided
      setResult(history[history.length - 1]);
    } else {
      // Show first demo result if no data
      setResult(DEMO_RESULTS['1']);
    }
    setLoading(false);
  }, [resultId]);

  const handleRetake = () => {
    if (result) {
      selectTest(result.testType);
      router.push(`/test/${result.testType}`);
    }
  };

  const handleNewTest = () => {
    resetQuestionnaire();
    router.push('/');
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-0 shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading results...</p>
          </Card>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-0 shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              The assessment result you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Take an Assessment
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-2xl">
        {/* Back Link */}
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-block">
          ← View All Results
        </Link>

        <ResultsDisplay
          result={result}
          onRetake={handleRetake}
          onNewTest={handleNewTest}
        />
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl">
            <Card className="border-0 shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading results...</p>
            </Card>
          </div>
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
