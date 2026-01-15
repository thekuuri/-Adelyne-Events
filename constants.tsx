
import React from 'react';
import { Heart, Baby, GraduationCap, PartyPopper, Calendar, Cake } from 'lucide-react';
import { Service, GalleryImage, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Breathtaking ceremonies and receptions tailored to your love story.',
    icon: 'Heart',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    id: 'baby-showers',
    title: 'Baby Showers',
    description: 'Whimsical and heartwarming celebrations for your newest arrival.',
    icon: 'Baby',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'ruracio',
    title: 'Traditional Ruracio',
    description: 'Honoring heritage and culture with elegant traditional setups.',
    icon: 'Calendar',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'graduations',
    title: 'Graduations',
    description: 'Celebrating achievements with style, from balloons to banquets.',
    icon: 'GraduationCap',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'birthdays',
    title: 'Birthday Parties',
    description: 'Lively and colorful parties for all ages, made unforgettable.',
    icon: 'Cake',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'corporate',
    title: 'Events & Parties',
    description: 'From gender reveals to corporate galas, we plan it all.',
    icon: 'PartyPopper',
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', category: 'Wedding', title: 'Luxury Bouquet' },
  { id: 2, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80', category: 'Baby Shower', title: 'Outdoor Baby Shower' },
  { id: 3, url: 'https://images.unsplash.com/photo-1530103862676-fa8c9134cb81?auto=format&fit=crop&q=80', category: 'Corporate', title: 'Elegant Dining' },
  { id: 4, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', category: 'Wedding', title: 'Floral Arches' },
  { id: 5, url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80', category: 'Evening', title: 'Gala Night' },
  { id: 6, url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80', category: 'Birthday', title: 'Vibrant Celebrations' },
  { id: 7, url: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&q=80', category: 'Traditional', title: 'Cultural Heritage' },
  { id: 8, url: 'https://images.unsplash.com/photo-1513276396060-de196bc52762?auto=format&fit=crop&q=80', category: 'Baby Shower', title: 'Pink & White Decor' },
];

// Note: In a real app, we'd use the provided local photos. 
// For this demo, I'll use placeholders that resemble the user's high-quality photos.
// Actually, I should use the user's provided imagery logic as much as possible.
// Since I can't "see" filenames of the uploaded images in code, I will use descriptive placeholders.
