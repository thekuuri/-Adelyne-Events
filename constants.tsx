
import React from 'react';
import { Heart, Baby, GraduationCap, PartyPopper, Calendar, Cake } from 'lucide-react';
import { Service, GalleryImage, NavLink, Testimonial, FAQItem } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
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
    id: 'traditional-weddings',
    title: 'Traditional weddings',
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
  { id: 9, url: '/wedding_reception.jpg', category: 'Wedding', title: 'Grand Reception' },
  { id: 10, url: '/floral_centerpiece.jpg', category: 'Wedding', title: 'Elegant Florals' },
  { id: 11, url: '/ruracio_njeri_ted.jpg', category: 'Traditional', title: 'Njeri & Ted Traditional Wedding' },
  { id: 12, url: '/evening_reception.jpg', category: 'Wedding', title: 'Evening Ambiance' },
  { id: 13, url: '/graduation_birthday.jpg', category: 'Birthday', title: 'Celebration Arch' },
  { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', category: 'Wedding', title: 'Luxury Bouquet' },
  { id: 2, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80', category: 'Baby Shower', title: 'Outdoor Baby Shower' },
  { id: 4, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', category: 'Wedding', title: 'Floral Arches' },
  { id: 5, url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80', category: 'Evening', title: 'Gala Night' },
  { id: 6, url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80', category: 'Birthday', title: 'Vibrant Celebrations' },
  { id: 7, url: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&q=80', category: 'Traditional', title: 'Cultural Heritage' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah & John',
    event: 'Wedding Celebration',
    quote: 'Adelyne Events made our wedding absolute magic. The decor was breathtaking, and the coordination was completely stress-free! We couldn\'t have asked for a better team.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 2,
    name: 'Njeri & Ted',
    event: 'Traditional Wedding',
    quote: 'Our traditional wedding ruracio was stunning. The blending of modern elegance and cultural heritage was perfect. Adelyne and her crew are incredibly detail-oriented.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 3,
    name: 'Maria K.',
    event: 'Whimsical Baby Shower',
    quote: 'The absolute best baby shower setup! The pastel balloon arches and detailed table settings made my day incredibly special. All my guests were wowed!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 4,
    name: 'David O.',
    event: 'Graduation Gala',
    quote: 'Flawless execution! Adelyne and her team are highly professional. The lighting, seating, and overall flow was top-tier. Will definitely hire them again.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'How early should I book Adelyne Events for my celebration?',
    answer: 'We recommend booking at least 3 to 6 months in advance for major events like weddings and traditional weddings, and 4 to 8 weeks in advance for baby showers, graduation parties, and birthday celebrations. This ensures adequate time for custom planning and vendor bookings.',
  },
  {
    id: 2,
    question: 'Do you offer customizable planning packages?',
    answer: 'Yes, absolutely! We believe every celebration is unique. While we have starting package structures for weddings, traditional weddings, and showers, we fully customize our decoration, coordination, and styling services to match your vision and budget.',
  },
  {
    id: 3,
    question: 'What locations do you cover?',
    answer: 'We are based in Nairobi, Kenya, but we travel nationwide to design and coordinate events. Travel and accommodation fees may apply for events outside Nairobi.',
  },
  {
    id: 4,
    question: 'Can you coordinate with external vendors that I hire?',
    answer: 'Yes! We offer both Full Event Planning (where we handle everything) and Day-Of Coordination (where you source vendors and we manage the execution on the day). We are happy to collaborate with any vendors you have already selected.',
  },
  {
    id: 5,
    question: 'What are your payment terms?',
    answer: 'To secure your event date, we require a 50% deposit. The remaining 50% balance is payable 14 days before the event date. We accept Bank Transfers, M-Pesa, and major credit cards.',
  },
];

