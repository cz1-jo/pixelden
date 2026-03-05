"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Orders & Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, and instant EFT. All prices are displayed in South African Rand (ZAR).",
      },
      {
        q: "Can I cancel or modify my order?",
        a: "You can cancel or modify your order within 1 hour of placing it. After that, the order enters processing and changes may not be possible. Contact our support team for assistance.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also view your order status on your Profile page under Order History.",
      },
      {
        q: "Are digital game codes region-locked?",
        a: "Most digital codes we sell are for the South African or EMEA region. Each product page specifies the applicable region. If you're unsure, contact us before purchasing.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How much does shipping cost?",
        a: "We offer free standard shipping on all orders within South Africa. Express shipping is available at checkout for an additional fee.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3–5 business days within major metros and 5–7 business days to other areas. Express delivery arrives within 1–2 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we only ship physical products within South Africa. Digital game codes can be purchased from anywhere, subject to regional compatibility.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "Physical products can be returned within 30 days of delivery in their original, unopened condition. Digital codes are non-refundable once redeemed.",
      },
      {
        q: "How do I initiate a return?",
        a: "Visit your Profile page, find the order, and contact our support team with your order ID. We'll provide a prepaid return label for eligible items.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive your returned item, refunds are processed within 5–7 business days. The refund will appear on your original payment method.",
      },
    ],
  },
  {
    category: "Account & Profile",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign In' in the navigation bar or proceed to checkout. You can sign up with your email or continue with Google for a quick setup.",
      },
      {
        q: "How do I view my order history?",
        a: "Once signed in, click your avatar in the top navigation and select 'Profile'. Your complete order history with status tracking is displayed there.",
      },
      {
        q: "Can I change my account details?",
        a: "Currently, account details are set at sign-up. To update your information, sign out and create a new account with the updated details.",
      },
    ],
  },
  {
    category: "Products & Availability",
    questions: [
      {
        q: "Are all listed games in stock?",
        a: "Physical copies are subject to stock availability. Digital codes are available instantly. If an item is out of stock, you'll see a notification on the product page.",
      },
      {
        q: "Do you sell pre-owned games?",
        a: "Yes! Check out our Trading section for pre-owned games at discounted prices. You can also trade in your own games for store credit.",
      },
      {
        q: "Do you price match?",
        a: "We offer competitive pricing and regular sales. While we don't formally price match, feel free to reach out if you find a better deal — we'll see what we can do.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  function toggle(key: string) {
    setOpenItem(openItem === key ? null : key);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Frequently Asked{" "}
        <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Questions
        </span>
      </h1>
      <p className="text-gray-400 mb-10">
        Everything you need to know about shopping at PixelDen.
      </p>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-semibold text-white mb-3">{section.category}</h2>
            <div className="space-y-2">
              {section.questions.map((item) => {
                const key = `${section.category}-${item.q}`;
                const isOpen = openItem === key;
                return (
                  <div
                    key={key}
                    className="bg-dark-card border border-white/5 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-200 pr-4">{item.q}</span>
                      <svg
                        className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-dark-card border border-white/5 rounded-2xl p-8 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
        <p className="text-gray-400 mb-4 text-sm">Our team is happy to help.</p>
        <a
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all neon-glow-purple"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
