FROM node:22-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client offline
RUN npx --no-install prisma generate

# Copy rest of the application code
COPY . .

# Expose port (default in your production environment is 5002)
EXPOSE 5002

# Start the application via start.js (runs auto-baselining check)
CMD ["node", "start.js"]
