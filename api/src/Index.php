<?php

namespace API;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

use \API\Controllers\Index as CIndex;
use \API\Controllers\Movie as CMovie;

class Index {
  function __construct(\Slim\App $app) {
    $container = $app->getContainer();

    $this->setPageNotFound($container);

    $config = json_decode(file_get_contents(ROOT_PATH . '/config/index.json'));
    $container['config'] = $config;

    $this->middlewares($app);
    $this->routes($app);

    \Dotenv\Dotenv::create(ROOT_PATH)->load();

    $app->run();
  }

  function middlewares($app) {
    $app->add(new \Psr7Middlewares\Middleware\TrailingSlash(false));
  }

  function setPageNotFound($container) {
    $container['notFoundHandler'] = function ($c) {
      return function ($request, $response) use ($c) {
        return $response->withStatus(404)
          ->withJson([ 'message' => 'Page not found' ]);
      };
    };
  }

  function routes($app) {
    $app->group('/api', function() {
      $this->get('/', CIndex::class . ':index');
      $this->get('/movie/upcoming', CMovie::class . ':upcoming');
      $this->get('/movie/search', CMovie::class . ':search');
      $this->get('/movie/{idMovie}', CMovie::class . ':details');
    });
  }
}
