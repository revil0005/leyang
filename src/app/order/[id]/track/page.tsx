"use client";

import { use, useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck, 
  Star,
  CheckCircle2,
  Circle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OrderTrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [currentStatus, setCurrentStatus] = useState(1); // 0: Pending, 1: Assigned, 2: In Progress, 3: Completed
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { label: "订单提交", time: "10:30", desc: "您的订单已进入系统，等待后台确认" },
    { label: "匹配成功", time: "10:35", desc: "已为您匹配金牌护理员：张阿姨" },
    { label: "正在路上", time: "10:45", desc: "护理员已出发，预计 15 分钟后到达" },
    { label: "服务中/完成", time: "--:--", desc: "服务完成后将同步更新状态" },
  ];

  const caregiver = {
    name: "张阿姨",
    rating: 4.9,
    experience: "8年",
    phone: "138****8888",
    avatar: "/images/caregiver1.png",
    bio: "性格开朗，做事细心，深得老人信任。"
  };

  const handleReviewSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: id,
          caregiverId: 1, // Simulated
          userId: 1,      // Simulated
          rating,
          content
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2 text-dark/60 hover:text-brand font-bold transition-colors">
            <ChevronLeft size={24} />
            <span>返回订单列表</span>
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-dark/30 uppercase tracking-widest">单号: {id}</span>
            <span className="text-sm font-black text-brand">服务追踪中</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8 flex flex-col gap-8">
        
        {/* Progress Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -z-0"></div>
          
          <h2 className="text-2xl font-black text-dark mb-10 relative z-10 flex items-center gap-3">
            <div className="w-2 h-8 bg-brand rounded-full animate-pulse"></div>
            当前服务进度
          </h2>

          <div className="flex flex-col gap-10 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 relative group">
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className={`absolute left-4 top-10 w-0.5 h-12 ${idx < currentStatus ? 'bg-brand' : 'bg-gray-100'}`} />
                )}
                
                {/* Icon/Circle */}
                <div className="flex-shrink-0 mt-1">
                  {idx < currentStatus ? (
                    <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20">
                      <CheckCircle2 size={20} />
                    </div>
                  ) : idx === currentStatus ? (
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-brand flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-brand"></div>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-100" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-xl font-black ${idx <= currentStatus ? 'text-dark' : 'text-dark/20'}`}>
                      {step.label}
                    </span>
                    <span className="text-xs font-bold text-dark/30">{step.time}</span>
                  </div>
                  <p className={`text-sm font-medium leading-relaxed max-w-xs ${idx <= currentStatus ? 'text-dark/60' : 'text-dark/10'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caregiver Profile Card */}
        {currentStatus >= 1 && (
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-black text-dark mb-6">接单人员信息</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-lg border-4 border-gray-50">
                <Image src={caregiver.avatar} alt={caregiver.name} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-dark">{caregiver.name}</span>
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                       <ShieldCheck size={12} /> 已身份认证
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500 font-black">
                    <Star size={16} fill="currentColor" />
                    <span>{caregiver.rating}</span>
                  </div>
                </div>
                <div className="flex gap-3 text-xs font-bold text-dark/40">
                  <span>从业经验：{caregiver.experience}</span>
                  <span>|</span>
                  <span>服务次数：428次</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 w-full bg-brand text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-brand/20 hover:-translate-y-1 transition-all">
                <Phone size={20} /> 立即电话沟通
              </button>
              <button className="flex items-center justify-center gap-3 w-full bg-gray-50 text-dark/40 py-5 rounded-2xl text-lg font-black hover:bg-gray-100 transition-colors">
                在线留言
              </button>
            </div>
          </div>
        )}


        {/* Review Section */}
        {currentStatus === 3 && !submitted && (
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-brand/10 animate-in fade-in zoom-in duration-500">
             <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                   <Star size={32} />
                </div>
                <div>
                   <h2 className="text-2xl font-black text-dark">评价本次服务</h2>
                   <p className="text-dark/50 font-medium">您的评价将帮助我们提供更好的服务</p>
                </div>

                <div className="flex gap-2">
                   {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="transition-transform active:scale-90"
                      >
                         <Star 
                           size={40} 
                           fill={(hoverRating || rating) >= star ? "#F59E0B" : "none"} 
                           className={(hoverRating || rating) >= star ? "text-amber-500" : "text-gray-200"}
                         />
                      </button>
                   ))}
                </div>

                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="说说您的感受，或者给阿姨一些建议吧..."
                  className="w-full min-h-[120px] p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand/20 focus:outline-none transition-all text-dark font-medium"
                />

                <button 
                  disabled={rating === 0 || submitting}
                  onClick={handleReviewSubmit}
                  className="w-full bg-brand text-white py-5 rounded-2xl text-xl font-black shadow-xl shadow-brand/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting ? "提交中..." : "提交评价"}
                </button>
             </div>
          </div>
        )}

        {submitted && (
           <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-gray-200/50 border border-green-100 flex flex-col items-center text-center gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                 <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-black text-dark">评价提交成功</h2>
              <p className="text-dark/50 font-medium max-w-xs">感谢您的反馈！我们会继续努力为您提供优质的养老服务。</p>
              <Link 
                href="/"
                className="mt-4 text-brand font-bold"
              >
                返回首页
              </Link>
           </div>
        )}

        {/* Temporary simulation toggle for demo purposes */}
        <div className="fixed bottom-6 right-6 z-50 flex gap-2">
           <button 
            onClick={() => setCurrentStatus((s) => (s + 1) % 4)}
            className="bg-dark/80 text-white px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md shadow-lg border border-white/10"
           >
             模拟进度切换 (当前: {steps[currentStatus].label})
           </button>
        </div>

        {/* Location Snapshot (Placeholder) */}
        {currentStatus < 3 && (
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 h-64 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-dark/20 flex-col gap-4 font-black">
              <MapPin size={48} className="group-hover:bounce transition-all" />
              <span>实时位置地图（加载中...）</span>
           </div>
           {/* Glass overlay with service info */}
           <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                   <Clock size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-brand uppercase tracking-widest">预计送达</div>
                  <div className="text-lg font-black text-dark">约 15 分钟</div>
                </div>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-black text-dark/30 uppercase tracking-widest">剩余距离</div>
                 <div className="text-lg font-black text-dark">1.2 KM</div>
              </div>
           </div>
          </div>
        )}

      </div>
    </div>
  );
}
