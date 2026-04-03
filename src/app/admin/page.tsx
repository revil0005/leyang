'use client';

import { useState } from 'react';
import { 
  Users, 
  ClipboardList, 
  UserCheck, 
  AlertCircle,
  Search,
  Check,
  X,
  Filter,
  LogOut,
  LayoutDashboard,
  Star,
  ShieldCheck as ShieldCheckIcon
} from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'caregivers' | 'users' | 'reviews'>('orders');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'leyang2025') {
      setIsLoggedIn(true);
    } else {
      alert('密码错误');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-brand/10">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
              <ShieldCheckIcon size={40} />
            </div>
            <h1 className="text-2xl font-black text-dark">管理后台登录</h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-dark/70 ml-2">管理员密码</label>
              <input 
                type="password" 
                placeholder="请输入登录密码"
                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn bg-brand text-white w-full h-14 text-lg font-black shadow-lg">
              进入管理系统
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
        <div className="p-8">
          <span className="text-2xl font-black text-brand tracking-tighter">乐养后台</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'orders', label: '订单管理', icon: ClipboardList },
            { id: 'caregivers', label: '护理员管理', icon: UserCheck },
            { id: 'users', label: '用户管理', icon: Users },
            { id: 'reviews', label: '评价管理', icon: Star },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-dark/50 hover:bg-gray-50'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            退出
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: '待处理订单', value: '12', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: '认证护理员', value: '45', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: '本月完成数', value: '128', icon: LayoutDashboard, color: 'text-green-500', bg: 'bg-green-50' },
            { label: '系统拦截', value: '0', icon: ShieldCheck, color: 'text-gray-400', bg: 'bg-gray-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-2xl font-black text-dark">{stat.value}</div>
                <div className="text-xs font-bold text-dark/30 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black text-dark">
              {activeTab === 'orders' ? '实时订单流量' : activeTab === 'caregivers' ? '护理员资质审核' : '平台用户画像'}
            </h2>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
              <input 
                type="text" 
                placeholder="搜索流水、手机号..."
                className="w-64 h-12 pl-12 pr-4 rounded-xl bg-white border border-gray-100 outline-none focus:border-brand shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Content Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-dark/5 border border-gray-100 overflow-hidden">
          {activeTab === 'orders' && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">订单编号</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">服务类型</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">预约时间</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">状态</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: 'LY20268892', type: '日常照料', time: '2026-03-20 09:00', status: '待处理', color: 'bg-orange-100 text-orange-600', user: '张大爷' },
                  { id: 'LY20267710', type: '餐食配送', time: '2026-03-18 11:30', status: '已派单', color: 'bg-blue-100 text-blue-600', user: '李奶奶' },
                  { id: 'LY20266650', type: '家务清洁', time: '2026-03-15 14:00', status: '已完成', color: 'bg-green-100 text-green-600', user: '王叔叔' },
                  { id: 'LY20265540', type: '康复陪同', time: '2026-03-14 10:00', status: '待支付', color: 'bg-purple-100 text-purple-600', user: '赵阿姨' },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-brand">{order.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-dark">{order.type}</span>
                        <span className="text-[10px] text-dark/30 font-bold uppercase tracking-tight">下单人: {order.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-dark/60 font-medium">{order.time}</td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-black ${order.color}`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="h-10 px-4 bg-brand text-white rounded-xl text-xs font-black shadow-lg shadow-brand/20">查看</button>
                        <button className="w-10 h-10 bg-gray-50 text-dark/30 rounded-xl flex items-center justify-center border border-gray-100"><AlertCircle size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'caregivers' && (
            <div className="p-20 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-dark/20 mb-4">
                  <UserCheck size={32} />
               </div>
               <h3 className="text-xl font-black text-dark">暂无新的入驻申请</h3>
               <p className="text-dark/40 max-w-xs mt-2">当有新的护理员提交申请时，我们将在这里通知您进行审核。</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-20 text-center">
               <p className="text-dark/40 font-bold">用户管理模块开发中...</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">评价内容</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">评分</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">被评价人</th>
                  <th className="px-6 py-5 text-sm font-black text-dark/60">时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: 1, content: '张阿姨非常细心，照顾得很周到。', rating: 5, target: '张阿姨', time: '2026-03-22' },
                  { id: 2, content: '服务准时，态度温和。', rating: 4, target: '李姐', time: '2026-03-21' },
                ].map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <p className="text-dark font-medium">{review.content}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex text-amber-500 gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-dark/60">{review.target}</td>
                    <td className="px-6 py-5 text-dark/30 text-xs font-bold">{review.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

function ShieldCheck({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
