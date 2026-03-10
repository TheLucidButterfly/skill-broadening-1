FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json package-lock.json* ./
RUN npm install --production --silent
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]
