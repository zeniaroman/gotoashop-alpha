<?php declare(strict_types = 1);
namespace App\command;

use App\system\factory\Registry as Reg;
use App\system\abstraction\Request;
use App\controller\Response;

use App\component\auth\Auth;

abstract class Command
{
	public const CMD_DEFAULT = 0;
	public const CMD_OK = 1;
	public const CMD_ERROR = 2;
	public const CMD_INSUFFICIENT_DATA = 3;

	private $request = null;
	private $response = null;
	
	final public function __construct()
	{}

	abstract public function doExecute(): int;

	public function execute(Request $request, Response $response): void
	{
		$this->request = $request;
		$this->response = $response;

		$response->setStatus(200);

		$request->setAuthStatus(Auth::check());
		$request->setStatus($this->doExecute($request, $response));
	}

	protected function getRequest(): Request
	{
		return $this->request;
	}

	protected function getResponse(): Response
	{
		return $this->response;
	}
}