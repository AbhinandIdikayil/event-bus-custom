FROM node:alpine

WORKDIR /event-bus

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","start" ]