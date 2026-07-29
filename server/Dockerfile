# ---- Stage 1: install production dependencies only ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Stage 2: final runtime image ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only the installed node_modules from the deps stage (no dev deps, no build cache)
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# node:alpine ships a built-in non-root "node" user (uid 1000) — use it instead of root
USER node

EXPOSE 5000

# Basic health check hitting the "/" route already defined in app.js
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

# NOTE: change "src/index.js" below if your actual entry file (the one
# that calls app.listen()) has a different name/path.
CMD ["node", "src/index.js"]