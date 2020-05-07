<?php declare(strict_types = 1);

namespace App\system\abstraction;

use App\base\Registry as BaseRegistry;

abstract class Registry
{
	abstract protected function get(string $key);
	abstract protected function set(string $key, BaseRegistry $object): void;
}