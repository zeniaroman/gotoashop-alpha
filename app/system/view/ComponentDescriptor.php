<?php declare(strict_types = 1);
namespace App\system\view;

use App\system\abstraction\Request;
use App\command\Command;

class ComponentDescriptor
{
	private $views = [];
	private $path = null;
	private $cmdStr = null;
	private $cmdRef = null;

	public function __construct(string $path, string $cmdStr)
	{
		$this->path = $path;
		$this->cmdStr = $cmdStr;
		$this->cmdRef = new \ReflectionClass(Command::class);
	}

	public function getCommand(): Command
	{
		return $this->resolveCommand($this->cmdStr);
	}

	public function getView(Request $request): ViewComponent
	{
		$view = $this->views[$request->getStatus()]
			?? $this->views[0]
			?? null;

		if($view) {
			return $view;
		}

		throw new \Exception('No ViewComponent found');
	}

	public function setView(int $status, ViewComponent $view): void
	{
		$this->views[$status] = $view;
	}

	private function resolveCommand(string $class): Command
	{
		if(is_null($class)) {
			throw new \Exception('Unknown class ' . $class);
		}

		if(!class_exists($class)) {
			throw new \Exception('Class ' . $class . ' not found');
		}

		$refClass = new \ReflectionClass($class);
		if(!$refClass->isSubClassOf($this->cmdRef)) {
			throw new \Exception('Command ' . $class . ' is not a Command');
		}

		return $refClass->newInstance();
	}
}