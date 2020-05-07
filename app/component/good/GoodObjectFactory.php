<?php
declare(strict_types = 1);
namespace App\component\good;

use App\system\domain\DomainObject;
use App\system\factory\DomainObjectFactory;

class GoodObjectFactory extends DomainObjectFactory
{
	public function createObject(array $row): DomainObject
	{
		$id = (int) $row['id'];

		$oldObject = $this->getFromMap(Good::class, $id);

		if($oldObject) {
			return $oldObject;
		}

		$object = new Good(
			$id,
			(int) $row['store'],
			(int) $row['seller'],
			$row['name'],
			$row['price'],
			$row['amount'],
			$row['preview'],
			$row['images'],
			$row['description']
		);

		$this->addToMap($object);

		return $object;
	}
}