<?php
declare(strict_types = 1);
namespace App\component\good;

use App\system\collection\Collection;

class GoodCollection extends Collection
{
	public function targetClass(): string
	{
		return Good::class;
	}
}