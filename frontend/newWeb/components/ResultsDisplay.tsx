'use client';

import React from 'react';
import { AssessmentResult, SEVERITY_LABELS } from '@/lib/types';
import { Card } from './ui/card';
import { getTestConfig } from '@/lib/data/testConfigs';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, AlertTriangle, XCircle, Home, RotateCcw } from 'lucide-react';

interface ResultsDisplayProps {
  result: AssessmentResult;
  onRetake?: () => void;
  onNewTest?: () => void;
}

export function ResultsDisplay({ result, onRetake, onNewTest }: ResultsDisplayProps) {
  const testConfig = getTestConfig(result.testType);
  const severityInfo = SEVERITY_LABELS[result.prediction];
  const severity = severityInfo?.label || 'Unknown';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Pie chart data
  const pieData = [
    { name: 'Current', value: result.prediction + 1 },
    { name: 'Remaining', value: 4 - (result.prediction + 1) },
  ];

  const COLORS = ['#4f46e5', '#e0e7ff'];

  // Severity spectrum data
  const severitySpectrum = [
    {
      level: 0,
      label: 'Minimal',
      icon: CheckCircle2,
      description: 'Optimal functioning with minimal symptoms.',
      active: result.prediction === 0,
      borderColor: 'border-emerald-200',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    {
      level: 1,
      label: 'Mild',
      icon: AlertCircle,
      description: 'Some challenges but generally managing well.',
      active: result.prediction === 1,
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      level: 2,
      label: 'Moderate',
      icon: AlertTriangle,
      description: 'Significant symptoms requiring attention.',
      active: result.prediction === 2,
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      level: 3,
      label: 'Severe',
      icon: XCircle,
      description: 'Critical symptoms requiring professional help.',
      active: result.prediction === 3,
      borderColor: 'border-red-200',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Assessment Overview Card */}
      <Card className="border-0 shadow-lg overflow-hidden bg-white">
        <div className="p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Pie Chart */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-72 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={6}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {result.prediction + 1}
                  </div>
                  <div className="text-sm font-medium text-gray-500 mt-1">
                    Level
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {testConfig?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(result.date)}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Result: <span className="text-indigo-600">{severity}</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result._scoreLabel && (
                    <>
                      <strong>{result._scoreLabel}:</strong>{' '}
                    </>
                  )}
                  {result.mentalHealthTips && result.mentalHealthTips[0]}
                </p>
              </div>

              {result.confidenceScore && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Confidence
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {Math.round(result.confidenceScore * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${result.confidenceScore * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/" className="flex-1">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    New Test
                  </button>
                </Link>
                <button
                  onClick={onRetake}
                  className="flex-1 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all"
                >
                  Retake
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Severity Spectrum */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Severity Spectrum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {severitySpectrum.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.level}
                className={`border-2 p-6 transition-all ${
                  item.active
                    ? `${item.borderColor} ${item.bgColor} shadow-lg`
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon
                    className={`w-6 h-6 ${
                      item.active ? item.textColor : 'text-gray-400'
                    }`}
                  />
                  {item.active && (
                    <span className={`text-xs font-bold px-2 py-1 rounded ${item.textColor} ${item.bgColor}`}>
                      YOUR LEVEL
                    </span>
                  )}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  item.active ? item.textColor : 'text-gray-900'
                }`}>
                  {item.label}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  item.active ? item.textColor : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recommendations Card */}
      {result.mentalHealthTips && result.mentalHealthTips.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Personalized Recommendations
          </h2>
          <div className="space-y-4">
            {result.mentalHealthTips.map((tip, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Resources Card */}
      <Card className="border-0 shadow-lg bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Get Professional Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.nami.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">NAMI</h3>
            <p className="text-sm text-gray-600">
              National Alliance on Mental Illness
            </p>
          </a>
          <a
            href="https://www.mhanational.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">MHA</h3>
            <p className="text-sm text-gray-600">Mental Health America</p>
          </a>
          <a
            href="https://suicidepreventionlifeline.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">988</h3>
            <p className="text-sm text-gray-600">Suicide & Crisis Lifeline</p>
          </a>
          <a
            href="https://www.psychologytoday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Psychology Today</h3>
            <p className="text-sm text-gray-600">Find a therapist</p>
          </a>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-200">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
