<?php
declare(strict_types = 1);
namespace App\component\auth;

use App\system\collection\Collection;

class AuthCollection extends Collection
{
	public function targetClass(): string
	{
		return Auth::class;
	}
}