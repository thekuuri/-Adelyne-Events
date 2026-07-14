import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  faqs: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-rose-50/50 relative overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-rose-600 font-cursive text-3xl mb-4 block">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Header Click Area */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 md:text-lg focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-rose-500' : 'text-gray-400'}`} />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-rose-500' : ''
                    }`}
                  />
                </button>

                {/* Expanding Content Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-gray-50' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-gray-600 leading-relaxed text-sm md:text-base bg-rose-50/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
