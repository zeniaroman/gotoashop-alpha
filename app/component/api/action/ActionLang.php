<?php declare(strict_types = 1);
namespace App\component\api\action;

// use App\system\abstraction\ActionCmd;
// use App\component\good\Good;

use App\system\factory\Registry;


class ActionLang extends Action {
	public function resolve(): void
	{
		$lang = $this->request->getProperty('lang');

		$langFile = null;

		if($lang) {
			$langFile = file_get_contents(Registry::i()->path()->web() . '/lang/' . $lang . '.json.php');
		}

		$this->response->setBody(json_decode($langFile, true), $lang);
	}
}