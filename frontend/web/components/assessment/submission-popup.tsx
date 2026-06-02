"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, User, CheckCircle2, Loader2, UserX } from "lucide-react"

interface SubmissionPopupProps {
  open: boolean
  submissionDate: Date
  isSubmitting: boolean
  onSubmit: (name: string, isAnonymous: boolean) => void
  onCancel: () => void
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function SubmissionPopup({
  open,
  submissionDate,
  isSubmitting,
  onSubmit,
  onCancel,
}: SubmissionPopupProps) {
  const [name, setName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = () => {
    if (isAnonymous) {
      onSubmit("User", true)
    } else if (name.trim()) {
      onSubmit(name.trim(), false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSubmitting && (name.trim() || isAnonymous)) {
      handleSubmit()
    }
  }

  const handleAnonymousToggle = () => {
    setIsAnonymous(!isAnonymous)
    if (!isAnonymous) {
      setName("")
    }
  }

  const canSubmit = isAnonymous || name.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent showCloseButton={!isSubmitting} className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Assessment Complete
          </DialogTitle>
          <DialogDescription className="text-center">
            Thank you for completing the assessment. Please enter your name or
            submit anonymously to view your results.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Submission Date Display */}
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-secondary">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Submission Date</p>
              <p className="font-medium text-foreground text-sm">
                {formatDate(submissionDate)}
              </p>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-3">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting || isAnonymous}
              className={isAnonymous ? "opacity-50" : ""}
              autoFocus={!isAnonymous}
            />

            {/* Anonymous Option */}
            <Button
              type="button"
              variant={isAnonymous ? "default" : "outline"}
              onClick={handleAnonymousToggle}
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              <UserX className="h-4 w-4" />
              {isAnonymous ? "Submitting Anonymously" : "Submit Anonymously"}
            </Button>
            {isAnonymous && (
              <p className="text-xs text-muted-foreground text-center">
                Your name will be recorded as &quot;User&quot;
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Go Back
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !canSubmit}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              "View Results"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
