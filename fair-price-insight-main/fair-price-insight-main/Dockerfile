Stage 1: Build the React/Vite app
FROM node:20-alpine AS build
WORKDIR /app
# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install
# Copy source and build
COPY
RUN npm run build
Stage 2: Serve with Nginx --
FROM nginx:alpine
# Remove default nginx static assets RUN m-rf /usr/share/nginx/html/*# Copy build output from stage 1
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config (handles SPA client-side routing)
COPY nginx.conf letc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
