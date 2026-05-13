import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark pt-16 pb-8 px-4 md:px-8 text-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span className="text-xl font-black text-white tracking-tighter font-serif">乐养E居</span>
            <p className="text-sm text-white/40 leading-relaxed mt-3 max-w-xs">
              致力于成为社区养老服务的领航者，为每一个家庭带去贴心与温度。
            </p>
            <div className="flex gap-2 mt-5">
              <span className="px-3 py-1.5 bg-white/8 border border-white/10 text-white/60 text-xs rounded-lg font-medium">📱 小程序</span>
              <span className="px-3 py-1.5 bg-white/8 border border-white/10 text-white/60 text-xs rounded-lg font-medium">📲 公众号</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">服务项目</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/order" className="text-white/40 hover:text-brand transition-colors text-sm">预约服务</Link></li>
              <li><Link href="/training" className="text-white/40 hover:text-brand transition-colors text-sm">培训报名</Link></li>
              <li><Link href="/join" className="text-white/40 hover:text-brand transition-colors text-sm">护理员入驻</Link></li>
              <li><Link href="/profile" className="text-white/40 hover:text-brand transition-colors text-sm">个人中心</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">关于我们</h4>
            <ul className="flex flex-col gap-2.5">
              <li><span className="text-white/40 text-sm">关于乐养E居</span></li>
              <li><span className="text-white/40 text-sm">服务协议</span></li>
              <li><span className="text-white/40 text-sm">隐私政策</span></li>
              <li><span className="text-white/40 text-sm">加入我们</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">联系我们</h4>
            <ul className="flex flex-col gap-2.5">
              <li className="text-white/40 text-sm">客服热线：400-888-9999</li>
              <li className="text-white/40 text-sm">服务时间：8:00 - 20:00</li>
              <li className="text-white/40 text-sm">企业邮箱：contact@leyang.com</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {['实名认证', '健康体检', '专业培训', '售后无忧'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 text-white/40 text-xs font-medium rounded-lg border border-white/8">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-xs text-white/30">© 2026 乐养E居 版权所有</span>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>京ICP备2025123456号-1</span>
            <Link href="/admin" className="text-white/15 hover:text-brand transition-colors font-medium">
              管理后台
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
