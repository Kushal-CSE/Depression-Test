// "use client";

// import React, { Suspense, useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import {User} from "@/lib/contexts/AuthContext";
// import {
//   ArrowLeft,
//   Printer,
//   Download,
//   Heart,
//   TrendingUp,
//   Zap,
//   MessageCircle,
// } from "lucide-react";

// import { Card } from "@/components/ui/card";
// import { getAssessmentHistory } from "@/lib/api/mlClient";
// import { AssessmentResult } from "@/lib/types";
// import { useQuestionnaire } from "@/lib/contexts/QuestionnaireContext";
// import { useAuth } from "@/lib/contexts/AuthContext";

// const DEMO_RESULTS: { [key: string]: AssessmentResult } = {
//   "1": {
//     id: "1",
//     testType: "phq9",
//     prediction: 1,
//     confidenceScore: 0.87,
//     mentalHealthTips: [
//       "Consider regular exercise to boost your mood and energy levels",
//       "Practice mindfulness meditation for 10-15 minutes daily",
//       "Maintain a consistent sleep schedule of 7-8 hours per night",
//       "Stay connected with supportive friends and family",
//     ],
//     date: new Date().toISOString(),
//     answers: {},
//     _scoreLabel: "Mild",
//     score: 8,
//     maxScore: 27,
//   } as AssessmentResult & {
//     score: number;
//     maxScore: number;
//   },
// };

// const severityConfig = {
//   Minimal: {
//     badge: "bg-green-100 text-green-800",
//     bg: "bg-green-50",
//     border: "border-green-200",
//     progress: "bg-green-600",
//   },
//   Mild: {
//     badge: "bg-blue-100 text-blue-800",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//     progress: "bg-blue-600",
//   },
//   Moderate: {
//     badge: "bg-yellow-100 text-yellow-800",
//     bg: "bg-yellow-50",
//     border: "border-yellow-200",
//     progress: "bg-yellow-600",
//   },
//   Severe: {
//     badge: "bg-orange-100 text-orange-800",
//     bg: "bg-orange-50",
//     border: "border-orange-200",
//     progress: "bg-orange-600",
//   },
//   Extreme: {
//     badge: "bg-red-100 text-red-800",
//     bg: "bg-red-50",
//     border: "border-red-200",
//     progress: "bg-red-600",
//   },
// };

// function ResultsContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { selectTest, resetQuestionnaire } = useQuestionnaire();
//   const { token } = useAuth();
//   const resultId = searchParams.get("id");

//   const [result, setResult] = useState<AssessmentResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   //console.log("[v0] Fetching assessment history with token:", token);
//   console.log("resultId from URL:", resultId);
//   useEffect(() => {
//     if(!token) {
//       router.push("auth/login");
//     }
//     const fetchHistoryAndSetResult = async () => {
//       // 1. Guard against empty/missing token on initial mount
//       if (!token) {
//         console.log(
//           "[v0] Auth token is loading or missing. Postponing history fetch.",
//         );
//         if (resultId && DEMO_RESULTS[resultId]) {
//           setResult(DEMO_RESULTS[resultId]);
//         } else {
//           setResult(DEMO_RESULTS["1"]);
//         }
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const history = await getAssessmentHistory(token);
//         console.log("[v0] Fetched assessment history:", history);
//         if (Array.isArray(history) && history.length > 0) {
//           if (resultId) {
//             // Look for it in the real database history array

//              const found = history.find((r) => r.id === resultId || String(r.id).includes(resultId));
//             //const found= history[resultId];
//             // FIX: Fall back to DEMO_RESULTS['1'] if the specific ID doesn't exist anywhere yet
//             setResult(found);
//           } else {
//             setResult(history[history.length - 1]);
//           }
//         } else {
//           // Fallback if user profile history array is empty on server
//           setResult(
//             resultId && DEMO_RESULTS[resultId]
//               ? DEMO_RESULTS[resultId]
//               : DEMO_RESULTS["1"],
//           );
//         }
//       } catch (error: any) {
//         console.warn(
//           "[v0] Gracefully caught history fetch error (e.g. 401 Expired):",
//           error.message,
//         );

//         // 2. Safe Fallback: Prevent falling back to null when ID is a generated timestamp
//         if (resultId && DEMO_RESULTS[resultId]) {
//           setResult(DEMO_RESULTS[resultId]);
//         } else {
//           setResult(DEMO_RESULTS["1"]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistoryAndSetResult();
//   }, [resultId, token]);

//   const formattedDate = useMemo(() => {
//     if (!result?.date) return "";

//     return new Date(result.date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   }, [result]);

//   // const severity = result?._scoreLabel || 'Minimal'
//   const severity =
//     result?.prediction === 0
//       ? "Minimal"
//       : result?.prediction === 1
//         ? "Mild"
//         : result?.prediction === 2
//           ? "Severe"
//           : result?.prediction === 3
//             ? "Extreme"
//             : "Unknown";

//   const config =
//     severityConfig[severity as keyof typeof severityConfig] ||
//     severityConfig.Minimal;
//   //const confidenceScore = result?.confidenceScore ?? 0;
//   const confidence = Math.round(result?.confidenceScore || 0);
//   const agreementCount = result?.agreementCount ?? 0;
//   const maxAgreementCount = (result?.testType === "all59" ? 3 : 1) || 3;
//   const score = (result as any)?.score ?? result?.prediction ?? 0;
//   const maxScore = (result as any)?.maxScore || 3;

//   const assessmentName = (result?.testType || "Assessment").toUpperCase();

//   const handleRetake = () => {
//     if (!result) return;
//     selectTest(result.testType);
//     router.push(`/test/${result.testType}`);
//   };

//   const handleNewTest = () => {
//     resetQuestionnaire();
//     router.push("/");
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownload = () => {
//     const data = {
//       assessmentName,
//       severity,
//       score,
//       maxScore,
//       confidence,
//       date: formattedDate,
//       recommendations: result?.mentalHealthTips || [],
//     };

//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });

//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${assessmentName}-results.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//         <Card className="p-10 text-center shadow-xl border-0">
//           <div className="text-5xl mb-4">⏳</div>
//           <p className="text-gray-600 font-medium">Loading results...</p>
//         </Card>
//       </main>
//     );
//   }

//   if (!result) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//         <Card className="p-10 text-center shadow-xl border-0 max-w-lg">
//           <div className="text-5xl mb-4">📊</div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-3">
//             No Results Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             The assessment result you are trying to access does not exist.
//           </p>
//           <Link
//             href="/"
//             className="text-blue-600 font-semibold hover:text-blue-700"
//           >
//             ← Take an Assessment
//           </Link>
//         </Card>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       {/* Header navbar */}
//       <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
//           <Link
//             href="/dashboard"
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Dashboard
//           </Link>

//           <div className="flex gap-2">
//             <button
//               onClick={handlePrint}
//               className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
//               title="Print Results"
//             >
//               <Printer className="w-5 h-5 text-gray-700" />
//             </button>

//             <button
//               onClick={handleDownload}
//               className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
//               title="Download Data"
//             >
//               <Download className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Primary Workspace */}
//       <div className="max-w-5xl mx-auto px-6 py-12">
//         {/* Title Block */}
//         <div className="mb-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
//             Your Assessment Results
//           </h1>
//           <p className="text-gray-600 text-lg">
//             {assessmentName} • {formattedDate}
//           </p>
//         </div>

//         {/* Main Result Module */}
//         <div
//           className={`${config.bg} ${config.border} border rounded-3xl p-8 md:p-10 mb-10 shadow-sm`}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             {/* Score Output */}
//             <div>
//               <p className="text-gray-600 font-medium mb-5">Model Agreement</p>
//               <div className="flex items-end gap-3 mb-6">
//                 <span className="text-7xl font-bold text-gray-900">
//                   {agreementCount }
//                 </span>
//                 <span className="text-2xl text-gray-500 mb-2">
//                   / {maxAgreementCount}
//                 </span>
//               </div>

//               <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
//                 <div
//                   className={`h-full ${config.progress} transition-all duration-500`}
//                   style={{ width: `${(agreementCount / maxAgreementCount) * 100}%` }}
//                 />
//               </div>
//               <p className="text-sm text-gray-600">
//                 Assessment completed successfully
//               </p>
//             </div>

//             {/* Severity Status Indicators */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 <p className="text-gray-600 font-medium mb-4">Severity Level</p>
//                 <span
//                   className={`inline-flex px-6 py-3 rounded-full text-xl font-bold ${config.badge}`}
//                 >
//                   {severity}
//                 </span>
//               </div>

//               <div className="mt-10">
//                 <div className="flex justify-between mb-3">
//                   {/* <p className="font-bold text-gray-900">{(result.testType == 'all59') ? confidence/100 : '--'}%</p> */}
//                   <p className="font-bold text-gray-900">{score}/{maxScore}</p>
//                   <p className="text-gray-600 font-medium">Severity Level</p>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full ${config.progress}`}
//                     style={{ width: `${(score / maxScore) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Highlight Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           {[
//             {
//               title: "Self-Care Focus",
//               desc: "Prioritize activities that help reduce stress and improve emotional balance.",
//               icon: Heart,
//               iconBg: "bg-blue-100",
//               iconColor: "text-blue-600",
//             },
//             {
//               title: "Track Progress",
//               desc: "Retake this assessment after a few weeks to monitor changes.",
//               icon: TrendingUp,
//               iconBg: "bg-green-100",
//               iconColor: "text-green-600",
//             },
//             {
//               title: "Recommended Action",
//               desc: "Seek guidance from a licensed mental health professional if symptoms persist.",
//               icon: Zap,
//               iconBg: "bg-purple-100",
//               iconColor: "text-purple-600",
//             },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className={`p-3 rounded-xl ${item.iconBg}`}>
//                   <item.icon className={`w-5 h-5 ${item.iconColor}`} />
//                 </div>
//                 <h3 className="font-semibold text-lg text-gray-900 pt-1">
//                   {item.title}
//                 </h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed text-sm">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>


//         {/* Dynamic Tips Block */}
//         {result.mentalHealthTips && result.mentalHealthTips.length > 0 && (
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 mb-10">
//             <div className="flex items-center gap-3 mb-8">
//               <MessageCircle className="w-7 h-7 text-blue-600" />
//               <h2 className="text-3xl font-bold text-gray-900">
//                 Personalized Recommendations
//               </h2>
//             </div>

//             <ul className="space-y-5">
//               {result.mentalHealthTips.map((tip, index) => (
//                 <li key={index} className="flex gap-4 items-start">
//                   <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
//                     {index + 1}
//                   </span>
//                   <span className="text-gray-700 leading-relaxed">{tip}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Interaction Action Routes */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={() => router.push("/dashboard")}
//             className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
//           >
//             Go to Dashboard
//           </button>

//           <button
//             onClick={handleRetake}
//             className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition cursor-pointer"
//           >
//             Retake Assessment
//           </button>

//           <button
//             onClick={handleNewTest}
//             className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer"
//           >
//             New Assessment
//           </button>
//         </div>
//                 {/* Detailed Qualitative Analysis */}
//         <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10 shadow-sm">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">
//             Detailed Analysis
//           </h2>

//           <div className="space-y-8">
//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 What Your Score Means
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Your assessment indicates{" "}
//                 <span className="font-semibold">{severity.toLowerCase()}</span>{" "}
//                 symptoms. This result should be interpreted as a screening
//                 indicator, not a medical diagnosis.
//               </p>
//             </div>

//             <div className="border-l-4 border-green-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 Positive Indicators
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Consistent routines, social support, and healthy habits can
//                 significantly improve emotional resilience and overall
//                 well-being.
//               </p>
//             </div>

//             <div className="border-l-4 border-orange-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 Areas to Focus On
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Consider improving sleep quality, stress management, physical
//                 activity, and emotional communication with trusted people.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Legal Medical Disclaimer */}
//         <p className="text-center text-gray-500 text-sm max-w-3xl mx-auto mt-10 leading-relaxed">
//           This assessment is intended for informational and educational purposes
//           only. It is not a substitute for professional diagnosis, treatment, or
//           medical advice. Please consult a qualified healthcare provider if
//           needed.
//         </p>
//       </div>
//     </main>
//   );
// }

// export default function ResultsPage() {
//   return (
//     <Suspense
//       fallback={
//         <main className="min-h-screen flex items-center justify-center bg-slate-50">
//           <Card className="p-10 text-center shadow-xl border-0">
//             <div className="text-5xl mb-4">⏳</div>
//             <p className="text-gray-600 font-medium">Loading results...</p>
//           </Card>
//         </main>
//       }
//     >
//       <ResultsContent />
//     </Suspense>
//   );
// }



// "use client";

// import React, { Suspense, useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   ArrowLeft,
//   Printer,
//   Download,
//   Heart,
//   TrendingUp,
//   Zap,
//   MessageCircle,
// } from "lucide-react";

// import { Card } from "@/components/ui/card";
// import { getAssessmentHistory } from "@/lib/api/mlClient";
// import { AssessmentResult } from "@/lib/types";
// import { useQuestionnaire } from "@/lib/contexts/QuestionnaireContext";
// import { useAuth } from "@/lib/contexts/AuthContext";

// // Import jsPDF modules dynamically or standardly for the client-side execution
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const DEMO_RESULTS: { [key: string]: AssessmentResult } = {
//   "1": {
//     id: "1",
//     testType: "phq9",
//     prediction: 1,
//     confidenceScore: 0.87,
//     mentalHealthTips: [
//       "Consider regular exercise to boost your mood and energy levels",
//       "Practice mindfulness meditation for 10-15 minutes daily",
//       "Maintain a consistent sleep schedule of 7-8 hours per night",
//       "Stay connected with supportive friends and family",
//     ],
//     date: new Date().toISOString(),
//     answers: {},
//     _scoreLabel: "Mild",
//     score: 8,
//     maxScore: 27,
//   } as AssessmentResult & {
//     score: number;
//     maxScore: number;
//   },
// };

// const severityConfig = {
//   Minimal: {
//     badge: "bg-green-100 text-green-800",
//     bg: "bg-green-50",
//     border: "border-green-200",
//     progress: "bg-green-600",
//     colorRgb: [22, 163, 74], // Green
//   },
//   Mild: {
//     badge: "bg-blue-100 text-blue-800",
//     bg: "bg-blue-50",
//     border: "border-blue-200",
//     progress: "bg-blue-600",
//     colorRgb: [37, 99, 235], // Blue
//   },
//   Moderate: {
//     badge: "bg-yellow-100 text-yellow-800",
//     bg: "bg-yellow-50",
//     border: "border-yellow-200",
//     progress: "bg-yellow-600",
//     colorRgb: [202, 138, 4], // Yellow
//   },
//   Severe: {
//     badge: "bg-orange-100 text-orange-800",
//     bg: "bg-orange-50",
//     border: "border-orange-200",
//     progress: "bg-orange-600",
//     colorRgb: [234, 88, 12], // Orange
//   },
//   Extreme: {
//     badge: "bg-red-100 text-red-800",
//     bg: "bg-red-50",
//     border: "border-red-200",
//     progress: "bg-red-600",
//     colorRgb: [220, 38, 38], // Red
//   },
// };

// function ResultsContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { selectTest, resetQuestionnaire } = useQuestionnaire();
//   const { token, user } = useAuth(); // Extracted user data context here
//   const resultId = searchParams.get("id");

//   const [result, setResult] = useState<AssessmentResult | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       router.push("auth/login");
//     }
//     const fetchHistoryAndSetResult = async () => {
//       if (!token) {
//         if (resultId && DEMO_RESULTS[resultId]) {
//           setResult(DEMO_RESULTS[resultId]);
//         } else {
//           setResult(DEMO_RESULTS["1"]);
//         }
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const history = await getAssessmentHistory(token);
//         if (Array.isArray(history) && history.length > 0) {
//           if (resultId) {
//             const found = history.find((r) => r.id === resultId || String(r.id).includes(resultId));
//             setResult(found || null);
//           } else {
//             setResult(history[history.length - 1]);
//           }
//         } else {
//           setResult(
//             resultId && DEMO_RESULTS[resultId]
//               ? DEMO_RESULTS[resultId]
//               : DEMO_RESULTS["1"],
//           );
//         }
//       } catch (error: any) {
//         if (resultId && DEMO_RESULTS[resultId]) {
//           setResult(DEMO_RESULTS[resultId]);
//         } else {
//           setResult(DEMO_RESULTS["1"]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistoryAndSetResult();
//   }, [resultId, token, router]);

//   const formattedDate = useMemo(() => {
//     if (!result?.date) return "";

//     return new Date(result.date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   }, [result]);

//   const severity =
//     result?.prediction === 0
//       ? "Minimal"
//       : result?.prediction === 1
//         ? "Mild"
//         : result?.prediction === 2
//           ? "Severe"
//           : result?.prediction === 3
//             ? "Extreme"
//             : "Unknown";

//   const config =
//     severityConfig[severity as keyof typeof severityConfig] ||
//     severityConfig.Minimal;
    
//   const agreementCount = result?.agreementCount ?? 0;
//   const maxAgreementCount = (result?.testType === "all59" ? 3 : 1) || 3;
//   const score = (result as any)?.score ?? result?.prediction ?? 0;
//   const maxScore = (result as any)?.maxScore || 3;

//   const assessmentName = (result?.testType || "Assessment").toUpperCase();

//   const handleRetake = () => {
//     if (!result) return;
//     selectTest(result.testType);
//     router.push(`/test/${result.testType}`);
//   };

//   const handleNewTest = () => {
//     resetQuestionnaire();
//     router.push("/");
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   // High-Quality PDF Builder Engine
//   const handleDownload = () => {
//     if (!result) return;

//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });

//     // Color Setup Palettes
//     const primaryColor = [37, 99, 235]; // Blue accent
//     const darkNeutral = [30, 41, 59];
//     const lightBackground = [248, 250, 252];
//     const borderGray = [226, 232, 240];
//     const statusColor = config.colorRgb;

//     // --- Header Banner Section ---
//     doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//     doc.rect(0, 0, 210, 40, "F");

//     doc.setTextColor(255, 255, 255);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.text("ASSESSMENT REPORT SUMMARY", 15, 24);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(`Generated securely via Analytics Dashboard`, 15, 32);

//     // --- User Info Grid Layout ---
//     doc.setFillColor(lightBackground[0], lightBackground[1], lightBackground[2]);
//     doc.rect(15, 48, 180, 28, "F");
//     doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
//     doc.rect(15, 48, 180, 28, "S");

//     doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(11);
//     doc.text("PATIENT & USER PROFILE", 20, 55);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     doc.text(`Name:  ${user?.name || "Anonymous User"}`, 20, 63);
//     doc.text(`Email: ${user?.email || "Not Provided"}`, 20, 69);
//     doc.text(`Date:  ${formattedDate || "N/A"}`, 120, 63);
//     doc.text(`Test:  ${assessmentName}`, 120, 69);

//     // --- Metrics Section Layout (Emulating Dashboard Layout) ---
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(14);
//     doc.text("Key Assessment Metrics", 15, 90);

//     autoTable(doc, {
//       startY: 95,
//       margin: { left: 15, right: 15 },
//       head: [["Metric Category", "Result Value", "Target Evaluation / Distribution Indicator"]],
//       body: [
//         ["Severity Status Classification", severity, `Calculated profile tier matching level: ${score}/${maxScore}`],
//         ["Model Agreement Consensus", `${agreementCount} / ${maxAgreementCount} Models`, `${Math.round((agreementCount/maxAgreementCount)*100)}% convergence across active networks`],
//         ["Raw Clinical Score Value", `${score} Points`, `Numeric score distribution on ${assessmentName} benchmark scale`],
//       ],
//       headStyles: {
//         fillColor: [51, 65, 85],
//         textColor: [255, 255, 255],
//         fontStyle: "bold",
//       },
//       columnStyles: {
//         0: { fontStyle: "bold", cellWidth: 55 },
//         1: { fontStyle: "bold", textColor: statusColor, cellWidth: 40 },
//         2: { cellWidth: 85 },
//       },
//       theme: "striped",
//     });

//     // --- Dynamic Pie Chart / Visual Scale simulation ---
//     let currentY = (doc as any).lastAutoTable.finalY + 15;
    
//     doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
//     doc.setFillColor(lightBackground[0], lightBackground[1], lightBackground[2]);
//     doc.rect(15, currentY, 180, 25, "F");
//     doc.rect(15, currentY, 180, 25, "S");

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(11);
//     doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
//     doc.text("Visual Severity Meter Indicator", 22, currentY + 8);

//     // Render bar spectrum track
//     doc.setFillColor(230, 230, 230);
//     doc.rect(22, currentY + 13, 166, 4, "F");

//     // Dynamic marker placement filled with accent configuration color profile
//     doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
//     const fillRatio = Math.max(0.05, Math.min(1, score / maxScore));
//     doc.rect(22, currentY + 13, 166 * fillRatio, 4, "F");

//     currentY += 38;

//     // --- Dynamic Recommendations Blocks ---
//     if (result.mentalHealthTips && result.mentalHealthTips.length > 0) {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(14);
//       doc.text("Personalized Clinical Action Guide", 15, currentY);
//       currentY += 6;

//       result.mentalHealthTips.forEach((tip, idx) => {
//         if (currentY > 260) { // Safety page break check
//           doc.addPage();
//           currentY = 20;
//         }
//         doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//         doc.circle(18, currentY - 1, 1.5, "F");
        
//         doc.setFont("helvetica", "normal");
//         doc.setFontSize(10);
//         doc.setTextColor(50, 50, 50);
        
//         // Auto-wrap clinical recommendation text lines gracefully
//         const textLines = doc.splitTextToSize(tip, 175);
//         doc.text(textLines, 24, currentY);
//         currentY += (textLines.length * 5) + 2;
//       });
//     }

//     // --- Page Bottom Footer Disclaimer Note ---
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(8);
//     doc.setTextColor(148, 163, 184);
//     const disclaimer = "Disclaimer: This assessment sheet compiles structural data summaries intended exclusively for educational operations. It constitutes an engineering reading visualization, not formal standalone therapeutic diagnostic criteria.";
//     const processedDisclaimer = doc.splitTextToSize(disclaimer, 180);
//     doc.text(processedDisclaimer, 15, 282);

//     // Perform operational immediate download transmission
//     doc.save(`Assessment_Result_${assessmentName}_${user?.name || "Report"}.pdf`);
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//         <Card className="p-10 text-center shadow-xl border-0">
//           <div className="text-5xl mb-4">⏳</div>
//           <p className="text-gray-600 font-medium">Loading results...</p>
//         </Card>
//       </main>
//     );
//   }

//   if (!result) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//         <Card className="p-10 text-center shadow-xl border-0 max-w-lg">
//           <div className="text-5xl mb-4">📊</div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-3">
//             No Results Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             The assessment result you are trying to access does not exist.
//           </p>
//           <Link
//             href="/"
//             className="text-blue-600 font-semibold hover:text-blue-700"
//           >
//             ← Take an Assessment
//           </Link>
//         </Card>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       {/* Header navbar */}
//       <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
//           <Link
//             href="/dashboard"
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Dashboard
//           </Link>

//           <div className="flex gap-2">
//             <button
//               onClick={handlePrint}
//               className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
//               title="Print Results"
//             >
//               <Printer className="w-5 h-5 text-gray-700" />
//             </button>

//             <button
//               onClick={handleDownload}
//               className="p-2 hover:bg-blue-50 bg-blue-100/50 border border-blue-200 rounded-lg transition cursor-pointer"
//               title="Download Interactive PDF Report"
//             >
//               <Download className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Primary Workspace */}
//       <div className="max-w-5xl mx-auto px-6 py-12">
//         {/* Title Block */}
//         <div className="mb-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
//             Your Assessment Results
//           </h1>
//           <p className="text-gray-600 text-lg">
//             {assessmentName} • {formattedDate}
//           </p>
//         </div>


//         {/* Main Result Module */}
//         <div
//           className={`${config.bg} ${config.border} border rounded-3xl p-8 md:p-10 mb-10 shadow-sm`}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             {/* Score Output */}
//             <div>
//               <p className="text-gray-600 font-medium mb-5">Model Agreement</p>
//               <div className="flex items-end gap-3 mb-6">
//                 <span className="text-7xl font-bold text-gray-900">
//                   {agreementCount}
//                 </span>
//                 <span className="text-2xl text-gray-500 mb-2">
//                   / {maxAgreementCount}
//                 </span>
//               </div>

//               <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
//                 <div
//                   className={`h-full ${config.progress} transition-all duration-500`}
//                   style={{ width: `${(agreementCount / maxAgreementCount) * 100}%` }}
//                 />
//               </div>
//               <p className="text-sm text-gray-600">
//                 Assessment completed successfully
//               </p>
//             </div>

//             {/* Severity Status Indicators */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 <p className="text-gray-600 font-medium mb-4">Severity Level</p>
//                 <span
//                   className={`inline-flex px-6 py-3 rounded-full text-xl font-bold ${config.badge}`}
//                 >
//                   {severity}
//                 </span>
//               </div>

//               <div className="mt-10">
//                 <div className="flex justify-between mb-3">
//                   <p className="font-bold text-gray-900">{score}/{maxScore}</p>
//                   <p className="text-gray-600 font-medium">Severity Level</p>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full ${config.progress}`}
//                     style={{ width: `${(score / maxScore) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Highlight Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           {[
//             {
//               title: "Self-Care Focus",
//               desc: "Prioritize activities that help reduce stress and improve emotional balance.",
//               icon: Heart,
//               iconBg: "bg-blue-100",
//               iconColor: "text-blue-600",
//             },
//             {
//               title: "Track Progress",
//               desc: "Retake this assessment after a few weeks to monitor changes.",
//               icon: TrendingUp,
//               iconBg: "bg-green-100",
//               iconColor: "text-green-600",
//             },
//             {
//               title: "Recommended Action",
//               desc: "Seek guidance from a licensed mental health professional if symptoms persist.",
//               icon: Zap,
//               iconBg: "bg-purple-100",
//               iconColor: "text-purple-600",
//             },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className={`p-3 rounded-xl ${item.iconBg}`}>
//                   <item.icon className={`w-5 h-5 ${item.iconColor}`} />
//                 </div>
//                 <h3 className="font-semibold text-lg text-gray-900 pt-1">
//                   {item.title}
//                 </h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed text-sm">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Dynamic Tips Block */}
//         {result.mentalHealthTips && result.mentalHealthTips.length > 0 && (
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8 mb-10">
//             <div className="flex items-center gap-3 mb-8">
//               <MessageCircle className="w-7 h-7 text-blue-600" />
//               <h2 className="text-3xl font-bold text-gray-900">
//                 Personalized Recommendations
//               </h2>
//             </div>

//             <ul className="space-y-5">
//               {result.mentalHealthTips.map((tip, index) => (
//                 <li key={index} className="flex gap-4 items-start">
//                   <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
//                     {index + 1}
//                   </span>
//                   <span className="text-gray-700 leading-relaxed">{tip}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Interaction Action Routes */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={() => router.push("/dashboard")}
//             className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
//           >
//             Go to Dashboard
//           </button>

//           <button
//             onClick={handleRetake}
//             className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition cursor-pointer"
//           >
//             Retake Assessment
//           </button>

//           <button
//             onClick={handleNewTest}
//             className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer"
//           >
//             New Assessment
//           </button>
//         </div>

//         {/* Detailed Qualitative Analysis */}
//         <div className="bg-white rounded-3xl border border-gray-200 p-8 mt-10 mb-10 shadow-sm">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">
//             Detailed Analysis
//           </h2>

//           <div className="space-y-8">
//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 What Your Score Means
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Your assessment indicates{" "}
//                 <span className="font-semibold">{severity.toLowerCase()}</span>{" "}
//                 symptoms. This result should be interpreted as a screening
//                 indicator, not a medical diagnosis.
//               </p>
//             </div>

//             <div className="border-l-4 border-green-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 Positive Indicators
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Consistent routines, social support, and healthy habits can
//                 significantly improve emotional resilience and overall
//                 well-being.
//               </p>
//             </div>

//             <div className="border-l-4 border-orange-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 Areas to Focus On
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Consider improving sleep quality, stress management, physical
//                 activity, and emotional communication with trusted people.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Legal Medical Disclaimer */}
//         <p className="text-center text-gray-500 text-sm max-w-3xl mx-auto mt-10 leading-relaxed">
//           This assessment is intended for informational and educational purposes
//           only. It is not a substitute for professional diagnosis, treatment, or
//           medical advice. Please consult a qualified healthcare provider if
//           needed.
//         </p>
//       </div>
//     </main>
//   );
// }

// export default function ResultsPage() {
//   return (
//     <Suspense
//       fallback={
//         <main className="min-h-screen flex items-center justify-center bg-slate-50">
//           <Card className="p-10 text-center shadow-xl border-0">
//             <div className="text-5xl mb-4">⏳</div>
//             <p className="text-gray-600 font-medium">Loading results...</p>
//           </Card>
//         </main>
//       }
//     >
//       <ResultsContent />
//     </Suspense>
//   );
// }
"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Download,
  Heart,
  TrendingUp,
  Zap,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Card } from "@/components/ui/card";
import { getAssessmentHistory } from "@/lib/api/mlClient";
import { AssessmentResult } from "@/lib/types";
import { useQuestionnaire } from "@/lib/contexts/QuestionnaireContext";
import { useAuth } from "@/lib/contexts/AuthContext";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

ChartJS.register(ArcElement, Tooltip, Legend);

const DEMO_RESULTS: { [key: string]: AssessmentResult } = {
  "1": {
    id: "1",
    testType: "phq9",
    prediction: 1,
    confidenceScore: 0.87,
    mentalHealthTips: [
      "Consider regular exercise to boost your mood and energy levels",
      "Practice mindfulness meditation for 10-15 minutes daily",
      "Maintain a consistent sleep schedule of 7-8 hours per night",
      "Stay connected with supportive friends and family",
    ],
    date: new Date().toISOString(),
    answers: {},
    _scoreLabel: "Mild",
    score: 8,
    maxScore: 27,
  } as AssessmentResult & {
    score: number;
    maxScore: number;
  },
};

const severityConfig = {
  Minimal: {
    badge: "bg-green-100 text-green-800",
    bg: "bg-green-50",
    border: "border-green-200",
    progress: "bg-green-600",
    colorRgb: [22, 163, 74],
  },
  Mild: {
    badge: "bg-blue-100 text-blue-800",
    bg: "bg-blue-50",
    border: "border-blue-200",
    progress: "bg-blue-600",
    colorRgb: [37, 99, 235],
  },
  Moderate: {
    badge: "bg-yellow-100 text-yellow-800",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    progress: "bg-yellow-600",
    colorRgb: [202, 138, 4],
  },
  Severe: {
    badge: "bg-orange-100 text-orange-800",
    bg: "bg-orange-50",
    border: "border-orange-200",
    progress: "bg-orange-600",
    colorRgb: [234, 88, 12],
  },
  Extreme: {
    badge: "bg-red-100 text-red-800",
    bg: "bg-red-50",
    border: "border-red-200",
    progress: "bg-red-600",
    colorRgb: [220, 38, 38],
  },
};

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectTest, resetQuestionnaire } = useQuestionnaire();
  const { token, user , loading:isLoading } = useAuth();
  const resultId = searchParams.get("id");
  const chartRef = useRef<HTMLCanvasElement>(null);

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     if (isLoading) return;
 
     if (!token) {
       router.replace("/auth/login");
       return;
     }
   }, [token]);
  useEffect(() => {
    const fetchHistoryAndSetResult = async () => {
      if (!token) {
        if (resultId && DEMO_RESULTS[resultId]) {
          setResult(DEMO_RESULTS[resultId]);
        } else {
          setResult(DEMO_RESULTS["1"]);
        }
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const history = await getAssessmentHistory(token);
        if (Array.isArray(history) && history.length > 0) {
          if (resultId) {
            const found = history.find((r) => r.id === resultId || String(r.id).includes(resultId));
            setResult(found || null);
          } else {
            setResult(history[history.length - 1]);
          }
        } else {
          setResult(
            resultId && DEMO_RESULTS[resultId]
              ? DEMO_RESULTS[resultId]
              : DEMO_RESULTS["1"],
          );
        }
      } catch (error: any) {
        if (resultId && DEMO_RESULTS[resultId]) {
          setResult(DEMO_RESULTS[resultId]);
        } else {
          setResult(DEMO_RESULTS["1"]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryAndSetResult();
  }, [resultId, token, router]);

  const formattedDate = useMemo(() => {
    if (!result?.date) return "";
    return new Date(result.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [result]);

let severity = "Minimal";

if (result?.testType === "phq9") {
  const score = result?.prediction; // Replace with your actual PHQ-9 score field

  severity =
    result?.prediction === 0
      ? "Minimal"
      : result?.prediction === 1
        ? "Mild"
        : result?.prediction === 2
          ? "Moderate"
        : result?.prediction === 3
          ? "Severe"
          : result?.prediction === 4
            ? "Extreme"
            : "Unknown";
} else {
  severity =
    result?.prediction === 0
      ? "Minimal"
      : result?.prediction === 1
        ? "Mild"
        : result?.prediction === 2
          ? "Severe"
          : result?.prediction === 3
            ? "Extreme"
            : "Unknown";
}

  const config =
    severityConfig[severity as keyof typeof severityConfig] ||
    severityConfig.Minimal;

  const agreementCount = result?.agreementCount ?? 0;
  const maxAgreementCount = (result?.testType === "all59" ? 3 : 1) || 3;
  const score = Number((result as any)?.score ?? (result?.prediction) ?? 0)+1;
  const maxScore = (result as any)?.maxScore || (result?.testType === "phq9" ? 5 : 4);
      const severityDescription: Record<string, string> = {
  Minimal: "No immediate concerns. Maintain healthy habits.",
  Mild: "Monitor your symptoms and consider self-care.",
  Moderate: "Consider consulting a mental health professional.",
  Severe: "Professional mental health support is strongly recommended.",
  Extreme: "Seek immediate professional mental health care.",
};
  const assessmentName = (result?.testType || "Assessment").toUpperCase();

  const handleRetake = () => {
    if (!result) return;
    selectTest(result.testType);
    router.push(`/test/${result.testType}`);
  };

  const handleNewTest = () => {
    resetQuestionnaire();
    router.push("/");
  };

  const handlePrint = () => {
    window.print();
  };

  // Enhanced PDF with Charts
  const handleDownload = async () => {
    if (!result) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const primaryColor = [37, 99, 235];
    const darkNeutral = [30, 41, 59];
    const lightBackground = [248, 250, 252];
    const borderGray = [226, 232, 240];
    const statusColor = config.colorRgb;

    // --- Enhanced Header Banner ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 50, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("ASSESSMENT REPORT", 15, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Mental Health Assessment Summary • ${assessmentName}`, 15, 32);
    doc.setFontSize(9);
    doc.text(`Generated on ${formattedDate}`, 15, 40);

    // --- User Info Grid ---
    doc.setFillColor(lightBackground[0], lightBackground[1], lightBackground[2]);
    doc.rect(15, 55, 180, 32, "F");
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.rect(15, 55, 180, 32, "S");

    doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("PATIENT INFORMATION", 20, 63);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Name: ${user?.name || "Anonymous User"}`, 20, 71);
    doc.text(`Email: ${user?.email || "Not Provided"}`, 20, 78);
    doc.text(`Date: ${formattedDate}`, 120, 71);
    doc.text(`Assessment: ${assessmentName}`, 120, 78);

    // --- Key Metrics Section ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
    doc.text("Key Assessment Metrics", 15, 100);
    autoTable(doc, {
      startY: 105,
      margin: { left: 15, right: 15 },
      head: [["Metric", "Value", "Status"]],
      body: [
        ["Severity Level", severity, severityDescription[severity] ?? "Assessment completed"],
        [`Clinical Score`, `${score}/${maxScore}`, "Normalized Scale"],
        ["Model Agreement", `${agreementCount}/${maxAgreementCount}`, `${Math.round((agreementCount/maxAgreementCount)*100)}% Confidence`],
      ],
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 11,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { fontStyle: "bold", textColor: statusColor, cellWidth: 40 },
        2: { cellWidth: 80 },
      },
      theme: "striped",
      alternateRowStyles: { fillColor: [245, 248, 252] },
    });

    let currentY = (doc as any).lastAutoTable.finalY + 15;

    // --- Severity Indicator with visual bar ---
    doc.setFillColor(lightBackground[0], lightBackground[1], lightBackground[2]);
    doc.rect(15, currentY, 180, 28, "F");
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.rect(15, currentY, 180, 28, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
    doc.text("Severity Assessment Meter", 20, currentY + 8);

    // Severity bar with gradient effect
    doc.setFillColor(230, 230, 230);
    doc.rect(20, currentY + 13, 170, 6, "F");

    doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
    const fillRatio = Math.max(0.1, Math.min(1, score / maxScore));
    doc.rect(20, currentY + 13, 170 * fillRatio, 6, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`${severity}`, 145, currentY + 22);

    currentY += 35;

    // --- Distribution Visualization (Pie Chart Data) ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
    doc.text("Score Distribution Analysis", 15, currentY);

    currentY += 10;

    // Create pie chart visualization with text-based distribution
    const chartData = [
      { label: "Current Score", value: score, color: statusColor },
      { label: "Remaining Capacity", value: Math.max(0, maxScore - score), color: [200, 200, 200] },
    ];

    // Draw pie chart manually using circles
    const chartX = 40;
    const chartY = currentY;
    const chartRadius = 18;

    // Total for percentage calculation
    const total = maxScore;
    let currentAngle = 0;

    chartData.forEach((data) => {
      const sliceAngle = (data.value / total) * 360;
      doc.setFillColor(data.color[0], data.color[1], data.color[2]);

      // Draw each slice as a segment
      const startAngle = (currentAngle * Math.PI) / 180;
      const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);

      currentAngle += sliceAngle;
    });

    // Simple score display alternative to pie
    const percentScore = Math.round((score / maxScore) * 100);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(`${percentScore}%`, chartX, chartY + 5);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Assessment Score", chartX - 5, chartY + 12);

    // Distribution legend
    doc.setFontSize(9);
    doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
    doc.text(`Score: ${score}/${maxScore}`, chartX + 35, chartY);
    doc.text(`Percentage: ${percentScore}%`, chartX + 35, chartY + 7);
    doc.text(`Severity: ${severity}`, chartX + 35, chartY + 14);

    currentY += 30;

    // --- Recommendations Section ---
    if (result.mentalHealthTips && result.mentalHealthTips.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(darkNeutral[0], darkNeutral[1], darkNeutral[2]);
      doc.text("Personalized Recommendations", 15, currentY);
      currentY += 8;

      result.mentalHealthTips.forEach((tip, idx) => {
        if (currentY > 270) {
          doc.addPage();
          currentY = 20;
        }

        // Colored badge
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.circle(18, currentY, 2, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);

        const textLines = doc.splitTextToSize(tip, 170);
        doc.text(textLines, 25, currentY);
        currentY += (textLines.length * 5) + 3;
      });
    }

    currentY += 5;

    // --- Professional Footer ---
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    const disclaimer = `This report contains assessment data for informational purposes only. It is not a medical diagnosis or treatment recommendation. Please consult a licensed mental health professional for clinical interpretation and guidance.`;
    const processedDisclaimer = doc.splitTextToSize(disclaimer, 180);
    doc.text(processedDisclaimer, 15, 285);

    doc.save(`Assessment_Report_${assessmentName}_${user?.name || "Report"}.pdf`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <Card className="p-12 text-center shadow-2xl border-0 bg-white">
          <div className="animate-spin text-5xl mb-4">⏳</div>
          <p className="text-gray-600 font-semibold text-lg">Loading your results...</p>
        </Card>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <Card className="p-12 text-center shadow-2xl border-0 max-w-lg bg-white">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            The assessment result you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="text-blue-600 font-semibold hover:text-blue-700 text-lg"
          >
            ← Take an Assessment
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white">
      {/* Header navbar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="p-2.5 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              title="Print Results"
            >
              <Printer className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={handleDownload}
              className="p-2.5 hover:bg-blue-100 bg-blue-100/60 border border-blue-300 rounded-lg transition cursor-pointer font-medium"
              title="Download PDF Report"
            >
              <Download className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title Block */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Your Assessment Results
          </h1>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">{assessmentName}</span> • {formattedDate}
          </p>
        </div>

        {/* Main Result Card */}
        <div
          className={`${config.bg} ${config.border} border-2 rounded-2xl p-10 mb-10 shadow-lg`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Score Section */}
            <div>
              <p className="text-gray-600 font-semibold mb-6 uppercase text-sm tracking-wide">Model Agreement</p>
              <div className="flex items-end gap-3 mb-8">
                <span className="text-8xl font-bold text-gray-900">
                  {agreementCount}
                </span>
                <span className="text-3xl text-gray-500 mb-3">
                  / {maxAgreementCount}
                </span>
              </div>

              <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-4 shadow-inner">
                <div
                  className={`h-full ${config.progress} transition-all duration-700 shadow-md`}
                  style={{ width: `${(agreementCount / maxAgreementCount) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                { "Assessment completed"}
              </p>
            </div>

            {/* Severity Section */}
            <div className="flex flex-col justify-between">
              <div className="mb-6">
                <p className="text-gray-600 font-semibold mb-4 uppercase text-sm tracking-wide">Severity Level</p>
                <span
                  className={`inline-flex px-8 py-4 rounded-full text-2xl font-bold ${config.badge} shadow-md`}
                >
                  {severity}
                </span>
              </div>
          <p className="text-sm text-gray-600 font-medium">
                {severityDescription[severity] ?? "Assessment completed"}
              </p>
              <div className="mt-10">
                <div className="flex justify-between mb-3">
                  <p className="font-bold text-gray-900 text-lg">{score}/{maxScore}</p>
                  <p className="text-gray-600 font-medium">Clinical Score</p>
                </div>
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full ${config.progress} transition-all duration-700`}
                    style={{ width: `${(score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Self-Care Focus",
              desc: "Prioritize activities that reduce stress and improve emotional balance.",
              icon: Heart,
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
            },
            {
              title: "Track Progress",
              desc: "Retake this assessment after a few weeks to monitor changes.",
              icon: TrendingUp,
              iconBg: "bg-green-100",
              iconColor: "text-green-600",
            },
            {
              title: "Seek Guidance",
              desc: "Consult a licensed mental health professional if symptoms persist.",
              icon: Zap,
              iconBg: "bg-purple-100",
              iconColor: "text-purple-600",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${item.iconBg}`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {result.mentalHealthTips && result.mentalHealthTips.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-10 mb-10 shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Personalized Recommendations
              </h2>
            </div>

            <ul className="space-y-5">
              {result.mentalHealthTips.map((tip, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed font-medium">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Go to Dashboard
          </button>

          <button
            onClick={handleRetake}
            className="px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all cursor-pointer"
          >
            Retake Assessment
          </button>

          <button
            onClick={handleNewTest}
            className="px-8 py-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all cursor-pointer"
          >
            New Assessment
          </button>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-10 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-blue-600" />
            Detailed Analysis
          </h2>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                What Your Score Means
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your assessment indicates <span className="font-semibold text-gray-900">{severity.toLowerCase()}</span> symptoms on the screening scale. This result serves as a screening indicator and should not be interpreted as a formal medical diagnosis.
              </p>
            </div>

            <div className="border-l-4 border-green-600 pl-6 py-2">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                Next Steps
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Consider reaching out to a mental health professional for a comprehensive evaluation. They can provide personalized treatment recommendations based on your specific needs.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-6 py-2">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                Disclaimer
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This assessment is a screening tool and does not constitute medical advice or diagnosis. Always consult qualified healthcare providers for medical guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <Card className="p-12 text-center shadow-2xl">
            <div className="animate-spin text-5xl">⏳</div>
          </Card>
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
