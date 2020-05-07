<?php declare(strict_types = 1);
namespace App\controller;

use App\system\factory\Registry;
use App\system\domain\ObjectWatcher;

class Controller
{
	private $registry = null;

	private function __construct()
	{
		$this->registry = Registry::i();

		$this->initializeApp();
		$this->handleRequest();
	}

	public static function run(): void
	{
		new self();
	}

	private function initializeApp(): void
	{
		$this->registry->app()->helper()->init();
	}

	private function handleRequest(): void
	{
		$request = $this->registry->req()->getRequest();
		$response = new Response();

		$request->isAcceptJson()
			&& $response->setHeaders([], 'json');

		$controller = new AppController();
		$cmd = $controller->getCommand($request);
		$cmd->execute($request, $response);

		$response->send();

		if($response->isView()) {
			$view = $controller->getView($request);
			$view->render($request);
		}

		ObjectWatcher::instance()->performOperations();
	}
}