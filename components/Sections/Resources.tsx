
import React, { useState } from 'react';
import { ExternalLink, Plus, BookOpenText, Library } from 'lucide-react';
import { TeacherResource } from '../../types';

const Resources: React.FC = () => {
  const [resources, setResources] = useState<TeacherResource[]>([
    {
      id: '1',
      title: 'NotebookLM: Tư liệu thực hành & Rèn tư duy phản biện',
      url: 'https://notebooklm.google.com/notebook/451c7ceb-ecb1-4674-aa6a-89ad521b5da4',
      description: 'Chứa các tài liệu nguồn, văn kiện lịch sử để học sinh thực hành phân tích, đặt câu hỏi và phản biện.'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = () => {
    if (newTitle && newUrl) {
      setResources(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          title: newTitle,
          url: newUrl,
          description: 'Tài liệu bổ sung từ cộng đồng giáo viên.'
        }
      ]);
      setNewTitle('');
      setNewUrl('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="font-hand text-4xl md:text-5xl text-center text-primary mb-8 flex items-center justify-center gap-4">
        <Library className="w-10 h-10" /> Góc Giáo Viên & Tài liệu
      </h1>

      <div className="grid gap-6">
        {resources.map((res) => (
          <div key={res.id} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-secondary hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <a 
                  href={res.url} 
                  target="_blank" 
                  className="font-hand text-2xl text-secondary hover:underline flex items-center gap-2"
                >
                  <BookOpenText className="w-6 h-6" /> {res.title}
                </a>
                <p className="text-slate-500 text-sm md:text-base">{res.description}</p>
              </div>
              <a 
                href={res.url} 
                target="_blank" 
                className="bg-secondary/10 text-secondary p-2 rounded-lg hover:bg-secondary hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl shadow-inner border-2 border-dashed border-slate-300">
        <h3 className="font-hand text-2xl text-slate-700 mb-4">Đóng góp thêm tài liệu</h3>
        <div className="grid md:grid-cols-[1fr_2fr_auto] gap-4">
          <input 
            type="text" 
            placeholder="Tiêu đề tài liệu..." 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-3 rounded-xl border-2 border-slate-100 focus:border-primary outline-none"
          />
          <input 
            type="text" 
            placeholder="Link (URL)..." 
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="p-3 rounded-xl border-2 border-slate-100 focus:border-primary outline-none"
          />
          <button 
            onClick={handleAdd}
            className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 font-bold"
          >
            <Plus className="w-5 h-5" /> Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
