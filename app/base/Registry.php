<?php declare(strict_types = 1);

namespace App\base;

use App\system\abstraction\Registry as RegistryAbstract;

abstract class Registry extends RegistryAbstract
{
	private $values = [];

	final protected function __construct()
	{}

	final protected function __clone()
	{}

	abstract public static function instance();

	public static function i(): self
	{
		return static::instance();
	}

	public static function reset(): void
	{
		static::$instance = null;
	}

	protected function get(string $key)
	{
		return isset($this->values[$key])
			? $this->values[$key]
			: null;
	}

	protected function set(string $key, $value): void
	{
		$this->values[$key] = $value;
	}
}