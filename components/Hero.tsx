"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ---------- animated grid background ---------- */
function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const gridSize = 50;
      const perspective = 0.6;

      // Horizontal lines with perspective warp
      for (let y = 0; y < h + gridSize; y += gridSize) {
        const warp = Math.sin((y / h) * Math.PI + time * 0.3) * 8;
        const alpha = 0.04 + Math.sin((y / h) * Math.PI) * 0.03;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= w; x += 4) {
          const yy = y + warp + Math.sin(x / 200 + time * 0.5) * 3 * perspective;
          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < w + gridSize; x += gridSize) {
        const alpha = 0.03 + Math.sin((x / w) * Math.PI) * 0.02;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.lineWidth = 0.5;
        for (let y = 0; y <= h; y += 4) {
          const xx = x + Math.sin(y / 150 + time * 0.4) * 4;
          if (y === 0) ctx.moveTo(xx, y);
          else ctx.lineTo(xx, y);
        }
        ctx.stroke();
      }

      // Floating glow orbs
      const orbs = [
        { cx: w * 0.15, cy: h * 0.4, r: 120, color: "139, 92, 246" },
        { cx: w * 0.85, cy: h * 0.5, r: 100, color: "34, 211, 238" },
        { cx: w * 0.5, cy: h * 0.3, r: 80, color: "244, 114, 182" },
      ];
      for (const orb of orbs) {
        const ox = orb.cx + Math.sin(time * 0.3 + orb.r) * 20;
        const oy = orb.cy + Math.cos(time * 0.25 + orb.r) * 15;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        grad.addColorStop(0, `rgba(${orb.color}, 0.12)`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(ox - orb.r, oy - orb.r, orb.r * 2, orb.r * 2);
      }

      time += 0.015;
      animationId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ---------- SVG gamer illustrations ---------- */

function ControllerSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className}>
      {/* Controller body */}
      <path
        d="M40 60 C40 35 70 25 100 25 C130 25 160 35 160 60 L165 110 C165 135 145 150 130 145 C115 140 110 120 100 120 C90 120 85 140 70 145 C55 150 35 135 35 110 Z"
        fill="url(#ctrl-grad)" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5"
      />
      {/* D-pad */}
      <rect x="55" y="58" width="8" height="24" rx="2" fill="rgba(139,92,246,0.6)" />
      <rect x="47" y="66" width="24" height="8" rx="2" fill="rgba(139,92,246,0.6)" />
      {/* Buttons */}
      <circle cx="135" cy="60" r="5" fill="rgba(34,211,238,0.6)" />
      <circle cx="147" cy="72" r="5" fill="rgba(244,114,182,0.6)" />
      <circle cx="123" cy="72" r="5" fill="rgba(139,92,246,0.6)" />
      <circle cx="135" cy="84" r="5" fill="rgba(34,211,238,0.4)" />
      {/* Sticks */}
      <circle cx="75" cy="95" r="10" fill="rgba(255,255,255,0.05)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
      <circle cx="120" cy="95" r="10" fill="rgba(255,255,255,0.05)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
      {/* Center glow */}
      <circle cx="100" cy="55" r="6" fill="rgba(139,92,246,0.3)">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <defs>
        <linearGradient id="ctrl-grad" x1="35" y1="25" x2="165" y2="150">
          <stop offset="0%" stopColor="rgba(12,12,24,0.9)" />
          <stop offset="100%" stopColor="rgba(20,12,40,0.9)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeadsetSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" className={className}>
      {/* Headband */}
      <path
        d="M35 100 C35 50 55 25 90 25 C125 25 145 50 145 100"
        stroke="rgba(34,211,238,0.5)" strokeWidth="4" strokeLinecap="round" fill="none"
      />
      {/* Left ear */}
      <rect x="22" y="85" width="26" height="45" rx="10" fill="url(#ear-grad-l)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
      <rect x="28" y="92" width="14" height="6" rx="3" fill="rgba(34,211,238,0.3)">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
      </rect>
      {/* Right ear */}
      <rect x="132" y="85" width="26" height="45" rx="10" fill="url(#ear-grad-r)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
      <rect x="138" y="92" width="14" height="6" rx="3" fill="rgba(139,92,246,0.3)">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite" />
      </rect>
      {/* Mic arm */}
      <path d="M22 115 C10 115 5 125 8 140 L12 155" stroke="rgba(244,114,182,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="157" r="4" fill="rgba(244,114,182,0.3)">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <defs>
        <linearGradient id="ear-grad-l" x1="22" y1="85" x2="48" y2="130">
          <stop offset="0%" stopColor="rgba(12,12,24,0.9)" />
          <stop offset="100%" stopColor="rgba(10,20,30,0.9)" />
        </linearGradient>
        <linearGradient id="ear-grad-r" x1="132" y1="85" x2="158" y2="130">
          <stop offset="0%" stopColor="rgba(12,12,24,0.9)" />
          <stop offset="100%" stopColor="rgba(20,10,30,0.9)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- parallax hero ---------- */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = -rect.top;
      const factor = Math.max(0, Math.min(scrollY / 600, 1));

      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
        textRef.current.style.opacity = `${1 - factor * 0.6}`;
      }
      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${scrollY * 0.15}px) translateX(${-scrollY * 0.05}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${scrollY * 0.1}px) translateX(${scrollY * 0.05}px)`;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated grid bg */}
      <GridCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-base/40 via-transparent to-dark-base" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-base/60 via-transparent to-dark-base/60" />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Left illustration — controller */}
      <div
        ref={leftRef}
        className="absolute left-[2%] lg:left-[5%] top-1/2 -translate-y-1/2 w-[280px] lg:w-[340px] opacity-60 hidden md:block will-change-transform"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-neon-purple/10 rounded-full scale-75" />
          <ControllerSVG className="w-full h-auto drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
          {/* Floating badges */}
          <div className="absolute -top-4 right-4 px-3 py-1.5 bg-dark-card/80 backdrop-blur border border-neon-purple/20 rounded-full text-xs text-neon-purple font-semibold animate-bounce" style={{ animationDuration: "3s" }}>
            PS5
          </div>
          <div className="absolute bottom-8 -left-2 px-3 py-1.5 bg-dark-card/80 backdrop-blur border border-neon-cyan/20 rounded-full text-xs text-neon-cyan font-semibold animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
            Xbox
          </div>
        </div>
      </div>

      {/* Right illustration — headset */}
      <div
        ref={rightRef}
        className="absolute right-[2%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[260px] lg:w-[320px] opacity-60 hidden md:block will-change-transform"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-neon-cyan/10 rounded-full scale-75" />
          <HeadsetSVG className="w-full h-auto drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]" />
          {/* Floating badges */}
          <div className="absolute -top-4 left-4 px-3 py-1.5 bg-dark-card/80 backdrop-blur border border-neon-pink/20 rounded-full text-xs text-neon-pink font-semibold animate-bounce" style={{ animationDuration: "2.8s" }}>
            7.1 Surround
          </div>
          <div className="absolute bottom-8 -right-2 px-3 py-1.5 bg-dark-card/80 backdrop-blur border border-neon-purple/20 rounded-full text-xs text-neon-purple font-semibold animate-bounce" style={{ animationDuration: "3.2s", animationDelay: "0.3s" }}>
            Pro Audio
          </div>
        </div>
      </div>

      {/* Center text */}
      <div ref={textRef} className="relative z-10 w-full will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan/80 mb-6 px-4 py-1.5 rounded-full border border-neon-cyan/15 bg-neon-cyan/5">
              Welcome to PixelDen
            </span>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                Level Up Your
              </span>
              <span className="block mt-2 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(139,92,246,0.4)]">
                Gaming Experience
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Discover the latest games, premium apparel, and pro-grade accessories.
              Everything a gamer needs, all in one place.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games"
                className="group inline-flex items-center justify-center px-8 py-4 bg-neon-purple hover:bg-neon-purple/80 text-white font-bold rounded-xl transition-all duration-300 neon-glow-purple hover:scale-105"
              >
                Browse Games
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/trading"
                className="group inline-flex items-center justify-center px-8 py-4 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:border-neon-cyan/60"
              >
                Trade Games
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Free Shipping R900+</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                <span>15K+ Games Traded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
