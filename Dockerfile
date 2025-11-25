FROM node:22-alpine

#WORKDIR /
WORKDIR /app

#COPY / /
COPY / /app

RUN npm install --production

EXPOSE 3000

#CMD ["node", "app.js"]
CMD ["node", "/app/app.js"]
