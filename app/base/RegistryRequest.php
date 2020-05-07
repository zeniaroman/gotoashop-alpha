<?php declare(strict_types = 1);

namespace App\base;

use App\system\abstraction\Request;
use App\controller\RequestHttp;
use App\controller\RequestCli;

class RegistryRequest extends Registry
{
	protected static $instance = null;

	public static function instance(): self
	{
		return !self::$instance ?
			self::$instance = new self() :
			self::$instance;
	}

	public function getRequest(): ?Request
	{
		return $this->get('request');
	}

	public function setRequest(Request $request): void
	{
		$this->set('request', $request);
	}

	public function getHttp(): Request
	{
		return $this->getRequest() ?? new RequestHttp();
	}

	public function getCli(): Request
	{
		return $this->getRequest() ?? new RequestCli();
	}
}