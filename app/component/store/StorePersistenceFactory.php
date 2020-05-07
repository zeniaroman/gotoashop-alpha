<?php
declare(strict_types = 1);
namespace App\component\store;

use App\system\factory\DomainObjectFactory;
use App\system\factory\PersistenceFactory;
use App\system\collection\Collection;
use App\system\mapper\Mapper;

class StorePersistenceFactory extends PersistenceFactory
{
	public function getMapper(): Mapper
	{
		return new StoreMapper();
	}

	public function getCollection(array $raw): Collection
	{
		return new StoreCollection($raw, $this->getDomainObjectFactory());
	}

	public function getDomainObjectFactory(): DomainObjectFactory
	{
		return new StoreObjectFactory();
	}
}