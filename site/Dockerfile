FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
COPY . .
RUN npm run build

FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
