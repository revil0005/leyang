'use client';

import { useState } from 'react';
import { 
  User, 
  Phone, 
  Calendar, 
  Wrench, 
  FileText, 
  Camera,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const skillOptions = [
  '日常照护', '医疗护理', '助浴助衣', '餐食制作', 
  '康复训练', '家务清洁', '心理慰藉', '陪诊陪检'
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    skills: [] as string[],
    experience: '',
    bio: '',
  });

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <CheckCircle2 size={80} className="text-brand mb-6 animate-bounce" />
        <h2 className="text-3xl font-black text-dark mb-4">申请已收到！</h2>
        <p className="text-xl text-dark/60 mb-8 max-w-sm">
          感谢您加入乐养E居。您的入驻申请已进入审核队列，我们将在 <span className="text-brand font-bold">3个工作日内</span> 完成审核并与您电话联系。
        </p>
        <button onClick={() => window.location.href = '/'} className="btn bg-brand text-white px-12 text-lg">
          回到首页
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-block px-4 py-2 bg-brand/10 text-brand font-bold rounded-full text-sm mb-4">
          加入我们 · 共创未来
        </div>
        <h1 className="text-4xl font-black text-dark mb-4">护理员入驻申请</h1>
        <p className="text-lg text-dark/60">
          专业的人做专业的事，让您的技能为更多家庭带去阳光。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-brand/10 p-8 md:p-10 flex flex-col gap-8">
        
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-dark/70 ml-2">真实姓名</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="text" 
                placeholder="请输入您的姓名"
                required
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-brand transition-all text-lg"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-dark/70 ml-2">手机号码</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="tel" 
                placeholder="请输入常用手机号"
                required
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-brand transition-all text-lg"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-dark/70 ml-2">从业年龄</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="number" 
                placeholder="如: 45"
                required
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-brand transition-all text-lg"
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-dark/70 ml-2">从业经验</label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <select 
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-brand appearance-none transition-all text-lg"
                required
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="">请选择从业时长</option>
                <option value="1-3年">1-3年</option>
                <option value="3-5年">3-5年</option>
                <option value="5-10年">5-10年</option>
                <option value="10年以上">10年以上</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-dark/70 ml-2 flex items-center gap-2">
            <Wrench size={16} /> 擅长服务内容（多选）
          </label>
          <div className="flex flex-wrap gap-3">
            {skillOptions.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2.5 rounded-xl font-bold transition-all border-2 ${formData.skills.includes(skill) ? 'bg-brand text-white border-brand shadow-md scale-105' : 'bg-white text-dark/50 border-gray-100 hover:border-gray-200'}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-dark/70 ml-2 uppercase tracking-widest text-[10px]">个人简介</label>
          <textarea 
            placeholder="介绍一下您的护理背景、优势或曾获荣誉..."
            className="w-full h-32 p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-brand transition-all text-lg resize-none"
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>

        {/* Photo Upload Placeholder */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-dark/70 ml-2">上传相关证书/照片</label>
          <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-dark/30 hover:bg-gray-200 hover:border-brand transition-all cursor-pointer">
            <Camera size={24} />
            <span className="text-[10px] font-bold mt-1">点击上传</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn bg-brand text-white w-full h-16 mt-4 text-xl font-black shadow-xl shadow-brand/30 group"
        >
          提交入驻申请
          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
