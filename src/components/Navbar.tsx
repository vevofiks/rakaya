"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Experience", href: "#hero" },
    { name: "Our Story", href: "#about" },
    { name: "Experiences", href: "#experiences" },
    { name: "Route Explorer", href: "#routes" },
    { name: "Gallery", href: "#gallery" },
    { name: "Why Us", href: "#why-us" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-4 shadow-xl shadow-deep-sea/10" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-ocean flex items-center justify-center border border-sand/20 overflow-hidden shadow-lg shadow-ocean/30 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 text-sand group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-sunset/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-widest text-gradient-sand group-hover:text-sunset transition-colors duration-300">
                RAKAYA
              </span>
              <span className="block text-[8px] tracking-[0.3em] uppercase text-sand/80 font-display -mt-1 font-bold">
                Kannur • Kerala
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-white/80 hover:text-white tracking-wider transition-colors duration-200 py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sunset transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#booking"
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden group shadow-lg shadow-sunset/10 hover:shadow-sunset/30 transition-shadow duration-300 border border-sunset/20"
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-sunset translate-y-0 group-hover:translate-y-full transition-transform duration-300 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean to-deep-sea translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="relative z-10 text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                BOOK EXPERIENCE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-sand transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep-sea/95 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display font-bold text-2xl tracking-widest text-white/90 hover:text-sunset transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-8"
              >
                <a
                  href="#booking"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sunset text-sm font-bold tracking-widest uppercase text-white shadow-lg shadow-sunset/35 hover:bg-sunset/90 transition-colors"
                >
                  BOOK NOW <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
