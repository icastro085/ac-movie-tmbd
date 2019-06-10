FROM composer:1.8.5

ENV WORKDIR=/usr/src/api

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY composer.json .

RUN composer install --ignore-platform-reqs --no-scripts
VOLUME [ "$WORKDIR/vendor" ]

RUN apk add postgresql postgresql-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql

EXPOSE 4211
CMD php -S 0.0.0.0:4211
