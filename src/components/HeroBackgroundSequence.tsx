"use client";

import { useEffect, useRef, useState } from "react";

import { heroScrollState } from "./HeroSection";

export default function HeroBackgroundSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Separate image arrays for desktop and mobile to act as a persistent cache
  const desktopImages = useRef<HTMLImageElement[]>([]);
  const mobileImages = useRef<HTMLImageElement[]>([]);
  const desktopLoaded = useRef(false);
  const mobileLoaded = useRef(false);

  // Synchronization refs for rendering
  const isMobileRef = useRef(isMobile);
  const windowSizeRef = useRef(windowSize);
  const pendingDraw = useRef(false);

  // 3. Render active frame onto the Canvas at up to 60fps using requestAnimationFrame
  function drawFrame() {
    if (pendingDraw.current) return;
    pendingDraw.current = true;

    requestAnimationFrame(() => {
      pendingDraw.current = false;

      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentIsMobile = isMobileRef.current;
      const currentProgress = heroScrollState.progress;
      const currentWindowSize = windowSizeRef.current;

      if (currentWindowSize.width === 0) return;

      const activeImages = currentIsMobile ? mobileImages.current : desktopImages.current;
      const totalFrames = currentIsMobile ? 40 : 25;

      if (activeImages.length === 0) return;

      // Calculate the theoretical frame index based on scroll progress (0.0 to 1.0)
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(currentProgress * totalFrames))
      );

      // Robust fallback frame finder: search outwards for the closest loaded frame to prevent black screens/flickers
      let activeImage = activeImages[frameIndex];
      if (!activeImage || activeImage.width === 0 || activeImage.height === 0) {
        let step = 1;
        while (true) {
          const prev = frameIndex - step;
          const next = frameIndex + step;
          
          if (prev >= 0 && activeImages[prev] && activeImages[prev].width > 0) {
            activeImage = activeImages[prev];
            break;
          }
          if (next < totalFrames && activeImages[next] && activeImages[next].width > 0) {
            activeImage = activeImages[next];
            break;
          }
          if (prev < 0 && next >= totalFrames) {
            break;
          }
          step++;
        }
      }

      if (!activeImage || activeImage.width === 0 || activeImage.height === 0) return;

      // Handle high-DPR displays (Retina) for ultra-sharp rendering
      const dpr = window.devicePixelRatio || 1;
      const width = currentWindowSize.width;
      const height = currentWindowSize.height;

      // Update canvas geometry
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      // Reset transform and scale coordinates for high DPR
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // Maximize image clarity
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Perform "object-fit: cover" calculations
      const canvasRatio = width / height;
      const imgRatio = activeImage.width / activeImage.height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image aspect ratio
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        // Canvas is taller than image aspect ratio
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      // Clear previous frames and render current frame
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(activeImage, offsetX, offsetY, drawWidth, drawHeight);
    });
  }

  // 1. Detect screen size (mobile vs desktop) and handle resize events
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
      
      const size = { width: window.innerWidth, height: window.innerHeight };
      setWindowSize(size);
      windowSizeRef.current = size;
      
      drawFrame();
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update progress and trigger canvas draw from high-perf store
  useEffect(() => {
    const unsubscribe = heroScrollState.subscribe(() => {
      drawFrame();
    });
    return () => unsubscribe();
  }, []);

  // 2. Preload image sequence frames based on screen size
  useEffect(() => {
    const totalFrames = isMobile ? 40 : 25;
    const folder = isMobile ? "mobile" : "desktop";
    const targetArray = isMobile ? mobileImages : desktopImages;
    const isTargetLoaded = isMobile ? mobileLoaded : desktopLoaded;

    // If already fully loaded, switch instantly
    if (isTargetLoaded.current) {
      setFirstFrameLoaded(true);
      drawFrame();
      return;
    }

    setFirstFrameLoaded(false);

    let active = true;

    const loadSequence = async () => {
      // Step 1: Load and decode the first frame immediately for instant LCP / first paint
      const firstImg = new Image();
      firstImg.src = `/${folder}/ezgif-frame-001.jpg`;

      const firstFramePromise = new Promise<void>((resolve) => {
        firstImg.onload = async () => {
          if (!active) return resolve();
          try {
            await firstImg.decode();
          } catch (e) {
            console.warn("First frame decode failed, falling back to load", e);
          }
          if (active) {
            targetArray.current[0] = firstImg;
            setFirstFrameLoaded(true);
            drawFrame();
          }
          resolve();
        };
        firstImg.onerror = () => {
          console.error(`Failed to load first frame: /${folder}/ezgif-frame-001.jpg`);
          if (active) {
            setFirstFrameLoaded(true);
          }
          resolve(); // Resolve to allow loading the rest
        };
      });

      await firstFramePromise;
      if (!active) return;

      // Step 2: Load the remaining frames with concurrency control (worker pool size of 5)
      // This prevents network saturation while downloading multiple assets
      const remainingIndices = Array.from({ length: totalFrames - 1 }, (_, i) => i + 1);
      let currentIndex = 0;
      let loadedCount = 1; // 1st frame is loaded

      const loadAndDecodeFrame = async (index: number) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const frameNum = String(index + 1).padStart(3, "0");
          
          img.onload = async () => {
            if (!active) return resolve();
            try {
              await img.decode();
            } catch (e) {
              console.warn(`Frame decode failed for ${frameNum}, falling back`, e);
            }
            if (active) {
              targetArray.current[index] = img;
              loadedCount++;
              drawFrame();
              
              if (loadedCount === totalFrames) {
                isTargetLoaded.current = true;
              }
            }
            resolve();
          };
          
          img.onerror = () => {
            console.error(`Failed to load frame: /${folder}/ezgif-frame-${frameNum}.jpg`);
            resolve(); // Skip on error so queue isn't blocked
          };
          
          img.src = `/${folder}/ezgif-frame-${frameNum}.jpg`;
        });
      };

      const concurrency = 5;
      const worker = async () => {
        while (currentIndex < remainingIndices.length && active) {
          const indexToLoad = remainingIndices[currentIndex++];
          await loadAndDecodeFrame(indexToLoad);
        }
      };

      const workers = Array.from({ length: concurrency }, () => worker());
      await Promise.all(workers);
    };

    loadSequence();

    return () => {
      active = false;
    };
  }, [isMobile]);

  // (drawFrame function was moved to the top of the component to satisfy linter)

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      
      {/* Immersive deep-sea loader: only blocks interaction/visibility until the very first frame is ready */}
      {!firstFrameLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#072C3D] z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-sunset border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-sand/60">
              PADDLING IN...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
