<?php

namespace API;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \API\Controllers\Index as CIndex;

class Index {
  function __construct(\Slim\App $app) {
    $container = $app->getContainer();

    $config = json_decode(file_get_contents(ROOT_PATH . '/config/index.json'));
    $container['config'] = $config;

    $this->middlewares($app);
    $this->routes($app);

    $app->run();
  }

  function middlewares($app) {
    $app->add(new \Psr7Middlewares\Middleware\TrailingSlash(true));
  }

  function routes($app) {
    $app->group('/api', function() {
      $this->get('/', CIndex::class . ':index');
    });
  }
}
