<?php
declare(strict_types = 1);
namespace App\component\auth;

use App\command\Command;

class AuthCmd extends Command
{
	public function doExecute(): int
	{
		return self::CMD_DEFAULT;
	}
}