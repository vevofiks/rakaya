"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Calendar, ArrowRight, MessageSquareCode } from "lucide-react";
import Image from "next/image";

export default function BookingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Zoom background slightly as user scrolls past it
    gsap.fromTo(
      containerRef.current?.querySelector(".bg-image-layer") || [],
      { scale: 1.1 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Stagger slide elements
    gsap.fromTo(
      elementsRef.current?.querySelectorAll(".cta-item") || [],
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      id="booking"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 bg-[#041B26] overflow-hidden"
    >
      {/* Cinematic Golden Sunset Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="bg-image-layer absolute inset-0 w-full h-full">
          <Image
            src="/experience_sunset.png"
            alt="Kayaking into Kerala Sunset"
            fill
            className="object-cover brightness-[0.35] saturate-[1.25]"
            priority
          />
        </div>
        
        {/* Soft atmospheric gradients for ultimate depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041B26]/85 via-transparent to-[#041B26]" />
        
        {/* Glowing floating light bubbles representing setting sun flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-sunset/15 blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div
        ref={elementsRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center"
      >
        {/* Glowing floating sub badge */}
        <div className="cta-item mb-6 px-5 py-2 rounded-full glass-panel border border-sand/20 shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-sunset animate-ping" />
          <span className="text-[10px] font-bold text-sand tracking-[0.25em] uppercase">LIMITED SPOTS FOR THIS SEASON</span>
        </div>

        <h2 className="cta-item font-display font-black text-5xl sm:text-7xl md:text-8xl text-gradient-sand tracking-wide leading-[1.05] mb-6">
          READY TO <br />
          <span className="text-gradient-sunset">PADDLE?</span>
        </h2>

        <p className="cta-item text-white/70 text-lg md:text-2xl max-w-2xl leading-relaxed mb-12 font-light">
          Experience Kerala's most beautiful and dramatic backwaters. Let us guide you into the silent wild.
        </p>

        {/* Dual Actions buttons */}
        <div className="cta-item flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          {/* Main Book Now Button */}
          <a
            href="#booking-contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-gradient-to-r from-sunset to-[#FF9050] text-sm font-bold tracking-widest uppercase text-white shadow-2xl shadow-sunset/30 hover:shadow-sunset/50 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 border border-sunset/20"
          >
            <Calendar className="w-4.5 h-4.5" /> BOOK EXPERIENCES <ArrowRight className="w-4.5 h-4.5" />
          </a>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-sm font-bold tracking-widest uppercase text-white hover:text-emerald-400 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <MessageSquareCode className="w-4.5 h-4.5 text-emerald-400" /> WHATSAPP US
          </a>
        </div>

        {/* Quick assurance info */}
        <div className="cta-item grid grid-cols-3 gap-8 mt-16 max-w-lg border-t border-white/10 pt-8 text-[9px] tracking-[0.2em] uppercase text-white/40">
          <div>
            <span className="block text-sunset font-bold text-xs mb-1">0%</span>
            <span>CANCELLATION FEE</span>
          </div>
          <div className="border-x border-white/10">
            <span className="block text-sunset font-bold text-xs mb-1">5★</span>
            <span>RATED EXPEDITIONS</span>
          </div>
          <div>
            <span className="block text-sunset font-bold text-xs mb-1">100%</span>
            <span>LOCAL NATURALISTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
