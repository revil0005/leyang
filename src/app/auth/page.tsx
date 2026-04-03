'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Phone, Lock, UserCircle, UserCheck } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'ELDERLY_FAMILY' | 'CAREGIVER'>('ELDERLY_FAMILY');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (!isLogin && code !== '123456') {
        alert('验证码错误 (请填写 123456)');
        return;
      }
      // Set simple local storage for demo auth state
      localStorage.setItem('user', JSON.stringify({ phone, role }));
      router.push(role === 'CAREGIVER' && !isLogin ? '/join' : '/profile');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#FDFAF6]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-brand/10 p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-dark">
            {isLogin ? '欢迎回来' : '开启乐养生活'}
          </h1>
          <p className="text-dark/60">
            {isLogin ? '登录您的账号以管理订单' : '只需一分钟，即可完成注册'}
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 font-bold rounded-xl transition-all ${isLogin ? 'bg-white text-brand shadow-sm' : 'text-dark/50'}`}
          >
            账号登录
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 font-bold rounded-xl transition-all ${!isLogin ? 'bg-white text-brand shadow-sm' : 'text-dark/50'}`}
          >
            手机注册
          </button>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-6">
          {!isLogin && (
             <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-dark/70 ml-2">选择身份</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setRole('ELDERLY_FAMILY')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all ${role === 'ELDERLY_FAMILY' ? 'border-brand bg-brand/5 text-brand' : 'border-gray-100 text-dark/40 hover:border-gray-200'}`}
                  >
                    <UserCircle size={20} />
                    老人/家属
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRole('CAREGIVER')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all ${role === 'CAREGIVER' ? 'border-brand bg-brand/5 text-brand' : 'border-gray-100 text-dark/40 hover:border-gray-200'}`}
                  >
                    <UserCheck size={20} />
                    护理员
                  </button>
                </div>
             </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-dark/70 ml-2">手机号码</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="tel" 
                placeholder="请输入11位手机号"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand focus:bg-white outline-none transition-all text-lg"
              />
            </div>
          </div>

          {isLogin ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-dark/70 ml-2">登录密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
                <input 
                  type="password" 
                  placeholder="请输入您的密码"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand focus:bg-white outline-none transition-all text-lg"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-dark/70 ml-2">验证码</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
                  <input 
                    type="text" 
                    placeholder="输入 123456"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand focus:bg-white outline-none transition-all text-lg"
                  />
                </div>
                <button type="button" className="px-4 text-brand font-bold text-sm whitespace-nowrap">获取验证码</button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn bg-brand text-white w-full h-14 mt-4 text-lg font-black shadow-lg shadow-brand/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? '处理中...' : (isLogin ? '立即登录' : '立即注册')}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-dark/40">
          登录即代表您同意<span className="text-brand">《服务协议》</span>与<span className="text-brand">《隐私政策》</span>
        </p>
      </div>
    </div>
  );
}
