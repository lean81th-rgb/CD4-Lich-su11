
import React, { useState } from 'react';
import { Landmark, History, Swords, GraduationCap } from 'lucide-react';

const Research: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: '2.1 Vị trí & Khái niệm', icon: Landmark },
    { label: '2.2 Thắng lợi tiêu biểu', icon: History },
    { label: '2.3 Không thành công', icon: Swords },
    { label: '2.4 Bài học Lịch sử', icon: GraduationCap }
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-hand text-4xl md:text-5xl text-center text-primary mb-8">Nghiên cứu bài học</h1>
      
      <div className="glass rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-hand text-xl transition-all border-2 ${
                activeTab === idx 
                ? 'bg-secondary text-white border-secondary shadow-md' 
                : 'bg-white text-secondary border-secondary/20 hover:border-secondary hover:bg-secondary/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          {activeTab === 0 && (
            <div className="space-y-6 bg-white/40 p-6 rounded-xl">
              <h3 className="font-hand text-3xl text-primary">Vị trí địa chiến lược</h3>
              <p className="text-lg leading-relaxed">
                Việt Nam nằm ở vị trí "ngã tư đường" của khu vực Đông Nam Á, là cầu nối giữa lục địa Á-Âu và Thái Bình Dương. 
                Vị trí này vừa tạo thuận lợi cho giao lưu kinh tế nhưng cũng khiến nước ta trở thành mục tiêu xâm lược của các thế lực cường quyền.
              </p>
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-secondary mb-2">Khởi nghĩa (Uprising)</h4>
                  <p>Cuộc nổi dậy của quần chúng nhân dân chống lại ách thống trị để giành lại quyền làm chủ.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-secondary mb-2">Kháng chiến (Resistance War)</h4>
                  <p>Cuộc chiến tranh vệ quốc của một dân tộc nhằm chống lại sự xâm lược của nước ngoài.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="p-4 font-hand text-xl">Cuộc KC/KN</th>
                    <th className="p-4 font-hand text-xl">Năm</th>
                    <th className="p-4 font-hand text-xl">Lãnh đạo</th>
                    <th className="p-4 font-hand text-xl">Kẻ thù</th>
                    <th className="p-4 font-hand text-xl">Kết quả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Bạch Đằng', '938', 'Ngô Quyền', 'Nam Hán', 'Cọc ngầm, Chấm dứt Bắc thuộc'],
                    ['KC chống Tống 2', '1075-1077', 'Lý Thường Kiệt', 'Nhà Tống', 'Như Nguyệt, Nam quốc sơn hà'],
                    ['Chống Mông-Nguyên', 'TK XIII', 'Nhà Trần', 'Mông-Nguyên', 'Vườn không nhà trống'],
                    ['KN Lam Sơn', '1418-1427', 'Lê Lợi', 'Nhà Minh', 'Mưu phạt tâm công'],
                    ['KC chống Thanh', '1789', 'Quang Trung', 'Nhà Thanh', 'Hành quân thần tốc']
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="p-4 text-slate-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
                  <h4 className="font-hand text-2xl text-primary mb-3">Chống Triệu Đà (179 TCN)</h4>
                  <p className="text-slate-600 mb-2"><strong>Nguyên nhân:</strong> Chủ quan, mất cảnh giác, nội bộ chia rẽ.</p>
                  <p className="text-slate-600"><strong>Bài học:</strong> Luôn cảnh giác, củng cố quốc phòng toàn dân.</p>
               </div>
               <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
                  <h4 className="font-hand text-2xl text-primary mb-3">Nhà Hồ chống Minh (1406)</h4>
                  <p className="text-slate-600 mb-2"><strong>Nguyên nhân:</strong> Đường lối sai lầm, quá thiên về phòng thủ, không được lòng dân.</p>
                  <p className="italic">"Thần không sợ đánh, chỉ sợ lòng dân không theo."</p>
               </div>
               <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
                  <h4 className="font-hand text-2xl text-primary mb-3">Phong trào Cần Vương</h4>
                  <p className="text-slate-600">Lỗi thời về hệ tư tưởng trước sự xâm lược của thực dân phương Tây hiện đại.</p>
               </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <h4 className="font-hand text-3xl text-primary">Bài học kinh nghiệm</h4>
                <ul className="list-decimal list-inside space-y-2 text-slate-700">
                  <li><strong>Đoàn kết:</strong> "Khoan thư sức dân làm kế sâu rễ bền gốc".</li>
                  <li><strong>Nghệ thuật QS:</strong> Linh hoạt, lấy nhỏ thắng lớn.</li>
                  <li><strong>Dựng nước & Giữ nước:</strong> Củng cố tiềm lực quốc phòng ngay trong thời bình.</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl shadow-md border border-green-100">
                <h4 className="font-hand text-3xl text-primary">Liên hệ thực tiễn</h4>
                <ul className="space-y-3 text-slate-700">
                  <li>• Bảo vệ chủ quyền trên không gian mạng & văn hóa.</li>
                  <li>• Trách nhiệm HS: Học tập tốt, rèn luyện kỹ năng 5W1H.</li>
                  <li>• Tham gia GDQP-AN nghiêm túc.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Research;
