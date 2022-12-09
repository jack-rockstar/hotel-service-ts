FROM node:18-alpine

RUN npm install -g ts-node

WORKDIR /user/src/

COPY package*.json ./

COPY . .

RUN npm install

# ENV NODE_ENV=PRODUCTION

# RUN npm run m:gen --src/migrations/InitDB

# RUN npm run m:run 

EXPOSE 8080

CMD ["npm", "start"]