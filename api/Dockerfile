FROM composer:1.8.5

ENV WORKDIR=/usr/src/api

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY composer.json .

RUN composer install --ignore-platform-reqs --no-scripts
VOLUME [ "$WORKDIR/vendor" ]

EXPOSE 4211
CMD php -S 0.0.0.0:4211
