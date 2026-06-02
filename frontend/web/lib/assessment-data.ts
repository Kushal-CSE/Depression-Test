export interface FormQuestion {
  key: string
  label: string
  type: "radio" | "number" | "select"
  options?: { value: number | string; label: string }[]
  min?: number
  max?: number
  description?: string
  helperText?: string
}

export interface FormSection {
  id: string
  title: string
  description: string
  icon: string
  questions: FormQuestion[]
}

// Exact survey questions from the PDF
export const formSections: FormSection[] = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Let's start with some basic details about you",
    icon: "user",
    questions: [
      {
        key: "Gender",
        label: "Gender",
        type: "radio",
        options: [
          { value: 1, label: "Male" },
          { value: 0, label: "Female" },
        ],
      },
      {
        key: "Relationship_Status",
        label: "Relationship Status",
        type: "radio",
        options: [
          { value: "Single", label: "Single" },
          { value: "In a Relationship", label: "In a Relationship" },
          { value: "Married", label: "Married" },
          { value: "Divorced", label: "Divorced" },
        ],
      },
      {
        key: "Age",
        label: "Age",
        type: "number",
        min: 16,
        max: 100,
      },
      {
        key: "Academic_Status",
        label: "Academic Year",
        type: "radio",
        options: [
          { value: 1, label: "1st Year" },
          { value: 2, label: "2nd Year" },
          { value: 3, label: "3rd Year" },
          { value: 4, label: "4th Year" },
        ],
      },
      {
        key: "Work_While_Study",
        label: "Do you work while studying?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Residential_Area",
        label: "Where do you live?",
        type: "radio",
        options: [
          { value: "Hall", label: "Hall/Dorm" },
          { value: "Outside Hall", label: "Outside Hall" },
          { value: "With family", label: "With Family" },
        ],
      },
      {
        key: "Social_Economic_Status",
        label: "Social Economic Status",
        type: "radio",
        options: [
          { value: 1, label: "Upper" },
          { value: 2, label: "Upper-Middle" },
          { value: 3, label: "Middle" },
          { value: 4, label: "Lower-Middle" },
          { value: 5, label: "Lower" },
        ],
      },
      {
        key: "Financial_Pressure",
        label: "Do you feel financial pressure?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Has_Debts",
        label: "Do you have any debts?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle & Environment",
    description: "Your daily habits and living conditions",
    icon: "activity",
    questions: [
      {
        key: "Satisfied_Living_Environment",
        label: "Are you satisfied with your living environment?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Lost_Someone_Recently",
        label: "Have you recently lost someone close to you?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Physical_Activity",
        label: "Are you actively engaged in physical activity?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Significant_Ailments",
        label: "Do you have any significant ailments?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "On_Medication",
        label: "Are you currently on any prescribed medication?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Smoking",
        label: "Are you accustomed to smoking?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Alcohol_Consumption",
        label: "Do you consume alcoholic beverages?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
      {
        key: "Sleep_Duration",
        label: "Average nightly sleep duration (hours)",
        type: "radio",
        options: [
          { value: 1, label: "Below 5 Hours" },
          { value: 2, label: "5 Hours" },
          { value: 3, label: "6 Hours" },
          { value: 4, label: "7 Hours" },
          { value: 5, label: "8 Hours" },
          { value: 6, label: "More than 8 Hours" },
        ],
      },
      {
        key: "Social_Media_Hours",
        label: "Average daily social media usage",
        type: "radio",
        options: [
          { value: 1, label: "Less than 2 hours" },
          { value: 2, label: "2-4 hours" },
          { value: 3, label: "5-7 hours" },
          { value: 4, label: "8-10 hours" },
          { value: 5, label: "More than 10 hours" },
        ],
      },
    ],
  },
  {
    id: "academics",
    title: "Academic & Work",
    description: "Your academic and professional demands",
    icon: "briefcase",
    questions: [
      {
        key: "Workload_Academic_Demand",
        label: "Do you have current workload or academic demands?",
        type: "radio",
        options: [
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ],
      },
    ],
  },
  {
    id: "mood-emotions",
    title: "Mood & Emotions",
    description: "How have you been feeling lately?",
    icon: "heart",
    questions: [
      {
        key: "Melancholic",
        label: "Presently, I feel melancholic",
        type: "radio",
        options: [
          { value: 0, label: "I do not feel melancholic" },
          { value: 1, label: "I feel melancholic" },
          { value: 2, label: "I feel melancholic most of the time, and I can't snap out of it" },
          { value: 3, label: "I feel so deeply melancholic and unhappy that I can't stand it" },
        ],
      },
      {
        key: "Future_Hopelessness",
        label: "My future appears shrouded in darkness",
        type: "radio",
        options: [
          { value: 0, label: "I am not discouraged about my future" },
          { value: 1, label: "I sometimes feel discouraged about my future" },
          { value: 2, label: "I am moderately discouraged about my future" },
          { value: 3, label: "I feel my future is hopeless and will only get worse" },
        ],
      },
      {
        key: "Self_Perceived_Failure",
        label: "At present, I perceive myself as utterly unsuccessful",
        type: "radio",
        options: [
          { value: 0, label: "I do not feel like a failure" },
          { value: 1, label: "I feel I have somewhat failed" },
          { value: 2, label: "I feel I have mostly failed" },
          { value: 3, label: "I feel I have failed more than I could have" },
        ],
      },
      {
        key: "Interest_Loss",
        label: "I find no interest in anything whatsoever",
        type: "radio",
        options: [
          { value: 0, label: "I have as much interest as I ever did" },
          { value: 1, label: "I have a little less interest than I used to" },
          { value: 2, label: "I have much less interest than I used to" },
          { value: 3, label: "I have no interest in things I used to enjoy" },
        ],
      },
      {
        key: "Meaninglessness",
        label: "Life feels devoid of meaning",
        type: "radio",
        options: [
          { value: 0, label: "Life feels devoid of meaning none of the time" },
          { value: 1, label: "Life feels devoid of meaning a good part of the time" },
          { value: 2, label: "Life feels devoid of meaning most of the time" },
          { value: 3, label: "Life feels devoid of meaning all of the time" },
        ],
      },
      {
        key: "Hopelessness_EndFeeling",
        label: "I feel like all has come to an end for me",
        type: "radio",
        options: [
          { value: 0, label: "I don't feel like all has come to an end" },
          { value: 1, label: "I feel like all may be coming to an end" },
          { value: 2, label: "I expect that all will come to an end" },
          { value: 3, label: "I feel like all has already come to an end" },
        ],
      },
      {
        key: "Feeling_Insignificant",
        label: "I feel remarkably insignificant within myself",
        type: "radio",
        options: [
          { value: 0, label: "I don't feel insignificant in my own eyes" },
          { value: 1, label: "I feel somewhat insignificant" },
          { value: 2, label: "I feel deeply insignificant" },
          { value: 3, label: "I feel overwhelmingly insignificant" },
        ],
      },
      {
        key: "Self_Confidence_Erosion",
        label: "Everything seems to have eroded my self-confidence",
        type: "radio",
        options: [
          { value: 0, label: "I don't feel my self-confidence is undermined" },
          { value: 1, label: "I am self-critical about my weaknesses" },
          { value: 2, label: "I constantly blame myself for my faults" },
          { value: 3, label: "I blame myself for everything that diminishes my confidence" },
        ],
      },
      {
        key: "Crying_Frequency",
        label: "I often get tears",
        type: "radio",
        options: [
          { value: 0, label: "I don't tear up any more than usual" },
          { value: 1, label: "I tear up more often now than I used to" },
          { value: 2, label: "I tear up all the time now" },
          { value: 3, label: "I used to be able to tear up, but now I can't even though I want to" },
        ],
      },
      {
        key: "Agitation_Level",
        label: "I'm easily agitated",
        type: "radio",
        options: [
          { value: 0, label: "I am not any more easily agitated than usual" },
          { value: 1, label: "I am slightly more easily agitated now" },
          { value: 2, label: "I am frequently easily agitated" },
          { value: 3, label: "I feel constantly easily agitated" },
        ],
      },
    ],
  },
  {
    id: "behavioral-cognitive",
    title: "Behavior & Cognitive Patterns",
    description: "Your actions, thoughts, and social patterns",
    icon: "brain",
    questions: [
      {
        key: "Social_Withdrawal",
        label: "I can't participate in social activities like I used to",
        type: "radio",
        options: [
          { value: 0, label: "I have not lost my desire to be around others" },
          { value: 1, label: "I am less interested in socializing than I used to be" },
          { value: 2, label: "I have lost much of my interest in social interactions" },
          { value: 3, label: "I have completely lost interest in socializing" },
        ],
      },
      {
        key: "Indecisiveness",
        label: "I suffer from indecisiveness",
        type: "radio",
        options: [
          { value: 0, label: "I make choices about as well as I ever have" },
          { value: 1, label: "I delay making choices more often than I used to" },
          { value: 2, label: "I find it harder to make decisions compared to before" },
          { value: 3, label: "I find myself unable to make decisions anymore" },
        ],
      },
      {
        key: "Anhedonia_No_Joy",
        label: "I find myself devoid of joy anywhere",
        type: "radio",
        options: [
          { value: 0, label: "I don't feel joy is absent everywhere" },
          { value: 1, label: "I worry that joy is fleeting and hard to find" },
          { value: 2, label: "I sense lasting changes that have robbed me of joy" },
          { value: 3, label: "I believe joy has completely vanished from my life" },
        ],
      },
      {
        key: "Fatigue_Frequency",
        label: "How often do you feel weak and fatigued easily?",
        type: "radio",
        options: [
          { value: 0, label: "I don't feel weak or fatigued at all" },
          { value: 1, label: "I feel slightly more weak and fatigued than I used to" },
          { value: 2, label: "I often feel too weak and fatigued to do much" },
          { value: 3, label: "I feel too weak and fatigued to do anything" },
        ],
      },
      {
        key: "Insomnia",
        label: "Insomnia (difficulty falling asleep, broken sleep, etc.)",
        type: "radio",
        options: [
          { value: 0, label: "I have no trouble falling asleep and wake up feeling refreshed" },
          { value: 1, label: "I occasionally have difficulty falling asleep" },
          { value: 2, label: "I often wake up 1-2 times during the night" },
          { value: 3, label: "I frequently wake up several times with distressing dreams" },
        ],
      },
      {
        key: "Irritability",
        label: "My temper is irritable",
        type: "radio",
        options: [
          { value: 0, label: "My temper is rarely irritable" },
          { value: 1, label: "My temper is more irritable than before" },
          { value: 2, label: "My temper is irritable by almost anything" },
          { value: 3, label: "My temper is too irritable to control" },
        ],
      },
      {
        key: "Low_Appetite",
        label: "My appetite has diminished",
        type: "radio",
        options: [
          { value: 0, label: "My appetite hasn't changed much" },
          { value: 1, label: "My appetite isn't what it used to be" },
          { value: 2, label: "My appetite has significantly worsened" },
          { value: 3, label: "I have completely lost my appetite" },
        ],
      },
      {
        key: "Difficulty_Focusing",
        label: "Concentrating on one topic is quite taxing for me",
        type: "radio",
        options: [
          { value: 0, label: "I can focus just as effectively as usual" },
          { value: 1, label: "I find it harder to concentrate than usual" },
          { value: 2, label: "Keeping my mind on one thing is very challenging" },
          { value: 3, label: "I struggle to concentrate on anything at all" },
        ],
      },
      {
        key: "Easy_Fatigue",
        label: "I feel weak and fatigued easily",
        type: "radio",
        options: [
          { value: 0, label: "I do not feel weak or fatigued easily" },
          { value: 1, label: "I somewhat feel weak and fatigued, but it doesn't interfere much" },
          { value: 2, label: "I often feel weak and fatigued and it affects my daily activities" },
          { value: 3, label: "I constantly feel weak and fatigued, very difficult to do basic tasks" },
        ],
      },
      {
        key: "Low_Concentration",
        label: "Lately, I find it challenging to focus on many things",
        type: "radio",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" },
        ],
      },
      {
        key: "Difficulty_Speaking_Socially",
        label: "I find it difficult to speak in my social environment",
        type: "radio",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" },
        ],
      },
      {
        key: "High_Appetite",
        label: "My appetite has increased",
        type: "radio",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" },
        ],
      },
    ],
  },
  {
    id: "emotional-social",
    title: "Emotional & Social Well-being",
    description: "Your emotional state and social connections",
    icon: "users",
    questions: [
      {
        key: "Restlessness",
        label: "I'm plagued by a sense of unrest",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time (less than one day)" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally or a moderate amount of time (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Life_Feels_Hard",
        label: "I reckon life has become exceedingly arduous presently",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Fear_Something_Bad",
        label: "I'm afraid something very bad will happen",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Recent_Abuse_Experience",
        label: "Have you recently felt abused (physically, emotionally, or sexually)?",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Feels_Pitied",
        label: "I feel that people show me compassion",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Lack_of_Pleasure",
        label: "I find myself absence of pleasure everywhere",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Feeling_Down",
        label: "Presently, I'm feeling down",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Feels_Others_Are_Kind",
        label: "I feel that people are kind toward me",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Performance_Decline",
        label: "I find myself unable to perform educational and professional duties as before",
        type: "radio",
        options: [
          { value: 0, label: "Rarely or none of the time" },
          { value: 1, label: "Some or a little of the time (1-2 days)" },
          { value: 2, label: "Occasionally (3-4 days)" },
          { value: 3, label: "Most or all of the time (5-7 days)" },
        ],
      },
      {
        key: "Share_Feelings_Lack",
        label: "How often do you feel like you don't have anyone to share your feelings with?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "Social_LeftOut_Level",
        label: "How much do you feel left out in social situations?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "Isolation_Frequency",
        label: "How often do you feel isolated from others?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "No_Support_Frequency",
        label: "How frequently do you feel there's no one you can rely on for support?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "Loneliness_Frequency",
        label: "How frequently do you experience feelings of loneliness?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "Emotional_Alignment_Frequency",
        label: "How frequently do you feel aligned with the emotions of people around you?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "Presence_Not_Genuine_Frequency",
        label: "How frequently do you perceive that people are around you but not genuinely present?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
      {
        key: "Relationships_Unimportant_Level",
        label: "To what extent do you experience your relationships with others as being unimportant?",
        type: "radio",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
        ],
      },
    ],
  },
  {
    id: "sensitive",
    title: "Mental Health Concerns",
    description: "These questions are sensitive but important. Your responses are confidential.",
    icon: "alert-circle",
    questions: [
      {
        key: "Suicidal_Thoughts",
        label: "Have you recently entertained any suicidal or self-harming thoughts?",
        type: "radio",
        description: "Please answer honestly - your response is confidential and helps us connect you with appropriate support",
        options: [
          { value: 0, label: "I haven't considered any actions that could harm myself" },
          { value: 1, label: "I have considered actions that could harm myself, but I wouldn't act on them" },
          { value: 2, label: "I wish to harm myself" },
          { value: 3, label: "I would harm myself if I could" },
        ],
      },
    ],
  },
]

export const getDefaultFormData = (): Record<string, number | string> => {
  const data: Record<string, number | string> = {}
  formSections.forEach((section) => {
    section.questions.forEach((question) => {
      if (question.type === "number") {
        data[question.key] = question.min ?? 0
      } else if (question.type === "select") {
        if (question.options && question.options.length > 0) {
          data[question.key] = question.options[0].value
        } else {
          data[question.key] = 0
        }
      } else {
        // radio
        if (question.options && question.options.length > 0) {
          data[question.key] = question.options[0].value
        } else {
          data[question.key] = 0
        }
      }
    })
  })
  return data
}

// Helper function to convert form data to backend format
export const convertToBackendFormat = (formData: Record<string, number | string>): Record<string, number> => {
  const backendData: Record<string, number> = {}

  Object.entries(formData).forEach(([key, value]) => {
    if (key === "Relationship_Status") {
      // Convert single Relationship_Status to individual binary keys
      backendData["Relationship_Status_Single"] = (value === "Single") ? 1 : 0
      backendData["Relationship_Status_In a Relationship"] = (value === "In a Relationship") ? 1 : 0
      backendData["Relationship_Status_Married"] = (value === "Married") ? 1 : 0
      backendData["Relationship_Status_Divorced"] = (value === "Divorced") ? 1 : 0
    } else if (key === "Residential_Area") {
      // Convert single Residential_Area to individual binary keys
      backendData["Residential_Area_Hall"] = (value === "Hall") ? 1 : 0
      backendData["Residential_Area_Outside Hall"] = (value === "Outside Hall") ? 1 : 0
      backendData["Residential_Area_With family"] = (value === "With family") ? 1 : 0
    } else if (key === "Academic_Status") {
      backendData["Academic Status"] = typeof value === "number" ? value : 0
    } else if (key === "Social_Economic_Status") {
      backendData["Social Economic Status"] = typeof value === "number" ? value : 0
    } else if (key === "Work_While_Study") {
      backendData["Work_While_Study"] = typeof value === "number" ? value : 0
    } else {
      backendData[key] = typeof value === "number" ? value : 0
    }
  })

  return backendData
}
