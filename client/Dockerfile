# ---- Stage 1: build the static Vite/React app ----
FROM node:20-alpine AS build
WORKDIR /app

# Vite bakes VITE_* vars into the bundle at build time, not at container
# start — so this has to come in as a build arg, not a runtime env var.
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Stage 2: serve the built files with nginx (runs as non-root already) ----
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]