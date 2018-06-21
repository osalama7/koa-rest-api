FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ENV NODE_ENV development

EXPOSE 3030
CMD ["npm", "run", "start"]

