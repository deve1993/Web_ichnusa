"use client";

import ConsentEmbed from "./ConsentEmbed";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title = "YouTube video",
  className = "",
}: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const externalUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <ConsentEmbed
      type="video"
      externalUrl={externalUrl}
      className={className}
    >
      <div className={`relative ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0"
        />
      </div>
    </ConsentEmbed>
  );
}
