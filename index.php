<?php declare(strict_types = 1);
define('APP_START_TIME', microtime(true));

require_once(__DIR__ . '/vendor/autoload.php');

App\Runner::run(true);