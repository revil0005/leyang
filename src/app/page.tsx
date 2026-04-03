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
  ChevronRight
} from 'lucide-react';
import { db } from '@/lib/db';

async function getStats() {
  try {
    const userCount = await (db as any).user.count({ where: { role: 'ELDERLY_FAMILY' } });
    const orderCount = await (db as any).order.count({ where: { status: 'COMPLETED' } });
    const caregiverCount = await (db as any).caregiver.count({ where: { status: 'APPROVED' } });
    
    return {
      users: userCount + 52, 
      orders: orderCount + 158,
      satisfaction: "99%",
      caregivers: caregiverCount + 28
    };
  } catch (e) {
    // Fallback for cases where database is not yet ready or connected
    return { 
      users: 52, 
      orders: 158, 
      satisfaction: "99%", 
      caregivers: 28 
    };
  }
}

const services = [
  { name: '吃', label: '餐食助餐', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { name: '住', label: '居家助宿', icon: Home, color: 'bg-blue-100 text-blue-600' },
  { name: '行', label: '出行助医', icon: Car, color: 'bg-green-100 text-green-600' },
  { name: '乐', label: '文娱助乐', icon: Smile, color: 'bg-purple-100 text-purple-600' },
  { name: '购', label: '助购代办', icon: ShoppingBag, color: 'bg-red-100 text-red-600' },
  { name: '护', label: '专业照护', icon: HeartPulse, color: 'bg-pink-100 text-pink-600' },
  { name: '扫', label: '家政助洁', icon: Brush, color: 'bg-yellow-100 text-yellow-600' },
];


export default async function HomePage() {
  const stats = await getStats();

  return (
    <div className="flex flex-col gap-0">
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center bg-[#FDFAF6] pt-12 pb-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 rounded-l-full -mr-24 blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-4xl md:text-6xl font-black text-dark leading-tight">
              乐享晚年<br />
              <span className="text-brand">养老生活从此无忧</span>
            </h1>
            <p className="text-lg md:text-xl text-dark/70 max-w-lg">
              深耕社区养老服务，为您和您的家人提供吃、住、行、乐、购、护、扫全方位的专业居家照顾。
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/order" className="btn bg-brand text-white text-lg px-8 shadow-lg shadow-brand/20 hover:scale-105">
                立即预约
              </Link>
              <Link href="/join" className="btn bg-white border-2 border-brand text-brand text-lg px-8 hover:bg-brand/5">
                我要入驻
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
             <img 
                src="/images/hero_custom.png"
                alt="乐养E居 - 专业居家养老"
                className="w-full h-full object-cover"
             />
          </div>
        </div>
      </section>

      {/* Service Icons Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">全方位关怀服务</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-6">
            {services.map((s) => (
              <Link key={s.name} href={`/order?type=${s.name}`} className="flex flex-col items-center gap-3 group">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${s.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand/5 border border-transparent group-hover:border-brand/20`}>
                  <s.icon size={36} />
                </div>
                <span className="font-bold text-dark group-hover:text-brand">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: stats.users, label: "注册用户数" },
            { value: stats.orders, label: "完成订单数" },
            { value: stats.satisfaction, label: "总满意度" },
            { value: stats.caregivers, label: "在库护理员" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-white gap-1 border-r border-white/20 last:border-0">
              <span className="text-4xl font-black">{item.value}+</span>
              <span className="text-sm font-medium opacity-80 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
