'use client';

import React from 'react';
import { AssessmentResult, SEVERITY_LABELS } from '@/lib/types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { getTestConfig } from '@/lib/data/testConfigs';
import Link from 'next/link';
import { Eye, Trash2 } from 'lucide-react';

interface HistoryListProps {
  results: AssessmentResult[];
  onDelete?: (id: string) => void;
}

export function HistoryList({ results, onDelete }: HistoryListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSeverityBadgeColor = (prediction: number) => {
    return SEVERITY_LABELS[prediction as 0 | 1 | 2 | 3].color;
  };

  if (results.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <div className="p-12 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Assessments Yet</h3>
          <p className="text-gray-600 mb-6">
            Start by taking an assessment to track your mental health over time.
          </p>
          <Link href="/">
            <Button size="lg">
              Take Assessment
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const testConfig = getTestConfig(result.testType);
        const severity = SEVERITY_LABELS[result.prediction];

        return (
          <Card key={result.id} className="border-0 shadow-md hover:shadow-lg transition-all group bg-white overflow-hidden">
            <div className="p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                {/* Left Content */}
                <div className="flex-grow">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{testConfig?.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {testConfig?.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(result.date)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Quick Tips Preview */}
                  {result.mentalHealthTips.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-blue-900 mb-2">💡 Key Tip:</p>
                      <p className="text-sm text-blue-800 line-clamp-2">
                        {result.mentalHealthTips[0]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side - Metrics and Actions */}
                <div className="flex flex-col sm:items-end gap-5">
                  {/* Severity Badge and Confidence */}
                  <div className="flex items-center gap-6">
                    <div className={`px-5 py-3 rounded-lg text-center ${severity.color} min-w-[120px]`}>
                      <div className="font-bold text-lg leading-tight">
                        {severity.label}
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Score: {result.prediction}/3
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">Confidence</div>
                      <div className="font-bold text-2xl text-gray-900 mt-1">
                        {(result.confidenceScore * 100).toFixed(0)}%
                      </div>
                      <div className="w-20 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          style={{ width: `${result.confidenceScore * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link href={`/results?id=${result.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm flex items-center justify-center gap-2 group/btn">
                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        View Details
                      </button>
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(result.id)}
                        className="px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group/btn"
                      >
                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
