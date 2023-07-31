# base image
FROM node:14

# setup work directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# build the React app
RUN npm run build

# expose port
EXPOSE 3000

# start server
CMD npm start

