<?php
declare(strict_types = 1);
namespace App\system\view;

use App\system\abstraction\Request;

class ForwardViewComponent implements ViewComponent
{
	private $path = null;

	public function __construct(string $path)
	{
		$this->path = $path;
	}

	public function render(Request $request): void
	{
		$request->forward($this->path);
	}
}