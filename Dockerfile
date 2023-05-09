FROM node:18-alpine

WORKDIR /app
COPY package*.json package-lock.json tsconfig.json ./
COPY node_modules ./node_modules
COPY dist ./dist

CMD [ "node", "dist/main.js" ]