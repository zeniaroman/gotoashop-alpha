<?php declare(strict_types = 1);
namespace App\system\face;

interface ActionCommand {
	public function resolve();
}