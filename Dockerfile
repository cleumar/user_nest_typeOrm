FROM node:18-alpine

WORKDIR /app
COPY package*.json package-lock.json tsconfig.json ./
RUN npm cache clean --force && rm -rf node_modules && npm install

COPY dist ./dist

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]