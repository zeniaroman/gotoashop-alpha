<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\component\captcha\Captcha;

class ActionCaptcha extends Action {
	public function resolve(): void
	{
		$captcha = new Captcha();
		$request = $this->request;
		$response = $this->response;

		if($request->isHEAD() && $request->isProperty('check')) {
			$captcha->check($request->getProperty('token'), (int) $request->getProperty('answer'))
				? $response->setStatus(200)
				: $response->setStatus(403);
		}

		if($request->isGET()) {
			$captcha->generate();

			$this->response->setBody($captcha->getDataArray());
		}
	}
}