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
COPY --from=build /app/server.ts ./server.ts
COPY --from=build /app/src/server ./src/server
COPY --from=build /app/src/prompts ./src/prompts

EXPOSE 3000

CMD ["npx", "tsx", "server.ts"]

