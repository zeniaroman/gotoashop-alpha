<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\system\abstraction\ActionCmd;
use App\component\shop\Shop;
use App\system\factory\Registry;

class ActionShops extends ActionCmd {
	public function resolve(): void
	{
		$registry = Registry::i();
		$request = $this->request;
		$response = $this->response;

		if($request->isGET()
			&& $request->isProperty('page')
			&& $request->getProperty('page') >= 0
			) {
			$page = intval($request->getProperty('page'));
			$shops = Shop::findLimit($page);

			$shopsArray = [];
			foreach ($shops as $shop) {
				$shopsArray[] = $shop->getObjectArray(true);
			}

			if($shops) {
				$response->setBody($shopsArray, 'shops');
			}
		}

		if($request->getProperty('country') && $request->isProperty('city')) {
			$shops = Shop::findByLocation((int) $request->getProperty('country'), $request->getProperty('city'));

			$shopsArray = [];
			foreach ($shops as $shop) {
				$shopsArray[] = $shop->getObjectArray(true);
			}

			if($shops) {
				$response->setBody($shopsArray, 'shops');
			}
		}



		if($request->getProperty('shop')) {
			$shop = Shop::find((int) $request->getProperty('shop'));

			if($shop) {
				$response->setBody($shop->getObjectArray(true), 'shop');
			}
		}

		if($request->isGET() && $request->isProperty('isOwner')) {
			if($request->isAuth()) {
				$id = $registry->session()->getSessionUserId();

				$shops = Shop::findByUserId($id);
				$shopsArray = [];
				foreach ($shops as $shop) {
					$shopsArray[] = $shop->getObjectArray(true);
				}

				$response->setBody($shopsArray, 'shops');
			}
		}
	}
}