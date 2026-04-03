"use client";

import { useState, useEffect } from "react";
import { PhoneCall, AlertTriangle, X, ShieldAlert } from "lucide-react";

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "confirming" | "calling" | "active">("idle");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "calling" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (status === "calling" && countdown === 0) {
      setStatus("active");
    }
    return () => clearTimeout(timer);
  }, [status, countdown]);

  const handleTrigger = () => {
    setStatus("confirming");
    setIsOpen(true);
  };

  const startCall = () => {
    setStatus("calling");
    setCountdown(5);
  };

  const cancel = () => {
    setStatus("idle");
    setIsOpen(false);
    setCountdown(5);
  };

  return (
    <>
      {/* Floating SOS Button */}
      <button
        onClick={handleTrigger}
        className="fixed bottom-24 right-6 z-[100] w-16 h-16 bg-red-600 text-white rounded-full flex flex-col items-center justify-center shadow-2xl shadow-red-500/40 hover:scale-110 active:scale-95 transition-all animate-pulse border-4 border-white"
      >
        <PhoneCall size={24} className="mb-0.5" />
        <span className="text-[10px] font-black leading-none">SOS</span>
      </button>

      {/* SOS Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] bg-dark/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl border-4 border-red-100 flex flex-col items-center p-8 text-center animate-in zoom-in-95 duration-200">
            
            {status === "confirming" && (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 border-4 border-red-50">
                  <AlertTriangle size={40} className="animate-bounce" />
                </div>
                <h2 className="text-3xl font-black text-dark mb-4 tracking-tighter">确认发起求助？</h2>
                <p className="text-dark/60 text-lg font-bold mb-8 leading-relaxed">
                  系统将立即通知：<br/>
                  1. 您的紧急联系人<br/>
                  2. 社区服务中心<br/>
                  3. 平台 24h 应急小组
                </p>
                <div className="flex flex-col w-full gap-4">
                  <button 
                    onClick={startCall}
                    className="w-full bg-red-600 text-white py-5 rounded-2xl text-xl font-black shadow-xl shadow-red-500/30 active:scale-95 transition-all"
                  >
                    立即呼叫
                  </button>
                  <button 
                    onClick={cancel}
                    className="w-full bg-gray-100 text-dark/60 py-4 rounded-2xl text-lg font-bold"
                  >
                    不再需要 / 点错了
                  </button>
                </div>
              </>
            )}

            {status === "calling" && (
              <>
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white mb-6 relative">
                  <span className="text-4xl font-black">{countdown}</span>
                  <div className="absolute inset-0 rounded-full border-4 border-red-600 animate-ping opacity-20"></div>
                </div>
                <h2 className="text-3xl font-black text-red-600 mb-4 tracking-tighter">呼叫正在发起...</h2>
                <p className="text-dark/60 text-lg font-bold mb-8">
                  倒计时结束后将正式接通
                </p>
                <button 
                  onClick={cancel}
                  className="w-full bg-gray-100 text-dark/60 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2"
                >
                  <X size={20} /> 取消呼叫
                </button>
              </>
            )}

            {status === "active" && (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 border-4 border-green-50">
                  <ShieldAlert size={40} className="animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-dark mb-4 tracking-tighter">求助已送达</h2>
                <p className="text-dark/60 text-lg font-bold mb-8 leading-relaxed">
                  终端已锁定，请保持手机畅通<br/>
                  救援力量已在途中
                </p>
                <button 
                  onClick={cancel}
                  className="w-full bg-brand text-white py-5 rounded-2xl text-xl font-black shadow-xl shadow-brand/20 active:scale-95 transition-all"
                >
                  确定
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}
