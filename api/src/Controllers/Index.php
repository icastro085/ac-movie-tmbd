<?php
namespace API\Controllers;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class Index {
  function __construct($container) {
  }

  function index(Request $request, Response $response) {
    $response->getBody()->write('Hello');
    return $response;
  }
}
