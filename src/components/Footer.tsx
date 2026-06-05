"use client";

import { Compass, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#041B26] border-t border-white/5 pt-20 pb-12 overflow-hidden">
      {/* Glow decorations */}
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full bg-ocean/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full bg-sunset/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a href="#" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center border border-sand/20 overflow-hidden shadow-lg shadow-ocean/30 group-hover:scale-105 transition-transform duration-300">
                <Compass className="w-5 h-5 text-sand" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl tracking-widest text-gradient-sand">
                  RAKAYA
                </span>
                <span className="block text-[8px] tracking-[0.3em] uppercase text-sand/80 font-display -mt-1 font-bold">
                  Kannur • Kerala
                </span>
              </div>
            </a>
            
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light mb-8">
              Rakaya offers premium, highly cinematic kayaking expeditions and eco-adventures through the untouched water systems and mangrove forests of Kannur, Kerala.
            </p>

            {/* Social Anchors */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-sunset/50 hover:bg-sunset/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                aria-label="Instagram link"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-sunset/50 hover:bg-sunset/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                aria-label="Facebook link"
              >
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs font-bold text-sunset tracking-[0.2em] uppercase mb-6">
              QUICK CHANNELS
            </h4>
            <div className="flex flex-col gap-4 text-sm text-white/60 font-light">
              <a href="#hero" className="hover:text-white transition-colors">The Experience</a>
              <a href="#about" className="hover:text-white transition-colors">Our Story</a>
              <a href="#experiences" className="hover:text-white transition-colors">Paddle Routes</a>
              <a href="#routes" className="hover:text-white transition-colors">Map Explorer</a>
              <a href="#gallery" className="hover:text-white transition-colors">Captured Silence</a>
            </div>
          </div>

          {/* Col 3: Contact details */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-xs font-bold text-sunset tracking-[0.2em] uppercase mb-6">
              HEADQUARTERS
            </h4>
            <div className="flex flex-col gap-4 text-sm text-white/70 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sunset flex-shrink-0 mt-0.5" />
                <span>
                  Rakaya Paddles, Dharmadam Island Estuary Road,
                  <br />
                  Kannur, Kerala, Pin 670106, India
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-sunset" />
                <span>+91 99999 99999</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-sunset" />
                <span>explore@rakaya-kerala.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details and Scroll top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 text-xs text-white/40 tracking-wider">
          <p>© {new Date().getFullYear()} RAKAYA Kayaking. All rights reserved. Designed for ultimate visual storytelling.</p>
          
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            
            <button
              onClick={handleScrollTop}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-sunset border border-white/10 hover:border-sunset/50 flex items-center justify-center text-white transition-all duration-300 focus:outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
