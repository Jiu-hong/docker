FROM node:12.19.0 as build

COPY . /src
WORKDIR /src


RUN npm install

RUN npm run build

FROM node:12.19.0 

WORKDIR /usr/src/app


COPY /src /usr/src/app

CMD ["npm", "start"]