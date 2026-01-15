
import React from 'react';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((image, idx) => (
        <div 
          key={image.id} 
          className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer ${
            idx % 3 === 0 ? 'md:row-span-2' : ''
          }`}
        >
          <img 
            src={image.url} 
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {image.category}
            </span>
            <h4 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {image.title}
            </h4>
          </div>
          
          {/* Overlay for "View" icon or something similar */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
