<?php
const DS = DIRECTORY_SEPARATOR;
const ROOT_PATH = __DIR__ . DS;
const SRC_PATH = ROOT_PATH . 'src' . DS;

require_once ROOT_PATH . 'vendor/autoload.php';
require_once SRC_PATH . 'Autoloader.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$configuration = [
  'settings' => [
    'displayErrorDetails' => false,
  ],
];

$c = new \Slim\Container($configuration);

new \API\Autoloader();
new \API\Index(new \Slim\App($c));
?>
