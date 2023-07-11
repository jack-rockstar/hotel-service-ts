FROM node:18-alpine

RUN npm install -g ts-node

WORKDIR /user/src/

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV=production
ENV PORT=8080
ENV DB_PORT=7830
ENV DB_HOST=containers-us-west-5.railway.app
ENV DB_USER=postgres
ENV DB_PASSWORD=GaxrTU6TJGyaWLDU4A8D
ENV DB_POSTGRES_DB=railway
ENV JWT_SECRET=hotel-secret

RUN npm run m:gen -- src/migrations/InitDB

RUN npm run m:run 

#docker-compose up -d
# docker build --no-cache --progress=plain  -t hotel-service . 

# arrancar image
# docker run -it -p 8080:8080 hotel-service

EXPOSE 8080

CMD ["npm", "start"]