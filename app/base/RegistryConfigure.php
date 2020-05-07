<?php declare(strict_types = 1);
namespace App\base;

class RegistryConfigure extends Registry
{
	protected static $instance = null;

	public static function instance(): self
	{
		return self::$instance ?? self::$instance = new self();
	}

	private function getKey(): string
	{
		$method = debug_backtrace()[1]['function'];

		return strtolower(substr($method, 3));
	}

	public function getConfig(string $valueKey = null)
	{
		$key = $this->getKey();

		return $valueKey && $this->get($key)
			? $this->get($key)->getValue($valueKey)
			: $this->get($key);
	}

	public function setConfig(Conf $config): void
	{
		$key = $this->getKey();

		$this->get($key) ?? $this->set($key, $config);
	}

	public function getCommands(string $commandKey = null)
	{
		$key = $this->getKey();

		return $commandKey && $this->get($key)
			? $this->get($key)->getValue($commandKey)
			: $this->get($key);
	}

	public function setCommands(Conf $controls): void
	{
		$key = $this->getKey();

		$this->get($key) ?? $this->set($key, $controls);
	}
}