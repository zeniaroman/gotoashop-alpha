<?php
declare(strict_types = 1);
namespace App\component\store;

use App\system\domain\DomainObject;
use App\system\factory\DomainObjectFactory;

class StoreObjectFactory extends DomainObjectFactory
{
	public function createObject(array $row): DomainObject
	{
		$id = (int) $row['id'];

		$oldObject = $this->getFromMap(Store::class, $id);

		if($oldObject) {
			return $oldObject;
		}

		$object = new Store(
			$id,
			(int) $row['owner'],
			(int) $row['country'],
			$row['city'],
			$row['area'],
			$row['address'],
			$row['name'],
			$row['payment'],
			$row['maplink'],
			$row['worktime'],
			$row['contact'],
			$row['description'],
			$row['preview'],
			$row['json']
		);

		$this->addToMap($object);

		return $object;
	}
}