import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { AssessmentCarousel } from '@/components/AssessmentCarousel';
import { UserMenu } from '@/components/UserMenu';
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Bar
      <Navbar />
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl flex items-center justify-between h-16">
            
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">MindCare</span>
            </Link>

            
            <div className="flex items-center gap-4">
              <a href="#assessments" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                Assessments
              </a>
              <UserMenu />
            </div>
          </div>
        </div>
      </nav> */}
       <Navbar />

      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Mental Health Support You Can Trust
              </h1>
              
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Take scientifically-validated assessments to understand your mental wellbeing. Get instant, AI-powered insights in minutes.
              </p>
              
              <p className="text-sm text-gray-500 mb-8">
                Confidential • Evidence-based • Private results
              </p>

              <Link href="#assessments">
                <button className="px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all font-semibold">
                  Start Assessment
                </button>
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-80">
                {/* Decorative circles and shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Main circle background */}
                  <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 opacity-20 blur-2xl"></div>
                  
                  {/* Brain icon container */}
                  <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                    <div className="text-white text-7xl">🧠</div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-12 right-12 w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center shadow-lg opacity-80">
                    <span className="text-2xl">💭</span>
                  </div>
                  <div className="absolute bottom-16 left-12 w-14 h-14 bg-indigo-300 rounded-full flex items-center justify-center shadow-lg opacity-80">
                    <span className="text-xl">✨</span>
                  </div>
                  <div className="absolute top-32 left-8 w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center shadow-lg opacity-80">
                    <span className="text-lg">💡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessments Section */}
      <div id="assessments" className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Assessment</h2>
            <p className="text-gray-600 text-lg">Select the questionnaire that best fits your needs</p>
          </div>

          <AssessmentCarousel />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 p-8 shadow-sm">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-200">
                  <svg className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a2 2 0 012-2h2.343a9.001 9.001 0 00-5.423-1.997H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-2.343a9 9 0 00-5.423 1.997" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Disclaimer</h3>
                <p className="text-amber-800 text-sm">
                  These assessments are for informational purposes only and are not a substitute for professional medical advice. If you are experiencing thoughts of self-harm or suicide, please contact a mental health professional or call the National Suicide Prevention Lifeline at <span className="font-semibold">988</span>.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
