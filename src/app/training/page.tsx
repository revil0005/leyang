"use client";

import { useState } from 'react';
import Image from 'next/image';
import { BookOpen, CheckCircle, Clock, X, ArrowRight } from 'lucide-react';

const courses = [
  { id: "c1", title: "生活照料基础技能 (吃、住、行)", duration: "40课时", desc: "学习老年人日常饮食搭配、起居照料、出行辅助等基础生活照护技能，掌握日常应对方案。" },
  { id: "c2", title: "康复护理与安全保障 (护、医)", duration: "60课时", desc: "由三甲医院资深护士长授课，深入学习常见老年慢性病护理、突发状况急救以及基础康复训练手法。" },
  { id: "c3", title: "家政服务与沟通技巧 (购、扫、乐)", duration: "32课时", desc: "培养专业的家政清洁标准，代办购物防骗技巧，以及与老年人沟通的心理疏导与陪伴技巧。" }
];

export default function TrainingPage() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', has_experience: '无工作经验' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    
    setLoading(true);
    // 模拟后端请求延迟
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const closeForm = () => {
    setSelectedCourse(null);
    setSuccess(false);
    setFormData({ name: '', phone: '', has_experience: '无工作经验' });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50/30 pb-20">
      
      {/* Banner */}
      <section className="relative w-full h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1576091160550-217359f4b0d4?auto=format&fit=crop&q=80&w=2000" 
          alt="Professional Caregiver Training" 
          fill 
          className="object-cover" 
          priority 
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-brand/40" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 mb-6 bg-white/20 text-white font-bold rounded-full text-sm backdrop-blur-md border border-white/30">
            赋能关爱 · 专业铸就品质
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl">
            专业护理人才培训基地
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md font-medium leading-relaxed">
            加入乐养E居，系统化学习金牌护理技能，打开高薪职业通道
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="group bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="h-16 w-16 bg-gradient-to-br from-brand to-orange-400 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand/30 group-hover:rotate-6 transition-transform">
                <BookOpen size={30} />
              </div>
              
              <h2 className="text-2xl font-extrabold text-dark mb-4 leading-snug">{course.title}</h2>
              
              <p className="text-dark/70 text-lg flex-grow leading-relaxed mb-6">{course.desc}</p>
              
              <div className="flex items-center gap-3 text-dark/80 bg-gray-50 p-4 rounded-xl font-bold mb-8 border border-gray-100">
                <Clock size={20} className="text-brand" />
                <span>总计时长：{course.duration}</span>
              </div>
              
              <button 
                onClick={() => setSelectedCourse(course)}
                className="w-full bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:bg-brand group-hover:text-white min-h-[56px]"
              >
                了解并报名 <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] bg-dark/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-0">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl relative overflow-hidden flex flex-col scale-100 animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-brand to-orange-500 text-white p-8 relative">
              <div className="uppercase tracking-wider text-sm font-bold opacity-80 mb-2">课程报名登记</div>
              <h3 className="text-2xl font-extrabold pr-8">{selectedCourse.title}</h3>
              <button onClick={closeForm} className="absolute top-8 right-8 text-white/70 hover:text-white hover:rotate-90 transition-all bg-black/10 hover:bg-black/20 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 md:p-10 bg-gray-50/30">
              {success ? (
                <div className="text-center flex flex-col items-center gap-6 py-10">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center relative shadow-inner">
                    <CheckCircle size={56} className="text-green-500 relative z-10" />
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
                  </div>
                  <h4 className="text-3xl font-extrabold text-dark">报名凭证已生成</h4>
                  <p className="text-xl text-dark/70 leading-relaxed">感谢您的信任。教务老师将在1个工作日内致电确认上课安排，请留意 010 开头的座机来电。</p>
                  <button 
                    onClick={closeForm}
                    className="mt-8 bg-brand hover:bg-brand-hover text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    完成并返回课程列表
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-dark/80 text-lg">学员真实姓名 <span className="text-brand">*</span></label>
                    <input 
                      required autoFocus
                      type="text" 
                      className="px-5 py-4 min-h-[56px] rounded-xl border-2 border-gray-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 text-lg transition-all"
                      placeholder="如: 张三"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-dark/80 text-lg">联系手机号 <span className="text-brand">*</span></label>
                    <input 
                      required 
                      type="tel" 
                      className="px-5 py-4 min-h-[56px] rounded-xl border-2 border-gray-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 text-lg transition-all"
                      placeholder="您的手机号码"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-dark/80 text-lg">既往护理经验 <span className="text-brand">*</span></label>
                    <div className="relative">
                      <select 
                        className="w-full px-5 py-4 min-h-[56px] rounded-xl border-2 border-gray-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 bg-white text-lg transition-all appearance-none cursor-pointer"
                        value={formData.has_experience} onChange={e => setFormData({...formData, has_experience: e.target.value})}
                      >
                        <option>零基础 / 无工作经验</option>
                        <option>具备护工或家政相关经验</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className="mt-6 w-full bg-gradient-to-r from-brand to-orange-500 text-white font-extrabold py-5 rounded-xl text-xl hover:from-brand-hover hover:to-orange-600 transition-all shadow-xl shadow-brand/30 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {loading ? '信息录入中...' : '提交报名申请'}
                  </button>
                  <p className="text-center text-sm text-dark/40 mt-2 flex items-center justify-center gap-1">
                    <CheckCircle size={14} /> 您的信息将被严格保密
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
