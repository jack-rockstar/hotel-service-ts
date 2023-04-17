FROM node:18-alpine

RUN npm install -g ts-node

WORKDIR /user/src/

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run m:gen -- src/migrations/InitDB

RUN npm run m:run 

#docker-compose up -d
# docker build --no-cache --progress=plain  -t hotel-service . 

# arrancar image
# docker run -it -p 8080:8080 hotel-service

EXPOSE 8080

CMD ["npm", "start:prod"]