<?php declare(strict_types = 1);

namespace App\base;

use App\system\abstraction\Registry;

class Conf extends Registry
{
	private $values = [];

	public function __construct(array $values = [])
	{
		$this->values = $values;
	}

	protected function get(string $key)
	{
		return isset($this->values[$key]) ?
			$this->values[$key] :
			null;
	}

	protected function set(string $key, $value): void
	{
		$this->values[$key] = $value;
	}

	public function getValue(string $key)
	{
		return $this->get($key);
	}

	public function setValue(string $key, $value): void
	{
		$this->set($key, $value);
	}
}