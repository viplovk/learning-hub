export type ViewMode = 
  | 'courses'
  | 'flashcards'
  | 'quizzes'
  | 'planner'
  | 'notes'
  | 'focus'
  | 'resources';

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  department: string;
  semester: string;
  color: string;
  iconName: string;
  progress: number;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  completed: boolean;
  content: string;
  keyTakeaways: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  resources: Resource[];
}

export interface Resource {
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
  url: string;
  readTime: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  codeExample?: string;
  hint?: string;
  mastery: 'new' | 'learning' | 'mastered';
  lastReviewed?: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  courseCode: string;
  category: string;
  cards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseCode: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  notes: string;
  score?: string;
}

export interface CommunityNote {
  id: string;
  title: string;
  author: string;
  courseCode: string;
  topic: string;
  tags: string[];
  upvotes: number;
  hasUpvoted?: boolean;
  date: string;
  content: string;
  snippet?: string;
}

export interface StudySessionLog {
  id: string;
  date: string;
  durationMinutes: number;
  courseCode: string;
  type: 'pomodoro' | 'review' | 'quiz';
}
