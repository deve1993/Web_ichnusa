# Font Credits & Licenses

This project uses self-hosted fonts to ensure privacy (no external requests to Google Fonts) and proper support for Czech characters (latin-ext subset).

## Fonts Used

### Source Sans 3 (Body Text)
- **Designer**: Paul D. Hunt (Adobe)
- **License**: SIL Open Font License 1.1
- **Source**: https://fonts.google.com/specimen/Source+Sans+3
- **Subsets**: Latin, Latin Extended (for Czech: č, ř, ž, ě, š, ů, á, í, ý, etc.)
- **Usage**: Body text, paragraphs, UI elements

### Cormorant Garamond (Display/Headings)
- **Designer**: Christian Thalmann (Catharsis Fonts)
- **License**: SIL Open Font License 1.1
- **Source**: https://fonts.google.com/specimen/Cormorant+Garamond
- **Subsets**: Latin, Latin Extended (for Czech characters)
- **Weights**: 300, 400, 500, 600, 700
- **Usage**: Headings, titles, decorative text

## SIL Open Font License 1.1

Both fonts are licensed under the SIL Open Font License, Version 1.1.

This license allows:
- Free use in commercial and non-commercial projects
- Modification and redistribution
- Bundling with software

Requirements:
- Include this license notice when redistributing
- Cannot sell the fonts alone

Full license text: https://scripts.sil.org/OFL

## File Structure

```
src/fonts/
├── index.ts                    # Next.js font configuration
├── README.md                   # This file
└── local/
    ├── source-sans-3/          # Variable font files
    │   ├── *-latin-*.woff2     # Basic Latin characters
    │   └── *-latin-ext-*.woff2 # Extended Latin (Czech, Polish, etc.)
    └── cormorant-garamond/     # Static font files
        ├── *-latin-*.woff2     # Basic Latin characters
        └── *-latin-ext-*.woff2 # Extended Latin (Czech, Polish, etc.)
```

## Why Self-Hosted?

1. **Privacy**: No requests to Google Fonts = no tracking
2. **Performance**: Fonts served from same domain = faster loading
3. **GDPR Compliance**: No third-party data sharing
4. **Reliability**: No dependency on external services
5. **Czech Support**: Ensures latin-ext subset is always available

## CSS Variables

```css
--font-body: 'Source Sans 3'    /* Body text */
--font-display: 'Cormorant Garamond'  /* Headings */
```

## Supported Languages

- Italian (it)
- English (en)
- Czech (cs) - full support for háčky and čárky (ě, š, č, ř, ž, ý, á, í, é, ú, ů, ň, ď, ť)
