<?php

namespace API\Middleware;

class Authenticator {
  public function __invoke($request, \Slim\Middleware\TokenAuthentication $tokenAuth) {
    $token = $tokenAuth->findToken($request);

    $client = new \Google_Client();
    $tokenData = $client->verifyIdToken($token);
    if (!$tokenData) {
      throw new \Exception('Unauthorized', 401);
    }
  }
}
