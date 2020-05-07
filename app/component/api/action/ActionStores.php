<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\system\abstraction\ActionCmd;
use App\component\store\Store;
use App\system\factory\Registry;

class ActionStores extends ActionCmd {
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
			$stores = Store::findLimit($page);

			$storesArray = [];
			foreach ($stores as $store) {
				$storesArray[] = $store->getObjectArray(true);
			}

			if($stores) {
				$response->setBody($storesArray, 'stores');
			}
		}

		if($request->getProperty('country') && $request->isProperty('city')) {
			$stores = Store::findByLocation((int) $request->getProperty('country'), $request->getProperty('city'));

			$storesArray = [];
			foreach ($stores as $store) {
				$storesArray[] = $store->getObjectArray(true);
			}

			if($stores) {
				$response->setBody($storesArray, 'stores');
			}
		}



		if($request->getProperty('store')) {
			$store = Store::find((int) $request->getProperty('store'));

			if($store) {
				$response->setBody($store->getObjectArray(true), 'store');
			}
		}

		if($request->isGET() && $request->isProperty('isOwner')) {
			if($request->isAuth()) {
				$id = $registry->session()->getSessionUserId();

				$stores = Store::findByUserId($id);
				$storesArray = [];
				foreach ($stores as $store) {
					$storesArray[] = $store->getObjectArray(true);
				}

				$response->setBody($storesArray, 'stores');
			}
		}
	}
}