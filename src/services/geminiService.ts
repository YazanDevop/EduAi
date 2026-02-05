// src/services/geminiService.ts

/**
 * دالة للتواصل مع Gemini AI (مؤقتًا مجرد placeholder)
 * @param prompt نص المطلوب توليده
 * @returns نص الاستجابة
 */
export async function generateWithGemini(prompt: string): Promise<string> {
  console.log('Gemini prompt:', prompt);

  // مؤقتًا: استجابة تجريبية
  return 'Gemini response placeholder';
}

/**
 * إعادة تصدير الدالة باسم generateWorksheet
 * لكي يكون متوافق مع import في App.tsx
 */
export { generateWithGemini as generateWorksheet };
