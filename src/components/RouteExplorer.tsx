"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Wind } from "lucide-react";

interface Checkpoint {
  id: number;
  name: string;
  coords: { x: number; y: number };
  difficulty: "Easy" | "Moderate" | "Challenging";
  distance: string;
  sightings: string;
  description: string;
}

export default function RouteExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [selectedPin, setSelectedPin] = useState<number>(1);

  const checkpoints: Checkpoint[] = [
    {
      id: 1,
      name: "Dharmadam Estuary & Island",
      coords: { x: 150, y: 380 },
      difficulty: "Easy",
      distance: "4.5 km",
      sightings: "White-bellied sea eagles, crabs, shallow reefs",
      description: "Paddle across the gentle estuary waves to reach the isolated, uninhabited Dharmadam Island. Best navigated during low tide where you can circumnavigate the massive rocky formations.",
    },
    {
      id: 2,
      name: "Kavvayi Mangrove Tunnel",
      coords: { x: 380, y: 240 },
      difficulty: "Moderate",
      distance: "6.0 km",
      sightings: "River otters, purple herons, mangrove crabs",
      description: "Enter the mystical green arches where the branches meet overhead, filtering the sunlight into emerald patterns. A silent, slow-paced navigational wonder.",
    },
    {
      id: 3,
      name: "Valapattanam Backwaters",
      coords: { x: 620, y: 180 },
      difficulty: "Challenging",
      distance: "9.0 km",
      sightings: "Humpback dolphins (near estuary), exotic birds",
      description: "A grand expedition where Kannur's largest river meets the Arabian Sea. Navigate stronger currents, open channels, and witness colossal fishing boats returning home.",
    },
    {
      id: 4,
      name: "Ezhara Golden Lagoon",
      coords: { x: 820, y: 350 },
      difficulty: "Easy",
      distance: "3.5 km",
      sightings: "Reef fish, sea stars, golden sand beaches",
      description: "A calm, secluded cove with transparent blue waters, completely shielded from ocean swells by basaltic rock reefs. Ideal for floating and absolute silence.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    // Get the length of the SVG path
    const pathLength = path.getTotalLength();
    
    // Set up SVG stroke dash properties for GSAP drawing
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate path tracing scroll-linked
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1.5,
      },
    });
  }, []);

  const activeCheckpoint = checkpoints.find((c) => c.id === selectedPin) || checkpoints[0];

  return (
    <section
      id="routes"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[#041B26] overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-ocean/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-bold text-sunset tracking-[0.3em] uppercase mb-4">
            <span className="w-6 h-[1px] bg-sunset inline-block" />
            <span>INTERACTIVE MAP SYSTEM</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gradient-sand tracking-wide leading-none">
            Trace Our <span className="text-gradient-sunset">Routes.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mt-6 font-light">
            Scroll down to watch the water route trace its path. Click on each custom coordinate to inspect the unique topography and wildlife profiles.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: SVG MAP CANVAS */}
          <div className="lg:col-span-8 bg-[#072C3D]/40 backdrop-blur-md rounded-3xl p-6 border border-sand/10 shadow-2xl relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center overflow-x-auto hide-scrollbar">
            
            {/* Interactive map background vector overlay */}
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="absolute top-8 left-8 flex items-center gap-2 text-xs tracking-widest text-white/30 uppercase font-bold select-none">
              <Compass className="w-4 h-4 text-sunset animate-spin" style={{ animationDuration: '6s' }} />
              <span>NAVIGATION CANVAS</span>
            </div>

            {/* MAP SVG CONTAINER */}
            <svg
              viewBox="0 0 1000 500"
              className="w-[800px] md:w-full min-w-[700px] h-[350px] md:h-[420px] select-none"
            >
              {/* Dynamic decorative blue river shape (water flow backdrop) */}
              <path
                d="M 50 400 Q 150 380 250 300 T 450 250 T 650 180 T 850 350 T 950 320"
                fill="none"
                stroke="rgba(11, 77, 104, 0.2)"
                strokeWidth="45"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              <path
                d="M 50 400 Q 150 380 250 300 T 450 250 T 650 180 T 850 350 T 950 320"
                fill="none"
                stroke="rgba(232, 215, 185, 0.08)"
                strokeWidth="4"
                strokeDasharray="8,8"
              />

              {/* PADDLE ROAD - The main drawn path */}
              <path
                ref={pathRef}
                d="M 50 400 Q 150 380 250 300 T 450 250 T 650 180 T 850 350 T 950 320"
                fill="none"
                stroke="#FF7A30"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(255,122,48,0.5)]"
              />

              {/* Map Checkpoint Hotspots */}
              {checkpoints.map((cp) => {
                const isSelected = selectedPin === cp.id;
                return (
                  <g
                    key={cp.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedPin(cp.id)}
                  >
                    {/* Ripple pulse ring */}
                    <circle
                      cx={cp.coords.x}
                      cy={cp.coords.y}
                      r={isSelected ? "18" : "10"}
                      fill="transparent"
                      stroke={isSelected ? "#FF7A30" : "rgba(232,215,185,0.4)"}
                      strokeWidth="1.5"
                      className={`${isSelected ? "ripple-effect" : "group-hover:scale-125 transition-transform"}`}
                      style={{ transformOrigin: `${cp.coords.x}px ${cp.coords.y}px` }}
                    />
                    
                    {/* Inner glowing core */}
                    <circle
                      cx={cp.coords.x}
                      cy={cp.coords.y}
                      r={isSelected ? "7" : "5"}
                      fill={isSelected ? "#FF7A30" : "#E8D7B9"}
                      className="transition-colors duration-300"
                    />

                    {/* Numeric tag inside map */}
                    <text
                      x={cp.coords.x + 14}
                      y={cp.coords.y + 4}
                      fill={isSelected ? "#FF7A30" : "#FFFFFF"}
                      className="text-[10px] font-display font-extrabold select-none pointer-events-none transition-colors"
                    >
                      {cp.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* RIGHT: DESCRIPTIVE DETAILS CARD */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="glass-panel p-8 rounded-3xl border border-sand/15 relative overflow-hidden shadow-2xl">
              {/* Highlight glowing bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sunset to-sand" />
              
              <span className="text-[10px] font-bold text-sunset tracking-[0.2em] uppercase block mb-2">
                COORDINATE SPECIFICATIONS
              </span>
              
              <h3 className="font-display font-black text-2xl sm:text-3xl text-gradient-sand tracking-wide leading-tight mb-4">
                {activeCheckpoint.name}
              </h3>

              <div className="flex gap-4 mb-6 pt-4 border-t border-white/10 text-xs font-semibold tracking-wider text-white/60">
                <div>
                  <span className="block text-[10px] text-white/30 uppercase mb-1">ROUTE LEVEL</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeCheckpoint.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    activeCheckpoint.difficulty === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {activeCheckpoint.difficulty}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/30 uppercase mb-1">DISTANCE</span>
                  <span className="text-sand">{activeCheckpoint.distance}</span>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                {activeCheckpoint.description}
              </p>

              {/* Sighting cards */}
              <div className="bg-[#051F2B] rounded-xl p-4 border border-white/5 flex gap-3 items-start">
                <Wind className="w-5 h-5 text-sunset flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[9px] text-white/40 font-bold uppercase tracking-wider">FREQUENT WILDLIFE SIGHTINGS</span>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">{activeCheckpoint.sightings}</p>
                </div>
              </div>

              <a
                href="#booking"
                className="mt-6 w-full py-4 rounded-xl bg-ocean hover:bg-sunset text-xs font-bold tracking-widest text-center uppercase text-white transition-all duration-300 block border border-sand/10 hover:border-sunset/50"
              >
                REQUEST ROUTE BOOKING
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
