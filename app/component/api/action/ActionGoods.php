<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\system\abstraction\ActionCmd;
use App\component\good\Good;

class ActionGoods extends ActionCmd {
	public function resolve(): void
	{
		$store = (int) $this->request->getProperty('store');

		$goods = null;

		if($store) {
		$goods = Good::findAllByStore($store);
		}

		$goodsArray = [];
		foreach ($goods as $good) {
			$goodsArray[] = $good->getObjectArray(true);
		}

		$this->response->setBody($goodsArray, 'goods');
	}
}