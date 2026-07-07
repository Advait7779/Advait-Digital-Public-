# ── Stage 1: Build the Static Frontend Assets ──
FROM node:22-alpine AS builder
WORKDIR /app

# Copy root configurations
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install root & frontend dependencies
RUN npm install
RUN cd frontend && npm install

# Copy all source files
COPY . .

# Run the build script (generates dist/ at root)
RUN node build-all.js

# ── Stage 2: Serve Statically with Caddy ──
FROM caddy:2-alpine
COPY --from=builder /app/dist /usr/share/caddy
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":80"]
