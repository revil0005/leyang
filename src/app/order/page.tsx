'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronLeft,
  User,
  Heart,
  Utensils,
  Stethoscope,
  Brush,
  Car,
  Accessibility
} from 'lucide-react';
import Image from 'next/image';

const serviceTypes = [
  { id: 'care', label: '日常照料', icon: Heart },
  { id: 'medical', label: '医疗护理', icon: Stethoscope },
  { id: 'clean', label: '家务清洁', icon: Brush },
  { id: 'meal', label: '餐食配送', icon: Utensils },
  { id: 'rehab', label: '康复陪同', icon: Accessibility },
];

const caregivers = [
  { id: 1, name: '张阿姨', skills: '术后护理, 助浴', rating: 4.9, experience: '8年', bio: '性格开朗，做事细心，深得老人信任。', avatar: '/images/caregiver1.png' },
  { id: 2, name: '李姐', skills: '早午餐制作, 心理慰藉', rating: 4.8, experience: '5年', bio: '擅长制作营养餐，擅长沟通陪聊。', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: '王师傅', skills: '康复按摩, 轮椅出行', rating: 5.0, experience: '12年', bio: '专业康复训练师背景，体力充沛。', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200' },
];

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    frequency: '单次服务',
    time: '',
    address: '',
    caregiverId: null as number | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [matching, setMatching] = useState(false);
  const [recommendedCaregivers, setRecommendedCaregivers] = useState(caregivers);

  const nextStep = () => {
    if (step === 2) {
      setMatching(true);
      // 模拟智能推荐算法逻辑
      setTimeout(() => {
        // 根据评分排序，评分最高者标记为“智能推荐”
        const sorted = [...caregivers].sort((a, b) => b.rating - a.rating);
        setRecommendedCaregivers(sorted);
        setMatching(false);
        setStep(s => s + 1);
      }, 2000);
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => setStep(s => s - 1);

  const submitOrder = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 size={80} className="text-brand mb-6 animate-bounce" />
        <h2 className="text-3xl font-black text-dark mb-4">订单提交成功！</h2>
        <p className="text-xl text-dark/60 mb-8 max-w-sm">
          您的订单编号：<span className="font-bold text-brand">LY2026{(Math.random()*10000).toFixed(0)}</span><br/>
          我们的服务人员将在 <span className="text-brand font-bold">24小时内</span> 与您取得联系，请保持手机畅通。
        </p>
        <button onClick={() => window.location.href = '/profile'} className="btn bg-brand text-white px-12 text-lg shadow-xl shadow-brand/20 hover:-translate-y-1 transition-transform">
          查看我的订单
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 transition-all duration-500 ${step >= s ? 'bg-brand text-white scale-110 shadow-lg shadow-brand/20' : 'bg-gray-200 text-dark/40'}`}>
              {s}
            </div>
            <span className={`text-sm font-bold ${step >= s ? 'text-brand' : 'text-dark/40'}`}>
              {s === 1 ? '基础信息' : s === 2 ? '完善细节' : '匹配人员'}
            </span>
            {s < 3 && <div className={`absolute top-5 left-1/2 w-full h-1 transition-all duration-500 ${step > s ? 'bg-brand' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-brand/10 p-8 min-h-[400px] relative overflow-hidden">
        {matching && (
          <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300 px-6 text-center">
            <div className="w-20 h-20 border-4 border-brand border-t-transparent rounded-full animate-spin mb-8 shadow-inner shadow-brand/20"></div>
            <h3 className="text-3xl font-black text-dark animate-pulse mb-3">正在为您精准匹配...</h3>
            <p className="text-dark/40 text-lg font-bold max-w-xs">
              正在根据您的服务需求和地址，
              筛选评分最高及技能对口的金牌护理员
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-black text-dark">您需要哪种服务？</h2>
            <div className="grid grid-cols-2 gap-4">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, serviceType: type.label })}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.serviceType === type.label ? 'border-brand bg-brand/5 text-brand shadow-inner scale-[0.98]' : 'border-gray-50 text-dark/50 hover:border-gray-100'}`}
                >
                  <type.icon size={32} />
                  <span className="font-bold">{type.label}</span>
                </button>
              ))}
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-dark/70">服务频率</label>
              <div className="flex gap-4">
                {['单次服务', '长期雇佣'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFormData({ ...formData, frequency: f })}
                    className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${formData.frequency === f ? 'border-brand bg-brand/5 text-brand shadow-inner' : 'border-gray-50'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <button 
              disabled={!formData.serviceType}
              onClick={nextStep} 
              className="btn bg-brand text-white w-full h-14 mt-4 text-lg font-black disabled:opacity-50 shadow-lg shadow-brand/30 hover:-translate-y-1 transition-all"
            >
              下一步
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex items-center gap-2 text-dark/40 mb-2 cursor-pointer hover:text-brand transition-colors" onClick={prevStep}>
                <ChevronLeft size={20} />
                <span className="font-bold">返回</span>
             </div>
             <h2 className="text-2xl font-black text-dark">服务时间与地址</h2>
             
             <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-dark/70 ml-2">期望上门时间</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
                  <input 
                    type="datetime-local" 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none text-lg focus:bg-white focus:border-brand transition-all"
                  />
                </div>
             </div>

             <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-dark/70 ml-2">服务详细地址</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-dark/30" size={20} />
                  <textarea 
                    placeholder="请输入详细的家庭住址"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-32 pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none text-lg resize-none focus:bg-white focus:border-brand transition-all"
                  />
                </div>
             </div>

             <button 
              disabled={!formData.time || !formData.address}
              onClick={nextStep} 
              className="btn bg-brand text-white w-full h-14 mt-4 text-lg font-black disabled:opacity-50 shadow-lg shadow-brand/30 hover:-translate-y-1 transition-all"
            >
              开始智能匹配
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2 text-dark/40 cursor-pointer hover:text-brand transition-colors" onClick={prevStep}>
                  <ChevronLeft size={20} />
                  <span className="font-bold">返回</span>
               </div>
               <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-black rounded-full border border-green-100">
                 ✨ 智能算法已生效
               </div>
             </div>
             
             <h2 className="text-2xl font-black text-dark">推荐护理员</h2>
             
             <div className="flex flex-col gap-4">
                {recommendedCaregivers.map((c, idx) => (
                  <div 
                    key={c.id} 
                    onClick={() => setFormData({ ...formData, caregiverId: c.id })}
                    className={`flex gap-4 p-4 rounded-3xl border-2 transition-all cursor-pointer relative ${formData.caregiverId === c.id ? 'border-brand bg-brand/5 shadow-xl scale-[1.02]' : 'border-gray-50 hover:border-gray-100 hover:bg-gray-50/50'}`}
                  >
                    {idx === 0 && (
                      <div className="absolute -top-3 -right-3 bg-brand text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10 animate-outline-glow">
                         🥇 智能精准匹配 · 最优选
                      </div>
                    )}
                    
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                      <Image src={c.avatar} alt={c.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <span className="text-xl font-black text-dark">{c.name}</span>
                        <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-lg text-xs font-bold">
                          <Star size={12} fill="currentColor" />
                          {c.rating}
                        </div>
                      </div>
                      <p className="text-sm text-dark/60 line-clamp-2 mt-1">{c.bio}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] font-bold bg-white border border-gray-100 px-2 py-0.5 rounded-full text-dark/50">经验{c.experience}</span>
                        <span className="text-[10px] font-bold bg-white border border-gray-100 px-2 py-0.5 rounded-full text-dark/50">{c.skills.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
                <p className="text-sm text-dark/40">如果您不指定特定护理员，我们将根据算法为您随机派遣最合适的人员。</p>
                <button 
                  onClick={() => setFormData({...formData, caregiverId: null})}
                  className={`mt-2 font-black text-sm transition-colors ${formData.caregiverId === null ? 'text-brand' : 'text-dark/60 hover:text-brand'}`}
                >
                  [ 快速派遣 / 由系统决定 ]
                </button>
             </div>

             <button 
              onClick={submitOrder} 
              className="btn bg-brand text-white w-full h-16 mt-4 text-xl font-black shadow-xl shadow-brand/40 hover:-translate-y-1 active:scale-[0.98] transition-all"
            >
              确认提交预约
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
