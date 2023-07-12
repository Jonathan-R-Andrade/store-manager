FROM node:16

WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm install

COPY ./tests ./tests
COPY ./src ./src

CMD [ "npm","start" ]
