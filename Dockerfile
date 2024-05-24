FROM node:alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --loglevel verbose
COPY . .
 # Asegúrate de que esto genere la carpeta `build`
RUN npm run build  
CMD ["node", "server.js"]
