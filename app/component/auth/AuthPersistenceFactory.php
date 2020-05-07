<?php
declare(strict_types = 1);
namespace App\component\auth;

use App\system\factory\DomainObjectFactory;
use App\system\factory\PersistenceFactory;
use App\system\collection\Collection;
use App\system\mapper\Mapper;

class AuthPersistenceFactory extends PersistenceFactory
{
	public function getMapper(): Mapper
	{
		return new AuthMapper();
	}

	public function getCollection(array $raw): Collection
	{
		return new AuthCollection($raw, $this->getDomainObjectFactory());
	}

	public function getDomainObjectFactory(): DomainObjectFactory
	{
		return new AuthObjectFactory();
	}
}