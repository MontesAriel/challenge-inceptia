FROM node:alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --loglevel verbose
COPY . .

RUN npm run build  
CMD ["node", "server.js"]
