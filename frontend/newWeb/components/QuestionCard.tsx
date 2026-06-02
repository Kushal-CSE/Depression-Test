
// 'use client';

// import React from 'react';
// import { Question } from '@/lib/types';
// import { Card } from './ui/card';
// import { Button } from './ui/button';

// interface QuestionCardProps {
//   question: Question;
//   answer: number | undefined;
//   onAnswer: (value: number) => void;
//   questionNumber: number;
//   totalQuestions: number;
// }

// export function QuestionCard({
//   question,
//   answer,
//   onAnswer,
//   questionNumber,
//   totalQuestions
// }: QuestionCardProps) {
//   return (
//     <Card className="w-full border-0 shadow-lg bg-white overflow-hidden">
//       <div className="p-8 sm:p-10">
//         {/* Question Counter Badge */}
//         <div className="inline-flex items-center gap-2 mb-6">
//           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
//             <span className="text-white text-xs font-bold">{questionNumber}</span>
//           </div>
//           <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
//             Question {questionNumber} of {totalQuestions}
//           </span>
//         </div>

//         {/* Question Text */}
//         <h3 className="mb-10 text-2xl sm:text-3xl font-bold text-gray-900 leading-relaxed text-balance">
//           {question.text}
//         </h3>

//         {/* Scale Options */}
//         <div className="space-y-3 mb-8">
//           {question.scale.map((option, idx) => (
//             <button
//               key={option.value}
//               onClick={() => onAnswer(option.value)}
//               className={`w-full p-5 rounded-xl border-2 transition-all duration-200 text-left font-medium group ${
//                 answer === option.value
//                   ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 shadow-md'
//                   : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <span>{option.label}</span>
//                 {answer === option.value && (
//                   <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Help Text */}
//         <p className="text-xs text-gray-500 text-center mb-6">
//           Select the option that best describes your experience
//         </p>
//       </div>
//     </Card>
//   );
// }
"use client";


import React from 'react';
import { Question } from '@/lib/types';
import { Card } from './ui/card';

import { Check } from 'lucide-react';


interface QuestionCardProps {
  question: Question;
  answer: number | undefined;
  onAnswer: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  answer,
  onAnswer,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  return (

    <Card className="w-full border-0 shadow-xl bg-white overflow-hidden rounded-2xl">
      <div className="p-8 sm:p-10">
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <span className="text-white text-sm font-bold">{questionNumber}</span>
          </div>
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">

            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-gray-900 leading-relaxed">
          {question.text}
        </h3>


        <div className="space-y-3 mb-8">
          {question.scale.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`w-full p-5 rounded-xl border-2 transition-all duration-200 text-left font-medium group hover:shadow-lg ${
                answer === option.value
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 shadow-md ring-2 ring-blue-300 ring-offset-2'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{option.label}</span>
                {answer === option.value && (
                  <Check className="w-5 h-5 text-blue-600" />

                )}
              </div>
            </button>
          ))}
        </div>


        <p className="text-xs text-gray-500 text-center">

          Select the option that best describes your experience
        </p>
      </div>
    </Card>
  );

}

