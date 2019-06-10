<?php

namespace API\Services;

use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\ClientException;

class User {

  private $_db;

  function __construct($db) {
    $this->_db = $db;
  }

  function get($email) {
    return $this->_db->row(
      'SELECT * FROM "user" WHERE "email" = ?',
      $email
    );
  }

  function create(array $data) {
    return $this->_db->insert('user', $data);
  }

  function update($email, $data) {
    return $this->_db->update('user', $data, [
      'email' => $email
    ]);
  }

  function saveAddress(array $data) {
    $email = $data['email'];
    $address = $this->getAddress($email);

    if ($address) {
      return $this->_db->update('address', $data, [
        'email' => $email
      ]);
    } else {
      return $this->_db->insert('address', $data);
    }
  }

  function getAddress($email) {
    return $this->_db->row(
      'SELECT * FROM "address" WHERE "email" = ?',
      $email
    );
  }
}
