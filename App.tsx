
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Phone, Mail, MapPin, ChevronRight, Star } from 'lucide-react';
import { NAV_LINKS, SERVICES, GALLERY_IMAGES } from './constants';
import { ServiceCard } from './components/ServiceCard';
import { Gallery } from './components/Gallery';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`text-3xl font-serif font-bold ${scrolled ? 'text-rose-600' : 'text-white drop-shadow-lg'}`}>Adelyne</span>
            <span className={`text-xs uppercase tracking-widest ${scrolled ? 'text-gray-500' : 'text-white opacity-80'}`}>Events</span>
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
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95">
              Book Now
            </button>
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
              <button className="bg-rose-500 text-white px-6 py-3 rounded-lg font-semibold mt-2">
                Get a Quote
              </button>
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
            className="w-full h-full object-cover scale-110 animate-pulse-slow"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 text-rose-100 text-sm font-semibold mb-6 animate-bounce">
            Premium Event Planning
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
            Crafting Your <br /> 
            <span className="text-rose-400 font-cursive italic">Dream Moments</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            From fairytale weddings and cultural Ruracios to joyful baby showers. We bring vibrancy, color, and elegance to every celebration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              Start Planning <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
              View Portfolio
            </button>
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

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-rose-600 font-cursive text-3xl mb-4">Our Portfolio</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">A Glimpse of Magic</h3>
              <p className="text-gray-600">Explore the vibrant colors and elegant details of the many weddings, Ruracios, and parties we have curated.</p>
            </div>
            <button className="text-rose-600 font-semibold flex items-center gap-2 group">
              View All Photos <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <Gallery images={GALLERY_IMAGES} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "Adelyne Events made our wedding day look like a fairytale. Every flower, every table setting was perfect beyond our imagination. Highly recommended!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-200" />
                  <div>
                    <div className="font-bold text-gray-900">Sarah & James</div>
                    <div className="text-xs text-gray-500">Wedding Clients</div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 text-gray-100 text-6xl font-serif">"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 gradient-bg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-rose-600 p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
              <p className="text-rose-100 mb-12 text-lg">
                Ready to plan your next big celebration? Fill out the form and our team will reach out within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase opacity-70">Call Us</p>
                    <p className="font-semibold">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase opacity-70">Email Us</p>
                    <p className="font-semibold">hello@adelyneevents.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase opacity-70">Visit Us</p>
                    <p className="font-semibold">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="md:w-1/2 p-12 bg-white">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all appearance-none bg-white">
                    <option>Wedding</option>
                    <option>Baby Shower</option>
                    <option>Ruracio</option>
                    <option>Graduation</option>
                    <option>Birthday Party</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="Tell us about your event..."></textarea>
                </div>
                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all active:scale-95">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-serif font-bold text-rose-500">Adelyne</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Creating vibrant, colorful, and unforgettable experiences for life's most precious milestones.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.label}><a href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Our Events</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Weddings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Traditional Ruracios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Baby Showers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Graduations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">Subscribe to get event inspiration and tips.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-rose-500" />
                <button className="bg-rose-600 p-2 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Adelyne Events. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
