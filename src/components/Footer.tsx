import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand/10 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-black text-brand tracking-tighter">乐养E居</span>
          <p className="text-dark/60 font-medium max-w-xs">
            致力于成为社区养老服务的领航者，为每一个家庭带去贴心与温度。
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-black text-dark">联系我们</h4>
          <div className="text-dark/60 font-medium space-y-2">
            <p>客服热线：400-888-9999</p>
            <p>服务时间：8:00 - 20:00</p>
            <p>企业邮箱：contact@leyang.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-black text-dark">服务承诺</h4>
          <div className="flex flex-wrap gap-2">
            {['实名认证', '健康体检', '专业培训', '售后无忧'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-brand/5 text-brand text-xs font-bold rounded-lg border border-brand/10">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs text-dark/30 leading-loose">
              © 2026 乐养E居 版权所有<br/>
              京ICP备2025123456号-1
            </p>
            <Link href="/admin" className="text-[10px] text-dark/10 hover:text-brand font-bold transition-colors">
              管理后台
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
