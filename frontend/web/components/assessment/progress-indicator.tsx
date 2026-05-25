"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  sectionTitles: string[]
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  sectionTitles,
}: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="relative">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-xs font-medium text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
      </div>

      {/* Step indicators - visible on larger screens */}
      <div className="hidden lg:flex gap-2 overflow-x-auto pb-2">
        {sectionTitles.map((title, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap",
              index === currentStep
                ? "bg-primary text-primary-foreground"
                : index < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
            )}
          >
            {index < currentStep ? (
              <Check className="h-3 w-3" />
            ) : (
              <span
                className={cn(
                  "flex items-center justify-center h-4 w-4 rounded-full text-[10px]",
                  index === currentStep
                    ? "bg-primary-foreground/20"
                    : "bg-muted-foreground/20"
                )}
              >
                {index + 1}
              </span>
            )}
            <span className="hidden xl:inline">{title}</span>
          </button>
        ))}
      </div>

      {/* Mobile step indicator */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="flex gap-1">
          {sectionTitles.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === currentStep
                  ? "w-4 bg-primary"
                  : index < currentStep
                    ? "w-1.5 bg-primary/50"
                    : "w-1.5 bg-secondary"
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">
          {sectionTitles[currentStep]}
        </span>
      </div>
    </div>
  )
}
