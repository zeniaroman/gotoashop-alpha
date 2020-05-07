<?php declare(strict_types = 1);
namespace App;

use App\controller\Controller;

class Runner
{
	private function __construct()
	{}

	public static function run(bool $debug = false): void
	{
		self::debug($debug);

		Controller::run();

		// self::showLoadTime();
	}

	private static function debug(bool $debug): void
	{
		$value = intval($debug);

		ini_set('display_errors', '1');
		ini_set('display_startup_errors', (string) $value);

		error_reporting($value ? E_ALL : 0);
	}

	private static function showLoadTime(): void
	{
		$loadingTime = number_format(microtime(true) - APP_START_TIME, 4) * 1000;

		echo '<style>#appLoadingTime{display:block;position:fixed;left:0;bottom:0;width:100%;font-size:11px;text-align:right;z-index:1}</style>' .
			'<style>#appLoadingTime:after{content:"' . $loadingTime . ' ms";background: #fff;}</style>' .
			'<small id="appLoadingTime"></small>';
	}
}