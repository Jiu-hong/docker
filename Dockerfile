FROM node:12.19.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm i next

CMD ["npm", "run", "start"]