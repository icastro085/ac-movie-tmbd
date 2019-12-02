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
      $response = $this->getClient()->request(
        'GET',
        'movie/upcoming',
        [
          'query' => $this->getValidQueryUpcoming(
            $queryParams,
            [ 'page', 'language' ]
          )
        ]
      );

      return json_decode($response->getBody()->getContents());
    } catch (ClientException $e) {
      return [
        'status_code' => '500',
        'status_message' => 'Internal Erro Server',
        'success' => false
      ];
    }
  }

  function getDetails($idMovie) {
    try {
      $response = $this->getClient()->request(
        'GET',
        "movie/$idMovie",
        [
          'query' => [ 'api_key' => $this->_apiKey ]
        ]
      );

      return json_decode($response->getBody()->getContents());
    } catch (ClientException $e) {
      return [
        'status_code' => '500',
        'status_message' => 'Internal Erro Server',
        'success' => false
      ];
    }
  }

  function search(array $queryParams = array()) {
    try {
      $response = $this->getClient()->request(
        'GET',
        'search/movie',
        [
          'query' => $this->getValidQueryUpcoming(
            $queryParams,
            [ 'page', 'language' , 'query' ]
          )
        ]
      );

      return json_decode($response->getBody()->getContents());
    } catch (ClientException $e) {
      return [
        'status_code' => '500',
        'status_message' => 'Internal Erro Server',
        'success' => false
      ];
    }
  }

  function genre() {
    try {
      $response = $this->getClient()->request(
        'GET',
        'genre/movie/list',
        [
          'query' => [ 'api_key' => $this->_apiKey ]
        ]
      );

      return json_decode($response->getBody()->getContents());
    } catch (ClientException $e) {
      return [
        'status_code' => '500',
        'status_message' => 'Internal Erro Server',
        'success' => false
      ];
    }
  }

  function getClient() {
    return new \GuzzleHttp\Client([
      'base_uri' => $this->_baseUri
    ]);
  }

  function getValidQueryUpcoming($queryParams, array $keys) {
    $defaultQuery = [ 'page' => 1, 'language' => 'en-US' ];

    return array_merge(array_combine(
        $keys,
        array_map(function ($key) use ($queryParams, $defaultQuery ) {
          return $queryParams[$key] !== NULL ? $queryParams[$key] :  $defaultQuery[$key];
        }, $keys))
      ) + [
        'api_key' => $this->_apiKey
      ];
  }
}
