FROM node:14-alpine

RUN apk update && apk add yarn

WORKDIR /app/home

# Copiando aplicacao pro lado do volume
COPY . .

# Clonando env
RUN cp .env.prod .env

RUN yarn install

EXPOSE 3333

CMD ["yarn", "start"]
