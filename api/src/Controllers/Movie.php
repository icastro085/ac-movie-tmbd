<?php
namespace API\Controllers;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use \API\Services\Movie as SMovie;

class Movie {
  private $_service;

  function __construct($container) {
    $this->_service = new SMovie($container['config']->tmdb);
  }

  function index(Request $request, Response $response) {
    $response->getBody()->write('Hello');
    return $response;
  }

  function upcoming(Request $request, Response $response) {
    $queryParams = $request->getQueryParams();
    $data = $this->_service->getUpcoming($queryParams);
    return $response->withJson($data, 200);
  }
}
