<?php
declare(strict_types = 1);
namespace App\component\shop;

use App\system\collection\Collection;

class ShopCollection extends Collection
{
	public function targetClass(): string
	{
		return Shop::class;
	}
}