'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { TestType, Question, TestConfig } from '../types';
import { getTestConfig } from '../data/testConfigs';

interface QuestionnaireContextType {
  currentTestType: TestType | null;
  testConfig: TestConfig | null;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  selectTest: (testType: TestType) => void;
  answerQuestion: (questionId: string, value: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  resetQuestionnaire: () => void;
  canProceed: () => boolean;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const [currentTestType, setCurrentTestType] = useState<TestType | null>(null);
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectTest = useCallback((testType: TestType) => {
    const config = getTestConfig(testType);
    if (config) {
      setCurrentTestType(testType);
      setTestConfig(config);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setError(null);
    }
  }, []);

  const answerQuestion = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (testConfig && currentQuestionIndex < testConfig.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [testConfig, currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (testConfig && index >= 0 && index < testConfig.questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [testConfig]);

  const resetQuestionnaire = useCallback(() => {
    setCurrentTestType(null);
    setTestConfig(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setError(null);
  }, []);

  const canProceed = useCallback(() => {
    if (!testConfig) return false;
    const currentQuestion = testConfig.questions[currentQuestionIndex];
    return answers[currentQuestion.id] !== undefined;
  }, [testConfig, currentQuestionIndex, answers]);

  return (
    <QuestionnaireContext.Provider
      value={{
        currentTestType,
        testConfig,
        currentQuestionIndex,
        answers,
        isLoading,
        error,
        selectTest,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        resetQuestionnaire,
        canProceed
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
}
