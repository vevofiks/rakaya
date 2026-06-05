"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote, Play, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  location: string;
  image: string;
  videoThumb?: string;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<(() => void) | null>(null);

  const reviews: Testimonial[] = [
    {
      id: 1,
      name: "Aparna Sen",
      role: "Luxury Travel Creator",
      text: "The sunrise kayaking was a religious experience. Gliding silently through the morning fog of Kavvayi backwaters felt like paddling through another dimension. The guides are incredibly professional and the gear is international-grade.",
      rating: 5,
      location: "Mumbai, India",
      image: "/about_kerala_kayak.png",
      videoThumb: "/about_kerala_kayak.png",
    },
    {
      id: 2,
      name: "Marcus Aurelius",
      role: "Adventure Photographer",
      text: "I've paddled in Canada, Norway, and New Zealand, but the sunset lagoon route in Kannur is completely unparalleled. The palm-lined silhouettes reflecting off golden water are an absolute dream for photographers. Rakaya does it with total class.",
      rating: 5,
      location: "Berlin, Germany",
      image: "/experience_sunset.png",
      videoThumb: "/experience_sunset.png",
    },
    {
      id: 3,
      name: "Rohan & Meera",
      role: "Couple Explorers",
      text: "We booked the private sunset expedition. Having a gourmet beach picnic set up on a secluded estuary sandbank after three hours of spectacular paddling was out of this world. Highly recommend Rakaya for couples!",
      rating: 5,
      location: "Bangalore, India",
      image: "/about_kerala_kayak.png",
      videoThumb: "/about_kerala_kayak.png",
    },
  ];

  // Auto scroll carousel effect
  useEffect(() => {
    const handleNext = () => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };
    autoPlayRef.current = handleNext;
  });

  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    const interval = setInterval(play, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-36 bg-[#072C3D] overflow-hidden">
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-ocean/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4 animate-pulse">
            <span className="w-6 h-[1px] bg-sunset inline-block" />
            <span>TESTIMONIALS & REVIEWS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gradient-sand tracking-wide leading-none">
            Voices From <span className="text-gradient-sunset">The Water.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mt-6 font-light">
            Real stories from our luxury travelers, professional kayakers, and nature enthusiasts who have explored Kannur backwaters with us.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Cinematic video testimony frame */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-sand/15 group">
            
            {/* Active video thumbnail image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={reviews[activeIndex].videoThumb || "/about_kerala_kayak.png"}
                alt="Testimonial Video Preview"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-sea/90 via-transparent to-transparent" />
            </div>

            {/* Glowing play circle overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <button
                className="w-18 h-18 rounded-full bg-sunset hover:scale-110 shadow-lg shadow-sunset/30 flex items-center justify-center text-white transition-all duration-300 relative group-hover:bg-sunset border border-sunset/50"
                aria-label="Play video testimonial"
              >
                <Play className="w-6 h-6 fill-white text-white translate-x-[2px]" />
                <div className="absolute inset-0 rounded-full border border-sunset/60 animate-ping opacity-60" />
              </button>
              
              <span className="text-xs font-bold tracking-widest text-white uppercase mt-6 select-none group-hover:text-sunset transition-colors">
                WATCH VIDEO LOG
              </span>
            </div>

            {/* Location coordinates label */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-[10px] tracking-widest text-white/50 uppercase font-semibold">
              <CheckCircle className="w-4 h-4 text-sunset" />
              <span>VERIFIED RAKAYA TRAVELER</span>
            </div>
          </div>

          {/* RIGHT: Text content reviewer cards */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[300px]">
            
            {/* Reviews display with slide transition */}
            <div className="relative overflow-hidden min-h-[220px]">
              {reviews.map((rev, idx) => (
                <div
                  key={rev.id}
                  className={`transition-all duration-500 transform ${
                    idx === activeIndex
                      ? "opacity-100 translate-x-0 relative pointer-events-auto"
                      : "opacity-0 translate-x-12 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Glowing quote icon */}
                  <Quote className="w-12 h-12 text-sunset/20 mb-6" />

                  {/* Five Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sunset text-sunset" />
                    ))}
                  </div>

                  <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed font-light mb-8 italic">
                    &quot;{rev.text}&quot;
                  </blockquote>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-sand/20">
                      <Image
                        src={rev.image}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <cite className="not-italic font-display font-bold text-white text-base tracking-wide block">
                        {rev.name}
                      </cite>
                      <span className="text-xs text-white/40 tracking-wider">
                        {rev.role} • {rev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel navigation controls */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10 z-20">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === activeIndex ? "w-8 bg-sunset" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
