"use client";

import ConsentEmbed from "./ConsentEmbed";

interface GoogleMapEmbedProps {
  embedUrl: string;
  externalUrl: string;
  className?: string;
}

export default function GoogleMapEmbed({
  embedUrl,
  externalUrl,
  className = "",
}: GoogleMapEmbedProps) {
  return (
    <ConsentEmbed
      type="map"
      externalUrl={externalUrl}
      className={className}
      fallbackImage="/images/map-placeholder.jpg"
    >
      <div className={`relative ${className}`}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </div>
    </ConsentEmbed>
  );
}
