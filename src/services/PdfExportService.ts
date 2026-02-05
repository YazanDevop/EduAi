// src/services/pdfExportService.ts

/**
 * دالة لتصدير النص أو المحتوى إلى ملف PDF
 * @param content النص أو البيانات المراد تصديرها
 * @param fileName اسم الملف (اختياري)
 */
export async function exportToPDF(content: string, fileName: string = 'worksheet.pdf'): Promise<void> {
  // هنا نستخدم jsPDF كمثال (تأكد أنك ثبتت المكتبة: npm install jspdf)
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.text(content, 10, 10);
    doc.save(fileName);

    console.log('PDF exported:', fileName);
  } catch (err) {
    console.error('Error exporting PDF:', err);
  }
}
