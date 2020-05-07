<?php declare(strict_types = 1);
namespace App\system\view;

use App\base\Conf;
use App\command\Command;
use App\command\DefaultCmd;

class ViewComponentCompiler
{
	private $defaultCmd = DefaultCmd::class;
	private $componentSpace = 'App\component\\';

	public function __construct()
	{}

	public function parseCommands(array $commands): Conf
	{
		return $this->parse($commands);
	}

	public function parse(array $commands): Conf
	{
		$conf = new Conf();

		foreach($commands as $requestPath => $command) {
			$cmdClass = $command['class'] ?? null;
			$cmdName = is_null($cmdClass) ?: strtolower(substr($cmdClass, 0, -3));
			
			$requestPath = empty($requestPath) ? '/' : $requestPath;
			$cmdNamespace = isset($cmdClass)
				? $this->componentSpace . $cmdName . '\\' . $cmdClass
				: $this->defaultCmd;

			$descriptor = new ComponentDescriptor($requestPath, $cmdNamespace);
			$this->processView($descriptor, $command, 0);

			if(isset($command['status'])) {
				foreach($command['status'] as $status => $cmd) {
					$statusNum = constant(Command::class . '::' . $status);

					if(is_null($statusNum)) {
						throw new \Exception('Unknown status: ' . $status);
					}

					$this->processView($descriptor, $cmd, $statusNum);
				}
			}

			$conf->setValue($requestPath, $descriptor);
		}

		return $conf;
	}

	public function processView(
		ComponentDescriptor $descriptor,
		array $command,
		int $status
	): void
	{
		$templateName = array_key_exists('template', $command)
			? (string)$command['template']
			: null;

		if(isset($command['view'])) {
			$descriptor->setView($status, new TemplateViewComponent($command['view'], $templateName));
		}

		if(isset($command['forward'])) {
			$descriptor->setView($status, new ForwardViewComponent($command['forward']));
		}
	}
}