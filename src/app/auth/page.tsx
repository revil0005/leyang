'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Phone, Lock, Hash, UserCircle, UserCheck, Loader2 } from 'lucide-react';

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
        <div className="flex flex-col items-center gap-3 mb-7">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand shadow-sm shadow-brand/5">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-dark tracking-tight">
            {isLogin ? '欢迎回来' : '开启乐养生活'}
          </h1>
          <p className="text-sm text-dark/50">
            {isLogin ? '登录您的账号以管理订单' : '只需一分钟，即可完成注册'}
          </p>
        </div>

        <div className="flex bg-gray-100/80 p-1 rounded-2xl mb-7">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 font-bold rounded-xl text-sm transition-all duration-300 ${isLogin ? 'bg-white text-brand shadow-sm shadow-brand/10' : 'text-dark/40 hover:text-dark/70'}`}
          >
            账号登录
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 font-bold rounded-xl text-sm transition-all duration-300 ${!isLogin ? 'bg-white text-brand shadow-sm shadow-brand/10' : 'text-dark/40 hover:text-dark/70'}`}
          >
            手机注册
          </button>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          {!isLogin && (
             <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-wider ml-1">选择身份</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('ELDERLY_FAMILY')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all duration-300 ${
                      role === 'ELDERLY_FAMILY'
                        ? 'border-brand bg-brand/5 text-brand shadow-sm shadow-brand/10'
                        : 'border-gray-200 text-dark/35 hover:border-gray-300 hover:text-dark/60'
                    }`}
                  >
                    <UserCircle size={20} />
                    <span className="font-semibold text-sm">老人/家属</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('CAREGIVER')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all duration-300 ${
                      role === 'CAREGIVER'
                        ? 'border-brand bg-brand/5 text-brand shadow-sm shadow-brand/10'
                        : 'border-gray-200 text-dark/35 hover:border-gray-300 hover:text-dark/60'
                    }`}
                  >
                    <UserCheck size={20} />
                    <span className="font-semibold text-sm">护理员</span>
                  </button>
                </div>
             </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-dark/50 uppercase tracking-wider ml-1">手机号码</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/25 transition-colors group-focus-within:text-brand" size={20} />
              <input
                type="tel"
                placeholder="请输入11位手机号"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 text-base placeholder:text-dark/25"
              />
            </div>
          </div>

          {isLogin ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-wider">登录密码</label>
                <button type="button" className="text-xs font-semibold text-brand/70 hover:text-brand transition-colors">忘记密码?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/25 transition-colors group-focus-within:text-brand" size={20} />
                <input
                  type="password"
                  placeholder="请输入您的密码"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 text-base placeholder:text-dark/25"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-dark/50 uppercase tracking-wider ml-1">验证码</label>
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/25 transition-colors group-focus-within:text-brand" size={20} />
                  <input
                    type="text"
                    placeholder="输入 123456"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-200 text-base placeholder:text-dark/25"
                  />
                </div>
                <button
                  type="button"
                  className="shrink-0 h-14 px-4 rounded-2xl border-2 border-brand/20 text-brand font-bold text-sm hover:bg-brand/5 active:bg-brand/10 transition-all duration-200"
                >
                  获取验证码
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full h-14 rounded-2xl bg-brand text-white text-lg font-black shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:bg-brand-hover active:scale-[0.97] disabled:opacity-50 disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={22} className="animate-spin" />}
            {loading ? '处理中...' : (isLogin ? '立即登录' : '立即注册')}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-dark/30">
          登录即代表您同意 <span className="text-brand/70 font-medium">《服务协议》</span> 与 <span className="text-brand/70 font-medium">《隐私政策》</span>
        </p>
      </div>
    </div>
  );
}
