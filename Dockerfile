FROM node:10.13.0-alpine as builder


RUN npm i -g @adonisjs/cli
RUN npm i -g pm2

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV HOST=0.0.0.0
# set app port
ENV PORT=3000

CMD [ "npm", "run", "prod"]
