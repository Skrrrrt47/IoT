# Base Stage: Install dependencies and build the Next.js app
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./ 

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the Next.js app
RUN npm run build

# Production Stage: Run the Next.js app with minimal image size
FROM --platform=$TARGETPLATFORM node:20-alpine

# Set environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --only=production

# Expose the default Next.js port
EXPOSE 3000

# Start
CMD ["npm", "start"]