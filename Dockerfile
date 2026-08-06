# Build and serve the full-stack Royal Shopping app

# 1) build client
FROM node:20-alpine AS builder
WORKDIR /app
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/
COPY client ./client
COPY server ./server

RUN cd client && npm install && npm run build
RUN cd server && npm install --production

# 2) runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

WORKDIR /app/server
EXPOSE 5000
CMD ["node", "server.js"]
