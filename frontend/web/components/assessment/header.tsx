"use client"

import { Brain, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">MindCheck</h1>
            <p className="text-xs text-muted-foreground">
              Mental Health Assessment
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Info className="h-5 w-5" />
              <span className="sr-only">About this assessment</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About This Assessment</DialogTitle>
              <DialogDescription className="space-y-4 pt-4">
                <p>
                  This depression risk assessment uses machine learning to
                  analyze various factors that may indicate mental health
                  concerns. It evaluates demographic, lifestyle, emotional, and
                  behavioral patterns.
                </p>
                <p>
                  <strong>Important:</strong> This tool is for screening
                  purposes only and does not provide a clinical diagnosis.
                  Results should be discussed with a qualified mental health
                  professional.
                </p>
                <p>
                  Your responses are processed securely and are not stored after
                  the assessment is complete.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
