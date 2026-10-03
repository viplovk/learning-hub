export type LearningState =
  | 'NOT_STARTED'
  | 'LEARNING'
  | 'UNDERSTOOD'
  | 'PRACTICING'
  | 'STRONG'
  | 'MASTERED';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MCQ' | 'SHORT' | 'LONG' | 'NUMERICAL' | 'ALGORITHM';

export interface ExamWeightage {
  twoMarkFreq: number;
  fiveMarkFreq: number;
  tenMarkFreq: number;
  frequentlyAsked: boolean;
}

export interface TopicConcept {
  id: string;
  name: string;
  unitId: string;
  subjectId: string;
  difficulty: DifficultyLevel;
  importance: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  estimatedMinutes: number;
  prerequisites: string[];
  nextTopics: string[];
  
  // Concept Learning details
  quickExplanation: string;
  deepExplanation: string;
  whyItMatters: string;
  coreConceptsList: string[];
  visualDiagram?: string;
  visualDiagramType?: 'flowchart' | 'architecture' | 'table' | 'memory_layout';
  workedExample: {
    problem: string;
    stepByStepSolution: string[];
    explanation: string;
    codeSnippet?: string;
  };
  commonMistakes: string[];
  examPerspective: {
    twoMarks: string;
    fiveMarks: string;
    tenMarks: string;
    highYieldKeywords: string[];
  };
  activeRecallPrompt: {
    question: string;
    idealAnswer: string;
    keyPoints: string[];
  };
  feynmanPrompt: string;
  examWeightage: ExamWeightage;
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  subjectId: string;
  topics: TopicConcept[];
  pyqCount: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  shortName: string;
  semester: number;
  credits: number;
  type: 'CORE_THEORY' | 'COMMON_COURSE' | 'ELECTIVE' | 'LAB';
  description: string;
  hasLab: boolean;
  labCode?: string;
  units: Unit[];
  referenceBooks: string[];
  color: string;
}

export interface Flashcard {
  id: string;
  subjectId: string;
  unitId: string;
  topicId: string;
  front: string;
  back: string;
  type: 'DEFINITION' | 'CONCEPT' | 'DIFFERENCE' | 'FORMULA' | 'ALGORITHM' | 'EXAM_QUESTION';
  hint?: string;
  // Spaced repetition state
  box?: number;
  nextReviewDate?: string;
  reviewCount?: number;
  consecutiveCorrect?: number;
  lastConfidence?: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY';
}

export interface QuestionBankItem {
  id: string;
  subjectId: string;
  unitNumber: number;
  topicId: string;
  topicName: string;
  question: string;
  marks: 2 | 5 | 10;
  year?: string;
  frequency: number; // How many times appeared in past AKTU papers
  difficulty: DifficultyLevel;
  type: QuestionType;
  modelAnswer: string;
  markingScheme: string[];
  isPYQ: boolean;
}

export interface PracticeQuestion {
  id: string;
  subjectId: string;
  topicId: string;
  topicName: string;
  type: 'MCQ' | 'SHORT' | 'NUMERICAL';
  question: string;
  options?: string[];
  correctOptionIndex?: number;
  correctAnswerText?: string;
  explanation: string;
  difficulty: DifficultyLevel;
  marks: number;
}

export interface AcademicNote {
  id: string;
  title: string;
  subjectId: string;
  unitNumber: number;
  topicId?: string;
  content: string; // Markdown
  isShared: boolean; // Shared with Section C or personal
  author: string;
  tags: string[];
  lastUpdated: string;
}

export interface LabExperiment {
  id: string;
  labSubjectId: string;
  experimentNumber: number;
  title: string;
  objective: string;
  theory: string;
  algorithm: string;
  code: string;
  language: string;
  sampleInput?: string;
  sampleOutput: string;
  vivaQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface StudyMaterialDoc {
  id: string;
  name: string;
  fileName: string;
  subjectId: string;
  unitNumber?: number;
  fileSize: string;
  type: 'PDF' | 'PPT' | 'HANDWRITTEN' | 'QUESTION_BANK' | 'NOTES';
  uploadDate: string;
  extractedConcepts: string[];
  mappedTopicIds: string[];
  downloadUrl?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  section: string;
  college: string;
  targetGpa: string;
  avatarSeed: string;
}

export interface TopicUserProgress {
  topicId: string;
  state: LearningState;
  feynmanCompleted: boolean;
  activeRecallAccuracy: number; // 0 - 100
  practiceAttempts: number;
  practiceCorrect: number;
  lastStudiedDate: string;
  notesCount: number;
}
