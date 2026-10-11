# syntax=docker/dockerfile:1

# ---------- dependencies (full, including dev) ---------------------------
FROM node:24-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- development ---------------------------------------------------
# Used by docker-compose.override.yml for hot reload. Needs devDependencies
# because the Next.js compiler and tailwind live there.
FROM deps AS development
ENV NODE_ENV=development
COPY next.config.ts tsconfig.json postcss.config.mjs ./
COPY public ./public
COPY src ./src

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=90s --retries=10 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

# -H 0.0.0.0 is required: the dev server binds to loopback by default, which
# the published port cannot reach.
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

# ---------- build ---------------------------------------------------------
FROM deps AS build
ENV NODE_ENV=production
# Baked into the client bundle at build time, so it has to arrive here and not
# only at runtime.
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY next.config.ts tsconfig.json postcss.config.mjs ./
COPY public ./public
COPY src ./src
RUN npm run build

# ---------- production ----------------------------------------------------
FROM node:24-slim AS production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app

# `output: "standalone"` in next.config.ts emits a self-contained server plus a
# traced node_modules, so this stage needs no npm install at all.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=40s --retries=5 \
    CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]