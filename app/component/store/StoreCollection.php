<?php
declare(strict_types = 1);
namespace App\component\store;

use App\system\collection\Collection;

class StoreCollection extends Collection
{
	public function targetClass(): string
	{
		return Store::class;
	}
}