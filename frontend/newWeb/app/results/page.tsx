
// 'use client';

// import React, { useEffect, useState, Suspense } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { getAssessmentHistory } from '@/lib/api/mlClient';
// import { AssessmentResult } from '@/lib/types';
// import { ResultsDisplay } from '@/components/ResultsDisplay';
// import { Card } from '@/components/ui/card';
// import Link from 'next/link';
// import { useQuestionnaire } from '@/lib/contexts/QuestionnaireContext';

// // Demo data for testing
// const DEMO_RESULTS: { [key: string]: AssessmentResult } = {
//   '1': {
//     id: '1',
//     testType: 'phq9',
//     prediction: 1,
//     confidenceScore: 0.87,
//     mentalHealthTips: [
//       'Consider regular exercise to boost your mood and energy levels',
//       'Practice mindfulness meditation for 10-15 minutes daily',
//       'Maintain a consistent sleep schedule of 7-8 hours per night'
//     ],
//     date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
//     answers: {},
//     _scoreLabel: 'Mild'
//   },
// };

// function ResultsContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { selectTest, resetQuestionnaire } = useQuestionnaire();

//   const resultId = searchParams.get('id');
//   const [result, setResult] = useState<AssessmentResult | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const history = getAssessmentHistory();
//     if (resultId) {
//       const found = history.find(r => r.id === resultId);
//       // Use demo data if not found in history
//       setResult(found || DEMO_RESULTS[resultId] || null);
//     } else if (history.length > 0) {
//       // Show latest result if no ID provided
//       setResult(history[history.length - 1]);
//     } else {
//       // Show first demo result if no data
//       setResult(DEMO_RESULTS['1']);
//     }
//     setLoading(false);
//   }, [resultId]);

//   const handleRetake = () => {
//     if (result) {
//       selectTest(result.testType);
//       router.push(`/test/${result.testType}`);
//     }
//   };

//   const handleNewTest = () => {
//     resetQuestionnaire();
//     router.push('/');
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto max-w-2xl">
//           <Card className="border-0 shadow-lg p-8 text-center">
//             <div className="text-4xl mb-4">⏳</div>
//             <p className="text-gray-600">Loading results...</p>
//           </Card>
//         </div>
//       </main>
//     );
//   }

//   if (!result) {
//     return (
//       <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto max-w-2xl">
//           <Card className="border-0 shadow-lg p-8 text-center">
//             <div className="text-4xl mb-4">📊</div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
//             <p className="text-gray-600 mb-6">
//               The assessment result you&apos;re looking for doesn&apos;t exist or has been removed.
//             </p>
//             <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
//               ← Take an Assessment
//             </Link>
//           </Card>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto max-w-2xl">
//         {/* Back Link */}
//         <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium mb-6 inline-block">
//           ← View All Results
//         </Link>

//         <ResultsDisplay
//           result={result}
//           onRetake={handleRetake}
//           onNewTest={handleNewTest}
//         />
//       </div>
//     </main>
//   );
// }

// export default function ResultsPage() {
//   return (
//     <Suspense
//       fallback={
//         <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//           <div className="container mx-auto max-w-2xl">
//             <Card className="border-0 shadow-lg p-8 text-center">
//               <div className="text-4xl mb-4">⏳</div>
//               <p className="text-gray-600">Loading results...</p>
//             </Card>
//           </div>
//         </main>
//       }
//     >
//       <ResultsContent />
//     </Suspense>
//   );
// }
'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Printer,
  Download,
  Heart,
  TrendingUp,
  Zap,
  MessageCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { getAssessmentHistory } from '@/lib/api/mlClient'
import { AssessmentResult } from '@/lib/types'
import { useQuestionnaire } from '@/lib/contexts/QuestionnaireContext'
import { useAuth } from '@/lib/contexts/AuthContext'


const DEMO_RESULTS: { [key: string]: AssessmentResult } = {
  '1': {
    id: '1',
    testType: 'phq9',
    prediction: 1,
    confidenceScore: 0.87,
    mentalHealthTips: [
      'Consider regular exercise to boost your mood and energy levels',
      'Practice mindfulness meditation for 10-15 minutes daily',
      'Maintain a consistent sleep schedule of 7-8 hours per night',
      'Stay connected with supportive friends and family',
    ],
    date: new Date().toISOString(),
    answers: {},
    _scoreLabel: 'Mild',
    score: 8,
    maxScore: 27,
  } as AssessmentResult & {
    score: number
    maxScore: number
  },
}

const severityConfig = {
  Minimal: {
    badge: 'bg-green-100 text-green-800',
    bg: 'bg-green-50',
    border: 'border-green-200',
    progress: 'bg-green-600',
  },
  Mild: {
    badge: 'bg-blue-100 text-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    progress: 'bg-blue-600',
  },
  Moderate: {
    badge: 'bg-yellow-100 text-yellow-800',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    progress: 'bg-yellow-600',
  },
  'Moderately Severe': {
    badge: 'bg-orange-100 text-orange-800',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    progress: 'bg-orange-600',
  },
  Severe: {
    badge: 'bg-red-100 text-red-800',
    bg: 'bg-red-50',
    border: 'border-red-200',
    progress: 'bg-red-600',
  },
}

function ResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { selectTest, resetQuestionnaire } = useQuestionnaire()
  const { token } = useAuth()
  const resultId = searchParams.get('id')

  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)
      console.log("[v0] Fetching assessment history with token:", token);
      console.log("resultId from URL:", resultId);
  // useEffect(() => {
  //   const history = getAssessmentHistory(token || '')

  //   if (resultId) {
  //     //const found = history.find((r) => r.id === resultId)
  //     setResult(found || DEMO_RESULTS[resultId] || null)
  //   } else if (history.length > 0) {
  //     setResult(history[history.length - 1])
  //   } else {
  //     setResult(DEMO_RESULTS['1'])
  //   }

  //   setLoading(false)
  // }, [resultId])
// useEffect(() => {
//   // Create an inner async function to handle the API call
//   const fetchHistoryAndSetResult = async () => {
//     try {
//       setLoading(true); // Ensure loading is true when the fetch starts
      
//       const history = await getAssessmentHistory(token || '');

//       if (resultId) {
//         const found = history.find((r) => r.id === resultId);
//         setResult(found || DEMO_RESULTS[resultId] || null);
//       } else if (history.length > 0) {
//         setResult(history[history.length - 1]);
//       } else {
//         setResult(DEMO_RESULTS['1']);
//       }
//     } catch (error) {
//       console.error("Failed to load assessment history:", error);
//       // Fallback data in case the API endpoint fails
//       setResult(DEMO_RESULTS['1']);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchHistoryAndSetResult();
// }, [resultId, token]);
useEffect(() => {
  const fetchHistoryAndSetResult = async () => {
    // 1. Guard against empty/missing token on initial mount
    if (!token) {
      console.log("[v0] Auth token is loading or missing. Postponing history fetch.");
      if (resultId && DEMO_RESULTS[resultId]) {
        setResult(DEMO_RESULTS[resultId]);
      } else {
        setResult(DEMO_RESULTS['1']);
      }
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const history = await getAssessmentHistory(token);

      if (Array.isArray(history) && history.length > 0) {
        if (resultId) {
          // Look for it in the real database history array
          const found = history.find((r) => r.id === resultId || String(r.id).includes(resultId));
          // FIX: Fall back to DEMO_RESULTS['1'] if the specific ID doesn't exist anywhere yet
          setResult(found || DEMO_RESULTS[resultId] || DEMO_RESULTS['1']);
        } else {
          setResult(history[history.length - 1]);
        }
      } else {
        // Fallback if user profile history array is empty on server
        setResult(resultId && DEMO_RESULTS[resultId] ? DEMO_RESULTS[resultId] : DEMO_RESULTS['1']);
      }
    } catch (error: any) {
      console.warn("[v0] Gracefully caught history fetch error (e.g. 401 Expired):", error.message);
      
      // 2. Safe Fallback: Prevent falling back to null when ID is a generated timestamp
      if (resultId && DEMO_RESULTS[resultId]) {
        setResult(DEMO_RESULTS[resultId]);
      } else {
        setResult(DEMO_RESULTS['1']);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchHistoryAndSetResult();
}, [resultId, token]);

  const formattedDate = useMemo(() => {
    if (!result?.date) return ''

    return new Date(result.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [result])

  const severity = result?._scoreLabel || 'Minimal'

  const config =
    severityConfig[severity as keyof typeof severityConfig] ||
    severityConfig.Minimal

  const confidence = Math.round((result?.confidenceScore || 0) * 100)

  const score = (result as any)?.score ?? result?.prediction ?? 0
  const maxScore = (result as any)?.maxScore || 27

  const assessmentName = (result?.testType || 'Assessment').toUpperCase()

  const handleRetake = () => {
    if (!result) return

    selectTest(result.testType)
    router.push(`/test/${result.testType}`)
  }

  const handleNewTest = () => {
    resetQuestionnaire()
    router.push('/')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const data = {
      assessmentName,
      severity,
      score,
      maxScore,
      confidence,
      date: formattedDate,
      recommendations: result?.mentalHealthTips || [],
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${assessmentName}-results.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="p-10 text-center shadow-xl border-0">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-gray-600 font-medium">Loading results...</p>
        </Card>
      </main>
    )

  }

  if (!result) {
    return (

      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="p-10 text-center shadow-xl border-0 max-w-lg">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            The assessment result you are trying to access does not exist.
          </p>
          <Link
            href="/"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            ← Take an Assessment
          </Link>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header navbar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              title="Print Results"
            >
              <Printer className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              title="Download Data"
            >
              <Download className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Workspace */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title Block */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Your Assessment Results
          </h1>
          <p className="text-gray-600 text-lg">
            {assessmentName} • {formattedDate}
          </p>
        </div>

        {/* Main Result Module */}
        <div className={`${config.bg} ${config.border} border rounded-3xl p-8 md:p-10 mb-10 shadow-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Score Output */}
            <div>
              <p className="text-gray-600 font-medium mb-5">Overall Score</p>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-7xl font-bold text-gray-900">{score}</span>
                <span className="text-2xl text-gray-500 mb-2">/ {maxScore}</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full ${config.progress} transition-all duration-500`}
                  style={{ width: `${(score / maxScore) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Assessment completed successfully
              </p>
            </div>

            {/* Severity Status Indicators */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-gray-600 font-medium mb-4">Severity Level</p>
                <span className={`inline-flex px-6 py-3 rounded-full text-xl font-bold ${config.badge}`}>
                  {severity}
                </span>
              </div>

              <div className="mt-10">
                <div className="flex justify-between mb-3">
                  
                  {/* <p className="font-bold text-gray-900">{(result.testType == 'all59') ? confidence/100 : '--'}%</p> */}
                  <p className="font-bold text-gray-900">{confidence}%</p> 
                  <p className="text-gray-600 font-medium">Confidence Level</p>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${config.progress}`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: 'Self-Care Focus',
              desc: 'Prioritize activities that help reduce stress and improve emotional balance.',
              icon: Heart,
              iconBg: 'bg-blue-100',
              iconColor: 'text-blue-600',
            },
            {
              title: 'Track Progress',
              desc: 'Retake this assessment after a few weeks to monitor changes.',
              icon: TrendingUp,
              iconBg: 'bg-green-100',
              iconColor: 'text-green-600',
            },
            {
              title: 'Recommended Action',
              desc: 'Seek guidance from a licensed mental health professional if symptoms persist.',
              icon: Zap,
              iconBg: 'bg-purple-100',
              iconColor: 'text-purple-600',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${item.iconBg}`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 pt-1">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Qualitative Analysis */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Detailed Analysis
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                What Your Score Means
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your assessment indicates{' '}
                <span className="font-semibold">{severity.toLowerCase()}</span>{' '}
                symptoms. This result should be interpreted as a screening indicator,
                not a medical diagnosis.
              </p>
            </div>

            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Positive Indicators
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Consistent routines, social support, and healthy habits can significantly
                improve emotional resilience and overall well-being.
              </p>
            </div>

            <div className="border-l-4 border-orange-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Areas to Focus On
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Consider improving sleep quality, stress management, physical activity,
                and emotional communication with trusted people.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Tips Block */}
        {result.mentalHealthTips && result.mentalHealthTips.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Personalized Recommendations
              </h2>
            </div>

            <ul className="space-y-5">
              {result.mentalHealthTips.map((tip, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interaction Action Routes */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Go to Dashboard
          </button>

          <button
            onClick={handleRetake}
            className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition cursor-pointer"
          >
            Retake Assessment
          </button>

          <button
            onClick={handleNewTest}
            className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer"
          >
            New Assessment
          </button>
        </div>

        {/* Legal Medical Disclaimer */}
        <p className="text-center text-gray-500 text-sm max-w-3xl mx-auto mt-10 leading-relaxed">
          This assessment is intended for informational and educational purposes
          only. It is not a substitute for professional diagnosis, treatment, or
          medical advice. Please consult a qualified healthcare provider if needed.
        </p>
      </div>
    </main>
  )

}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
          <Card className="p-10 text-center shadow-xl border-0">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-gray-600 font-medium">Loading results...</p>
          </Card>

        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}


