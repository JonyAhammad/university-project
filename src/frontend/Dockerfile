# Frontend Dockerfile for development (Vite)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install including dev dependencies to ensure Vite plugins are available in the dev image
RUN npm install --legacy-peer-deps --include=dev
COPY . .
EXPOSE 3000
# Bind Vite to 0.0.0.0 so the container port is reachable from the host
CMD ["npx","vite","--host","0.0.0.0"]
