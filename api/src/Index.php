<?php

namespace API;

use Slim\Middleware\TokenAuthentication;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

use \API\Controllers\Index as CIndex;
use \API\Controllers\Movie as CMovie;
use \API\Controllers\User as CUser;

class Index {
  function __construct(\Slim\App $app) {
    $container = $app->getContainer();

    $this->setPageNotFound($container);
    $this->setErrorPage($container);
    $this->setConfig($container);
    $this->setDataBase($container);

    $this->middlewares($app);
    $this->routes($app);

    \Dotenv\Dotenv::create(ROOT_PATH)->load();

    $app->run();
  }

  function middlewares($app) {
    $app->add(new \Psr7Middlewares\Middleware\TrailingSlash(false));

    $authenticator = function(
      $request,
      \Slim\Middleware\TokenAuthentication $tokenAuth
    ){
      $token = $tokenAuth->findToken($request);

      $client = new \Google_Client();
      $tokenData = $client->verifyIdToken($token);
      if (!$tokenData) {
        throw new \Exception('Unauthorized', 401);
      }
    };

    $app->add(new \Slim\Middleware\TokenAuthentication([
      'path' => ['/api/user'],
      'regex' => '/\s+(.*)$/i',
      'authenticator' => $authenticator
    ]));
  }

  function setPageNotFound($container) {
    $container['notFoundHandler'] = function ($c) {
      return function ($request, $response) use ($c) {
        return $response->withStatus(404)
          ->withJson([ 'message' => 'Page not found' ]);
      };
    };
  }

  function setErrorPage($container) {
    $container['errorHandler'] = function ($c) {
      return function ($request, $response, $exception) use ($c) {
          return $response->withStatus($exception->getCode() ? $exception->getCode() : 500)
              ->withJson([
                'message' => 'Something went wrong! - ' . $exception->getMessage()
              ]);
      };
    };
  }

  function setConfig($container) {
    $container['config'] = json_decode(
      file_get_contents(ROOT_PATH . '/config/index.json')
    );
  }

  function setDataBase($container) {
    $container['db'] = function($c) {
      $database = $c['config']->database;

      return \ParagonIE\EasyDB\Factory::fromArray([
        $database->dsn,
        getenv('PGSQL_USER'),
        getenv('PGSQL_PASS')
      ]);
    };
  }

  function routes($app) {

    $app->get('/', CIndex::class . ':index');

    $app->group('/api', function() {
      $this->get('/movie/upcoming', CMovie::class . ':upcoming');
      $this->get('/movie/search', CMovie::class . ':search');
      $this->get('/movie/genre', CMovie::class . ':genre');
      $this->get('/movie/{idMovie}', CMovie::class . ':details');

      $this->get('/user', CUser::class . ':index');
      $this->get('/user/address', CUser::class . ':addressGet');
      $this->post('/user/address', CUser::class . ':addressSave');
    });
  }
}
