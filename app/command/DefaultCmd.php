<?php declare(strict_types = 1);
namespace App\command;

class DefaultCmd extends Command
{
	public function doExecute(): int
	{
		return self::CMD_DEFAULT;
	}
}