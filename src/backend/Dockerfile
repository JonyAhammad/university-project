# Backend Dockerfile for development (hot reload)
FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm packages with legacy peer deps to handle conflicts
RUN npm install --legacy-peer-deps

# Copy application files
COPY . .

# Add entrypoint that expands *_FILE secrets into env vars
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Start application via entrypoint which will load Docker secrets if present
ENTRYPOINT ["sh", "/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "dev"]
