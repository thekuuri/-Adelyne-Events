
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamically get the icon from Lucide
  const IconComponent = (LucideIcons as any)[service.icon];

  return (
    <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
      {/* Decorative background element */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
      
      <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm`}>
        {IconComponent && <IconComponent className="w-8 h-8" />}
      </div>
      
      <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">
        {service.title}
      </h4>
      <p className="text-gray-600 leading-relaxed mb-6">
        {service.description}
      </p>
      
      <button className="text-sm font-bold text-rose-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Explore more <LucideIcons.ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
