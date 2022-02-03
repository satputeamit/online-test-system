FROM node:16.13
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
ENV DB mongoOTSdb:27017  
ENV AUTH_SERVICE http://auth-service-app:4001/graphql
ENV COMPETITION_SERVICE http://competition-service-app:4002/graphql
EXPOSE 4000
CMD [ "npm", "start" ]