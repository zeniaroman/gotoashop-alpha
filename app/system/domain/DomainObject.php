<?php
declare(strict_types = 1);
namespace App\system\domain;

use App\system\mapper\Mapper;
use App\system\collection\Collection;

abstract class DomainObject
{
	private $id = null;

	public function __construct(int $id)
	{
		$this->id = $id;
		if($this->id < 1) {
			$this->markNew();
		}
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function setId(int $id): void
	{
		$this->id = $id;
	}

	public function getObjectArray(bool $withId = false, bool $indexNumeric = false): array
	{
		$object = new \ReflectionClass($this);
		$objectArray = [];

		if($withId) {
			$objectArray['id'] = $this->getId();
		}

		foreach ($object->getProperties() as $property) {
			$name = $property->name;
			$method = 'get' . ucfirst($name);

			$objectArray[$name] = $this->{$method}();
		}

		if($indexNumeric) {
			$objectArray = array_values($objectArray);
		}
		
		return $objectArray;
	}

	public function mapper() {
		return self::getMapper();
	}

	public function collection() {
		return self::getCollection();
	}

	public static function getMapper(string $type = null): Mapper
	{
		if(is_null($type)) {
			return HelperFactory::getMapper(static::class);
		}

		return HelperFactory::getMapper($type);
	}

	public static function getCollection(string $type = null): Collection
	{
		if(is_null($type)) {
			return HelperFactory::getCollection(static::class);
		}

		return HelperFactory::getCollection($type);
	}

	public function markNew(): void
	{
		ObjectWatcher::addNew($this);
	}

	public function markDeleted(): void
	{
		ObjectWatcher::addDelete($this);
	}

	public function markDirty(): void
	{
		ObjectWatcher::addDirty($this);
	}

	public function markClean(): void
	{
		ObjectWatcher::addClean($this);
	}

	public static function findLimit(int $limit): Collection
	{
		return self::getMapper()->findLimit($limit);
	}

	public static function findAll(): Collection
	{
		return self::getMapper()->findAll();
	}

	public static function find(int $id): ?DomainObject
	{
		return self::getMapper()->find($id);
	}
}