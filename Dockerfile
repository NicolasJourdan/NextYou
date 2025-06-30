# Étape 1 : build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : environnement dev
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install -g npm

EXPOSE 3000

CMD ["npm", "run", "dev"]
