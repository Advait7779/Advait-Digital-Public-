# ── Stage 1: Build Frontend ──
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=https://publicapi.advaitdigital.co.in
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ── Stage 2: Serve with Caddy ──
FROM caddy:2-alpine
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
