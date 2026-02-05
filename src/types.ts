export interface WorksheetSection {
  title: string;
  type: 'mcq' | 'matching' | 'short_answer' | 'problem_solving' | 'diagram';
  content: string; // Description or prompt
  questions: {
    question: string;
    options?: string[]; // for mcq
    answer?: string;
    points: number;
  }[];
}

export interface WorksheetContent {
  title: string;
  subject: string;
  semester: string;
  unit?: string;
  learningObjectives: string[];
  sections: WorksheetSection[];
  teacherInstructions: string;
  conclusion: string;
  style: 'creative' | 'formal' | 'exam';
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export enum Semester {
  FIRST = 'الأول',
  SECOND = 'الثاني'
}