FROM composer:1.8.5

ENV WORKDIR=/usr/src/api

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

RUN apk add --no-cache postgresql postgresql-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql

COPY composer.json .

RUN rm -rf vendor
RUN composer clear-cache
RUN composer install --ignore-platform-reqs --no-scripts

VOLUME [ "$WORKDIR/vendor" ]

EXPOSE 4211
CMD php -S 0.0.0.0:4211
