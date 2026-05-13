import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Utensils,
  Home,
  Car,
  Smile,
  ShoppingBag,
  HeartPulse,
  Brush,
} from 'lucide-react';

const services = [
  { name: '吃', label: '餐食助餐', icon: Utensils, color: 'bg-orange-100 text-orange-600', desc: '专业营养师定制餐食，新鲜配送上门' },
  { name: '住', label: '居家助宿', icon: Home, color: 'bg-blue-100 text-blue-600', desc: '居家环境适老化改造，安全舒适' },
  { name: '行', label: '出行助医', icon: Car, color: 'bg-green-100 text-green-600', desc: '专人陪诊陪护，出行无忧' },
  { name: '乐', label: '文娱助乐', icon: Smile, color: 'bg-purple-100 text-purple-600', desc: '丰富的社区文娱活动，老有所乐' },
  { name: '购', label: '助购代办', icon: ShoppingBag, color: 'bg-red-100 text-red-600', desc: '代购生活用品，代办日常事务' },
  { name: '护', label: '专业照护', icon: HeartPulse, color: 'bg-pink-100 text-pink-600', desc: '持证护理员，专业康复照护' },
  { name: '扫', label: '家政助洁', icon: Brush, color: 'bg-yellow-100 text-yellow-600', desc: '深度清洁，还您一个整洁的家' },
];

export default function HomePage() {
  return (
    <div>
      {/* ====== Hero Section ====== */}
      <section className="relative min-h-[520px] flex items-center px-4 md:px-8 py-10 md:py-14">
        {/* Large rounded card background */}
        <div className="absolute inset-x-0 inset-y-2 md:inset-x-0 md:inset-y-3 rounded-[2.5rem] bg-gradient-to-br from-[#FDF0E3]/80 via-[#F9E4D0]/75 to-[#F4DCC4]/80 border border-brand/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_24px_rgba(107,58,31,0.10),0_1px_3px_rgba(107,58,31,0.06)]" />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="flex flex-col items-start gap-5 animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand px-4 py-1.5 rounded-full text-sm font-bold">
              ✦ 专业居家养老服务平台
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark leading-tight">
              乐享晚年<br />
              <span className="text-brand">养老生活从此无忧。</span>
            </h1>
            <p className="text-base md:text-lg text-dark/60 max-w-lg leading-relaxed">
              深耕社区养老服务，为您和您的家人提供吃、住、行、乐、购、护、扫全方位的专业居家照顾。
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/order" className="inline-flex items-center gap-2 bg-brand text-white px-7 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-brand/30 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 transition-all">
                立即预约
              </Link>
              <Link href="/join" className="inline-flex items-center gap-2 bg-white border-2 border-brand/20 text-brand px-7 py-3.5 rounded-xl text-base font-bold hover:bg-brand/5 hover:border-brand transition-all">
                我要入驻
              </Link>
            </div>
            <div className="flex gap-6 mt-6 flex-wrap">
              {['实名认证护理员', '7×24 紧急响应', '服务品质保障'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-dark/40">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block relative animate-fade-up-delay">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500 bg-gradient-to-br from-brand/5 to-brand/10">
              <Image
                src="/images/hero_custom.png"
                alt="乐养E居 - 专业居家养老"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====== Services Section ====== */}
      <section className="pt-6 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="inline-block bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">全方位关怀服务</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark font-serif mb-3">满足社区养老全方位需求</h2>
            <p className="text-dark/40 text-base max-w-lg">从餐食到照护，吃、住、行、乐、购、护、扫七大维度覆盖您的生活所需。</p>
          </div>

          {/* Desktop: 7-col grid */}
          <div className="hidden md:grid grid-cols-7 gap-4">
            {services.map((s) => (
              <Link key={s.name} href={`/order?type=${s.name}`} className="group bg-white rounded-2xl p-5 border border-gray-100 flex flex-col items-center text-center gap-3 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand/20 transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon size={28} />
                </div>
                <span className="font-bold text-sm text-dark group-hover:text-brand transition-colors">{s.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex overflow-x-auto gap-3 pb-2 snap-x md:hidden scrollbar-hide -mx-4 px-4">
            {services.map((s) => (
              <Link key={s.name} href={`/order?type=${s.name}`} className="group bg-white rounded-2xl p-5 border border-gray-100 flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-lg hover:border-brand/20 transition-all duration-200 shrink-0 w-28 snap-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon size={28} />
                </div>
                <span className="font-bold text-sm text-dark group-hover:text-brand transition-colors">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Feature Strip ====== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="bg-dark rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">更专业的方式，<br />关爱您的家人</h2>
            <p className="text-white/50 leading-relaxed mb-8 max-w-md">
              乐养E居整合专业护理资源与智能匹配系统，让每一次服务都值得信赖。
            </p>
            <Link href="/order" className="inline-flex items-center gap-2 bg-brand text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-brand/30 hover:bg-brand-hover hover:-translate-y-0.5 transition-all">
              立即预约 <ArrowRight size={18} />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { num: '01', title: '专业护理团队', desc: '所有护理员实名认证，持证上岗，经验丰富，背景严格审核。' },
              { num: '02', title: '紧急响应机制', desc: 'SOS一键呼叫，7×24小时全天候即时响应，守护家人安全。' },
              { num: '03', title: '服务品质保障', desc: '不满意随时更换护理员，全程跟踪反馈，品质始终如一。' },
            ].map((f) => (
              <div key={f.num} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white font-black text-sm flex-shrink-0">{f.num}</div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">{f.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== How It Works ====== */}
      <section className="pb-20 px-4 md:px-8 bg-gray-50/50 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">使用流程</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark font-serif">三步轻松开启服务</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gray-200 z-0" />
            {[
              { step: '1', icon: '📤', title: '选择服务', desc: '告诉我们您需要的服务类型、时间和地点。' },
              { step: '2', icon: '🔎', title: '智能匹配', desc: '系统为您推荐最合适的专业护理员，附带详细资料。' },
              { step: '3', icon: '🤝', title: '确认预约', desc: '确认后护理员按时上门，全程服务跟踪，售后无忧。' },
            ].map((s) => (
              <div key={s.step} className="text-center relative z-10">
                <div className="relative inline-block mb-5">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-brand/20 flex items-center justify-center text-2xl shadow-lg shadow-brand/10">
                    {s.icon}
                  </div>
                  <div className="absolute -top-1 right-0 w-6 h-6 rounded-full bg-brand text-white text-xs font-black flex items-center justify-center">{s.step}</div>
                </div>
                <h3 className="text-lg font-black text-dark mb-2">{s.title}</h3>
                <p className="text-sm text-dark/40 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA Banner ====== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-hover) 100%)' }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/8 -mr-20 -mt-20" />
          <div className="relative z-10 text-center py-16 px-6 md:py-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">现在开始，为家人选择专业照护</h2>
            <p className="text-white/70 text-base md:text-lg mb-8">加入乐养E居，让专业养老服务温暖您的生活</p>
            <Link href="/order" className="inline-flex items-center gap-2 bg-white text-brand px-9 py-4 rounded-xl text-lg font-black shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all">
              立即预约服务 <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
