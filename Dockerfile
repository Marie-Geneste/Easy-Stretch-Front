#docker build --file Dockerfile "." -t frontimage
# docker run -d --name reactcontainer frontimage
FROM node:24

WORKDIR /O-Stretch--Front

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST=0.0.0.0
ENV PORT=3001

EXPOSE 3001
CMD ["npm", "start"]