import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Mail, ChevronRight, MessageCircle, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SERVICES, GALLERY_IMAGES, TESTIMONIALS, FAQS } from './constants';
import { ServiceCard } from './components/ServiceCard';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { BudgetEstimator } from './components/BudgetEstimator';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { InquiryWizard } from './components/InquiryWizard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { GalleryImage } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const API_BASE_URL = 'http://localhost:8000/api';

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery`);
      if (res.ok) {
        const data = await res.json();
        setGalleryImages(data);
      }
    } catch (e) {
      console.error("Failed fetching gallery from Laravel backend:", e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUpdateGallery = (newImages: GalleryImage[]) => {
    setGalleryImages(newImages);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Early return if Admin is logged in to view dashboard exclusively
  if (isAdminLoggedIn) {
    return (
      <AdminDashboard
        galleryImages={galleryImages}
        onUpdateGallery={handleUpdateGallery}
        onLogout={() => setIsAdminLoggedIn(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254710739550?text=Hi%20Adelyne!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2"
        aria-label="Chat on WhatsApp"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold px-0 group-hover:px-2">Chat with us</span>
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Adelyne Events"
              className={`h-12 md:h-16 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:text-rose-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white drop-shadow-sm'}`}
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-4 border-l pl-8 border-gray-200/20">
              <a href="#" className={`hover:text-rose-400 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`} aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/254710739550?text=Hi%20Adelyne!" className={`hover:text-green-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`} aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <a href="#contact" className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95">
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className={scrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-800 text-lg font-medium border-b border-gray-100 pb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-6 py-4">
                <a href="#" className="flex items-center gap-2 text-rose-600 font-bold">
                  <Instagram className="w-6 h-6" /> Instagram
                </a>
                <a href="https://wa.me/254710739550?text=Hi%20Adelyne!" className="flex items-center gap-2 text-green-600 font-bold">
                  <MessageCircle className="w-6 h-6" /> WhatsApp
                </a>
              </div>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-rose-500 text-white text-center px-6 py-3 rounded-lg font-semibold mt-2">
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 text-rose-100 text-sm font-semibold mb-6 animate-bounce">
            Premium Event Planning
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-rose-400 font-cursive italic">...mapping</span> memories
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            From fairytale weddings and cultural traditional weddings to joyful baby showers. We bring vibrancy, color, and elegance to every celebration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              Start Planning <ChevronRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/254710739550?text=Hi%20Adelyne!" className="bg-[#25D366] hover:bg-[#1fb355] text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl flex items-center gap-2">
              WhatsApp Us <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="bg-rose-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-1">500+</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Events Held</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-1">10+</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Years Exp</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-1">100%</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Joy Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-1">1k+</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Services Section */}
      <section id="services" className="py-24 gradient-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-rose-600 font-cursive text-3xl mb-4">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What We Plan Best</h3>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Estimator Section */}
      <BudgetEstimator />

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-rose-600 font-cursive text-3xl mb-4">Our Portfolio</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">A Glimpse of Magic</h3>
              <p className="text-gray-600">Explore the vibrant colors and elegant details of the many weddings, traditional weddings, and parties we have curated.</p>
            </div>
            <a href="#" className="bg-rose-100 text-rose-600 px-6 py-2 rounded-full font-bold flex items-center gap-2 group hover:bg-rose-600 hover:text-white transition-all">
              Follow on Instagram <Instagram className="w-4 h-4" />
            </a>
          </div>
          <Gallery images={galleryImages} />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials testimonials={TESTIMONIALS} />

      {/* FAQ Section */}
      <FAQ faqs={FAQS} />

      {/* Contact Section */}
      <section id="contact" className="py-24 gradient-bg relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Contact Details Panel */}
            <div className="md:w-1/2 bg-rose-600 p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-8 font-serif">Get in Touch</h3>
                <p className="text-rose-100 mb-12 text-lg">
                  Ready to plan your next big celebration? Fill out the step-by-step form or chat with us directly.
                </p>

                <div className="space-y-6">
                  <a href="https://wa.me/254710739550?text=Hi%20Adelyne!" className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 fill-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase opacity-70 font-semibold">WhatsApp Us</p>
                      <p className="font-bold text-xl">+254 710 739 550</p>
                    </div>
                    <ArrowUpRight className="ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a href="#" className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase opacity-70 font-semibold">Follow Instagram</p>
                      <p className="font-bold text-xl">@AdelyneEvents</p>
                    </div>
                    <ArrowUpRight className="ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <div className="flex items-center gap-4 p-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase opacity-70 font-semibold">Email Us</p>
                      <p className="font-bold text-xl">hello@adelyneevents.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Multi-Step Contact Wizard Panel */}
            <div className="md:w-1/2 p-4 md:p-8 bg-gray-50/30 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
              <InquiryWizard />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <img src="/logo.png" alt="Adelyne Events" className="h-16 w-auto brightness-0 invert" />
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Creating vibrant, colorful, and unforgettable experiences for life's most precious milestones.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-purple-500/20" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://wa.me/254710739550?text=Hi%20Adelyne!" className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-green-500/20" aria-label="WhatsApp">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20" aria-label="Facebook">
                  <Facebook className="w-6 h-6 fill-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.label}><a href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.label}</a></li>
                ))}
                <li>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-rose-400 hover:text-rose-300 font-semibold text-sm transition-colors text-left"
                  >
                    🔐 Admin Portal
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Our Events</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Weddings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Traditional weddings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Baby Showers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Graduations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">Subscribe to get event inspiration and tips.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-rose-500 outline-none" />
                <button className="bg-rose-600 p-2 rounded-lg hover:bg-rose-500 transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Adelyne Events. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal Overlay */}
      <AdminLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => setIsAdminLoggedIn(true)}
      />
    </div>
  );
};

export default App;
