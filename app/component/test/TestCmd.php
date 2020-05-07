<?php declare(strict_types = 1);
namespace App\component\test;

use App\command\Command;

class TestCmd extends Command
{
	public function doExecute(): int
	{
		return self::CMD_DEFAULT;
	}
}