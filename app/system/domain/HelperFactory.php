<?php
declare(strict_types = 1);
namespace App\system\domain;

use App\system\mapper\Mapper;
use App\system\collection\Collection;

class HelperFactory
{
	public static function getMapper(string $type): Mapper
	{
		$class = self::getClass($type, 'Mapper'); 

		return new $class();
	}

	public static function getCollection(string $type): Collection
	{
		$class = self::getClass($type, 'Collection');
		
		return new $class();
	}

	private static function getClass(string $type, string $prefix): string
	{
		$type = explode('\\', $type);
		$class = '\App\component\\' . end($type) . '\\' . ucfirst(end($type)) . $prefix;

		if(class_exists($class)) {
			return $class;
		}

		throw new \Exception('Unknown: ' . $class);
	}
}