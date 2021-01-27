FROM node:12.19.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

CMD ["npm", "run", "start"]