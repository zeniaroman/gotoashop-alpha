<?php declare(strict_types = 1);
namespace App\controller;

use App\command\Command;
use App\command\DefaultCmd;
use App\system\factory\Registry;
use App\system\abstraction\Request;
use App\system\view\ViewComponent;
use App\system\view\TemplateViewComponent;
use App\system\view\ComponentDescriptor;

class AppController
{
	private static $defaultCmd = DefaultCmd::class;
	private static $defaultView = 'HomeView';

	public function getCommand(Request $request): Command
	{
		try {
			$descriptor = $this->getDescriptor($request);
			$cmd = $descriptor->getCommand();
		} catch(\Exception $error) {
			$request->addFeedback($error->getMessage());

			return new self::$defaultCmd;
		}

		return $cmd;
	}

	public function getView(Request $request): ViewComponent
	{
		try {
			$descriptor = $this->getDescriptor($request);
			$view = $descriptor->getView($request);
		} catch(\Exception $error) {
			return new TemplateViewComponent(self::$defaultView);
		}

		return $view;
	}

	private function getDescriptor(Request $request): ComponentDescriptor
	{
		$configure = Registry::i()->conf();
		$commands = $configure->getCommands();
		$path = $request->getPath();

		$descriptor = $commands->getValue($path);

		if(is_null($descriptor)) {
			throw new \Exception('No descriptor for ' . $path);
		}

		return $descriptor;
	}
}