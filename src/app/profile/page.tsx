'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  MapPin, 
  Clock, 
  CreditCard, 
  ChevronRight, 
  LogOut,
  Settings,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import Image from 'next/image';

interface UserData {
  phone: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/auth');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  const orders = [
    { id: 'LY20268892', type: '日常照料', caregiver: '张阿姨', time: '2026-03-20 09:00', status: '待处理', statusColor: 'bg-orange-100 text-orange-600' },
    { id: 'LY20267710', type: '餐食配送', caregiver: '李姐', time: '2026-03-18 11:30', status: '已完成', statusColor: 'bg-gray-100 text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFAF6] pb-20">
      {/* Header Profile Section */}
      <div className="bg-brand pt-16 pb-24 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="max-w-4xl mx-auto flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-white/20 border-4 border-white/30 backdrop-blur-md flex items-center justify-center text-white overflow-hidden shadow-2xl group hover:scale-105 transition-transform">
             <Image 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} 
                alt="Avatar" 
                fill 
                className="object-cover"
                unoptimized
             />
          </div>
          <div className="flex flex-col gap-1 text-white">
            <h1 className="text-3xl font-black">你好，敬爱的用户</h1>
            <div className="flex items-center gap-2 opacity-80 font-bold">
               <ShieldCheck size={16} />
               <span>{user.role === 'CAREGIVER' ? '认证护理员' : '黄金会员'}</span>
               <span className="mx-1 opacity-40">|</span>
               <span>{user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 flex flex-col gap-8">
        
        {/* Quick Actions (Admin Entry if applicable) */}
        <div className="bg-white rounded-3xl shadow-xl border border-brand/5 p-6 grid grid-cols-4 gap-4">
          {[
            { label: '我的订单', icon: Calendar, color: 'text-brand' },
            { label: '地址管理', icon: MapPin, color: 'text-blue-500' },
            { label: '支付设置', icon: CreditCard, color: 'text-green-500' },
            { label: '账号设置', icon: Settings, color: 'text-gray-500' },
          ].map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group">
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
              <span className="text-xs font-bold text-dark/70">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-black text-dark">最近订单</h2>
            <button className="text-brand font-bold text-sm flex items-center">
              查看全部 <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-6 shadow-md border border-gray-50 flex flex-col gap-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-dark/40 text-xs font-bold uppercase tracking-widest">单号: {order.id}</span>
                    <h3 className="text-xl font-black text-dark">{order.type}</h3>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-dark/60 text-sm py-4 border-y border-gray-50">
                  <div className="flex items-center gap-1">
                    <User size={16} className="text-brand" />
                    <span className="font-bold">{order.caregiver}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-brand" />
                    <span>{order.time}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  {order.status === '已完成' ? (
                    <Link 
                      href={`/order/${order.id}/track`}
                      className="flex-1 btn bg-orange-50 text-brand h-12 text-sm border border-brand/20 flex items-center justify-center font-bold hover:bg-orange-100 transition-colors"
                    >
                      评价本次服务
                    </Link>
                  ) : (
                    <Link 
                      href={`/order/${order.id}/track`}
                      className="flex-1 btn bg-brand/5 text-brand h-12 text-sm border border-brand/10 flex items-center justify-center font-bold"
                    >
                      追踪进度
                    </Link>
                  )}
                  {order.status === '待处理' && (
                    <button className="flex-1 btn bg-gray-50 text-dark/50 h-12 text-sm border border-gray-100">取消订单</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-4 flex items-center justify-center gap-2 text-dark/40 font-bold hover:text-red-500 transition-colors py-4"
        >
          <LogOut size={20} />
          退出当前登录
        </button>
      </div>
    </div>
  );
}
