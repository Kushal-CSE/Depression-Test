'use client';

import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  canPrevious: boolean;
  canNext: boolean;
  canSubmit?: boolean;
  isLoading?: boolean;
  isLastQuestion?: boolean;
}

export function NavigationButtons({
  onPrevious,
  onNext,
  onSubmit,
  canPrevious,
  canNext,
  canSubmit = false,
  isLoading = false,
  isLastQuestion = false
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-4 justify-between">
      <Button
        onClick={onPrevious}
        disabled={!canPrevious || isLoading}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </Button>

      {isLastQuestion && onSubmit ? (
        <Button
          onClick={onSubmit}
          disabled={!canSubmit || isLoading}
          size="lg"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          {isLoading ? 'Analyzing...' : 'Submit Assessment'}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canNext || isLoading}
          size="lg"
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
