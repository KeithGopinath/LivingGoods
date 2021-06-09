FROM 812080670811.dkr.ecr.us-east-1.amazonaws.com/demo-pupose:node as builder

RUN chown -R node:node /home/node

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app

ENV HOME /home/node

ADD . .

USER node

RUN npm install

RUN npm run build:test

#EXPOSE 80

#CMD ["npm","start"]

FROM 812080670811.dkr.ecr.us-east-1.amazonaws.com/demo-pupose:nginx
EXPOSE 80
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/build /usr/share/nginx/html
