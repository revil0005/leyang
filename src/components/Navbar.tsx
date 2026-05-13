'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, HeartPulse, Menu, X } from 'lucide-react';

const links = [
  { href: '/order', label: '预约服务' },
  { href: '/join', label: '护理员入驻' },
  { href: '/training', label: '培训报名' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FDFAF6]/90 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:rotate-6 transition-transform">
            <HeartPulse size={24} />
          </div>
          <span className="text-2xl font-black text-brand tracking-tighter" style={{ fontFamily: "var(--font-serif), 'Noto Serif SC', serif" }}>乐养E居</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-dark font-medium hover:text-brand transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/auth" className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand/20 text-brand font-bold hover:bg-brand/5 transition-all">
            <User size={18} />
            登录
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 text-dark hover:text-brand transition-colors"
          aria-label="打开菜单"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
            <span className="text-lg font-black text-brand tracking-tighter font-serif">乐养E居</span>
            <button
              onClick={closeMenu}
              className="p-2 text-dark/50 hover:text-dark transition-colors"
              aria-label="关闭菜单"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col p-5 gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="px-4 py-3.5 rounded-xl text-dark font-medium hover:bg-brand/5 hover:text-brand transition-all"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/auth"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 mt-4 py-3.5 rounded-2xl bg-brand text-white font-bold shadow-lg shadow-brand/20 active:scale-95 transition-all"
            >
              <User size={18} />
              登录
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
