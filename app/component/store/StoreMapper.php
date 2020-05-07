<?php
declare(strict_types = 1);
namespace App\component\store;

use App\system\domain\DomainObject;
use App\system\mapper\Mapper;

class StoreMapper extends Mapper
{
	private $selectAllStmt;
	private $selectStmt;
	private $updateStmt;
	private $insertStmt;

	public function __construct()
	{
		parent::__construct();

		$this->selectLimitStmt = $this->pdo->prepare(
			"SELECT * FROM stores ORDER BY id DESC LIMIT :limit, 5"
		);
		
		$this->selectAllStmt = $this->pdo->prepare(
			"SELECT * FROM stores"
		);

		$this->selectStmt = $this->pdo->prepare(
			"SELECT * FROM stores WHERE id=?"
		);

		$this->updateStmt = $this->pdo->prepare(
			"UPDATE stores SET worktime=?, description=?, preview=?, id=? WHERE id=?"
		);

		$this->insertStmt = $this->pdo->prepare(
			"INSERT INTO stores (owner, country, city, area, address, name, payment, maplink, contact, description, preview, json) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
		);

		$this->findByUserIdStmt = $this->pdo->prepare(
			"SELECT * FROM stores WHERE owner=?"
		);

		$this->findByLocationStmt = $this->pdo->prepare(
			"SELECT * FROM stores WHERE country=? AND city LIKE ?"
		);
	}

	protected function targetClass(): string
	{
		return Store::class;
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

	protected function findByUserIdStmt(): \PDOStatement
	{
		return $this->findByUserIdStmt;
	}

	public function findByUserId(int $id): ?StoreCollection
	{
		$this->findByUserIdStmt()->execute([$id]);

		return $this->getCollection($this->findByUserIdStmt()->fetchAll());
	}

	protected function findByLocationStmt(): \PDOStatement
	{
		return $this->findByLocationStmt;
	}

	public function findByLocation(int $country, string $city): ?StoreCollection
  {
  	$this->findByLocationStmt()->execute([$country, '%' . $city]);

    return $this->getCollection($this->findByLocationStmt()->fetchAll());
  }
}