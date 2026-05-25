'use client';

import React, { useState, useEffect } from 'react';
import { getAssessmentHistory, clearAssessmentHistory, getAssessmentStatistics } from '@/lib/api/mlClient';
import { AssessmentResult } from '@/lib/types';
import { HistoryList } from '@/components/HistoryList';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { TrendingDown, TrendingUp, Target, AlertCircle, CheckCircle } from 'lucide-react';

// Dummy user data
const DUMMY_USER = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  joinedDate: '2024-01-15',
  avatar: '👤',
};

// Dummy assessment data
const DUMMY_ASSESSMENTS: AssessmentResult[] = [
  {
    id: '1',
    testType: 'phq9',
    prediction: 1,
    confidenceScore: 0.87,
    mentalHealthTips: ['Consider regular exercise', 'Practice meditation daily', 'Get 7-8 hours of sleep'],
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    testType: 'bdi2',
    prediction: 2,
    confidenceScore: 0.92,
    mentalHealthTips: ['Schedule time with friends', 'Try cognitive behavioral therapy', 'Keep a mood journal'],
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    testType: 'cesd',
    prediction: 1,
    confidenceScore: 0.81,
    mentalHealthTips: ['Maintain consistent routines', 'Eat nutritious meals', 'Limit caffeine intake'],
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    testType: 'phq9',
    prediction: 2,
    confidenceScore: 0.85,
    mentalHealthTips: ['Consider professional help', 'Practice self-compassion', 'Join a support group'],
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function DashboardPage() {
  const [history, setHistory] = useState<AssessmentResult[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date');

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = () => {
    // Try to get real data from localStorage, fallback to dummy data
    let assessments = getAssessmentHistory();
    if (assessments.length === 0) {
      // Use dummy data for demonstration
      assessments = DUMMY_ASSESSMENTS;
    }
    setHistory(assessments);
    
    // Calculate statistics
    const stats = {
      totalAssessments: assessments.length,
      lastAssessmentDate: assessments.length > 0 ? assessments[0].date : new Date().toISOString(),
      averageConfidence: assessments.length > 0 
        ? assessments.reduce((sum, a) => sum + a.confidenceScore, 0) / assessments.length 
        : 0,
      testTypeCounts: assessments.reduce((acc: any, a) => {
        acc[a.testType] = (acc[a.testType] || 0) + 1;
        return acc;
      }, {}),
    };
    setStatistics(stats);
  };

  const handleDelete = (id: string) => {
    const updated = history.filter(r => r.id !== id);
    setHistory(updated);
    localStorage.setItem('assessmentHistory', JSON.stringify(updated));
    loadAssessments();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all assessment results? This cannot be undone.')) {
      clearAssessmentHistory();
      setHistory([]);
      setStatistics(null);
    }
  };

  const sortedHistory = [...history].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.prediction - a.prediction;
    }
  });

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="text-gray-600 mt-2">Track and review your mental health assessments over time</p>
          </div>
          <Link href="/">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
              Take New Assessment
            </button>
          </Link>
        </div>

        {/* User Profile Card */}
        <Card className="border-0 shadow-lg bg-white mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-5xl border-4 border-white border-opacity-30">
                {DUMMY_USER.avatar}
              </div>
              <div className="text-white flex-grow">
                <h2 className="text-3xl font-bold">{DUMMY_USER.name}</h2>
                <p className="text-blue-100 text-sm">{DUMMY_USER.email}</p>
                <p className="text-blue-100 text-xs mt-1">Member since {new Date(DUMMY_USER.joinedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Total Assessments */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Assessments</p>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900">{statistics.totalAssessments}</p>
                <p className="text-xs text-gray-500 mt-2">Completed since joining</p>
              </div>
            </Card>

            {/* Latest Assessment */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Latest Assessment</p>
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date(statistics.lastAssessmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className="text-xs text-gray-500 mt-2">{new Date(statistics.lastAssessmentDate).toLocaleDateString('en-US', { year: 'numeric' })}</p>
              </div>
            </Card>

            {/* Average Confidence */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Avg Confidence</p>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900">
                  {(statistics.averageConfidence * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-gray-500 mt-2">Across all assessments</p>
              </div>
            </Card>

            {/* Most Used Test */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Favorite Test</p>
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-pink-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.entries(statistics.testTypeCounts).sort((a: any, b: any) => b[1] - a[1])[0][0].toUpperCase()}
                </p>
                <p className="text-xs text-gray-500 mt-2">Most frequently taken</p>
              </div>
            </Card>
          </div>
        )}

        {/* Section Header and Controls */}
        {history.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Assessment History</h2>
              <p className="text-gray-600 text-sm mt-1">Review your past assessments and track your progress</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSortBy('date')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  sortBy === 'date'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                Sort by Date
              </button>
              <button
                onClick={() => setSortBy('severity')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  sortBy === 'severity'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                Sort by Severity
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-lg font-medium text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Assessment List */}
        <HistoryList results={sortedHistory} onDelete={handleDelete} />

        {/* Empty State */}
        {history.length === 0 && (
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Assessments Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start tracking your mental health by taking your first assessment today. Your results will appear here.
              </p>
              <Link href="/">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                  Take Your First Assessment
                </button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </main>
    </ProtectedRoute>
  );
}
