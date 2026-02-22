
export enum AppSection {
  OBJECTIVES = 'objectives',
  CONTENT = 'content',
  SUMMARY = 'summary',
  PRACTICE = 'practice',
  RESOURCES = 'resources'
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface TFQuestion {
  question: string;
  answer: boolean;
  explanation: string;
}

export interface EssayQuestion {
  question: string;
}

export interface QuizData {
  multiple_choice: MCQQuestion[];
  true_false: TFQuestion[];
  essay: EssayQuestion[];
}

export interface TeacherResource {
  id: string;
  title: string;
  url: string;
  description?: string;
}
