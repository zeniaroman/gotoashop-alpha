<?php
declare(strict_types = 1);
namespace App\controller;

use App\base\Registry;

class RequestCli extends Request
{
	public function init(): void
	{
		$this->method = $[$_SERVER['REQUEST_METHOD']];
		$args = $_SERVER['argv'];

		foreach($args as $arg) {
			if(preg_match('/^path:(\S+)/', $arg, $matches)) {
				$this->path = $matches[1];
			} else {
				if(strpos($arg, '=')) {
					list($key, $val) = explode('=', $arg);
					$this->setProperty($key, $val);	
				}
			}
		}

		$this->path = (empty($this->path)) ? '/' : $this->path;
	}

	public function forward(string $path): void
	{
		$_SERVER['argv'][] = 'path:' . $path;

		Registry::reset();
		Controller::run();
	}
}