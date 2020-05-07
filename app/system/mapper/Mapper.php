<?php
declare(strict_types = 1);
namespace App\system\mapper;

use App\base\RegistryApplication;
use App\system\factory\PersistenceFactory;
use App\system\domain\DomainObject;
use App\system\domain\ObjectWatcher;
use App\system\collection\Collection;

abstract class Mapper
{
	protected $pdo = null;

	public function __construct()
	{
		$this->pdo = $this->pdo ?? RegistryApplication::i()->getPDO();
	}

	public function findLimit(int $limit): Collection
	{
		$limit = ctype_digit((string) $limit) ? $limit : 0 - $limit;

		$this->selectLimitStmt()->bindParam(':limit', $limit, \PDO::PARAM_INT);
		$this->selectLimitStmt()->execute();

		return $this->getCollection($this->selectLimitStmt()->fetchAll());
	}

	public function getFactory(): PersistenceFactory
	{
		return PersistenceFactory::getFactory($this->targetClass());
	}

	public function findAll(): Collection
	{
		$this->selectAllStmt()->execute([]);

		return $this->getCollection($this->selectAllStmt()->fetchAll());
	}

	public function find(int $id): ?DomainObject
	{
		$oldObject = $this->getFromMap($id);

		if(! is_null($oldObject)) {
			return $oldObject;
		}
		
		$this->selectStmt()->execute([$id]);
		$row = $this->selectStmt()->fetch();
		$this->selectStmt()->closeCursor();

		if(! is_array($row)) {
			return null;
		}

		if(! isset($row['id'])) {
			return null;
		}

		$object = $this->createObject($row);
		$object->markClean();

		return $object;
	}

	public function createObject(array $row): DomainObject
	{
		$objectFactory = $this->getFactory()->getDomainObjectFactory();

		return $objectFactory->createObject($row);
	}

	public function getCollection(array $raw): Collection
	{
		return $this->getFactory()->getCollection($raw);
	}

	public function insert(DomainObject $object): void
	{
		$this->doInsert($object);
		$this->addToMap($object);
		$object->markClean();
	}

	private function getFromMap(int $id): ?DomainObject
	{
		return ObjectWatcher::exists(
			$this->targetClass(),
			$id
		);
	}

	private function addToMap(DomainObject $object): DomainObject
	{
		return ObjectWatcher::add($object);
	}

	abstract public function update(DomainObject $object): void;
	abstract protected function doInsert(DomainObject $object): void;
	abstract protected function selectAllStmt(): \PDOStatement;
	abstract protected function selectStmt(): \PDOStatement;
	abstract protected function targetClass(): string;
}