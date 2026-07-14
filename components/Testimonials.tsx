import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const autoPlayRef = useRef<(() => void) | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    autoPlayRef.current = handleNext;
  });

  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    
    // Rotate testimonials every 6 seconds
    const interval = setInterval(play, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background visual shapes */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-rose-50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-rose-600 font-cursive text-3xl mb-4 block">Love Letters</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Client Kind Words</h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          {/* Main Card View */}
          <div className="bg-rose-50/50 rounded-3xl p-8 md:p-16 border border-rose-100/50 relative shadow-sm min-h-[320px] flex flex-col justify-between">
            {/* Quote watermark icon */}
            <div className="absolute top-6 left-6 text-rose-200/50 -z-0">
              <Quote className="w-20 h-20 fill-current opacity-20" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Star ratings */}
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed font-medium">
                "{testimonials[activeIndex].quote}"
              </p>

              {/* Client Info details */}
              <div className="flex items-center gap-4 pt-6 border-t border-rose-200/20">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-base md:text-lg">{testimonials[activeIndex].name}</h4>
                  <span className="text-rose-600 font-semibold text-xs tracking-wider uppercase block">
                    {testimonials[activeIndex].event}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav arrows outside/above wrapper */}
          <div className="flex justify-center md:justify-between items-center gap-6 mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:inset-x-0">
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-rose-50 text-gray-800 p-3 rounded-xl shadow-md border border-gray-100 hover:scale-105 active:scale-95 transition-all md:-translate-x-6"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="bg-white hover:bg-rose-50 text-gray-800 p-3 rounded-xl shadow-md border border-gray-100 hover:scale-105 active:scale-95 transition-all md:translate-x-6"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-rose-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
