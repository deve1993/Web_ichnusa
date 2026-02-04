# =============================================================================
# Multi-stage Dockerfile for Next.js + Remotion video rendering
# Uses Debian (bookworm-slim) instead of Alpine for Remotion Chrome compatibility
# =============================================================================

# --- Build base: Debian with Chrome dependencies for Remotion rendering ---
FROM node:20-bookworm-slim AS build-base

RUN apt-get update && apt-get install -y --no-install-recommends \
  libnss3 libdbus-1-3 libatk1.0-0 libgbm-dev libasound2 \
  libxrandr2 libxkbcommon-dev libxfixes3 libxcomposite1 \
  libxdamage1 libatk-bridge2.0-0 libpango-1.0-0 libcairo2 \
  libcups2 \
  && rm -rf /var/lib/apt/lists/*

# --- Runner base: minimal Debian with wget for healthcheck ---
FROM node:20-bookworm-slim AS runner-base

RUN apt-get update && apt-get install -y --no-install-recommends wget \
  && rm -rf /var/lib/apt/lists/*

# --- Dependencies ---
FROM build-base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Video renderer: renders all Remotion compositions at build time ---
FROM build-base AS video-renderer
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install Chrome Headless Shell for Remotion (no FFmpeg needed since v4)
RUN npx remotion browser ensure

# Render all video compositions to public/videos/
RUN node scripts/render-all.mjs

# --- Next.js builder ---
FROM build-base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy pre-rendered videos into public/ before Next.js build
COPY --from=video-renderer /app/public/videos ./public/videos

# Build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-secret-will-be-replaced
ENV MONGODB_URI=mongodb://localhost:27017/ichnusa
ENV SKIP_ENV_VALIDATION=1

RUN npm run build

# --- Production runner: slim, no Chrome, no build tools ---
FROM runner-base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
