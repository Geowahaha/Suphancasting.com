"use client";

import { useState, useEffect } from "react";

const TIKTOK_VIDEOS = [
  {
    id: "7621259225271930132",
    title: "Metal Casting Process"
  },
  {
    id: "7588172581757324565",
    title: "Steel Casting"
  },
  {
    id: "7607427363629960468",
    title: "Custom Casting"
  },
  {
    id: "7600564740833905940",
    title: "Factory Tour"
  },
  {
    id: "7622432634106285333",
    title: "Product Showcase"
  }
];

export function TikTokSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TIKTOK_VIDEOS.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TIKTOK_VIDEOS.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TIKTOK_VIDEOS.length) % TIKTOK_VIDEOS.length);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🎬 Watch Our Factory in Action
          </h2>
          <p className="text-gray-600">
            Follow us on TikTok: <a href="https://www.tiktok.com/@suphan.casting" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">@suphan.casting</a>
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-[9/16] max-h-[600px] mx-auto">
              <blockquote
                className="tiktok-embed"
                cite={`https://www.tiktok.com/@suphan.casting/video/${TIKTOK_VIDEOS[currentIndex].id}`}
                data-video-id={TIKTOK_VIDEOS[currentIndex].id}
                style={{ maxWidth: "605px", minWidth: "325px", width: "100%", height: "100%" }}
              >
                <section>
                  <a
                    target="_blank"
                    title="@suphan.casting"
                    href={`https://www.tiktok.com/@suphan.casting?refer=embed`}
                  >
                    @suphan.casting
                  </a>
                </section>
              </blockquote>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label="Previous video"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label="Next video"
            >
              ›
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all text-xl"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TIKTOK_VIDEOS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Video {currentIndex + 1} of {TIKTOK_VIDEOS.length} • Auto-advances every 8 seconds
          </p>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.tiktok.com/@suphan.casting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>Follow us on TikTok</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
          </a>
        </div>
      </div>

      <script
        async
        src="https://www.tiktok.com/embed.js"
      />
    </section>
  );
}
