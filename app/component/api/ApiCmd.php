<?php declare(strict_types = 1);
namespace App\component\api;

use App\command\Command;

class ApiCmd extends Command
{
	public function doExecute(): int
	{
		$request = $this->getRequest();
		$response = $this->getResponse();

		$response->setHeaders([], 'json');
		$response->setBody(null);

		$methods = get_class_methods(self::class);
		$action = action\Factory::get($request->getAction() ?? '');

		if($action) {
			$action->resetReqRes($request, $response);
			$action->resolve();
			
			return self::CMD_DEFAULT;
		}

		$response->setStatus(421);
		return self::CMD_ERROR;
	}
}