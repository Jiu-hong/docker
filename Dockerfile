FROM node:12.19.0 as build

COPY . /src
WORKDIR /src


RUN npm install

RUN npm run build

FROM node:12.19.0 

WORKDIR /usr/src/app


COPY --from=build /src/node_modules /usr/src/app/node_modules
COPY --from=build /src/package.json /usr/src/app/package.json
COPY --from=build /src/.next /usr/src/app/.next
COPY --from=build /src/public /usr/src/app/public

CMD ["npm", "start"]