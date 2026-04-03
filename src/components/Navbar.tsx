import Link from 'next/link';
import { User, HeartPulse } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-brand/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:rotate-6 transition-transform">
            <HeartPulse size={24} />
          </div>
          <span className="text-2xl font-black text-brand tracking-tighter">乐养E居</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/order" className="text-dark font-medium hover:text-brand transition-colors">预约服务</Link>
          <Link href="/join" className="text-dark font-medium hover:text-brand transition-colors">护理员入驻</Link>
          <Link href="/training" className="text-dark font-medium hover:text-brand transition-colors">培训报名</Link>
          <Link href="/auth" className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand/20 text-brand font-bold hover:bg-brand/5 transition-all">
            <User size={18} />
            登录
          </Link>
        </div>

        {/* Mobile Menu Icon (Placeholder for now) */}
        <div className="md:hidden">
          <Link href="/auth" className="p-2 text-brand">
            <User size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
