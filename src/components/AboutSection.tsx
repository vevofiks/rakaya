"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up right text contents on scroll
    gsap.fromTo(
      textRef.current?.querySelectorAll(".fade-up-item") || [],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    // Parallax scrolling for image 1 (glides slower)
    gsap.fromTo(
      image1Ref.current,
      { y: 60 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Parallax scrolling for image 2 (glides faster)
    gsap.fromTo(
      image2Ref.current,
      { y: -40 },
      {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-36 bg-deep-sea overflow-hidden flex items-center"
    >
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-ocean/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-sunset/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* LEFT COLLAGE (Parallax Overlapping Images) */}
        <div className="lg:col-span-6 relative h-[450px] sm:h-[600px] w-full flex items-center justify-center">
          
          {/* Main Cinematic Image Frame */}
          <div
            ref={image1Ref}
            className="absolute left-0 w-[80%] h-[75%] rounded-2xl overflow-hidden shadow-2xl shadow-deep-sea/50 border border-sand/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-deep-sea/40 to-transparent z-10" />
            <Image
              src="/about_kerala_kayak.png"
              alt="Cinematic kayaking in Kannur backwaters"
              fill
              className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
              sizes="(max-w-7xl) 50vw, 100vw"
              priority
            />
          </div>

          {/* Overlapping Secondary Image Frame */}
          <div
            ref={image2Ref}
            className="absolute right-0 bottom-4 w-[60%] h-[55%] rounded-2xl overflow-hidden shadow-3xl shadow-black/60 border border-sunset/20 z-20"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-sunset/20 to-transparent z-10" />
            <Image
              src="/experience_sunset.png"
              alt="Sunset kayaking in Kerala"
              fill
              className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
              sizes="(max-w-7xl) 30vw, 50vw"
            />
          </div>

          {/* Interactive Stat / Float card inside collage */}
          <div className="absolute left-[35%] bottom-16 bg-[#072C3D]/90 backdrop-blur-md px-6 py-4 rounded-xl border border-sand/20 shadow-2xl z-30 pointer-events-none hover:scale-105 transition-transform duration-300">
            <span className="block text-2xl font-extrabold text-sunset tracking-wider">100%</span>
            <span className="text-[10px] tracking-widest text-sand uppercase font-bold">ECO ADVENTURE</span>
          </div>
        </div>

        {/* RIGHT CONTENT (Narrative Story) */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center">
          <div className="fade-up-item flex items-center gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4">
            <span className="w-6 h-[1px] bg-sunset inline-block" />
            <span>THE ORIGIN STORY</span>
          </div>

          <h2 className="fade-up-item font-display font-black text-4xl sm:text-5xl md:text-6xl text-gradient-sand leading-[1.1] mb-6 tracking-wide">
            Born From <br />
            <span className="text-gradient-sunset">Kerala's Waters.</span>
          </h2>

          <p className="fade-up-item text-white/70 text-base md:text-lg leading-relaxed mb-8 font-light">
            Rakaya offers unforgettable premium kayaking adventures through the hidden backwaters, serene mangrove forests, and scenic ocean-kissed landscapes of Kannur, Kerala.
            <br />
            <br />
            Our signature routes are crafted not just as tours, but as deep visual stories. Guided by local sea experts, you will glide silently between remote islands, navigate through mystical green arches, and witness sunsets that set the Arabian Sea ablaze.
          </p>

          {/* Quick value cards */}
          <div className="fade-up-item grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-ocean/20 flex items-center justify-center border border-ocean/40 flex-shrink-0">
                <Compass className="w-5 h-5 text-sand" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Uncharted Trails</h4>
                <p className="text-xs text-white/50 mt-1">Exclusive pathways through Kerala's dense mangroves.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-sunset/10 flex items-center justify-center border border-sunset/30 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-sunset" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Luxury Safety</h4>
                <p className="text-xs text-white/50 mt-1">State of the art international-grade equipment.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
