"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Calendar, Compass, Wind } from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";
import HeroBackgroundSequence from "./HeroBackgroundSequence";

// High-performance store to bypass React batching lag on scroll
export const heroScrollState = {
  progress: 0,
  subscribers: [] as ((p: number) => void)[],
  set: (p: number) => {
    heroScrollState.progress = p;
    heroScrollState.subscribers.forEach((sub) => sub(p));
  },
  subscribe: (fn: (p: number) => void) => {
    heroScrollState.subscribers.push(fn);
    return () => {
      heroScrollState.subscribers = heroScrollState.subscribers.filter((sub) => sub !== fn);
    };
  },
};

export default function HeroSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [activeScene, setActiveScene] = useState(1);
  const activeSceneRef = useRef(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=450%", // 5 scenes
        pin: true,
        onUpdate: (self) => {
          const prog = self.progress;
          // Bypass React state - direct dispatch
          heroScrollState.set(prog);
          
          // Determine active scene based on scroll percentage
          let newScene = 1;
          if (prog >= 0.2 && prog < 0.4) newScene = 2;
          else if (prog >= 0.4 && prog < 0.6) newScene = 3;
          else if (prog >= 0.6 && prog < 0.8) newScene = 4;
          else if (prog >= 0.8) newScene = 5;

          if (activeSceneRef.current !== newScene) {
            activeSceneRef.current = newScene;
            setActiveScene(newScene); // only re-renders 5 times during entire scroll
          }

          // Direct DOM mutations for buttery smooth 120fps CSS updates
          const scale = 1 + prog * 0.15;

          if (bgContainerRef.current) {
            bgContainerRef.current.style.transform = `scale(${scale})`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.height = `${prog * 100}%`;
          }
          if (progressTextRef.current) {
            progressTextRef.current.innerText = `${Math.round(prog * 100)}%`;
          }
          if (ctaRef.current) {
            if (prog > 0.85) {
              ctaRef.current.style.opacity = "1";
              ctaRef.current.style.transform = "translateY(0) scale(1)";
              ctaRef.current.style.pointerEvents = "auto";
            } else {
              ctaRef.current.style.opacity = "0";
              ctaRef.current.style.transform = "translateY(24px) scale(0.95)";
              ctaRef.current.style.pointerEvents = "none";
            }
          }
        },
      });
    }, triggerRef);

    // Clean up properly for React Strict Mode
    return () => {
      ctx.revert();
    };
  }, []);

  // (CSS styling logic was moved to onUpdate for direct DOM mutation)

  return (
    <div id="hero" ref={triggerRef} className="relative w-full h-screen overflow-hidden bg-[#072C3D]">
      {/* 1. Cinematic Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div ref={bgContainerRef} className="absolute inset-0 w-full h-full origin-center will-change-transform">
          <HeroBackgroundSequence />
        </div>


        
        {/* Soft shadow gradients (top and bottom) for excellent navbar/CTA legibility */}
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-[#072C3D]/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#072C3D]/95 via-[#072C3D]/40 to-transparent z-10" />
      </div>

      {/* 2. ThreeJS 3D Text System Layer */}
      <Hero3DCanvas />

      {/* 3. HTML Storytelling HUD / Interactive HUD (Framer-motion-like microcopy) */}
      <div className="absolute inset-0 flex flex-col justify-between items-center py-24 px-6 z-30 pointer-events-none">
        
        {/* TOP HUD: Floating brand status */}
        <div className="w-full max-w-7xl flex justify-between items-start text-xs font-bold tracking-[0.3em] uppercase text-sand/80 px-6">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-sunset animate-pulse" />
            <span>KANNUR BACKWATERS</span>
          </div>
          <div className="text-right">
            <span>SCENE 0{activeScene} / 05</span>
          </div>
        </div>

        {/* CENTER SCENE INFO (Supports 3D and fills up space beautifully) */}
        <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center h-2/3 select-none">
          {/* Subtle scroll hints custom animated depending on active scene */}
          {activeScene === 1 && (
            <div className="animate-bounce flex flex-col items-center mt-[24rem]">
              <span className="text-[10px] tracking-[0.4em] uppercase text-sand/60 mb-2">SCROLL TO PADDLE</span>
              <ChevronDown className="w-5 h-5 text-sunset" />
            </div>
          )}
        </div>

        {/* BOTTOM HUD / DYNAMIC METRICS */}
        <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Active coordinates */}
          <div className="flex items-center gap-4 text-xs tracking-widest text-white/50">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sunset" /> 11.8745° N, 75.3704° E
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:inline">KERALA, INDIA</span>
          </div>

          {/* Book Experience CTA (Reveals dynamically as hero journey ends) */}
          <div
            ref={ctaRef}
            className="transition-all duration-700 transform opacity-0 translate-y-6 scale-95 pointer-events-none"
          >
            <a
              href="#booking"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-sunset to-[#FF9050] text-sm font-bold tracking-widest uppercase text-white shadow-xl shadow-sunset/30 hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" /> BOOK YOUR EXPERIENCE
            </a>
          </div>
        </div>
      </div>

      {/* Side Scroll Progress Bar (Premium floating indicator) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-widest text-sand/40 uppercase rotate-90 my-4">JOURNEY</span>
        <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 w-full bg-sunset will-change-transform"
            style={{ height: "0%" }}
          />
        </div>
        <span ref={progressTextRef} className="text-[10px] font-bold text-sunset mt-2">
          0%
        </span>
      </div>
    </div>
  );
}
