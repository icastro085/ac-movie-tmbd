FROM composer:1.8.5

ENV WORKDIR=/usr/src/app

RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR

COPY api/composer.json .
COPY api/config ./config
COPY api/src ./src
COPY api/index.php .

RUN composer install --ignore-platform-reqs --no-scripts
VOLUME [ "$WORKDIR/vendor" ]

# create empty .env
RUN touch .env

COPY app/dist .

# just to be used in local, dont work in heroku
EXPOSE $PORT

COPY docker-entrypoint.sh .
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD php -S 0.0.0.0:$PORT
