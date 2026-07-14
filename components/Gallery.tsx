import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive unique categories from images list
  const categories = React.useMemo(() => {
    const list = new Set(images.map((img) => img.category));
    return ['All', ...Array.from(list)];
  }, [images]);

  // Filter images based on selected category
  const filteredImages = React.useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  const handlePrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-start sm:justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setLightboxIndex(null);
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-rose-50/50 text-rose-700 hover:bg-rose-100 hover:text-rose-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image, idx) => (
          <div
            key={image.id}
            onClick={() => setLightboxIndex(idx)}
            className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer aspect-square bg-gray-100 border border-gray-100"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                {image.category}
              </span>
              <h4 className="text-white text-lg font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75 font-serif">
                {image.title}
              </h4>
            </div>

            {/* Click visual indicator */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-350 scale-75 group-hover:scale-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-[1010] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all active:scale-95"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 z-[1010] bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all active:scale-95"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 z-[1010] bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all active:scale-95"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Detail Content */}
          <div 
            className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
            />
            
            {/* Meta details at the bottom of modal */}
            <div className="text-center mt-2">
              <span className="text-rose-400 text-xs font-bold uppercase tracking-widest block mb-1">
                {filteredImages[lightboxIndex].category}
              </span>
              <h3 className="text-white text-xl md:text-2xl font-bold font-serif">
                {filteredImages[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
