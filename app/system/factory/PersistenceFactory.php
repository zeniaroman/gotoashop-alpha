<?php
declare(strict_types = 1);
namespace App\system\factory;

use App\system\mapper\Mapper;
use App\system\collection\Collection;

abstract class PersistenceFactory
{
	private static $prefix = 'PersistenceFactory';

	abstract public function getMapper(): Mapper;
	abstract public function getCollection(array $raw): Collection;
	abstract public function getDomainObjectFactory(): DomainObjectFactory;

	public static function getFactory($targetClass): PersistenceFactory
	{
		$class = explode('\\', $targetClass);

		$persistenceClass = '\App\component\\' . end($class) . '\\' . ucfirst(end($class)) . self::$prefix;

		return new $persistenceClass();

		throw new \Exception('Unknown class ' . $targetClass);
	}
}