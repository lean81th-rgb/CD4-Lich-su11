
import React, { useState } from 'react';
import { generateHistoryQuiz } from '../../geminiService';
import { QuizData } from '../../types';
import { Bot, Loader2, Send, Check, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Practice: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const handleGenerate = async () => {
    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setShowFeedback({});
    try {
      const data = await generateHistoryQuiz();
      setQuiz(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMCQ = (qIdx: number, choice: number) => {
    if (showFeedback[`mcq-${qIdx}`]) return;
    const isCorrect = choice === quiz?.multiple_choice[qIdx].correct;
    setAnswers(prev => ({ ...prev, [`mcq-${qIdx}`]: choice }));
    setShowFeedback(prev => ({ ...prev, [`mcq-${qIdx}`]: true }));
    
    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleSelectTF = (qIdx: number, choice: boolean) => {
    if (showFeedback[`tf-${qIdx}`]) return;
    const isCorrect = choice === quiz?.true_false[qIdx].answer;
    setAnswers(prev => ({ ...prev, [`tf-${qIdx}`]: choice }));
    setShowFeedback(prev => ({ ...prev, [`tf-${qIdx}`]: true }));
    
    if (isCorrect) {
      confetti({ particleCount: 30, spread: 50 });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <h1 className="font-hand text-4xl md:text-5xl text-center text-primary mb-4">
        Luyện tập & Kiểm tra (AI Generator)
      </h1>
      <p className="text-center text-slate-600 max-w-2xl mx-auto">
        Hệ thống tự động tạo đề thi ngẫu nhiên dựa trên kiến thức Chủ đề 4. 
        Cấu trúc bao gồm: Trắc nghiệm, Đúng/Sai và Tự luận.
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-3 bg-gradient-to-r from-primary to-orange-400 text-white font-hand text-2xl px-10 py-5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Bot />}
          {loading ? 'Đang triệu hồi các nhà sử học AI...' : 'Tạo đề thi ngay'}
        </button>
      </div>

      {quiz && (
        <div className="space-y-12 animate-fade-in mt-12">
          {/* Section I: Multiple Choice */}
          <section className="space-y-6">
            <h2 className="font-hand text-3xl text-primary border-b-2 border-primary/20 pb-2">I. Trắc nghiệm nhiều lựa chọn</h2>
            <div className="grid gap-6">
              {quiz.multiple_choice.map((q, idx) => {
                const isSelected = answers[`mcq-${idx}`] !== undefined;
                const userChoice = answers[`mcq-${idx}`];
                const feedback = showFeedback[`mcq-${idx}`];
                
                return (
                  <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 transition-all ${
                    feedback ? (userChoice === q.correct ? 'border-green-500' : 'border-red-500') : 'border-primary'
                  }`}>
                    <p className="font-bold text-lg text-slate-800 mb-4">Câu {idx + 1}: {q.question}</p>
                    <div className="grid gap-3">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          disabled={feedback}
                          onClick={() => handleSelectMCQ(idx, oIdx)}
                          className={`text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                            feedback 
                              ? (oIdx === q.correct ? 'bg-green-50 border-green-500' : (oIdx === userChoice ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-200'))
                              : 'border-slate-100 hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          <span>{opt}</span>
                          {feedback && oIdx === q.correct && <Check className="text-green-600 w-5 h-5" />}
                          {feedback && oIdx === userChoice && oIdx !== q.correct && <X className="text-red-600 w-5 h-5" />}
                        </button>
                      ))}
                    </div>
                    {feedback && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl text-slate-600 italic animate-fade-in">
                        <p><strong>Giải thích:</strong> {q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section II: True/False */}
          <section className="space-y-6">
            <h2 className="font-hand text-3xl text-primary border-b-2 border-primary/20 pb-2">II. Trắc nghiệm Đúng/Sai</h2>
            <div className="grid gap-6">
              {quiz.true_false.map((q, idx) => {
                const userChoice = answers[`tf-${idx}`];
                const feedback = showFeedback[`tf-${idx}`];

                return (
                  <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 transition-all ${
                    feedback ? (userChoice === q.answer ? 'border-green-500' : 'border-red-500') : 'border-primary'
                  }`}>
                    <p className="font-bold text-lg text-slate-800 mb-4">Câu {idx + 1}: {q.question}</p>
                    <div className="flex gap-4">
                      {[true, false].map((val) => (
                        <button
                          key={val.toString()}
                          disabled={feedback}
                          onClick={() => handleSelectTF(idx, val)}
                          className={`flex-1 py-3 px-6 rounded-xl border-2 font-bold transition-all ${
                            feedback
                              ? (val === q.answer ? 'bg-green-50 border-green-500 text-green-700' : (val === userChoice ? 'bg-red-50 border-red-500 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-400'))
                              : 'border-slate-100 hover:border-primary hover:bg-primary/5'
                          }`}
                        >
                          {val ? 'Đúng' : 'Sai'}
                        </button>
                      ))}
                    </div>
                    {feedback && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl text-slate-600 italic">
                        <p><strong>Giải thích:</strong> {q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section III: Essay */}
          <section className="space-y-6">
            <h2 className="font-hand text-3xl text-primary border-b-2 border-primary/20 pb-2">III. Tự luận (Vận dụng)</h2>
            <div className="grid gap-6">
              {quiz.essay.map((q, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-accent">
                  <p className="font-bold text-lg text-slate-800 mb-4">Câu {idx + 1}: {q.question}</p>
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl border-2 border-slate-100 focus:border-accent focus:ring-0 outline-none transition-all"
                    placeholder="Nhập câu trả lời của em tại đây..."
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="glass p-8 rounded-2xl text-center space-y-4">
            <h3 className="font-hand text-3xl text-primary flex items-center justify-center gap-2">
              <Sparkles className="text-accent" /> Nộp bài tập vận dụng
            </h3>
            <p className="text-slate-600">Hoàn thành bài tập và nộp vào Google Drive lớp học để giáo viên nhận xét.</p>
            <a 
              href="https://drive.google.com/drive/folders/1tkJfY6IE9rkvmJhNmaxnJ7_uKucj2w5L?usp=drive_link" 
              target="_blank" 
              className="inline-flex items-center gap-2 bg-[#0F9D58] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#0b8043] transition-colors"
            >
              <Send className="w-5 h-5" /> Nộp bài vào Google Drive
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
