<?php
declare(strict_types = 1);
namespace App\system\view;

use App\system\abstraction\Request;

interface ViewComponent
{
	public function render(Request $request);
}