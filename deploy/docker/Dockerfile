# Multi-stage Dockerfile for FarmPro AI (Frontend + Master Node Server)
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/backend ./backend
COPY --from=build /app/docs ./docs
COPY --from=build /app/tests ./tests

EXPOSE 3000

CMD ["npx", "tsx", "backend/src/server.ts"]

