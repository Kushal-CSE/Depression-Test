import { TestConfig } from '../types';

export const PHQ9_CONFIG: TestConfig = {
  testType: 'phq9',
  name: 'PHQ-9 (Patient Health Questionnaire)',
  description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
  icon: '📋',
  totalQuestions: 9,
  questions: [
    {
      id: 'phq9_1',
      text: 'I find no interest in anything whatsoever.',
      featureNames: ['Interest_Loss'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_2',
      text: 'Presently, I\'m feeling down.',
      featureNames: ['Feeling_Down'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_3',
      text: 'Insomnia (difficulty falling asleep, broken sleep, unsatisfying sleep, fatigue on waking, dreams, nightmares, and night terrors).',
      featureNames: ['Insomnia'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_4',
      text: 'How often do you feel weak and fatigued easily?',
      featureNames: ['Fatigue_Frequency'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_5',
      text: 'My appetite has diminished.',
      featureNames: ['Low_Appetite'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_6',
      text: 'At present, I perceive myself as utterly unsuccessful as a human being.',
      featureNames: ['Self_Perceived_Failure'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_7',
      text: 'Concentrating on one topic is quite taxing for me.',
      featureNames: ['Difficulty_Focusing'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_8',
      text: 'I\'m easily agitated.',
      featureNames: ['Agitation_Level'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'phq9_9',
      text: 'Have you recently entertained any suicidal or self-harming thoughts?',
      featureNames: ['Suicidal_Thoughts'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    }
  ]
};

export const BDI2_CONFIG: TestConfig = {
  testType: 'bdi2',
  name: 'BDI-2 (Beck Depression Inventory)',
  description: 'This questionnaire consists of 21 items tracking structural depression criteria. Please select the statement that best fits your experience.',
  icon: '📊',
  totalQuestions: 21,
  questions: [
    {
      id: 'bdi2_1',
      text: 'Presently, I\'m feeling down.',
      featureNames: ['Feeling_Down'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_2',
      text: 'My future appears shrouded in darkness.',
      featureNames: ['Future_Hopelessness'],
      scale: [
        { value: 0, label: 'I am not discouraged about my future.' },
        { value: 1, label: 'I sometimes feel discouraged about my future.' },
        { value: 2, label: 'I am moderately discouraged about my future.' },
        { value: 3, label: 'I feel my future is hopeless and will only get worse.' }
      ]
    },
    {
      id: 'bdi2_3',
      text: 'At present, I perceive myself as utterly unsuccessful as a human being.',
      featureNames: ['Self_Perceived_Failure'],
      scale: [
        { value: 0, label: 'I do not feel like a failure.' },
        { value: 1, label: 'I feel I have somewhat failed.' },
        { value: 2, label: 'I feel I have failed more than I could have.' },
        { value: 3, label: 'I feel I have mostly failed.' }
      ]
    },
    {
      id: 'bdi2_4',
      text: 'I find no interest in anything whatsoever.',
      featureNames: ['Interest_Loss'],
      scale: [
        { value: 0, label: 'I have as much interest as I ever did in the things I enjoy.' },
        { value: 1, label: 'I have a little less interest than I used to in the things I enjoy.' },
        { value: 2, label: 'I have much less interest than I used to in the things I enjoy.' },
        { value: 3, label: 'I have no interest in the things I used to enjoy.' }
      ]
    },
    {
      id: 'bdi2_5',
      text: 'Life feels devoid of meaning.',
      featureNames: ['Meaninglessness'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_6',
      text: 'I feel like, "All has come to an end for me."',
      featureNames: ['Hopelessness_EndFeeling'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_7',
      text: 'I feel remarkably insignificant within myself.',
      featureNames: ['Feeling_Insignificant'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_8',
      text: 'Everything seems to have eroded my self-confidence.',
      featureNames: ['Self_Confidence_Erosion'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_9',
      text: 'Have you recently entertained any suicidal or self-harming thoughts?',
      featureNames: ['Suicidal_Thoughts'],
      scale: [
        { value: 0, label: 'I haven\'t considered any actions that could harm myself.' },
        { value: 1, label: 'I have considered actions that could harm myself, but I wouldn\'t act on them.' },
        { value: 2, label: 'I wish to harm myself.' },
        { value: 3, label: 'I would harm myself if I could.' }
      ]
    },
    {
      id: 'bdi2_10',
      text: 'How frequently do you find yourself crying or near tears?',
      featureNames: ['Crying_Frequency'],
      scale: [
        { value: 0, label: 'Rarely or never' },
        { value: 1, label: 'Sometimes' },
        { value: 2, label: 'Often' },
        { value: 3, label: 'Very often' }
      ]
    },
    {
      id: 'bdi2_11',
      text: 'What is your regular level of psychological agitation or internal tension?',
      featureNames: ['Agitation_Level'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Slightly' },
        { value: 2, label: 'Moderately' },
        { value: 3, label: 'Very much' }
      ]
    },
    {
      id: 'bdi2_12',
      text: 'Have you actively initiated patterns of social withdrawal from friends and family?',
      featureNames: ['Social_Withdrawal'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_13',
      text: 'Do you struggle with continuous indecisiveness regarding trivial or major life tasks?',
      featureNames: ['Indecisiveness'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_14',
      text: 'Are you experiencing explicit anhedonia (the continuous inability to experience joy)?',
      featureNames: ['Anhedonia_No_Joy'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_15',
      text: 'How frequently do you find yourself lacking physical energy to execute routine actions?',
      featureNames: ['Fatigue_Frequency'],
      scale: [
        { value: 0, label: 'Rarely' },
        { value: 1, label: 'Sometimes' },
        { value: 2, label: 'Often' },
        { value: 3, label: 'Very often' }
      ]
    },
    {
      id: 'bdi2_16',
      text: 'Insomnia (difficulty falling asleep, broken sleep, unsatisfying sleep, fatigue on waking, dreams, nightmares, and night terrors).',
      featureNames: ['Insomnia'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_17',
      text: 'My temper is irritable.',
      featureNames: ['Irritability'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_18',
      text: 'My appetite has diminished.',
      featureNames: ['Low_Appetite'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_19',
      text: 'Concentrating on one topic is quite taxing for me.',
      featureNames: ['Difficulty_Focusing'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_20',
      text: 'How often do you feel weak and fatigued easily?',
      featureNames: ['Easy_Fatigue'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'bdi2_21',
      text: 'How frequently have you experienced low concentration or difficulty tracking information?',
      featureNames: ['Low_Concentration'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    }
  ]
};

export const CESD_CONFIG: TestConfig = {
  testType: 'cesd',
  name: 'CES-D (Center for Epidemiological Studies Depression)',
  description: 'Below is a list of some of the ways you might have felt or behaved. Please tell me how often you have felt this way during the past week.',
  icon: '📈',
  totalQuestions: 20,
  questions: [
    {
      id: 'cesd_1',
      text: 'My temper is irritable.',
      featureNames: ['Irritability'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_2',
      text: 'My appetite has diminished.',
      featureNames: ['Low_Appetite'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_3',
      text: 'Are you experiencing explicit anhedonia (the continuous inability to experience joy)?',
      featureNames: ['Anhedonia_No_Joy'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_4',
      text: 'Everything seems to have eroded my self-confidence.',
      featureNames: ['Self_Confidence_Erosion'],
      scale: [
        { value: 3, label: 'Rarely or none of the time (less than one day)' },
        { value: 2, label: 'Some or a little of the time (1-2 days)' },
        { value: 1, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 0, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_5',
      text: 'How frequently have you experienced low concentration or difficulty tracking information?',
      featureNames: ['Low_Concentration'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_6',
      text: 'Presently, I\'m feeling down.',
      featureNames: ['Feeling_Down'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_7',
      text: 'How often do you feel weak and fatigued easily?',
      featureNames: ['Fatigue_Frequency'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_8',
      text: 'My future appears shrouded in darkness.',
      featureNames: ['Future_Hopelessness'],
      scale: [
        { value: 3, label: 'Rarely or none of the time (less than one day)' },
        { value: 2, label: 'Some or a little of the time (1-2 days)' },
        { value: 1, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 0, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_9',
      text: 'At present, I perceive myself as utterly unsuccessful as a human being.',
      featureNames: ['Self_Perceived_Failure'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_10',
      text: 'Do you constantly feel a lingering dread that something bad is about to happen?',
      featureNames: ['Fear_Something_Bad'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_11',
      text: 'Insomnia (difficulty falling asleep, broken sleep, unsatisfying sleep, fatigue on waking, dreams, nightmares, and night terrors).',
      featureNames: ['Insomnia'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_12',
      text: 'I find no interest in anything whatsoever.',
      featureNames: ['Interest_Loss'],
      scale: [
        { value: 3, label: 'Rarely or none of the time (less than one day)' },
        { value: 2, label: 'Some or a little of the time (1-2 days)' },
        { value: 1, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 0, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_13',
      text: 'Have you actively initiated patterns of social withdrawal from friends and family?',
      featureNames: ['Social_Withdrawal'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_14',
      text: 'How frequently do you experience feelings of loneliness?',
      featureNames: ['Loneliness_Frequency'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_15',
      text: 'How much do you feel left out in social situations?',
      featureNames: ['Social_LeftOut_Level'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_16',
      text: 'I enjoy tracking my personal achievements and hobbies.',
      featureNames: ['Lack_of_Pleasure'],
      scale: [
        { value: 3, label: 'Rarely or none of the time (less than one day)' },
        { value: 2, label: 'Some or a little of the time (1-2 days)' },
        { value: 1, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 0, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_17',
      text: 'How frequently do you find yourself crying or near tears?',
      featureNames: ['Crying_Frequency'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_18',
      text: 'Life feels devoid of meaning.',
      featureNames: ['Meaninglessness'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_19',
      text: 'Do you often feel like others view you with pity or continuous negative judgment?',
      featureNames: ['Feels_Pitied'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'cesd_20',
      text: 'I feel like, "All has come to an end for me."',
      featureNames: ['Hopelessness_EndFeeling'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than one day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    }
  ]
};



export const ALL_QUESTIONS_CONFIG: TestConfig = {
  testType: 'all59',
  name: 'Complete Assessment (All 59 Questions)',
  description: 'This comprehensive assessment combines all questionnaires for a thorough evaluation.',
  icon: '🔬',
  totalQuestions: 59,
  questions: [
    // ==========================================
    // 1. DEMOGRAPHICS & PROFILE CHARACTERISTICS
    // ==========================================
    {
      id: 'all_gender',
      text: 'Gender',
      featureNames: ['Gender'],
      scale: [
        { value: 1, label: 'Male' },
        { value: 0, label: 'Female' }
      ]
    },
    {
      id: 'all_academic_status',
      text: 'Academic Status / Current Study Year',
      featureNames: ['Academic Status'],
      scale: [
        { value: 1, label: '1 Year' },
        { value: 2, label: '2 Year' },
        { value: 3, label: '3 Year' },
        { value: 4, label: '4 Year' }
      ]
    },
    {
      id: 'all_socioeconomic',
      text: 'Social Economic Status',
      featureNames: ['Social Economic Status'],
      scale: [
        { value: 5, label: 'Upper' },
        { value: 4, label: 'Upper-Middle' },
        { value: 3, label: 'Middle' },
        { value: 2, label: 'Lower-Middle' },
        { value: 1, label: 'Lower' }
      ]
    },
    {
      id: 'all_financial_pressure',
      text: 'Do you experience financial pressure?',
      featureNames: ['Financial_Pressure'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_has_debts',
      text: 'Do you currently have debts?',
      featureNames: ['Has_Debts'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_satisfied_living',
      text: 'Are you satisfied with your current living environment?',
      featureNames: ['Satisfied_Living_Environment'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_workload_demand',
      text: 'Do you face heavy workload or extreme academic demands?',
      featureNames: ['Workload_Academic_Demand'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_work_while_study',
      text: 'Do you work while studying?',
      featureNames: ['Work_While_Study'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_lost_someone',
      text: 'Have you lost someone close to you recently?',
      featureNames: ['Lost_Someone_Recently'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_physical_activity',
      text: 'Do you regularly engage in physical activity?',
      featureNames: ['Physical_Activity'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_significant_ailments',
      text: 'Do you have any significant medical ailments?',
      featureNames: ['Significant_Ailments'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_on_medication',
      text: 'Are you currently on any type of medication?',
      featureNames: ['On_Medication'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_smoking',
      text: 'Do you smoke tobacco products?',
      featureNames: ['Smoking'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_alcohol',
      text: 'Do you consume alcohol?',
      featureNames: ['Alcohol_Consumption'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_sleep_duration',
      text: 'What is your average nightly sleep duration?',
      featureNames: ['Sleep_Duration'],
      scale: [
        { value: 4, label: 'Below 5 Hours' },
        { value: 5, label: '5 Hours' },
        { value: 6, label: '6 Hours' },
        { value: 7, label: '7 Hours' },
        { value: 8, label: '8 Hours' },
        { value: 9, label: 'More than 8 hours' }
      ]
    },
    {
      id: 'all_social_media_hours',
      text: 'How much time do you spend daily on social media?',
      featureNames: ['Social_Media_Hours'],
      scale: [
        { value: 1, label: 'Less than 2 hours' },
        { value: 3, label: '2-4 Hours A Day' },
        { value: 6, label: '5-7 Hours A Day' },
        { value: 9, label: '8-10 Hours A Day' },
        { value: 11, label: 'More than 10 hours a day' }
      ]
    },

    // ==========================================
    // 2. PSYCHOMETRIC SCALE MENTAL HEALTH ITEMS
    // ==========================================
    {
      id: 'all_melancholic',
      text: 'Select the statement that best describes how melancholic you feel:',
      featureNames: ['Melancholic'],
      scale: [
        { value: 0, label: 'I do not feel melancholic.' },
        { value: 1, label: 'I feel melancholic.' },
        { value: 2, label: 'I feel melancholic most of the time, and I can\'t snap out of it.' },
        { value: 3, label: 'I feel so deeply melancholic and unhappy that I can\'t stand it.' }
      ]
    },
    {
      id: 'all_hopelessness',
      text: 'Select the statement that best describes your feelings about your future:',
      featureNames: ['Future_Hopelessness'],
      scale: [
        { value: 0, label: 'I am not discouraged about my future.' },
        { value: 1, label: 'I sometimes feel discouraged about my future.' },
        { value: 2, label: 'I am moderately discouraged about my future.' },
        { value: 3, label: 'I feel my future is hopeless and will only get worse.' }
      ]
    },
    {
      id: 'all_self_failure',
      text: 'Select the statement that best fits your view on your personal failures:',
      featureNames: ['Self_Perceived_Failure'],
      scale: [
        { value: 0, label: 'I do not feel like a failure.' },
        { value: 1, label: 'I feel I have somewhat failed.' },
        { value: 2, label: 'I feel I have failed more than I could have.' },
        { value: 3, label: 'I feel I have mostly failed.' }
      ]
    },
    {
      id: 'all_interest_loss',
      text: 'Select the statement that best reflects your interest levels in items you enjoy:',
      featureNames: ['Interest_Loss'],
      scale: [
        { value: 0, label: 'I have as much interest as I ever did in the things I enjoy.' },
        { value: 1, label: 'I have a little less interest than I used to in the things I enjoy.' },
        { value: 2, label: 'I have much less interest than I used to in the things I enjoy.' },
        { value: 3, label: 'I have no interest in the things I used to enjoy.' }
      ]
    },
    {
      id: 'all_suicidal',
      text: 'Select the statement regarding your thoughts on self-harm or suicidal feelings:',
      featureNames: ['Suicidal_Thoughts'],
      scale: [
        { value: 0, label: 'I haven\'t considered any actions that could harm myself.' },
        { value: 1, label: 'I have considered actions that could harm myself, but I wouldn\'t act on them.' },
        { value: 2, label: 'I wish to harm myself.' },
        { value: 3, label: 'I would harm myself if I could.' }
      ]
    },

    // ==========================================
    // 3. FREQUENCY BASED ITEMS (LASt WEEK & SOCIAL)
    // ==========================================
    {
      id: 'all_performance_decline',
      text: 'How frequently have you noticed a decline in your academic/work performance over the past week?',
      featureNames: ['Performance_Decline'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_others_kind',
      text: 'How frequently have you felt that people around you are kind to you?',
      featureNames: ['Feels_Others_Are_Kind'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_feeling_down',
      text: 'How frequently have you felt down, depressed, or sad over the past week?',
      featureNames: ['Feeling_Down'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_lack_pleasure',
      text: 'How frequently have you experienced a general lack of pleasure or interest in your routines?',
      featureNames: ['Lack_of_Pleasure'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_feels_pitied',
      text: 'How frequently have you felt that other people treat you with pity or look down on you?',
      featureNames: ['Feels_Pitied'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_fear_bad',
      text: 'How frequently have you had an unexplained fear that something bad is going to happen?',
      featureNames: ['Fear_Something_Bad'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_life_hard',
      text: 'How frequently has life felt hard, overwhelming, or too much to manage?',
      featureNames: ['Life_Feels_Hard'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_restlessness',
      text: 'How frequently have you suffered from high physical restlessness or an inability to sit still?',
      featureNames: ['Restlessness'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_high_appetite',
      text: 'How frequently have you experienced an unusually high or increased appetite?',
      featureNames: ['High_Appetite'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_low_concentration',
      text: 'How frequently have you experienced low concentration or difficulty tracking information?',
      featureNames: ['Low_Concentration'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_easy_fatigue',
      text: 'How frequently have you felt an easy onset of fatigue from minor daily exertions?',
      featureNames: ['Easy_Fatigue'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_difficulty_focusing',
      text: 'How frequently have you had structural difficulties focusing on academic tasks or lectures?',
      featureNames: ['Difficulty_Focusing'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_low_appetite',
      text: 'How frequently have you experienced a drop in appetite or minimal desire to eat meals?',
      featureNames: ['Low_Appetite'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_irritability',
      text: 'How frequently have you dealt with elevated levels of irritability or short temper?',
      featureNames: ['Irritability'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_insomnia_freq',
      text: 'How frequently have you encountered insomnia or structural disturbances staying asleep?',
      featureNames: ['Insomnia'],
      scale: [
        { value: 0, label: 'Rarely or none of the time (less than 1 day)' },
        { value: 1, label: 'Some or a little of the time (1-2 days)' },
        { value: 2, label: 'Occasionally or a moderate amount of time (3-4 days)' },
        { value: 3, label: 'Most or all of the time (5-7 days)' }
      ]
    },
    {
      id: 'all_difficulty_speaking',
      text: 'To what extent do you face difficulties speaking smoothly or engaging in social conversations?',
      featureNames: ['Difficulty_Speaking_Socially'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'all_abuse_experience',
      text: 'Have you encountered any distressing patterns of recent physical or emotional abuse?',
      featureNames: ['Recent_Abuse_Experience'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes / Moderately' }
      ]
    },

    // ==========================================
    // 4. INTERACTION LACK & UCLA SOCIAL ISOLATION
    // ==========================================
    {
      id: 'all_share_feelings_lack',
      text: 'How often do you feel a lack of a trusted confidant to share your close feelings with?',
      featureNames: ['Share_Feelings_Lack'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_social_left_out',
      text: 'How often do you look at groups and feel left out or separated from social circles?',
      featureNames: ['Social_LeftOut_Level'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_isolation_frequency',
      text: 'How frequently do you feel isolated or physically removed from your peer community?',
      featureNames: ['Isolation_Frequency'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_no_support',
      text: 'How often do you feel there is absolutely no support system available when you face trouble?',
      featureNames: ['No_Support_Frequency'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_loneliness_frequency',
      text: 'How often do you feel a pervasive sense of loneliness tracking through your routine?',
      featureNames: ['Loneliness_Frequency'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_emotional_alignment',
      text: 'How often do you feel an authentic sense of emotional alignment with the people around you?',
      featureNames: ['Emotional_Alignment_Frequency'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_presence_not_genuine',
      text: 'How often do you feel your presence or relationships are artificial or not genuine?',
      featureNames: ['Presence_Not_Genuine_Frequency'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },
    {
      id: 'all_relationships_unimportant',
      text: 'How often do you catch yourself feeling that maintaining human relationships is unimportant?',
      featureNames: ['Relationships_Unimportant_Level'],
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Rarely' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Often' }
      ]
    },

    // ==========================================
    // 5. EXTENDED EVALUATIONS / TARGET SEVERITY INDEXES
    // ==========================================
    {
      id: 'all_meaninglessness',
      text: 'Do you feel a deep, overarching sense of meaninglessness in your life goals?',
      featureNames: ['Meaninglessness'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_hopelessness_end',
      text: 'Do you feel completely hopeless about ending the ongoing psychological troubles you face?',
      featureNames: ['Hopelessness_EndFeeling'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_insignificant',
      text: 'Do you routinely consider yourself insignificant or lesser compared to your peers?',
      featureNames: ['Feeling_Insignificant'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_confidence_erosion',
      text: 'Have you witnessed a severe erosion or drop in your personal self-confidence lately?',
      featureNames: ['Self_Confidence_Erosion'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_crying_freq',
      text: 'How frequently do you find yourself crying or near tears?',
      featureNames: ['Crying_Frequency'],
      scale: [
        { value: 0, label: 'Rarely or never' },
        { value: 1, label: 'Sometimes' },
        { value: 2, label: 'Often' },
        { value: 3, label: 'Very often' }
      ]
    },
    {
      id: 'all_agitation_level',
      text: 'What is your regular level of psychological agitation or internal tension?',
      featureNames: ['Agitation_Level'],
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Slightly' },
        { value: 2, label: 'Moderately' },
        { value: 3, label: 'Very much' }
      ]
    },
    {
      id: 'all_social_withdrawal',
      text: 'Have you actively initiated patterns of social withdrawal from friends and family?',
      featureNames: ['Social_Withdrawal'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_indecisiveness',
      text: 'Do you struggle with continuous indecisiveness regarding trivial or major life tasks?',
      featureNames: ['Indecisiveness'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_anhedonia_no_joy',
      text: 'Are you experiencing explicit anhedonia (the continuous inability to experience joy)?',
      featureNames: ['Anhedonia_No_Joy'],
      scale: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    },
    {
      id: 'all_fatigue_frequency',
      text: 'How frequently do you find yourself lacking physical energy to execute routine actions?',
      featureNames: ['Fatigue_Frequency'],
      scale: [
        { value: 0, label: 'Rarely' },
        { value: 1, label: 'Sometimes' },
        { value: 2, label: 'Often' },
        { value: 3, label: 'Very often' }
      ]
    },
    {
      id: 'all_bdi_severity',
      text: 'Clinical Assessment Reference: Baseline Beck Depression Inventory Level',
      featureNames: ['Depression Level (BDI-II)'],
      scale: [
        { value: 0, label: 'Minimal Depression' },
        { value: 1, label: 'Mild Depression' },
        { value: 2, label: 'Moderate Depression' },
        { value: 3, label: 'Severe Depression' }
      ]
    },
    {
      id: 'all_phq_severity',
      text: 'Clinical Assessment Reference: Patient Health Questionnaire Severity Scale',
      featureNames: ['Depression Level (PHQ-9)'],
      scale: [
        { value: 0, label: 'Minimal Depression' },
        { value: 1, label: 'Mild Depression' },
        { value: 2, label: 'Moderate Depression' },
        { value: 3, label: 'Moderate Severe Depression' },
        { value: 4, label: 'Severe Depression' }
      ]
    },
    {
      id: 'all_ucla_severity',
      text: 'Clinical Assessment Reference: UCLA Loneliness Severity Group Assignment',
      featureNames: ['Loneliness Level (UCLA-8)'],
      scale: [
        { value: 0, label: 'Low degree of loneliness' },
        { value: 1, label: 'Moderate degree of loneliness' },
        { value: 2, label: 'Moderately high degree of loneliness' },
        { value: 3, label: 'High degree of loneliness' }
      ]
    }
  ]
};

export const ALL_TEST_CONFIGS = [PHQ9_CONFIG, BDI2_CONFIG, CESD_CONFIG, ALL_QUESTIONS_CONFIG];

export function getTestConfig(testType: string): TestConfig | undefined {
  return ALL_TEST_CONFIGS.find(config => config.testType === testType);
}
