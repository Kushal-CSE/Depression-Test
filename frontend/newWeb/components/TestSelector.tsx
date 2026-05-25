'use client';

import React from 'react';
import { Card } from './ui/card';
import { ALL_TEST_CONFIGS } from '@/lib/data/testConfigs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function TestSelector() {
  const getGradientClasses = (index: number) => {
    const gradients = [
      'from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 border-blue-200 hover:border-blue-400',
      'from-indigo-500/10 to-indigo-600/5 hover:from-indigo-500/20 hover:to-indigo-600/10 border-indigo-200 hover:border-indigo-400',
      'from-purple-500/10 to-purple-600/5 hover:from-purple-500/20 hover:to-purple-600/10 border-purple-200 hover:border-purple-400',
      'from-pink-500/10 to-pink-600/5 hover:from-pink-500/20 hover:to-pink-600/10 border-pink-200 hover:border-pink-400',
      'from-emerald-500/10 to-emerald-600/5 hover:from-emerald-500/20 hover:to-emerald-600/10 border-emerald-200 hover:border-emerald-400',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {ALL_TEST_CONFIGS.map((config, index) => (
          <Link key={config.testType} href={`/test/${config.testType}`}>
            <Card className={`h-full border-2 bg-gradient-to-br ${getGradientClasses(index)} shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden`}>
              <div className="relative p-6 flex flex-col h-full">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full blur-lg" style={{
                  background: 'radial-gradient(circle, currentColor 0%, transparent 70%)',
                  color: ['blue', 'indigo', 'purple', 'pink', 'emerald'][index % 5]
                }}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {config.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {config.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                    {config.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">
                        {config.totalQuestions} Questions
                      </span>
                      <span className="text-xs text-gray-500">
                        ~{Math.ceil(config.totalQuestions * 0.5)} min
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                      Start Assessment
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
