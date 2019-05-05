<?php

namespace API\Services;

use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\ClientException;

class Movie {

  private $_tmdbOptions;
  private $_baseUri;
  private $_apiKey;

  function __construct($options) {
    $this->_tmdbOptions = $options;
    $this->_baseUri = $this->_tmdbOptions->url . '/3/';
    $this->_apiKey = getenv('TMDB_API_KEY');
  }

  function getUpcoming(array $queryParams = array()) {
    try {
      $client = new \GuzzleHttp\Client([
        'base_uri' => $this->_baseUri
      ]);

      $response = $client->request(
        'GET',
        'movie/upcoming',
        [
          'query' => $this->getValidQueryUpcoming($queryParams)
        ]
      );

      return json_decode($response->getBody()->getContents());
    } catch (ClientException $e) {
      echo Psr7\str($e->getRequest());
      echo Psr7\str($e->getResponse());
    }
  }

  function getValidQueryUpcoming($queryParams) {
    $keys = ['page', 'language' ];
    $defaultQuery = ['page' => 1, 'language' => 'en-US'];

    return array_merge(
      array_combine($keys,
        array_map(function ($key) use ($queryParams, $defaultQuery ) {
        return $queryParams[$key] !== NULL ? $queryParams[$key] :  $defaultQuery[$key];
      }, $keys))) + [
        'api_key' => $this->_apiKey
      ];
  }
}
