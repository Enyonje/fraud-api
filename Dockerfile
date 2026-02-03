# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install ALL dependencies
RUN npm ci

# Copy configuration and source
COPY tsconfig*.json ./
COPY src ./src

# Perform the build
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the compiled code from the build stage
COPY --from=build /app/dist ./dist

# Optional: If your app needs the .env file to run (though often passed via Docker Compose)
# COPY .env ./ 

EXPOSE 3000

# Use the compiled entry point
CMD ["node", "dist/index.js"]