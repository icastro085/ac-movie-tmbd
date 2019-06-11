FROM composer:1.8.5

ENV WORKDIR=/usr/src/app

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

RUN apk add --no-cache postgresql postgresql-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql

COPY api/composer.json .
COPY api/config ./config
COPY api/src ./src
COPY api/index.php .

RUN rm -rf vendor
RUN composer clear-cache
RUN composer install --ignore-platform-reqs --no-scripts --no-dev --no-interaction --no-progress
VOLUME [ "$WORKDIR/vendor" ]

COPY app/dist .
COPY googlea7e95638c26fd590.html .

# just to be used in local, dont work in heroku
EXPOSE $PORT

COPY docker-entrypoint.sh .
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD php -S 0.0.0.0:$PORT
