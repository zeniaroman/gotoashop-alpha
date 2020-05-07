<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\system\abstraction\ActionCmd;

abstract class Action extends ActionCmd {
	abstract public function resolve();
}