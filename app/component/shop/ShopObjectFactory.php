<?php
declare(strict_types = 1);
namespace App\component\shop;

use App\system\domain\DomainObject;
use App\system\factory\DomainObjectFactory;

class ShopObjectFactory extends DomainObjectFactory
{
	public function createObject(array $row): DomainObject
	{
		$id = (int) $row['id'];

		$oldObject = $this->getFromMap(Shop::class, $id);

		if($oldObject) {
			return $oldObject;
		}

		$object = new Shop(
			$id,
			(int) $row['owner'],
			(int) $row['country'],
			$row['category'],
			$row['city'],
			$row['area'],
			$row['name'],
			(float) $row['rating'],
			(int) $row['verified'],
			$row['payments'],
			$row['address'],
			$row['maplink'],
			$row['worktime'],
			$row['contact'],
			$row['description'],
			$row['preview'],
			$row['joined'],
			(int) $row['referral']
		);

		$this->addToMap($object);

		return $object;
	}
}