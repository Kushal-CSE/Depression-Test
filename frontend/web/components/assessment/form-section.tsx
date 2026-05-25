"use client"

import { FormSection } from "@/lib/assessment-data"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  User,
  Briefcase,
  Home,
  Heart,
  Users,
  Brain,
  Activity,
  AlertCircle,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  user: <User className="h-5 w-5" />,
  briefcase: <Briefcase className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  brain: <Brain className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
  "alert-circle": <AlertCircle className="h-5 w-5" />,
}

interface FormSectionProps {
  section: FormSection
  formData: Record<string, number | string>
  onChange: (key: string, value: number | string) => void
}

export function AssessmentFormSection({
  section,
  formData,
  onChange,
}: FormSectionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
          {iconMap[section.icon] || <User className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {section.title}
          </h2>
          <p className="text-sm text-muted-foreground">{section.description}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {section.questions.map((question) => (
          <div
            key={question.key}
            className="grid gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-foreground">
                {question.label}
              </Label>
              {question.description && (
                <p className="text-xs text-muted-foreground">
                  {question.description}
                </p>
              )}
            </div>

            {question.type === "radio" && question.options ? (
              <RadioGroup
                value={String(formData[question.key] ?? (question.options[0]?.value || 0))}
                onValueChange={(value) => {
                  const numValue = parseInt(value, 10)
                  onChange(question.key, isNaN(numValue) ? value : numValue)
                }}
                className="flex flex-col gap-2"
              >
                {question.options.map((option) => (
                  <div key={String(option.value)} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={String(option.value)}
                      id={`${question.key}-${option.value}`}
                      className="border-primary text-primary"
                    />
                    <Label
                      htmlFor={`${question.key}-${option.value}`}
                      className="font-normal cursor-pointer text-sm"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : question.type === "select" && question.options ? (
              <Select
                value={String(formData[question.key] ?? (question.options[0]?.value || ""))}
                onValueChange={(value) => {
                  const numValue = parseInt(value, 10)
                  onChange(question.key, isNaN(numValue) ? value : numValue)
                }}
              >
                <SelectTrigger className="w-full max-w-xs bg-card">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option) => (
                    <SelectItem key={String(option.value)} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : question.type === "number" ? (
              <Input
                type="number"
                min={question.min}
                max={question.max}
                value={formData[question.key] ?? question.min ?? 0}
                onChange={(e) => onChange(question.key, Number(e.target.value) || 0)}
                className="w-full max-w-xs bg-card"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
