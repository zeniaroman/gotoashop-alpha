<?php declare(strict_types = 1);

namespace App\controller;

use App\system\abstraction\Request;
use App\controller\Response;

class RequestHttp extends Request
{
	public function init(): void
	{
		$this->method = $_SERVER['REQUEST_METHOD'];
		$this->properties = $_REQUEST;
		$this->parse($_SERVER['REQUEST_URI']);
	}

	public function forward(string $path): void
	{
		Response::redirect($path);
	}

	private function parse(string $uri): void
	{
		$uri = parse_url($uri, PHP_URL_PATH);

		if($uri) {
			list(, $path, $entity, $id) = 
				array_pad(
					explode('/', str_replace($this->getRoot(), '/', $uri))
				, 4, null);

			$this->setPath($path);
			$entity && $this->setEntity($entity);
			$id && $this->setId($id);
		}
	}
}