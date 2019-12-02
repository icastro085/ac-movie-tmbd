<?php
namespace API\Controllers;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use \API\Services\User as SUser;

class User {
  private $_service;

  function __construct($container) {
    $this->_service = new SUser($container['db']);
  }

  function index(Request $request, Response $response) {
    $email = 'ivanildo.decastro085@gmail.com';
    $data = [
      'name' => 'Ivanildo de Castro',
      'email' => 'ivanildo.decastro085@gmail.com'
    ];

    $user = $this->_service->get($email);

    if (!$user) {
      $this->_service->create($data);
    } else {
      $this->_service->update($email, $data);
    }

    return  $response->withJson($data, 200);
  }

  function addressSave(Request $request, Response $response) {
    $data = $request->getParsedBody();
    if ($this->_service->saveAddress($data)) {
      return  $response->withJson([
        'message' => 'ok'
      ], 200);
    }
    
    return  $response->withJson([
      'message' => 'error'
    ], 500);
  }

  function addressGet(Request $request, Response $response) {
    $queryParams = $request->getQueryParams();
    return  $response->withJson(
      $this->_service->getAddress($queryParams['email']),
      200
    );
  }
}
