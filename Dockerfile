# syntax=docker/dockerfile:1
#
# Production image for the Bio-AI Centre of Excellence site (Next.js standalone output).
#
# Build:
#   docker build -t bio-ai \
#     --build-arg NEXT_PUBLIC_APP_URL=https://bio-ai.example.com .
#
# Run:
#   docker run -d -p 3000:3000 --env-file .env.production bio-ai
#
# Build-time values (--build-arg), baked into the image at `next build`:
#   NEXT_PUBLIC_APP_URL   Public origin used in quiz result QR links.
#   KIOSK_MODE            "true" redirects / to /kiosk (build a separate kiosk image).
#   NEXT_PUBLIC_IS_KIOSK  Same effect as KIOSK_MODE.
#
# Runtime values (docker run -e / --env-file). Never pass these as build args,
# because build args are visible in the image history:
#   QUIZ_SESSION_SECRET (required for the quiz, 32+ chars), SUPABASE_URL,
#   SUPABASE_SECRET_KEY, GEMINI_API_KEY or GOOGLE_API_KEY, RESEND_API_KEY, EMAIL_FROM

ARG NODE_VERSION=22

# ---- deps: install node_modules from the lockfile ----
# The lockfile pins musl builds of every native dependency (Next SWC, sharp,
# lightningcss, Tailwind oxide), so Alpine needs no glibc compatibility layer.
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---- builder: compile the Next.js app ----
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_APP_URL=""
ARG NEXT_PUBLIC_IS_KIOSK=false
ARG KIOSK_MODE=false
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
    NEXT_PUBLIC_IS_KIOSK=${NEXT_PUBLIC_IS_KIOSK} \
    KIOSK_MODE=${KIOSK_MODE} \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- runner: minimal runtime image ----
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# Standalone output does not include public/ or .next/static, so copy them in.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
