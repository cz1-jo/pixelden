"use client";

import { useState, useEffect, useRef } from "react";

function ShippingBanner() {
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

    const lines = [
      { color: "rgba(0, 255, 255, 0.4)", speed: 0.8, amp: 40, yOff: 0.3, width: 2.5 },
      { color: "rgba(0, 255, 255, 0.2)", speed: 0.6, amp: 55, yOff: 0.35, width: 1.5 },
      { color: "rgba(168, 85, 247, 0.4)", speed: 0.7, amp: 45, yOff: 0.5, width: 2.5 },
      { color: "rgba(168, 85, 247, 0.2)", speed: 0.5, amp: 60, yOff: 0.55, width: 1.5 },
      { color: "rgba(236, 72, 153, 0.35)", speed: 0.9, amp: 35, yOff: 0.7, width: 2.5 },
      { color: "rgba(236, 72, 153, 0.15)", speed: 0.65, amp: 50, yOff: 0.75, width: 1.5 },
      { color: "rgba(0, 255, 255, 0.1)", speed: 0.4, amp: 70, yOff: 0.2, width: 1 },
      { color: "rgba(168, 85, 247, 0.1)", speed: 0.35, amp: 75, yOff: 0.45, width: 1 },
      { color: "rgba(236, 72, 153, 0.1)", speed: 0.45, amp: 65, yOff: 0.8, width: 1 },
    ];

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      for (const line of lines) {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;

        const baseY = h * line.yOff;

        for (let x = 0; x <= w; x += 2) {
          const normalX = x / w;
          const y =
            baseY +
            Math.sin(normalX * 4 + time * line.speed) * line.amp +
            Math.sin(normalX * 2.5 - time * line.speed * 0.7) * line.amp * 0.5 +
            Math.cos(normalX * 6 + time * line.speed * 1.3) * line.amp * 0.25;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Horizontal glow ribbons
      for (const line of lines) {
        if (line.width < 2) continue;
        ctx.beginPath();
        ctx.strokeStyle = line.color.replace(/[\d.]+\)$/, "0.08)");
        ctx.lineWidth = line.width * 8;

        const baseY = h * line.yOff;
        for (let x = 0; x <= w; x += 4) {
          const normalX = x / w;
          const y =
            baseY +
            Math.sin(normalX * 4 + time * line.speed) * line.amp +
            Math.sin(normalX * 2.5 - time * line.speed * 0.7) * line.amp * 0.5 +
            Math.cos(normalX * 6 + time * line.speed * 1.3) * line.amp * 0.25;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.012;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden bg-dark-base -mt-12 mb-12">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Gradient overlays for fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-base/60 via-transparent to-dark-base" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-base/40 via-transparent to-dark-base/40" />
      {/* Title overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Shipping
          </span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">Fast. Reliable. Worldwide.</p>
      </div>
    </div>
  );
}

const tiers = [
  {
    name: "Standard",
    eta: "5–7 business days",
    price: "Free",
    note: "on orders R900+",
    sub: "Otherwise R89.99",
    color: "neon-cyan",
    border: "border-neon-cyan/30",
    glow: "neon-glow-cyan",
  },
  {
    name: "Express",
    eta: "2–3 business days",
    price: "R179.99",
    color: "neon-purple",
    border: "border-neon-purple/30",
    glow: "neon-glow-purple",
  },
  {
    name: "Overnight",
    eta: "1 business day",
    price: "R359.99",
    color: "neon-pink",
    border: "border-neon-pink/30",
    glow: "neon-glow-pink",
  },
] as const;

export default function ShippingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <ShippingBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

      {/* Shipping Rates */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {tiers.map((tier) => {
          const isSelected = selected === tier.name;
          return (
            <button
              key={tier.name}
              onClick={() => setSelected(isSelected ? null : tier.name)}
              className={`text-left bg-dark-card rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? `border ${tier.border} ${tier.glow} scale-[1.02]`
                  : "border border-white/5 hover:border-white/20 hover:scale-[1.01]"
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{tier.eta}</p>
              <p className={`text-2xl font-bold text-${tier.color}`}>{tier.price}</p>
              {"note" in tier && (
                <p className="text-sm text-gray-400 mt-1">{tier.note}</p>
              )}
              {"sub" in tier && (
                <p className="text-sm text-gray-500 mt-1">{tier.sub}</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Where We Ship</h3>
          <p className="text-gray-400 text-sm">
            We ship to all 50 US states and territories. International shipping
            is available to select countries — shipping rates and delivery times
            vary by destination.
          </p>
        </div>

        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Order Processing</h3>
          <p className="text-gray-400 text-sm">
            Orders are processed within 1–2 business days. Orders placed on
            weekends or holidays will be processed the next business day.
          </p>
        </div>

        <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tracking Your Order</h3>
          <p className="text-gray-400 text-sm">
            Once your order ships, you&apos;ll receive an email with a tracking
            number and link so you can follow your package every step of the way.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          {
            q: "Can I change my shipping method after placing an order?",
            a: "If your order hasn't been processed yet, contact us and we'll do our best to update it. Once an order is shipped, the shipping method cannot be changed.",
          },
          {
            q: "Do you ship to PO boxes?",
            a: "Yes! Standard shipping is available to PO boxes within the US. Express and Overnight shipping require a physical street address.",
          },
          {
            q: "What happens if my package is lost or damaged?",
            a: "Reach out to our support team and we'll work with the carrier to locate your package or send a replacement at no extra cost.",
          },
          {
            q: "Are there any items that can't be shipped internationally?",
            a: "Some items may have shipping restrictions based on the destination country. You'll be notified at checkout if an item in your cart can't be shipped to your address.",
          },
        ].map((faq) => (
          <div
            key={faq.q}
            className="bg-dark-card border border-white/5 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
            <p className="text-gray-400 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
