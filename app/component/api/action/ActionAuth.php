<?php declare(strict_types = 1);
namespace App\component\api\action;

use App\component\auth\Auth;

class ActionAuth extends Action {
	public function resolve(): void
	{
		$request = $this->request;

		$this->response->setStatus(421);

		if($request->isPOST() && $request->isProperty('signup')) {
			$this->signup();
		}

		if($request->isPOST() && $request->isProperty('signin')) {
			$this->login();
		}

		if($request->isHEAD() && $request->isProperty('check')) {
			$this->check();
		}

		if($request->isGET() && $request->isProperty('check')) {
			$this->check();
		}


		if($request->isGET() && $request->isProperty('logout')) {
			$this->logout();
		}

	}

	private function signup(): void
	{
		$response = $this->response;

		$email = $this->request->getProperty('email');
		$pass = $this->request->getProperty('pass');

		if($email) {
			Auth::signup($email, $pass)
				? $response->setStatus(200)
				: $response->setStatus(404);
		}

	}

	private function logout(): void
	{
		$response = $this->response;

		Auth::logout() 
			? $response->setStatus(200)
			: $response->setStatus(421);
	}

	private function check(): void
	{
		$this->response->setStatus(
			$this->request->isAuth()
				? 200
				: 401
		);
	}

	private function login(): void
	{
		$email = $this->request->getProperty('email');
		$pass = $this->request->getProperty('pass');

		$status = 421;

		if($email) {
			$status = Auth::signin($email, $pass)
				? 200
				: $status;
		}

		$this->response->setStatus($status);
		$this->response->setBody([
			'success' => $status === 200 ? true : false
		], 'auth');
	}

}