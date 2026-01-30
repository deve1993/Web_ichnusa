import localFont from "next/font/local";

export const sourceSans3 = localFont({
  src: [
    {
      path: "./local/source-sans-3/source-sans-3-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "./local/source-sans-3/source-sans-3-latin-ext-wght-normal.woff2",
      style: "normal",
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
      path: "./local/cormorant-garamond/cormorant-garamond-latin-ext-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});
