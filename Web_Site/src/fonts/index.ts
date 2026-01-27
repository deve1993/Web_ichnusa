import localFont from "next/font/local";

export const sourceSans3 = localFont({
  src: [
    {
      path: "./local/source-sans-3/source-sans-3-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "./local/source-sans-3/source-sans-3-latin-wght-italic.woff2",
      style: "italic",
    },
    {
      path: "./local/source-sans-3/source-sans-3-latin-ext-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "./local/source-sans-3/source-sans-3-latin-ext-wght-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const cormorantGaramond = localFont({
  src: [
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-ext-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-ext-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-ext-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-ext-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./local/cormorant-garamond/cormorant-garamond-latin-ext-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});
