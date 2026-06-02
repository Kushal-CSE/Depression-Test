import { Header } from "@/components/assessment/header"
import { AssessmentForm } from "@/components/assessment/assessment-form"
import { Shield, Lock, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Depression Risk Assessment
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A confidential screening tool designed to help identify potential
            indicators of depression. Take a few minutes to complete this
            assessment and gain insights into your mental well-being.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                ML-Powered Analysis
              </p>
              <p className="text-xs text-muted-foreground">
                Advanced pattern recognition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                100% Confidential
              </p>
              <p className="text-xs text-muted-foreground">
                Your data stays private
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                Supportive Resources
              </p>
              <p className="text-xs text-muted-foreground">
                Guidance & next steps
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        <div className="max-w-3xl mx-auto">
          <AssessmentForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              This assessment is not a substitute for professional medical
              advice, diagnosis, or treatment.
            </p>
            <p>
              If you are in crisis, please contact emergency services or a
              crisis helpline immediately.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
