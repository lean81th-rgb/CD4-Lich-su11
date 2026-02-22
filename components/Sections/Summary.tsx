
import React from 'react';

const Summary: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="font-hand text-4xl md:text-5xl text-center text-primary mb-8">Sơ đồ tư duy tổng hợp</h1>
      
      <div className="glass rounded-2xl p-12 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Central Node */}
        <div className="z-10 bg-accent text-white font-hand text-3xl p-10 rounded-full shadow-2xl border-4 border-white animate-pulse text-center leading-tight">
          BẢO VỆ TỔ QUỐC <br/> (Trước 1945)
        </div>

        {/* Branches Simulation using Grid */}
        <div className="grid md:grid-cols-3 gap-12 mt-20 w-full">
          <div className="bg-green-100 p-6 rounded-2xl border-2 border-green-500 text-center shadow-lg transform -rotate-2">
            <h3 className="font-hand text-2xl text-green-700 font-bold mb-4">THÀNH CÔNG</h3>
            <ul className="text-slate-700 space-y-2">
              <li>• Bạch Đằng (938)</li>
              <li>• Nhà Trần (3 lần)</li>
              <li>• Lam Sơn (Lê Lợi)</li>
              <li>• Quang Trung (1789)</li>
              <li className="mt-4 italic font-semibold">Đoàn kết + Nghệ thuật QS</li>
            </ul>
          </div>

          <div className="bg-red-100 p-6 rounded-2xl border-2 border-red-500 text-center shadow-lg transform rotate-1">
            <h3 className="font-hand text-2xl text-red-700 font-bold mb-4">KHÔNG THÀNH CÔNG</h3>
            <ul className="text-slate-700 space-y-2">
              <li>• An Dương Vương</li>
              <li>• Hồ Quý Ly</li>
              <li>• Nhà Nguyễn (Pháp)</li>
              <li className="mt-4 italic font-semibold">Mất cảnh giác + Không lòng dân</li>
            </ul>
          </div>

          <div className="bg-blue-100 p-6 rounded-2xl border-2 border-blue-500 text-center shadow-lg transform rotate-3">
            <h3 className="font-hand text-2xl text-blue-700 font-bold mb-4">BÀI HỌC</h3>
            <ul className="text-slate-700 space-y-2">
              <li>• Đại đoàn kết dân tộc</li>
              <li>• Dựng nước + Giữ nước</li>
              <li>• Ngoại giao mềm dẻo</li>
              <li>• Nhân dân là gốc</li>
            </ul>
          </div>
        </div>
        
        {/* Background Decorative Circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full -z-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full -z-1"></div>
      </div>
    </div>
  );
};

export default Summary;
