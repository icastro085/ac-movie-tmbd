FROM node:10.8.0

ENV WORKDIR=/usr/src/app

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY package.json .
RUN yarn

VOLUME [ "$WORKDIR/node_modules" ]

EXPOSE 4212
CMD yarn start
