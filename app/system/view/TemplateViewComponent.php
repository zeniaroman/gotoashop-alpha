<?php declare(strict_types = 1);
namespace App\system\view;

use App\system\factory\Registry;
use App\system\abstraction\Request;

class TemplateViewComponent implements ViewComponent
{
	private $extension = '.php';
	private $viewName = null;
	private $templateName = null;

	public function __construct(string $viewName, string $templateName = null)
	{
		$this->viewName = $viewName;
		$this->templateName = $templateName;
	}

	public function render(Request $request): void
	{
		$registry = Registry::i();
		$configure = $registry->conf();
		$appFullPath = $registry->path()->app();
		$componentsPath = $appFullPath . $configure->getConfig('componentsFolder') . '/';
		$templatesPath = $appFullPath . $configure->getConfig('templatesFolder') . '/';
		
		if(!$configure->getConfig('templatesFolder')) {
			throw new \Exception('No template directory in config file');
		}

		$templateName = $this->templateName;
		if(!is_null($templateName)) {
			$templateFile = is_null(filter_var($templateName, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE))
				? $templateName . $this->extension
				: false;
		}

		$templateFile = is_null($templateName) || $templateName === 'true' || $templateName === '1'
			? $configure->getConfig('templateDefault') . $this->extension
			: $templateFile;

		$templatePath = $templateFile
			? $templatesPath . $templateFile
			: false;

		$viewFile = $this->viewName . $this->extension;
		$viewPath = $templatesPath . $viewFile;

		if(!file_exists($viewPath)) {
			$viewPath = $componentsPath . strtolower(trim($this->viewName, 'View')) . '/' . $viewFile;

			if(!file_exists($viewPath)) {
				throw new \Exception('No template at ' . $viewPath);
			}
		}

		include(
			$templatePath && file_exists($templatePath)
				? $templatePath
				: $viewPath
		);
	}
}