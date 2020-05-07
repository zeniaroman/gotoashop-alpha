<?php declare(strict_types = 1);
namespace App\system\abstraction;

use App\system\face\ActionCommand;
use App\controller\Response;

abstract class ActionCmd implements ActionCommand {
	protected $request = null;
	protected $response = null;

	public function __construct(Request $request = null, Response $response = null)
	{
		$this->request = $request;
		$this->response = $response;
	}

	public function resetReqRes(Request $request, Response $response): void
	{
		if(!$this->request && !$this->request) {
			$this->request = $request;
			$this->response = $response;
		}
	}

	abstract public function resolve();
}