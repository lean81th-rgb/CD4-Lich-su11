
import React from 'react';
import { MapPin, Shield, ListCheck, Book, CheckCircle2 } from 'lucide-react';

const Objectives: React.FC = () => {
  const coreKnowledge = [
    {
      icon: MapPin,
      title: "Vị trí địa chiến lược",
      desc: "Trình bày, lí giải và phân tích được vị trí chiến lược của Việt Nam trong khu vực và thế giới."
    },
    {
      icon: Shield,
      title: "Vai trò & Ý nghĩa",
      desc: "Phân tích được tầm quan trọng của công cuộc đấu tranh bảo vệ Tổ quốc trước năm 1945."
    },
    {
      icon: ListCheck,
      title: "Các cuộc đấu tranh",
      desc: "Nắm vững nội dung chính (5W1H) của các cuộc đấu tranh tiêu biểu (thành công & thất bại)."
    },
    {
      icon: Book,
      title: "Bài học lịch sử",
      desc: "Rút ra và liên hệ được bài học kinh nghiệm vào công cuộc xây dựng và bảo vệ đất nước."
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-hand text-4xl md:text-5xl text-center text-primary mb-8">
        Mục tiêu & Yêu cầu cần đạt
      </h1>

      <section className="glass rounded-2xl p-8 shadow-lg">
        <h2 className="font-hand text-3xl text-primary mb-6 border-b-2 border-dashed border-secondary inline-block">
          Kiến thức cốt lõi
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {coreKnowledge.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/40 transition-colors">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md">
                <item.icon className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                <p className="text-slate-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50/80 rounded-2xl p-8 shadow-md border border-blue-100">
        <h2 className="font-hand text-3xl text-primary mb-6">
          Phát triển năng lực & Kỹ năng
        </h2>
        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="text-secondary w-6 h-6 shrink-0 mt-1" />
            <p><strong>Kỹ thuật 5W1H:</strong> What, Where, When, Who, Why, How. Phân tích diễn biến và nghệ thuật quân sự.</p>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="text-secondary w-6 h-6 shrink-0 mt-1" />
            <p><strong>Tư duy phản biện:</strong> Phân tích đa chiều, đánh giá nguồn tư liệu, đối sánh thông tin trên môi trường số.</p>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 className="text-secondary w-6 h-6 shrink-0 mt-1" />
            <p><strong>Công nghệ & Hợp tác:</strong> Sử dụng AI hỗ trợ học tập, làm việc nhóm, tạo sản phẩm học tập số.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Objectives;
