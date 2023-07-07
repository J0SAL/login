# Stage 1: Build stage

FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production stage

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY package*.json ./
# using least privilage user ~ node user come prebundeled with the node:16-alpine
USER node 
CMD npm run start