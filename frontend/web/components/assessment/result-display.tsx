"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  Phone,
  RefreshCw,
  Heart,
  ExternalLink,
  User,
  Calendar,
  CheckCircle2,
  Lightbulb,
  FileText,
} from "lucide-react";

export interface AssessmentResult {
  prediction: number;
  confidence: number;
  evaluation: string;
  recommendations: string[];
  userName: string;
  submittedAt: Date;
}

interface ResultDisplayProps {
  result: AssessmentResult;
  onReset: () => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const {
    prediction,
    confidence,
    evaluation,
    recommendations,
    userName,
    submittedAt,
  } = result;
  const isHighRisk = prediction === 1;
  const riskConfig: Record<number, any> = {
    0: {
      label: "Mild",
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-300",
      iconBg: "bg-green-100",
      icon: Shield,
      progress: 25,
      title: "Low Risk Indicators",
    },
    1: {
      label: "Not Serious",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      border: "border-yellow-300",
      iconBg: "bg-yellow-100",
      icon: AlertTriangle,
      progress: 50,
      title: "Minor Risk Indicators",
    },
    2: {
      label: "Serious",
      color: "text-orange-600",
      bg: "bg-orange-100",
      border: "border-orange-300",
      iconBg: "bg-orange-100",
      icon: AlertTriangle,
      progress: 75,
      title: "Moderate Risk Detected",
    },
    3: {
      label: "High Risk",
      color: "text-red-600",
      bg: "bg-red-100",
      border: "border-red-300",
      iconBg: "bg-red-100",
      icon: AlertTriangle,
      progress: 100,
      title: "High Risk - Immediate Attention Needed",
    },
  };
  // const confidencePercentage = (confidence * 100).toFixed(1)
  const config = riskConfig[prediction];
  const confidencePercentage = (confidence * 100).toFixed(1);
  const Icon = config.icon;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* User Info Card */}
      <Card className="p-6 bg-secondary/50">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Assessed For</p>
              <p className="font-semibold text-foreground text-lg">
                {userName}
              </p>
            </div>
          </div>
          <div className="hidden sm:block h-12 w-px bg-border" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Submitted On</p>
              <p className="font-medium text-foreground text-sm">
                {formatDate(submittedAt)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Result Card */}
      <Card className={`p-8 text-center border-2 ${config.bg} ${config.border}`}>
  <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 ${config.iconBg}`}>
    <Icon className={`h-10 w-10 ${config.color}`} />
  </div>

  <h2 className={`text-2xl font-bold mb-2 ${config.color}`}>
    {config.title}
  </h2>

  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
    {evaluation}
  </p>

  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
    <span className="text-sm text-muted-foreground">
      Confidence:
    </span>
    <span className="text-sm font-semibold text-foreground">
      {confidencePercentage}%
    </span>
  </div>

  {/* 🔥 Gradient Meter */}
  <div className="mt-6">
    <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${config.progress}%`,
          background:
            "linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444)",
        }}
      />
    </div>

    <div className="flex justify-between text-xs mt-2 text-muted-foreground">
      <span>Low</span>
      <span>Medium</span>
      <span>High</span>
    </div>
  </div>
</Card>
      {/* <Card
        className={`p-8 text-center border-2 ${
          isHighRisk
            ? "border-destructive/50 bg-destructive/5"
            : "border-success/50 bg-success/5"
        }`}
      >
        <div
          className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 ${
            isHighRisk ? "bg-destructive/10" : "bg-success/10"
          }`}
        >
          {isHighRisk ? (
            <AlertTriangle className="h-10 w-10 text-destructive" />
          ) : (
            <Shield className="h-10 w-10 text-success" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-foreground">
          {isHighRisk
            ? "Elevated Risk Indicators Detected"
            : "Low Risk Indicators"}
        </h2>

        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {isHighRisk
            ? `${userName}, based on your responses, some indicators suggest you may benefit from speaking with a mental health professional.`
            : `${userName}, based on your responses, your current indicators are within normal ranges. Continue maintaining healthy habits.`}
        </p> */}

        {/* Confidence Score */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
          <span className="text-sm text-muted-foreground">
            Assessment Confidence:
          </span>
          <span className="text-sm font-semibold text-foreground">
            {confidencePercentage}%
          </span>
        </div>
      

      {/* Evaluation Card */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-lg">
              Evaluation Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {evaluation}
            </p>
          </div>
        </div>
      </Card>

      {/* Recommendations Card */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-4 text-lg">
              Recommendations
            </h3>
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground leading-relaxed">
                    {rec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="p-6 bg-accent/10 border-accent/30">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Heart className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              This assessment is not a clinical diagnosis. It uses machine
              learning to analyze patterns and should only be used as a
              preliminary screening tool. Please consult a qualified mental
              health professional for proper evaluation and support.
            </p>
          </div>
        </div>
      </Card>

      {/* Resources */}
      {prediction >= 2 && (
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Support Resources
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="tel:988"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  988 Suicide & Crisis Lifeline
                </p>
                <p className="text-xs text-muted-foreground">
                  Call or text 988 (US)
                </p>
              </div>
            </a>
            <a
              href="https://www.samhsa.gov/find-help/national-helpline"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">SAMHSA Helpline</p>
                <p className="text-xs text-muted-foreground">
                  1-800-662-4357 (US)
                </p>
              </div>
            </a>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onReset} variant="outline" className="gap-2" size="lg">
          <RefreshCw className="h-4 w-4" />
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
}
