<?php
declare(strict_types = 1);
namespace App\component\good;

use App\system\factory\DomainObjectFactory;
use App\system\factory\PersistenceFactory;
use App\system\collection\Collection;
use App\system\mapper\Mapper;

class GoodPersistenceFactory extends PersistenceFactory
{
	public function getMapper(): Mapper
	{
		return new GoodMapper();
	}

	public function getCollection(array $raw): Collection
	{
		return new GoodCollection($raw, $this->getDomainObjectFactory());
	}

	public function getDomainObjectFactory(): DomainObjectFactory
	{
		return new GoodObjectFactory();
	}
}