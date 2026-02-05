import React, { useState } from 'react';
import { SUBJECTS, SCHOOL_INFO, WORKSHEET_STYLES } from './constants';
import { Semester, WorksheetContent } from './types';
import { generateWorksheet } from './services/geminiService';
import { exportToWord } from './services/wordExportService';
import { exportToPDF } from './services/pdfExportService';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<Semester>(Semester.FIRST);
  const [selectedStyle, setSelectedStyle] = useState<string>('creative');
  const [topic, setTopic] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [worksheet, setWorksheet] = useState<WorksheetContent | null>(null);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!selectedSubject || !topic) {
      setError('يرجى اختيار المبحث وإدخال عنوان الدرس');
      return;
    }
    setError('');
    setLoading(true);
    setWorksheet(null);
    try {
      const result = await generateWorksheet(
        SUBJECTS.find(s => s.id === selectedSubject)?.name || '',
        selectedSemester,
        topic,
        selectedStyle
      );
      setWorksheet(result);
    } catch (err) {
      setError('حدث خطأ أثناء تصميم ورقة العمل. يرجى التحقق من مفتاح API أو الاتصال بالإنترنت.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentSubject = SUBJECTS.find(s => s.id === selectedSubject);

  return (
    <div className="min-h-screen pb-20 bg-gray-50/50">
      {/* Platform Hero Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-100">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">{SCHOOL_INFO.platformName}</h1>
              <p className="text-sm text-gray-500 font-bold mt-1">{SCHOOL_INFO.grade} - {SCHOOL_INFO.school}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
             <div className="text-right">
                <p className="text-xs text-gray-400 font-bold">بإشراف المعلمة</p>
                <p className="text-sm font-bold text-teal-800">{SCHOOL_INFO.teacher}</p>
             </div>
             <span className="text-2xl grayscale hover:grayscale-0 transition-all cursor-default">🇵🇸</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Settings */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
              <h2 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">⚙️</span> إعدادات ورقة العمل
              </h2>

              {/* Subject */}
              <div className="mb-8">
                <label className="text-sm font-black text-gray-400 block mb-4 uppercase tracking-wider">المبحث التعليمي</label>
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub.id)}
                      className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 ${
                        selectedSubject === sub.id
                          ? `border-teal-500 bg-teal-50 text-teal-700 shadow-md`
                          : 'border-gray-50 bg-gray-50/50 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      <span className="text-2xl mb-1">{sub.icon}</span>
                      <span className="text-xs font-bold">{sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Semester & Style */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-black text-gray-400 block mb-3 uppercase tracking-wider">الفترة الدراسية</label>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    {[Semester.FIRST, Semester.SECOND].map((sem) => (
                      <button
                        key={sem}
                        onClick={() => setSelectedSemester(sem)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                          selectedSemester === sem ? 'bg-white shadow-sm text-teal-600' : 'text-gray-400'
                        }`}
                      >
                        الفصل {sem}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-black text-gray-400 block mb-3 uppercase tracking-wider">نمط التصميم</label>
                  <div className="grid grid-cols-3 gap-2">
                    {WORKSHEET_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`py-2 text-xs font-bold rounded-xl border-2 transition-all ${
                          selectedStyle === style.id ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-gray-100 text-gray-400'
                        }`}
                      >
                        {style.icon} {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-black text-gray-400 block mb-3 uppercase tracking-wider">موضوع الدرس</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="مثال: قوانين نيوتن، الممنوع من الصرف..."
                    className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-teal-500 outline-none transition-all font-bold text-gray-700 placeholder-gray-300"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl text-lg font-black text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-100'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري التصميم...</span>
                    </div>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>توليد ورقة العمل</span>
                    </>
                  )}
                </button>
                {error && <p className="text-red-500 text-xs text-center font-bold bg-red-50 p-2 rounded-lg">{error}</p>}
              </div>
            </div>
          </div>

          {/* Main Preview Area */}
          <div className="lg:col-span-8">
            {worksheet ? (
              <div className="space-y-6">
                {/* Actions */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">👁️</span>
                    معاينة ورقة العمل
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={() => exportToPDF(worksheet)} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all">تحميل PDF</button>
                    <button onClick={() => exportToWord(worksheet)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all">تحميل Word</button>
                  </div>
                </div>

                {/* Worksheet Rendering */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 min-h-[800px]">
                  {/* Decorative Border */}
                  <div className="h-4 bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500"></div>
                  
                  <div className="p-8 md:p-12">
                    {/* Header Mockup */}
                    <div className="border-b-2 border-gray-800 pb-6 mb-8">
                       <div className="flex justify-between items-start mb-4">
                          <div className="text-right">
                             <p className="font-bold text-gray-900 leading-tight">وزارة التربية والتعليم العالي</p>
                             <p className="text-sm font-bold text-gray-600">{SCHOOL_INFO.school}</p>
                          </div>
                          <div className="text-center bg-gray-50 px-6 py-2 rounded-2xl border border-gray-100">
                             <h2 className="text-xl font-black text-teal-800">ورقة عمل: {worksheet.title}</h2>
                          </div>
                          <div className="text-left">
                             <p className="text-sm font-bold">المبحث: {worksheet.subject}</p>
                             <p className="text-sm font-bold">الصف العاشر</p>
                          </div>
                       </div>
                       <div className="mt-6 flex justify-between">
                          <p className="font-bold text-gray-700">اسم الطالب/ة: ...........................................................</p>
                          <p className="font-bold text-gray-700">التاريخ: ..../..../202..م</p>
                       </div>
                    </div>

                    {/* Objectives */}
                    <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100 mb-8">
                      <h4 className="font-black text-teal-800 mb-3 flex items-center gap-2">
                        <span className="text-lg">🎯</span> الأهداف التعليمية المتوقعة:
                      </h4>
                      <ul className="space-y-1">
                        {worksheet.learningObjectives.map((obj, i) => (
                          <li key={i} className="text-teal-900 text-sm font-medium flex gap-2">
                            <span>•</span> {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sections */}
                    <div className="space-y-10">
                      {worksheet.sections.map((section, idx) => (
                        <div key={idx} className="relative">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black shadow-lg">0{idx + 1}</span>
                            <h3 className="text-xl font-black text-gray-900 border-b-4 border-gray-100 pb-1">{section.title}</h3>
                          </div>
                          
                          <div className="space-y-8 pr-4">
                            {section.questions.map((q, qIdx) => (
                              <div key={qIdx} className="group">
                                <div className="flex justify-between items-start mb-3">
                                  <p className="font-bold text-gray-800 leading-relaxed text-lg">
                                    {qIdx + 1}. {q.question}
                                  </p>
                                  <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">({q.points} علامات)</span>
                                </div>
                                
                                {section.type === 'mcq' && q.options ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mr-6">
                                    {q.options.map((opt, oIdx) => (
                                      <div key={oIdx} className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100 group-hover:bg-white transition-all">
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                        <span className="text-gray-600 font-bold">{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="mt-4 mr-6 space-y-3">
                                    <div className="h-px bg-gray-200 w-full opacity-50"></div>
                                    <div className="h-px bg-gray-200 w-full opacity-50"></div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Mockup */}
                    <div className="mt-20 pt-10 border-t-2 border-dashed border-gray-100 text-center">
                       <p className="text-gray-400 italic font-medium mb-6">"{worksheet.conclusion}"</p>
                       <div className="flex justify-between items-end">
                          <div className="text-right">
                             <p className="text-xs text-gray-400 font-bold">المعلمة المصممة</p>
                             <p className="font-black text-teal-800">{SCHOOL_INFO.teacher}</p>
                          </div>
                          <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center opacity-30 border-4 border-teal-100">
                             <span className="text-4xl">🎓</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl border-4 border-dashed border-gray-100 p-12 text-center">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-6xl mb-6 grayscale opacity-40 animate-pulse">
                  📄
                </div>
                <h3 className="text-2xl font-black text-gray-300">بانتظار تصميم ورقة العمل</h3>
                <p className="text-gray-400 mt-2 max-w-sm font-bold">اختر المبحث وأدخل الموضوع من القائمة الجانبية لنقوم بتوليد محتوى تعليمي احترافي لك.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Deployment Note */}
      <footer className="mt-20 text-center py-10 border-t border-gray-100">
         <p className="text-gray-400 font-bold">جميع الحقوق محفوظة © ٢٠٢٤-٢٠٢٥ منصة المعلمة رانية شريم</p>
         <div className="flex justify-center gap-4 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span title="Built for Palestine Education">🇵🇸</span>
            <span title="Static Site Ready">☁️</span>
            <span title="AI Powered">🤖</span>
         </div>
      </footer>
    </div>
  );
};

export default App;