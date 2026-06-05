"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Sunset, Users, Heart, Camera, Shield, ArrowUpRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface ExperienceItem {
  id: number;
  title: string;
  tagline: string;
  image: string;
  icon: any;
  duration: string;
  level: string;
  price: string;
  spots: string;
}

export default function ExperiencesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Sunrise Kayaking",
      tagline: "Glide through mystical blue-hour fog as the backwaters wake up.",
      image: "/about_kerala_kayak.png",
      icon: Sun,
      duration: "3 Hours",
      level: "Beginner Friendly",
      price: "₹1,499",
      spots: "Max 10 paddlers",
    },
    {
      id: 2,
      title: "Sunset Kayaking",
      tagline: "Paddle directly into the burning gold horizons of the Arabian Sea.",
      image: "/experience_sunset.png",
      icon: Sunset,
      duration: "3.5 Hours",
      level: "Beginner Friendly",
      price: "₹1,799",
      spots: "Highly Popular",
    },
    {
      id: 3,
      title: "Group Adventures",
      tagline: "Build wild stories with fellow water explorers across scenic islands.",
      image: "/about_kerala_kayak.png",
      icon: Users,
      duration: "4 Hours",
      level: "Intermediate",
      price: "₹1,299 / person",
      spots: "Groups of 5+",
    },
    {
      id: 4,
      title: "Family Expedition",
      tagline: "Safe, stable, and highly engaging routes tailored for all generations.",
      image: "/experience_sunset.png",
      icon: Heart,
      duration: "2.5 Hours",
      level: "Extremely Easy",
      price: "₹3,999 / family",
      spots: "Guided safety boat included",
    },
    {
      id: 5,
      title: "Photography Tours",
      tagline: "Uncover Kannur's secret bird nesting grounds and light rays with experts.",
      image: "/about_kerala_kayak.png",
      icon: Camera,
      duration: "4 Hours",
      level: "Any Skill",
      price: "₹2,499",
      spots: "Dry bags provided",
    },
    {
      id: 6,
      title: "Private Expeditions",
      tagline: "A fully custom, high-end private route with exclusive gourmet beach picnic.",
      image: "/experience_sunset.png",
      icon: Shield,
      duration: "Flexible",
      level: "Custom Tailored",
      price: "₹8,999",
      spots: "Ultra Luxury",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal of experiences cards
    gsap.fromTo(
      cardGridRef.current?.querySelectorAll(".experience-card") || [],
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardGridRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="experiences"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-gradient-to-b from-[#072C3D] to-[#041B26] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-[35vw] h-[35vw] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-ocean/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4 animate-pulse">
            <span className="w-6 h-[1px] bg-sunset inline-block" />
            <span>EXCLUSIVE PADDLE EXPEDITIONS</span>
          </div>
          
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gradient-sand tracking-wide leading-none">
            Choose Your <span className="text-gradient-sunset">Waterway.</span>
          </h2>
          
          <p className="text-white/60 text-base md:text-lg mt-6 font-light">
            Every route is designed with premium safety, state-of-the-art sea kayaks, and local naturalists who share the mystical lore of Kannur.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={exp.id}
                className="experience-card group relative h-[520px] rounded-2xl overflow-hidden glass-panel flex flex-col justify-end p-6 md:p-8 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-sunset/10 transition-all duration-500 cursor-pointer border border-white/5"
              >
                {/* Background image component with smooth hover zoom */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.45] group-hover:brightness-[0.3]"
                  />
                  {/* Blue shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041B26] via-[#072C3D]/40 to-transparent z-10" />
                </div>

                {/* Top hovering action button */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-sunset group-hover:border-sunset/50 transition-all duration-300 z-20">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>

                {/* Floating Category Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-ocean/40 backdrop-blur-md border border-sand/15 flex items-center justify-center group-hover:border-sunset/40 transition-colors z-20">
                  <IconComponent className="w-6 h-6 text-sand group-hover:text-sunset transition-colors" />
                </div>

                {/* Card Content details */}
                <div className="relative z-20 flex flex-col justify-end w-full">
                  <span className="text-[10px] font-bold text-sunset tracking-widest uppercase mb-2">
                    {exp.level}
                  </span>
                  
                  <h3 className="font-display font-bold text-2xl tracking-wide text-white group-hover:text-sand transition-colors mb-3">
                    {exp.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                    {exp.tagline}
                  </p>

                  {/* Metadata labels */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-[11px] tracking-wider uppercase text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sunset" /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 justify-end">
                      {exp.spots}
                    </span>
                  </div>

                  {/* Pricing details that slide up on hover */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                    <span className="text-xs text-white/40 tracking-wider">INVESTMENT</span>
                    <span className="text-lg font-black text-white group-hover:text-sunset transition-colors tracking-wide">
                      {exp.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
