<?php
declare(strict_types = 1);
namespace App\component\good;

use App\system\domain\DomainObject;
use App\system\mapper\Mapper;

class GoodMapper extends Mapper
{
	private $selectAllStmt;
	private $selectStmt;
	private $updateStmt;
	private $insertStmt;

	public function __construct()
	{
		parent::__construct();

		$this->selectLimitStmt = $this->pdo->prepare(
			"SELECT * FROM goods ORDER BY id DESC LIMIT :limit, 4"
		);
		
		$this->selectAllStmt = $this->pdo->prepare(
			"SELECT * FROM goods"
		);

		$this->selectStmt = $this->pdo->prepare(
			"SELECT * FROM goods WHERE id=?"
		);

		$this->updateStmt = $this->pdo->prepare(
			"UPDATE goods SET worktime=?, description=?, preview=?, id=? WHERE id=?"
		);

		$this->insertStmt = $this->pdo->prepare(
			"INSERT INTO goods (owner, country, city, area, address, name, payment, maplink, contact, description, preview, json) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
		);

		$this->findAllByStoreIdStmt = $this->pdo->prepare(
			"SELECT * FROM goods WHERE store=?"
		);
	}

	protected function targetClass(): string
	{
		return Good::class;
	}

	protected function doInsert(DomainObject $object): void
	{
		$this->insertStmt->execute($object->getObjectArray(false, true));

		$id = (int) $this->pdo->lastInsertId();

		$object->setId($id);
	}

	public function update(DomainObject $object): void
	{
		$values = [
			$object->getWorktime(),
			$object->getDescription(),
			$object->getPreview(),
			$object->getId(),
			$object->getId()
		];

		$this->updateStmt->execute($values);
	}

	protected function selectLimitStmt(): \PDOStatement
	{
		return $this->selectLimitStmt;
	}

	protected function selectAllStmt(): \PDOStatement
	{
		return $this->selectAllStmt;
	}

	protected function selectStmt(): \PDOStatement
	{
		return $this->selectStmt;
	}

	protected function findAllByStoreIdStmt(): \PDOStatement
	{
		return $this->findAllByStoreIdStmt;
	}

	public function findAllByStore(int $id): ?GoodCollection
	{
		$this->findAllByStoreIdStmt()->execute([$id]);

		return $this->getCollection($this->findAllByStoreIdStmt()->fetchAll());
	}
}