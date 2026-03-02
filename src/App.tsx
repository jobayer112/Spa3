import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ChevronDown, 
  Menu, 
  X, 
  Clock, 
  Star, 
  ChevronRight,
  Globe,
  MessageCircle
} from 'lucide-react';
import { Service, BlogPost, FAQ, Booking, Testimonial } from './types';
import { supabase } from './lib/supabase';

// --- Components ---

const TopBar = ({ settings }: { settings: any }) => (
  <div className="bg-[#1A1A1A] text-white py-2 px-4 hidden md:block border-b border-white/10">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] uppercase tracking-widest">
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-spa-accent" />
          <span>{settings.contact_address || 'RM Center, 101 Gulshan Avenue, Dhaka 1212'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={12} className="text-spa-accent" />
          <span>{settings.contact_phone || '+8801611808281'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={12} className="text-spa-accent" />
          <span>{settings.contact_email || 'info@frozenthaispa.com'}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <a href={settings.facebook_url || "#"} target="_blank" rel="noopener noreferrer">
          <Facebook size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
        <a href={settings.twitter_url || "#"} target="_blank" rel="noopener noreferrer">
          <Twitter size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
        <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer">
          <Instagram size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
        <a href={settings.linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
          <Linkedin size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
      </div>
    </div>
  </div>
);

const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <a href="/">
            <img 
              src="https://frozenthaispa.com/wp-content/uploads/2024/11/logo.webp" 
              alt="Frozen Thai Spa" 
              className="h-12 md:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-spa-dark">
          <a href="#" className="hover:text-spa-accent transition-colors">Spa in Gulshan</a>
          <a href="#about" className="hover:text-spa-accent transition-colors">About</a>
          <a href="#services" className="hover:text-spa-accent transition-colors">Services</a>
          <div className="group relative cursor-pointer flex items-center gap-1">
            <span>Pages</span>
            <ChevronDown size={14} />
            <div className="absolute top-full left-0 bg-white shadow-xl py-4 px-6 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-spa-brown">
              <a href="#services" className="block py-2 hover:text-spa-brown">Services</a>
              <a href="#pricing" className="block py-2 hover:text-spa-brown">Pricing</a>
              <a href="#faq" className="block py-2 hover:text-spa-brown">FAQ</a>
            </div>
          </div>
          <a href="#blog" className="hover:text-spa-accent transition-colors">Our Blog</a>
          <a href="#contact" className="hover:text-spa-accent transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onBookClick}
            className="hidden md:block bg-spa-brown text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-spa-dark transition-all"
          >
            Book
          </button>
          <button className="lg:hidden text-spa-dark" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
          <div className="hidden lg:block cursor-pointer">
            <Menu size={32} className="text-spa-dark" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white absolute top-full left-0 w-full shadow-xl py-8 px-4 flex flex-col gap-6 text-center uppercase tracking-widest text-sm font-medium border-t border-gray-100"
          >
            <a href="#" onClick={() => setIsOpen(false)}>Spa in Gulshan</a>
            <a href="#about" onClick={() => setIsOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#blog" onClick={() => setIsOpen(false)}>Our Blog</a>
            <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            <button onClick={() => { setIsOpen(false); onBookClick(); }} className="bg-spa-brown text-white py-4 mt-4">Book Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookClick }: { onBookClick: () => void }) => (
  <section className="relative h-[80vh] md:h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover"
        alt="Luxury Spa Experience"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-white"
      >
        <span className="text-spa-accent uppercase tracking-[0.3em] text-sm font-bold mb-6 block drop-shadow-lg">Welcome to Frozen Thai Spa</span>
        <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight drop-shadow-2xl">
          Experience <br/>
          <span className="italic text-spa-accent">Pure Bliss</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-xl drop-shadow-md">
          Indulge in a unique wellness journey at Frozen Thai Spa - Spa in Gulshan, Banani & Dhaka.
        </p>
        <div className="flex flex-wrap gap-6">
          <button onClick={onBookClick} className="btn-primary">Make Appointment</button>
          <a href="#services" className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-spa-dark transition-all">
            Our Services
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 px-4 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="https://frozenthaispa.com/wp-content/uploads/2023/07/ab-10-1.jpg" 
            className="w-full h-[400px] object-cover rounded-sm shadow-xl"
            alt="Spa Treatment"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://frozenthaispa.com/wp-content/uploads/2023/07/ab-10-2.jpg" 
            className="w-full h-[400px] object-cover rounded-sm shadow-xl mt-12"
            alt="Spa Massage"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-2xl hidden lg:block">
          <div className="text-5xl font-serif text-spa-brown font-bold">{new Date().getFullYear() - 2018}+</div>
          <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Years of<br/>Experience</div>
        </div>
      </div>
      <div>
        <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Learn About Us</span>
        <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">We Have <span className="text-spa-brown">{new Date().getFullYear() - 2018}+ Years</span> Of Experience</h2>
        
        <div className="flex gap-6 mb-8 p-6 border-l-4 border-spa-brown bg-spa-beige/30">
          <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/ab-5-2.jpg" className="w-20 h-20 object-cover rounded-sm" alt="Spa Media" />
          <p className="text-gray-600 italic">
            Spa in Gulshan is A range of different massage techniques, reflexology, body scrubs and facial are available on site which will help you unwind.
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-10">
          Escape the hustle and bustle of everyday life and step into a haven of tranquility at our luxurious spa. Located in the heart of Dhaka, we are your ultimate destination for relaxation, rejuvenation, and self-care. From traditional massages to modern wellness treatments, we provide an unmatched spa experience tailored to your needs.
        </p>
        
        <div className="flex flex-wrap gap-6">
          <a href="#contact" className="btn-primary">Appointment</a>
          <button className="flex items-center gap-3 px-8 py-4 border border-gray-200 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
            <Phone size={16} className="text-spa-brown" />
            Make A Call
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Services = ({ services }: { services: Service[] }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 px-4 bg-[#FDF8F5] relative overflow-hidden">
      {/* Decorative Flowers */}
      <div className="absolute top-0 right-0 w-64 opacity-20 pointer-events-none">
        <img src="https://picsum.photos/seed/flower1/400/400" alt="decor" className="w-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 opacity-20 pointer-events-none">
        <img src="https://picsum.photos/seed/flower2/400/400" alt="decor" className="w-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">What We Offer</span>
          <h2 className="text-5xl md:text-6xl font-serif">Our Services</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <motion.div 
              key={s.id} 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedService(s)}
              className={`p-10 text-center transition-all duration-500 group cursor-pointer ${idx === 2 ? 'bg-spa-brown text-white shadow-2xl' : 'bg-white hover:bg-spa-brown hover:text-white shadow-sm'}`}
            >
              <div className={`mb-8 flex justify-center transition-all duration-500 ${idx === 2 ? 'invert' : 'group-hover:invert'}`}>
                <img src={s.image || "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/sr-7-1.svg"} className="w-12 h-12 object-contain" alt={s.name} />
              </div>
              <h3 className="text-2xl font-serif mb-6">{s.name}</h3>
              <p className={`text-sm leading-relaxed line-clamp-3 mb-6 ${idx === 2 ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'}`}>
                {s.description}
              </p>
              <div className="flex justify-between items-center mt-auto pt-6 border-t border-current/10">
                <span className="font-bold">৳{s.price}</span>
                <span className="text-xs uppercase tracking-widest font-bold opacity-60 group-hover:opacity-100">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white max-w-2xl w-full rounded-sm overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img 
                  src={selectedService.image || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"} 
                  className="w-full h-full object-cover"
                  alt={selectedService.name}
                />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-spa-brown hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-4xl font-serif mb-2">{selectedService.name}</h2>
                    <div className="flex items-center gap-4 text-spa-accent font-bold uppercase tracking-widest text-xs">
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedService.duration}</span>
                      <span className="w-1 h-1 bg-spa-accent rounded-full" />
                      <span>Authentic Therapy</span>
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-spa-brown">৳{selectedService.price}</div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                  {selectedService.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary flex-1"
                  >
                    Book This Service
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-8 py-3 border border-gray-200 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const OfferBanner = ({ onBookClick }: { onBookClick: () => void }) => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden">
      <div className="md:w-1/2 relative h-[400px] md:h-auto">
        <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/bg-cta-3-1.jpg" className="w-full h-full object-cover" alt="Offer Background" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="md:w-1/2 bg-[#E3F2FD] p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Leaf */}
        <div className="absolute top-0 right-0 w-64 opacity-10 pointer-events-none">
          <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/banner-cta-3-1.jpg" alt="decor" className="w-full" />
        </div>
        
        <div className="relative z-10">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Frozen Spa in Gulshan Offer</span>
          <h2 className="text-5xl font-serif mb-8 leading-tight">Relax your body & <br/> get upto <span className="text-spa-brown">10% discount!</span></h2>
          <button onClick={onBookClick} className="btn-primary">Make Appointment</button>
        </div>
      </div>
    </div>
  </section>
);

const BookingSection = ({ services, settings }: { services: Service[], settings: any }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([formData]);
      
      if (!error) {
        setSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', date: '', time: '' });
      } else {
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden">
        <div className="lg:w-1/2 bg-[#FDF8F5] p-12 md:p-20">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Make Appointment</span>
          <h2 className="text-5xl font-serif mb-12">Get relax any day at any place</h2>
          
          {success ? (
            <div className="bg-green-100 text-green-800 p-6 rounded-sm mb-8">
              <h3 className="font-bold mb-2">Appointment Requested!</h3>
              <p>We will contact you shortly to confirm your booking.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-sm underline">Book another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" placeholder="First Name" required
                  className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                  value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
                <input 
                  type="text" placeholder="Last Name" required
                  className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                  value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="email" placeholder="Email Address" required
                  className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  type="tel" placeholder="Phone Number" required
                  className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <select 
                required className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown appearance-none"
                value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Select Service</option>
                {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="date" required
                  className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                  value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                />
                <select 
                  required className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown appearance-none"
                  value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}
                >
                  <option value="">Select Time</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                  <option>06:00 PM</option>
                  <option>08:00 PM</option>
                </select>
              </div>
              <button disabled={loading} type="submit" className="btn-primary w-full md:w-auto px-12">
                {loading ? 'Processing...' : 'Make Appointment'}
              </button>
            </form>
          )}
        </div>
        
        <div className="lg:w-1/2 bg-[#E3F2FD] relative p-12 md:p-20 flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/schedule-img-1-1.jpg" className="w-full h-full object-cover" alt="bg" />
          </div>
          <div className="relative z-10">
            <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Time Schedule</span>
            <h2 className="text-5xl font-serif mb-12">Opening Hours</h2>
            <div className="space-y-4 text-lg text-spa-dark/80">
              <p className="flex justify-between gap-12 border-b border-spa-dark/10 pb-2">
                <span>Mon-Fri:</span>
                <span className="font-bold">{settings.opening_hours_mon_fri || '9 AM – 10:30 PM'}</span>
              </p>
              <p className="flex justify-between gap-12 border-b border-spa-dark/10 pb-2">
                <span>Saturday:</span>
                <span className="font-bold">{settings.opening_hours_sat_sun || '10 AM – 10 PM'}</span>
              </p>
              <p className="flex justify-between gap-12 border-b border-spa-dark/10 pb-2">
                <span>Sunday:</span>
                <span className="font-bold">{settings.opening_hours_sat_sun || '10 AM – 10 PM'}</span>
              </p>
            </div>
            <div className="mt-12">
              <img src="https://picsum.photos/seed/spa-bowl/300/300" className="w-48 h-48 object-cover rounded-full border-8 border-white shadow-xl mx-auto" alt="Spa" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-spa-accent">Frozen Thai Spa - Spa in Gulshan</h2>
          <p className="text-gray-500 mt-6 max-w-4xl mx-auto leading-relaxed">
            Spa in Gulshan offers a serene escape in the heart of the city, combining luxurious treatments with a tranquil ambiance. Whether you’re seeking a soothing massage, rejuvenating facial, or holistic wellness therapies, our spa in gulshan provides the perfect setting to relax, unwind, and refresh your mind and body.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src={t.photo || "https://picsum.photos/seed/client/600/600"} 
              className="w-full aspect-square object-cover rounded-sm shadow-2xl"
              alt={t.name}
              referrerPolicy="no-referrer"
            />
            {/* Decorative Flowers */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 pointer-events-none">
              <img src="https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/leaf-1-9.png" alt="decor" className="w-full" />
            </div>
          </div>
          <div>
            <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Testimonials</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8">Client's Feedback</h2>
            
            <div className="bg-[#FDF8F5] p-12 relative shadow-sm">
              <div className="text-spa-accent mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="inline mr-1" />)}
              </div>
              <p className="text-xl italic text-gray-600 leading-relaxed mb-8">
                "{t.message}"
              </p>
              <div className="font-serif text-2xl text-spa-dark">{t.name}</div>
              <div className="text-spa-accent uppercase tracking-widest text-xs mt-1 font-bold">Client</div>
              
              <div className="absolute bottom-10 right-10 text-9xl font-serif text-spa-brown/5 pointer-events-none">”</div>
            </div>
            
            {testimonials.length > 1 && (
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
                  className="w-12 h-[2px] bg-gray-200 hover:bg-spa-brown transition-colors"
                />
                <button 
                  onClick={() => setCurrent((current + 1) % testimonials.length)}
                  className="w-12 h-[2px] bg-spa-brown"
                />
                <button 
                  onClick={() => setCurrent((current + 1) % testimonials.length)}
                  className="w-12 h-[2px] bg-gray-200 hover:bg-spa-brown transition-colors"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ services }: { services: Service[] }) => (
  <section id="pricing" className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Pricing Plan</span>
        <h2 className="text-5xl md:text-6xl font-serif">Our Packages</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {services.map((s, idx) => (
          <div key={s.id} className={`p-8 flex gap-6 items-center transition-all duration-300 border border-transparent hover:border-spa-brown/20 ${idx === 1 ? 'bg-spa-brown text-white shadow-xl' : 'bg-[#FDF8F5]'}`}>
            <div className={`w-16 h-16 shrink-0 flex items-center justify-center border border-spa-brown/20 ${idx === 1 ? 'invert' : ''}`}>
              <img src={s.image || "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-1.svg"} className="w-10 h-10" alt="icon" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-serif">{s.name}</h3>
                <div className="flex-1 border-b border-dotted border-spa-brown/30 mx-4" />
                <div className="text-lg font-bold">Only ৳{s.price}</div>
              </div>
              <p className={`text-sm line-clamp-2 ${idx === 1 ? 'text-white/80' : 'text-gray-500'}`}>
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://frozenthaispa.com/wp-content/uploads/2023/03/about-1-1.png" 
            className="w-full h-auto object-contain"
            alt="FAQ"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Why Choose Us</span>
          <h2 className="text-5xl font-serif mb-8">Featured Questions</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Choosing Frozen Thai Spa – Spa in Gulshan means opting for a sanctuary of relaxation and rejuvenation where every detail is designed to provide you with an unparalleled wellness experience. Here’s why Frozen Thai Spa – Spa in Dhaka stands out:
          </p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.id} className="border border-gray-100 rounded-sm overflow-hidden">
                <button 
                  onClick={() => setActive(active === idx ? null : idx)}
                  className="w-full p-6 flex justify-between items-center text-left font-serif text-lg hover:bg-gray-50 transition-colors"
                >
                  {faq.question}
                  <ChevronRight size={20} className={`transition-transform ${active === idx ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {active === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-4 bg-[#FDF8F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Our Blog</span>
          <h2 className="text-5xl md:text-6xl font-serif">Our News Feeds</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <div key={p.id} className="bg-white group overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={p.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={p.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <Clock size={12} className="text-spa-brown" />
                  {p.date}
                </div>
              </div>
              <div className="p-8 relative">
                <div className="absolute -top-10 left-8 right-8 bg-white p-6 shadow-lg border border-gray-50 group-hover:border-spa-brown transition-colors">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                    By {p.author}
                  </div>
                  <h3 className="text-xl font-serif mb-4 group-hover:text-spa-brown transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">{p.content}</p>
                  <button 
                    onClick={() => setSelectedPost(p)}
                    className="inline-flex items-center gap-2 text-spa-brown font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all"
                  >
                    Read More <ChevronRight size={14} />
                  </button>
                </div>
                <div className="h-40" /> {/* Spacer for absolute box */}
              </div>
            </div>
          ))}
        </div>

        {/* Blog Detail Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto rounded-sm relative"
              >
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X size={24} />
                </button>
                <img 
                  src={selectedPost.image} 
                  className="w-full h-96 object-cover"
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                />
                <div className="p-12">
                  <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-spa-accent font-bold mb-6">
                    <span>{selectedPost.date}</span>
                    <span className="w-8 h-[1px] bg-spa-accent/30" />
                    <span>By {selectedPost.author}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">{selectedPost.title}</h2>
                  <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedPost.content}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Partner Logos */}
        <div className="mt-24 pt-24 border-t border-gray-100 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          {[
            { name: 'Spa in Dhaka', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/spaindhaka-150x150.webp' },
            { name: 'Afrin Love Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Afrin-Love-150x150.webp' },
            { name: 'S Thai', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/S-Thai-150x150.webp' },
            { name: 'Afia Thai Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Afia-Thai-Spa-150x150.webp' },
            { name: 'Eternal Bliss Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Eternal-Bliss-Spa-150x150.webp' },
            { name: 'Frozen Thai Spa Massage', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Frozen-Thai-Spa-150x150.png' },
            { name: 'Desert Lily Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Desert-Lily-Spa-150x150.webp' },
            { name: 'Luxury Thai Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Luxury-Thai-Spa-150x150.webp' }
          ].map((partner, idx) => (
            <img 
              key={idx} 
              src={partner.url} 
              className="h-16 md:h-20 object-contain" 
              alt={partner.name} 
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ settings }: { settings: any }) => (
  <footer id="contact" className="bg-[#FDF8F5] pt-24 pb-12 px-4 relative overflow-hidden">
    {/* Decorative Flowers */}
    <div className="absolute bottom-0 left-0 w-64 opacity-20 pointer-events-none">
      <img src="https://picsum.photos/seed/flower3/400/400" alt="decor" className="w-full" />
    </div>
    <div className="absolute bottom-0 right-0 w-64 opacity-20 pointer-events-none">
      <img src="https://picsum.photos/seed/flower4/400/400" alt="decor" className="w-full" />
    </div>

    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <img 
              src="https://frozenthaispa.com/wp-content/uploads/2024/11/logo.webp" 
              alt="Frozen Thai Spa" 
              className="h-12 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Discover the ultimate relaxation at our Frozen Thai Spa, where traditional techniques meet modern luxury. Experience rejuvenating treatments in a serene environment.
          </p>
          <div className="flex gap-6 items-center">
            <a href={settings.facebook_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Facebook size={20} />
            </a>
            <a href={settings.twitter_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Twitter size={20} />
            </a>
            <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Instagram size={20} />
            </a>
            <a href={settings.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Linkedin size={20} />
            </a>
          </div>
          <button className="btn-primary">About Us</button>
        </div>
        
        <div>
          <h4 className="text-spa-accent font-serif text-xl mb-8 border-b border-spa-accent/20 pb-2 inline-block uppercase tracking-widest">IMPORTANT LINKS</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-bold">
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> SERVICES
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> ABOUT US
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> PRICE PLAN
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> CONTACT
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> OUR BLOG
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-spa-accent font-serif text-xl mb-8 border-b border-spa-accent/20 pb-2 inline-block invisible md:visible">.</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-bold">
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> DRY MASSAGE
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> OIL MASSAGE
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> HOT OIL MASSAGE
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> AROMA SPA
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> NURU MASSAGE
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-spa-accent font-serif text-xl mb-8 border-b border-spa-accent/20 pb-2 inline-block uppercase tracking-widest">Contact Info</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-spa-brown rounded-full flex items-center justify-center text-white shrink-0">
                <MapPin size={18} />
              </div>
              <div className="text-sm text-gray-500 font-bold">
                {settings.contact_address || 'RM Center, 101 Gulshan Avenue, Dhaka 1212'}
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-spa-brown rounded-full flex items-center justify-center text-white shrink-0">
                <Phone size={18} />
              </div>
              <div className="text-sm text-gray-500 font-bold">
                Phone No: {settings.contact_phone || '+8801611808281'}
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-spa-brown rounded-full flex items-center justify-center text-white shrink-0">
                <Mail size={18} />
              </div>
              <div className="text-sm text-gray-500 font-bold">
                Email Address:<br/>{settings.contact_email || 'info@frozenthaispa.com'}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
        <div>© {new Date().getFullYear()} Frozen Thai Spa. All Rights Reserved.</div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="text-gray-500">
            Developed By <a href="https://zobaer-portfolio.lovable.app" target="_blank" rel="noopener noreferrer" className="text-spa-brown hover:underline">Md Zobaer Hasan</a>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-spa-brown transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-spa-brown transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const FloatingBar = ({ settings }: { settings: any }) => (
  <div className="fixed bottom-0 left-0 w-full md:hidden z-50 flex h-16 shadow-2xl">
    <a 
      href={`tel:${settings.contact_phone || '8801611808281'}`} 
      className="flex-1 bg-spa-brown text-white flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
    >
      <Phone size={18} /> Call
    </a>
    <a 
      href={`https://wa.me/${settings.contact_whatsapp || '8801777909009'}?text=Hello%20Frozen%20Thai%20Spa,%20I%20want%20to%20book%20an%20appointment.`} 
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-green-600 text-white flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
    >
      <MessageCircle size={18} /> WhatsApp
    </a>
  </div>
);

// --- Admin Panel ---

const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'blog' | 'seo' | 'testimonials' | 'faq'>('bookings');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [seoSettings, setSeoSettings] = useState({
    seo_home_title: '',
    seo_home_description: '',
    seo_home_keywords: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    contact_whatsapp: '',
    opening_hours_mon_fri: '',
    opening_hours_sat_sun: ''
  });
  const [saving, setSaving] = useState(false);
  
  // Blog Form State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    image: '',
    author: 'Admin',
    date: new Date().toLocaleDateString()
  });

  // FAQ Form State
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: ''
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    duration: '',
    price: 0,
    description: '',
    image: ''
  });

  // Testimonial Form State
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    rating: 5,
    message: '',
    photo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const [
        { data: bookingsData },
        { data: servicesData },
        { data: faqData },
        { data: blogData },
        { data: testimonialsData },
        { data: settingsData }
      ] = await Promise.all([
        supabase.from('bookings').select('*').order('createdAt', { ascending: false }),
        supabase.from('services').select('*'),
        supabase.from('faq').select('*'),
        supabase.from('blog').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('settings').select('*')
      ]);

      if (bookingsData) setBookings(bookingsData);
      if (servicesData) setServices(servicesData);
      if (faqData) setFaqs(faqData);
      if (blogData) setPosts(blogData);
      if (testimonialsData) setTestimonials(testimonialsData);
      if (settingsData) {
        const settingsObj = settingsData.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
        setSeoSettings(settingsObj);
      }
    };

    fetchData();
  }, []);

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceForm)
          .eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceForm]);
        if (error) throw error;
      }
      
      const { data } = await supabase.from('services').select('*');
      if (data) setServices(data);
      setIsServiceModalOpen(false);
      setEditingService(null);
      setServiceForm({ name: '', duration: '', price: 0, description: '', image: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialForm)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialForm]);
        if (error) throw error;
      }
      
      const { data } = await supabase.from('testimonials').select('*');
      if (data) setTestimonials(data);
      setIsTestimonialModalOpen(false);
      setEditingTestimonial(null);
      setTestimonialForm({ name: '', rating: 5, message: '', photo: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (!error) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = blogForm.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      const payload = { ...blogForm, slug };
      
      if (editingPost) {
        const { error } = await supabase.from('blog').update(payload).eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog').insert([payload]);
        if (error) throw error;
      }
      
      const { data } = await supabase.from('blog').select('*');
      if (data) setPosts(data);
      setIsBlogModalOpen(false);
      setEditingPost(null);
      setBlogForm({ title: '', content: '', image: '', author: 'Admin', date: new Date().toLocaleDateString() });
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFaq) {
        const { error } = await supabase.from('faq').update(faqForm).eq('id', editingFaq.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('faq').insert([faqForm]);
        if (error) throw error;
      }
      
      const { data } = await supabase.from('faq').select('*');
      if (data) setFaqs(data);
      setIsFaqModalOpen(false);
      setEditingFaq(null);
      setFaqForm({ question: '', answer: '' });
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const deleteBlog = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('blog').delete().eq('id', id);
    if (!error) setPosts(posts.filter(p => p.id !== id));
  };

  const deleteFaq = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('faq').delete().eq('id', id);
    if (!error) setFaqs(faqs.filter(f => f.id !== id));
  };

  const openEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description,
      image: service.image
    });
    setIsServiceModalOpen(true);
  };

  const openEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      name: t.name,
      rating: t.rating,
      message: t.message,
      photo: t.photo || ''
    });
    setIsTestimonialModalOpen(true);
  };

  const handleSeoSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updates = Object.entries(seoSettings).map(([key, value]) => ({
        key,
        value
      }));
      
      const { error } = await supabase.from('settings').upsert(updates);
      if (error) throw error;
      
      alert('SEO Settings saved successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (!error) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: status as any } : b));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-spa-dark text-white p-4 md:p-8">
        <div className="flex justify-between items-center md:block mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-serif">Admin Panel</h2>
          <button onClick={onLogout} className="md:hidden text-sm bg-white/10 px-3 py-1 rounded">Logout</button>
        </div>
        <nav className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`whitespace-nowrap text-left p-3 rounded text-sm md:text-base ${activeTab === 'bookings' ? 'bg-spa-brown' : 'hover:bg-white/10'}`}
          >
            Bookings
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`whitespace-nowrap text-left p-3 rounded text-sm md:text-base ${activeTab === 'services' ? 'bg-spa-brown' : 'hover:bg-white/10'}`}
          >
            Services
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`whitespace-nowrap text-left p-3 rounded text-sm md:text-base ${activeTab === 'blog' ? 'bg-spa-brown' : 'hover:bg-white/10'}`}
          >
            Blog
          </button>
          <button 
            onClick={() => setActiveTab('faq')}
            className={`whitespace-nowrap text-left p-3 rounded text-sm md:text-base ${activeTab === 'faq' ? 'bg-spa-brown' : 'hover:bg-white/10'}`}
          >
            FAQ
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`whitespace-nowrap text-left p-3 rounded text-sm md:text-base ${activeTab === 'testimonials' ? 'bg-spa-brown' : 'hover:bg-white/10'}`}
          >
            Testimonials
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`whitespace-nowrap text-left p-3 rounded text-sm md:text-base ${activeTab === 'seo' ? 'bg-spa-brown' : 'hover:bg-white/10'}`}
          >
            Settings
          </button>
          <button onClick={onLogout} className="hidden md:block w-full text-left p-3 rounded hover:bg-red-500/20 text-red-400 mt-12">
            Logout
          </button>
        </nav>
      </aside>
      
      <main className="flex-1 p-4 md:p-12 overflow-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif capitalize">{activeTab}</h1>
          <div className="text-sm text-gray-500">Welcome, Admin</div>
        </header>

        {activeTab === 'bookings' && (
          <div className="bg-white shadow-sm rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                <tr>
                  <th className="p-4">Client</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date/Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td className="p-4">
                      <div className="font-medium">{b.firstName} {b.lastName}</div>
                      <div className="text-xs text-gray-500">{b.phone}</div>
                    </td>
                    <td className="p-4 text-sm">{b.service}</td>
                    <td className="p-4 text-sm">
                      <div>{b.date}</div>
                      <div className="text-xs text-gray-500">{b.time}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => updateStatus(b.id, 'confirmed')} className="text-xs text-green-600 hover:underline">Confirm</button>
                      <button onClick={() => updateStatus(b.id, 'cancelled')} className="text-xs text-red-600 hover:underline">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

        {activeTab === 'services' && (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => {
                  setEditingService(null);
                  setServiceForm({ name: '', duration: '', price: 0, description: '', image: '' });
                  setIsServiceModalOpen(true);
                }}
                className="btn-primary"
              >
                Add New Service
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="p-4">Service</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {services.map(s => (
                      <tr key={s.id}>
                        <td className="p-4">
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{s.description}</div>
                        </td>
                        <td className="p-4 text-sm">{s.duration}</td>
                        <td className="p-4 text-sm">৳{s.price}</td>
                        <td className="p-4 flex gap-4">
                          <button onClick={() => openEditService(s)} className="text-xs text-spa-brown hover:underline">Edit</button>
                          <button onClick={() => deleteService(s.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => {
                  setEditingTestimonial(null);
                  setTestimonialForm({ name: '', rating: 5, message: '', photo: '' });
                  setIsTestimonialModalOpen(true);
                }}
                className="btn-primary"
              >
                Add Testimonial
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="p-4">Client</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {testimonials.map(t => (
                      <tr key={t.id}>
                        <td className="p-4 font-medium">{t.name}</td>
                        <td className="p-4 text-sm">{t.rating} / 5</td>
                        <td className="p-4 text-sm line-clamp-1">{t.message}</td>
                        <td className="p-4 flex gap-4">
                          <button onClick={() => openEditTestimonial(t)} className="text-xs text-spa-brown hover:underline">Edit</button>
                          <button onClick={() => deleteTestimonial(t.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="bg-white shadow-sm rounded-sm p-8 max-w-4xl">
            <form onSubmit={handleSeoSave} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-serif border-b pb-2">SEO Settings</h3>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Homepage Meta Title</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={seoSettings.seo_home_title}
                      onChange={e => setSeoSettings({...seoSettings, seo_home_title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Homepage Meta Description</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={seoSettings.seo_home_description}
                      onChange={e => setSeoSettings({...seoSettings, seo_home_description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Homepage Keywords</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={seoSettings.seo_home_keywords}
                      onChange={e => setSeoSettings({...seoSettings, seo_home_keywords: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-serif border-b pb-2">Contact & Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Phone</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                        value={seoSettings.contact_phone}
                        onChange={e => setSeoSettings({...seoSettings, contact_phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-bold">WhatsApp</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                        value={seoSettings.contact_whatsapp}
                        onChange={e => setSeoSettings({...seoSettings, contact_whatsapp: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={seoSettings.contact_email}
                      onChange={e => setSeoSettings({...seoSettings, contact_email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Address</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={seoSettings.contact_address}
                      onChange={e => setSeoSettings({...seoSettings, contact_address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Mon-Fri Hours</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                        value={seoSettings.opening_hours_mon_fri}
                        onChange={e => setSeoSettings({...seoSettings, opening_hours_mon_fri: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Sat-Sun Hours</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                        value={seoSettings.opening_hours_sat_sun}
                        onChange={e => setSeoSettings({...seoSettings, opening_hours_sat_sun: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button disabled={saving} type="submit" className="btn-primary w-full">
                {saving ? 'Saving...' : 'Save All Settings'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => {
                  setEditingPost(null);
                  setBlogForm({ title: '', content: '', image: '', author: 'Admin', date: new Date().toLocaleDateString() });
                  setIsBlogModalOpen(true);
                }}
                className="btn-primary"
              >
                Add New Post
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {posts.map(p => (
                      <tr key={p.id}>
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4 text-sm">{p.date}</td>
                        <td className="p-4 text-sm">{p.author}</td>
                        <td className="p-4 flex gap-4">
                          <button 
                            onClick={() => {
                              setEditingPost(p);
                              setBlogForm({ title: p.title, content: p.content, image: p.image, author: p.author, date: p.date });
                              setIsBlogModalOpen(true);
                            }}
                            className="text-xs text-spa-brown hover:underline"
                          >
                            Edit
                          </button>
                          <button onClick={() => deleteBlog(p.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => {
                  setEditingFaq(null);
                  setFaqForm({ question: '', answer: '' });
                  setIsFaqModalOpen(true);
                }}
                className="btn-primary"
              >
                Add New FAQ
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="p-4">Question</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {faqs.map(f => (
                      <tr key={f.id}>
                        <td className="p-4 font-medium">{f.question}</td>
                        <td className="p-4 flex gap-4">
                          <button 
                            onClick={() => {
                              setEditingFaq(f);
                              setFaqForm({ question: f.question, answer: f.answer });
                              setIsFaqModalOpen(true);
                            }}
                            className="text-xs text-spa-brown hover:underline"
                          >
                            Edit
                          </button>
                          <button onClick={() => deleteFaq(f.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Service Modal */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                <button onClick={() => setIsServiceModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Service Name</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Duration (e.g. 60 min)</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.duration} onChange={e => setServiceForm({...serviceForm, duration: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Price (৳)</label>
                    <input 
                      type="number" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Image URL</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.image} onChange={e => setServiceForm({...serviceForm, image: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Description</label>
                  <textarea 
                    rows={4} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {isTestimonialModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <button onClick={() => setIsTestimonialModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Client Name</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Rating (1-5)</label>
                    <input 
                      type="number" min="1" max="5" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={testimonialForm.rating} onChange={e => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Photo URL (Optional)</label>
                    <input 
                      type="text"
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={testimonialForm.photo} onChange={e => setTestimonialForm({...testimonialForm, photo: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Message</label>
                  <textarea 
                    rows={4} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={testimonialForm.message} onChange={e => setTestimonialForm({...testimonialForm, message: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Blog Modal */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingPost ? 'Edit Post' : 'Add Post'}</h2>
                <button onClick={() => setIsBlogModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Title</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Image URL</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Author</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Date</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Content</label>
                  <textarea 
                    rows={6} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</h2>
                <button onClick={() => setIsFaqModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleFaqSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Question</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Answer</label>
                  <textarea 
                    rows={6} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('subscribers').insert([{ email }]);
      if (!error) {
        setStatus('success');
        setEmail('');
      } else {
        if (error.code === '23505') { // Unique constraint violation in Postgres
          setStatus('error');
          setMessage('Email already subscribed');
        } else {
          throw error;
        }
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to server');
    }
  };

  return (
    <section className="py-20 bg-spa-brown text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-8">Subscribe for updates</h2>
        {status === 'success' ? (
          <div className="bg-white/20 p-6 rounded-sm">
            <p className="font-bold">Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              required
              placeholder="Enter your email..." 
              className="flex-1 bg-white/10 border border-white/20 p-4 outline-none focus:bg-white/20"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button 
              disabled={status === 'loading'}
              className="btn-primary bg-white text-spa-brown hover:bg-spa-beige"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-4 text-red-200 text-sm">{message}</p>}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [
        { data: servicesData },
        { data: faqData },
        { data: blogData },
        { data: testimonialsData },
        { data: settingsData }
      ] = await Promise.all([
        supabase.from('services').select('*'),
        supabase.from('faq').select('*'),
        supabase.from('blog').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('settings').select('*')
      ]);

      if (servicesData) setServices(servicesData);
      if (faqData) setFaqs(faqData);
      if (blogData) setPosts(blogData);
      if (testimonialsData) setTestimonials(testimonialsData);
      if (settingsData) {
        const settingsObj = settingsData.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
        setSettings(settingsObj);
      }
    };

    fetchData();
  }, [isAdmin]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // For Vite/Vercel deployment, we use environment variables for simple admin auth
    const adminEmailEnv = import.meta.env.VITE_ADMIN_EMAIL || "admin@gmail.com";
    const adminPasswordEnv = import.meta.env.VITE_ADMIN_PASSWORD || "1q2w3e4r5t";
    
    if (adminEmail === adminEmailEnv && adminPassword === adminPasswordEnv) {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAdmin) {
    return <AdminPanel onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <HelmetProvider>
      <div className="relative min-h-screen">
        <Helmet>
          <title>{settings.seo_home_title || 'Frozen Thai Spa'}</title>
          <meta name="description" content={settings.seo_home_description || ''} />
          <meta name="keywords" content={settings.seo_home_keywords || ''} />
        </Helmet>
        <TopBar settings={settings} />
        <Navbar onBookClick={scrollToBooking} />
        
        <main>
          <Hero onBookClick={scrollToBooking} />
          <About />
          <Services services={services} />
          <OfferBanner onBookClick={scrollToBooking} />
          <BookingSection services={services} settings={settings} />
          <Testimonials testimonials={testimonials} />
          <Pricing services={services} />
          <FAQSection faqs={faqs} />
          <Blog posts={posts} />
          
          {/* Map Section */}
          <section className="h-[450px] w-full relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.156382961058!2d90.4125433154316!3d23.77744549360585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0x2ad1c151392a566a!2sGulshan%20Avenue%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1647854321000!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>

          <SubscribeSection />
        </main>

        <Footer settings={settings} />
        <FloatingBar settings={settings} />

        {/* Hidden Admin Entry */}
        <button 
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-20 right-4 md:bottom-4 md:right-4 opacity-20 hover:opacity-100 transition-opacity z-50 text-2xl"
          title="Admin Login"
        >
          🌐
        </button>

        {/* Admin Login Modal */}
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-8 max-w-md w-full rounded-sm"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif">Admin Login</h2>
                  <button onClick={() => setShowAdminLogin(false)}><X /></button>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">Email</label>
                    <input 
                      type="email" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">Password</label>
                    <input 
                      type="password" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">Login</button>
                </form>
                <div className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest">
                  Protected Area - Authorized Personnel Only
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}
