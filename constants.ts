import { Subject } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'arabic', name: 'اللغة العربية', icon: '📖', color: 'emerald' },
  { id: 'math', name: 'الرياضيات', icon: '📐', color: 'blue' },
  { id: 'physics', name: 'الفيزياء', icon: '⚛️', color: 'indigo' },
  { id: 'chemistry', name: 'الكيمياء', icon: '🧪', color: 'rose' },
  { id: 'biology', name: 'الأحياء', icon: '🔬', color: 'green' },
  { id: 'tech', name: 'التكنولوجيا', icon: '💻', color: 'cyan' },
  { id: 'english', name: 'اللغة الإنجليزية', icon: '🌍', color: 'orange' },
  { id: 'history', name: 'الدراسات التاريخية', icon: '🏛️', color: 'amber' },
  { id: 'geo', name: 'الجغرافيا', icon: '🗺️', color: 'teal' },
  { id: 'religion', name: 'التربية الإسلامية', icon: '☪️', color: 'slate' }
];

export const SCHOOL_INFO = {
  teacher: "رانية شريم",
  school: "مدرسة بنات عمر بن عبد العزيز الثانوية",
  location: "فلسطين - طولكرم",
  platformName: "مصمم أوراق العمل الذكي",
  grade: "الصف العاشر الأكاديمي"
};

export const WORKSHEET_STYLES = [
  { id: 'creative', name: 'إبداعي ممتع', icon: '🎨' },
  { id: 'formal', name: 'أكاديمي رسمي', icon: '📄' },
  { id: 'exam', name: 'نموذج اختبار', icon: '📝' }
];