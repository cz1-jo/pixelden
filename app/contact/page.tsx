"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Get in{" "}
        <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Touch
        </span>
      </h1>
      <p className="text-gray-400 mb-12">
        Questions, feedback, or just want to say hi? We&apos;d love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="bg-dark-card border border-neon-purple/30 rounded-2xl p-8 text-center neon-glow-purple">
              <div className="text-4xl mb-4">&#x2713;</div>
              <h2 className="text-xl font-bold text-white mb-2">Message Sent!</h2>
              <p className="text-gray-400">We&apos;ll get back to you as soon as possible.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-neon-cyan hover:text-neon-purple transition-colors text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Subject</label>
                <select className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Returns & Refunds</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold py-3 rounded-lg transition-all duration-200 neon-glow-purple"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neon-cyan mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-gray-200">support@pixelden.gg</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neon-pink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-gray-200">Cape Town, South Africa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neon-purple mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-400">Response Time</p>
                  <p className="text-gray-200">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Join the Community</h3>
            <p className="text-gray-400 text-sm mb-4">
              Connect with fellow gamers on our Discord for the latest drops and exclusive deals.
            </p>
            <button className="border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 font-semibold py-2 px-6 rounded-lg transition-all duration-200">
              Join Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
