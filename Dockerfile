FROM node:latest
WORKDIR /app
COPY ./init.sh /var
RUN npm i -g @adonisjs/cli
RUN chmod +x /var/init.sh
CMD /var/init.sh
