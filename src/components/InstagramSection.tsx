"use client";

import { Heart, MessageCircle, Play } from "lucide-react";
import Image from "next/image";

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

interface InstaPost {
  id: number;
  image: string;
  likes: string;
  comments: string;
  isReel?: boolean;
}

export default function InstagramSection() {
  const posts: InstaPost[] = [
    {
      id: 1,
      image: "/about_kerala_kayak.png",
      likes: "1,204",
      comments: "42",
      isReel: true,
    },
    {
      id: 2,
      image: "/experience_sunset.png",
      likes: "948",
      comments: "28",
    },
    {
      id: 3,
      image: "/about_kerala_kayak.png",
      likes: "1,452",
      comments: "56",
    },
    {
      id: 4,
      image: "/experience_sunset.png",
      likes: "812",
      comments: "19",
      isReel: true,
    },
  ];

  return (
    <section className="relative py-24 bg-[#041B26] overflow-hidden">
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4 animate-pulse">
              <span className="w-6 h-[1px] bg-sunset inline-block" />
              <span>SOCIAL WATERWAYS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-gradient-sand tracking-wide leading-none">
              Explore Our <span className="text-gradient-sunset">Feed.</span>
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sunset/50 hover:bg-sunset/10 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 shadow-xl"
          >
            <InstagramIcon className="w-4 h-4 text-sunset" /> FOLLOW @RAKAYA_KERALA
          </a>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/5 cursor-pointer"
            >
              {/* Media Content */}
              <Image
                src={post.image}
                alt="Instagram Adventure Post"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-w-7xl) 25vw, 50vw"
              />

              {/* Red-ish wash gradient hover layer */}
              <div className="absolute inset-0 bg-[#072C3D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-6" />

              {/* Likes/Comments display that overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white gap-6">
                <span className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                  <Heart className="w-5 h-5 fill-sunset text-sunset" /> {post.likes}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                  <MessageCircle className="w-5 h-5 text-sand" /> {post.comments}
                </span>
              </div>

              {/* Reel indicator tag */}
              {post.isReel && (
                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-0 transition-transform">
                  <Play className="w-3.5 h-3.5 text-white fill-white translate-x-[1px]" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
