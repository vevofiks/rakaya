"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Compass, HeartHandshake, Map } from "lucide-react";

interface StatItem {
  id: number;
  label: string;
  target: number;
  suffix: string;
  sub: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

export default function WhyRakayaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const stats: StatItem[] = [
    {
      id: 0,
      label: "Happy Visitors",
      target: 5000,
      suffix: "+",
      sub: "Explored Kannur backwaters with us",
      icon: HeartHandshake,
    },
    {
      id: 1,
      label: "Safety Focus",
      target: 1000, // represent 100% or 1000 safety drills
      suffix: "%",
      sub: "Zero incident record, international grade gear",
      icon: ShieldCheck,
    },
    {
      id: 2,
      label: "Expert Guides",
      target: 15,
      suffix: "+",
      sub: "Certified rescue kayakers & wild naturalists",
      icon: Compass,
    },
    {
      id: 3,
      label: "Water Routes",
      target: 12,
      suffix: "+",
      sub: "Curated trails through unexplored mangrove bends",
      icon: Map,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal of stats cards
    gsap.fromTo(
      cardsRef.current?.querySelectorAll(".stat-card") || [],
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      }
    );

    // Count-up animation using GSAP's capability to animate raw JS objects
    const countTargets = { val0: 0, val1: 0, val2: 0, val3: 0 };
    
    gsap.to(countTargets, {
      val0: stats[0].target,
      val1: 100, // target is 100%
      val2: stats[2].target,
      val3: stats[3].target,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
      },
      onUpdate: () => {
        setCounts([
          Math.floor(countTargets.val0),
          Math.floor(countTargets.val1),
          Math.floor(countTargets.val2),
          Math.floor(countTargets.val3),
        ]);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[#041B26] overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-ocean/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-sunset/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4">
            <span className="w-6 h-[1px] bg-sunset inline-block animate-pulse" />
            <span>THE RAKAYA DIFFERENCE</span>
            <span className="w-6 h-[1px] bg-sunset inline-block animate-pulse" />
          </div>
          
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gradient-sand tracking-wide leading-tight">
            Crafting Premium <br />
            <span className="text-gradient-sunset">Waterway Expeditions.</span>
          </h2>
          
          <p className="text-white/60 text-base md:text-lg mt-6 font-light">
            We merge premium exploration gear with deep ecological storytelling to create immersive, 5-star travel memories in Kerala.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={stat.id}
                className="stat-card group glass-panel p-8 rounded-3xl border border-white/5 shadow-xl hover:border-sunset/30 hover:shadow-2xl hover:shadow-sunset/5 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between items-center text-center relative overflow-hidden"
              >
                {/* Decorative golden corner light */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-sunset/5 rounded-full blur-2xl group-hover:bg-sunset/10 transition-colors" />

                {/* Floating circular icon container */}
                <div className="w-16 h-16 rounded-2xl bg-ocean/20 border border-sand/15 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-sunset/50 transition-all duration-300">
                  <IconComp className="w-7 h-7 text-sand group-hover:text-sunset transition-colors" />
                </div>

                <div>
                  <span className="block font-display font-black text-5xl md:text-6xl text-gradient-sand group-hover:text-gradient-sunset tracking-tight transition-all duration-500 mb-2">
                    {counts[idx]}
                    {stat.suffix}
                  </span>
                  
                  <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-3">
                    {stat.label}
                  </h4>
                  
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
