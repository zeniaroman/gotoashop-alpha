<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\system\abstraction\ActionCmd;

class Factory {
	public static function get(string $name): ?ActionCmd
	{
		$actionClass = 'App\component\api\action\\' . ucfirst($name);

		if(class_exists($actionClass)) {
			return new $actionClass();
		}

		return null;
	}
}