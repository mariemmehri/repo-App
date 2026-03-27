# ─── Stage 1 : Build ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json en premier pour profiter du cache Docker
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copier le reste et builder
COPY . .
RUN npm run build

# ─── Stage 2 : Serve avec Nginx ────────────────────────────────
FROM nginx:alpine

# Copier le build Angular vers Nginx
COPY --from=builder /app/dist/todo-frontend/browser /usr/share/nginx/html

# Copier la config Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]