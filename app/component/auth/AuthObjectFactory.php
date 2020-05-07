<?php
declare(strict_types = 1);
namespace App\component\auth;

use App\system\domain\DomainObject;
use App\system\factory\DomainObjectFactory;

class AuthObjectFactory extends DomainObjectFactory
{
	public function createObject(array $row): DomainObject
	{
		$id = (int) $row['id'];

		$oldObject = $this->getFromMap(Auth::class, $id);

		if($oldObject) {
			return $oldObject;
		}

		$object = new Auth(
			$id,
			(int) $row['permission'],
			$row['username'],
			$row['email'],
			$row['key'],
			$row['hash'],
			$row['name'],
			$row['avatar'],
			$row['json'],
			$row['reg_date'],
			$row['session_tokens']
		);

		$this->addToMap($object);

		return $object;
	}
}