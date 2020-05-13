<?php
declare(strict_types = 1);
namespace App\component\shop;

use App\system\domain\DomainObject;
use App\system\mapper\Mapper;

class ShopMapper extends Mapper
{
	private $selectAllStmt;
	private $selectStmt;
	private $updateStmt;
	private $insertStmt;

	public function __construct()
	{
		parent::__construct();

		$this->selectLimitStmt = $this->pdo->prepare(
			"SELECT * FROM shops ORDER BY id DESC LIMIT :limit, 5"
			// "SELECT * FROM shops ORDER BY id DESC LIMIT :limit, 5"
		);
		
		$this->selectAllStmt = $this->pdo->prepare(
			"SELECT * FROM shops"
		);

		$this->selectStmt = $this->pdo->prepare(
			"SELECT shops.id, shops.owner, shops.country, shop_categories.name as category, shops.city, shops.area, shops.name, shops.rating, shops.verified, shops.payments, shops.address, shops.maplink, shops.worktime, shops.contact, shops.description, shops.preview, shops.joined, shops.referral FROM shops INNER JOIN shop_categories ON shops.category = shop_categories.id WHERE shops.id=?"
		);

		$this->updateStmt = $this->pdo->prepare(
			"UPDATE shops SET worktime=?, description=?, preview=?, id=? WHERE id=?"
		);

		$this->insertStmt = $this->pdo->prepare(
			"INSERT INTO shops (owner, country, city, area, address, name, payment, maplink, contact, description, preview, json) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
		);

		$this->findByUserIdStmt = $this->pdo->prepare(
			"SELECT * FROM shops WHERE owner=?"
		);

		$this->findByLocationStmt = $this->pdo->prepare(
			"SELECT shops.id, shops.owner, shops.country, shop_categories.name as category, shops.city, shops.area, shops.name, shops.rating, shops.verified, shops.payments, shops.address, shops.maplink, shops.worktime, shops.contact, shops.description, shops.preview, shops.joined, shops.referral FROM shops INNER JOIN shop_categories ON shops.category = shop_categories.id WHERE country=? AND city LIKE ?"
		);
	}

	protected function targetClass(): string
	{
		return Shop::class;
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

	public function findByUserId(int $id): ?ShopCollection
	{
		$this->findByUserIdStmt()->execute([$id]);

		return $this->getCollection($this->findByUserIdStmt()->fetchAll());
	}

	protected function findByLocationStmt(): \PDOStatement
	{
		return $this->findByLocationStmt;
	}

	public function findByLocation(int $country, string $city): ?ShopCollection
  {
  	$this->findByLocationStmt()->execute([$country, '%' . $city]);

    return $this->getCollection($this->findByLocationStmt()->fetchAll());
  }
}