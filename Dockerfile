FROM node:13

COPY . .
RUN npm install

EXPOSE 3333

ENTRYPOINT npm start