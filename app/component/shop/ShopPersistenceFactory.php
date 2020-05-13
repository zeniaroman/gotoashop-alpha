<?php
declare(strict_types = 1);
namespace App\component\shop;

use App\system\factory\DomainObjectFactory;
use App\system\factory\PersistenceFactory;
use App\system\collection\Collection;
use App\system\mapper\Mapper;

class ShopPersistenceFactory extends PersistenceFactory
{
	public function getMapper(): Mapper
	{
		return new ShopMapper();
	}

	public function getCollection(array $raw): Collection
	{
		return new ShopCollection($raw, $this->getDomainObjectFactory());
	}

	public function getDomainObjectFactory(): DomainObjectFactory
	{
		return new ShopObjectFactory();
	}
}