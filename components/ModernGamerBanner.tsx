"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number }[] = [];
    const colors = ["0, 255, 255", "168, 85, 247", "236, 72, 153"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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

export default function ModernGamerBanner() {
  return (
    <section className="relative overflow-hidden my-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-dark-card border border-white/5">
          {/* Animated background */}
          <div className="absolute inset-0">
            <ParticleCanvas />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-transparent to-dark-card" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-card/80 via-transparent to-dark-card/80" />
          </div>

          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center px-8 md:px-16 py-16 md:py-20">
            {/* Left: text */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-4 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5">
                The Modern Gamer
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                <span className="text-white">Play Harder.</span>
                <br />
                <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
                  Trade Smarter.
                </span>
              </h2>
              <p className="mt-6 text-gray-400 text-lg max-w-md leading-relaxed">
                Buy the latest releases, trade what you&apos;ve finished, and keep
                your library fresh — all without breaking the bank.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/games"
                  className="inline-flex items-center px-6 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all duration-200 neon-glow-purple"
                >
                  Browse Games
                </Link>
                <Link
                  href="/trading"
                  className="inline-flex items-center px-6 py-3 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 font-semibold rounded-lg transition-all duration-200"
                >
                  View Trade Values
                </Link>
              </div>
            </div>

            {/* Right: stats showcase */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-neon-purple/20 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-neon-cyan">15K+</p>
                <p className="text-sm text-gray-400 mt-1">Games Traded</p>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-neon-purple/20 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-neon-purple">$2M+</p>
                <p className="text-sm text-gray-400 mt-1">Saved by Gamers</p>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-neon-purple/20 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-neon-pink">50+</p>
                <p className="text-sm text-gray-400 mt-1">New Titles Weekly</p>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-neon-purple/20 transition-colors">
                <p className="text-3xl md:text-4xl font-black text-white">4.9</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                  <span className="text-sm text-gray-400">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
