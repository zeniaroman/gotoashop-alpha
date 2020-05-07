<?php
declare(strict_types = 1);
namespace App\system\factory;

use App\system\domain\DomainObject;
use App\system\domain\ObjectWatcher;

abstract class DomainObjectFactory
{
	abstract public function createObject(array $row): DomainObject;

	protected function getFromMap(string $class, int $id): ?DomainObject
	{
		return ObjectWatcher::exists($class, $id);
	}

	protected function addToMap(DomainObject $object): void
	{
		ObjectWatcher::add($object);
	}
}