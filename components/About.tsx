import React from 'react';
import { Award, Compass, Heart, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative floral/circle shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual Showcase Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1519225495810-7517c296517a?auto=format&fit=crop&q=80&w=800"
                alt="Adelyne Events planning team"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Small decorative absolute cards */}
            <div className="absolute -bottom-8 -right-8 z-20 bg-rose-500 text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <span className="text-3xl font-bold font-serif block mb-1">10+ Years</span>
              <p className="text-sm text-rose-100">Of creating stunning celebrations & mapping beautiful memories.</p>
            </div>

            <div className="absolute -top-6 -left-6 -z-10 w-full h-full bg-rose-100 rounded-3xl" />
          </div>

          {/* Narrative & Story Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-rose-600 font-cursive text-3xl block mb-3">About Adelyne Events</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Creating Memories That Last A Lifetime
            </h2>
            <div className="w-20 h-1 bg-rose-500 rounded-full mb-8" />
            
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              At Adelyne Events, our philosophy is simple: we believe that every major life milestone deserves to be celebrated with vibrancy, style, and unmatched sophistication. We take your dreams and map them into reality.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you are preparing for a gorgeous fairytale wedding, a rich cultural traditional wedding, a whimsical baby shower, or a lively birthday bash, we coordinate every micro-detail. From initial concept design to final styling, our goal is to deliver joy and let you live in the moment.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Bespoke Designs</h4>
                  <p className="text-sm text-gray-500">Every setup is custom-tailored to suit your personality and vision.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Stress-Free Planning</h4>
                  <p className="text-sm text-gray-500">We manage vendors and execution timelines so you don't have to.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Vendor Network</h4>
                  <p className="text-sm text-gray-500">Direct partnerships with high-tier caterers, sound, and lighting crews.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Premium Quality</h4>
                  <p className="text-sm text-gray-500">Premium materials, elegant flower choices, and crisp production value.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
