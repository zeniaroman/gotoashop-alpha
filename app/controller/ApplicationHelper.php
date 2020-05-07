<?php declare(strict_types = 1);
namespace App\controller;

use App\base\Conf;
use App\system\factory\Registry;
use App\system\view\ViewComponentCompiler;

class ApplicationHelper
{
	private $registry = null;

	public function __construct()
	{
		$this->registry = Registry::i();
	}

	public function init(): void
	{
		$this->setupApplication();
		$this->setupConfigure();
		$this->setupFrontend();

		$request = $this->registry->req();

		$request->setRequest(
			isset($_SERVER['REQUEST_METHOD'])
				? $request->getHttp()
				: $request->getCli()
		);
	}

	private function setupApplication(): void
	{
		$this->registry->session();
	}

	private function setupConfigure(): void
	{
		$config = $this->registry->app()->getConf($this->getConfig());
		$this->registry->conf()->setConfig($config);

		$componentCompiler = new ViewComponentCompiler();
		$commands = $componentCompiler->parseCommands($this->getCommands());

		$this->registry->conf()->setCommands($commands);
	}

	private function getConfig(): array
	{
		return $this->loadJsonFile($this->registry->path()->configFile());
	}

	private function getCommands(): array
	{
		return $this->loadJsonFile($this->registry->path()->commandsFile());
	}

	private function loadJsonFile(string $file): array
	{
		if(! file_exists($file)) {
			throw new \Exception('Could not find ' . $file . ' file');
		}

		if(is_null($array = json_decode(file_get_contents($file), true))) {
			throw new \Exception('Incorrect JSON syntax on file ' . $file);
		}

		return $array;
	}

	private function setupFrontend(): void
	{
		$files = $this->registry->app()->getFrontEndClientFiles();
		$appFile = $this->registry->path()->root() . $files['chunkAppFile'];

		if(!file_exists($appFile)) {
			$this->registry->app()->resetFrontEnd();
		}
	}
}