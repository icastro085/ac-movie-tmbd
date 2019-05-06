#!/bin/bash

# creating frontend dist
docker-compose run app yarn build

# creating image
docker build -t heroku-web-movie-ac .

# login in heroku
heroku login

# login in heroku container registry
heroku container:login

# push current image to heroku
heroku container:push web --app web-movie-ac

# release app
heroku container:release web --app web-movie-ac

# open in browser
# heroku open --app web-movie-ac

# if have some error
# heroku logs --tail --app web-movie-ac

# how you can entry in local container
# docker run -it -p 4211:4211 -e PORT=4211 -e TMDB_API_KEY="" heroku-web-movie-ac
