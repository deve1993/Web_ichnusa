"use client";

import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const timer = setTimeout(() => setShowVideo(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showVideo) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      onLoadedData={() => setVideoLoaded(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
        videoLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src="/video/hero-video.webm" type="video/webm" />
      <source src="/video/hero-video.mp4" type="video/mp4" />
    </video>
  );
}
