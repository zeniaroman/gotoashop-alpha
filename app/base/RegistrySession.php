<?php declare(strict_types = 1);

namespace App\base;

class RegistrySession extends Registry
{
	protected static $instance = null;

	public static function instance(): self
	{

		if(self::$instance) {
			return self::$instance;
		}

		self::$instance = new self();
		self::$instance->initial();

		return self::$instance;
	}

	private function initial(): void
	{
		$this->startSession();
		$this->setId();
	}

	private function startSession(): void
	{
		session_start();
	}

	protected function set(string $key, $val): void
  {
    // var_dump($_SESSION[__CLASS__]);
    $_SESSION[__CLASS__][$key] = $val;
  }

  protected function get(string $key): ?string
  {
    if(isset($_SESSION[__CLASS__][$key])) {
      return $_SESSION[__CLASS__][$key];
    }
    return null;
  }

  public function getCaptcha(): ?array
  { 
    $json = $this->get('captcha');
    $captcha = json_decode($json ? $json : '', true);

    return $captcha
      ? $captcha
      : null;
  }

  public function getCaptchaResolve(): bool
  { 
    if($this->getCaptcha()) {
      return $this->getCaptcha()['resolve'];
    }
  }

  public function setCaptcha(string $token, int $value, bool $resolve = false): void
  {
    $this->set('captcha', json_encode([
      'resolve' => false,
      'token' => $token,
      'value' => $value
    ]));
  }

  public function setCaptchaArray(array $data): void
  {
    $this->set('captcha', json_encode($data));
  }

  public function setCaptchaOk(): void
  {
    $captcha = $this->getCaptcha();
    $captcha['resolve'] = true;

    $this->setCaptchaArray($captcha);

    // $this->set('captcha', json_encode($captcha));
  }

  public function cleanCaptcha(): void
  {
    $this->set('captcha', null);
  }

  public function getSessionHash(): ?string
  {
    $session = $this->get('session_hash');
    if($session) {
    	return explode(':', $session)[0];
    }

    return null;
  }

  public function getSessionHashExpiry(): ?int
  {
    $session = $this->get('session_hash');

    if($session) {
      return intval(explode(':', $session)[1]);
    }

    return null;
  }

  public function setSessionHash(string $sessionHash, int $expiry): void
  {
  	if(!$this->get('session_hash')) {
			$this->set('session_hash', $sessionHash . ':' . $expiry);
  	}
  }

  public function setSessionUserId(int $userId): void
  {
    $this->set('session_user_id', strval($userId));
  }

  public function getSessionUserId(): ?int
  {
    return (int) $this->get('session_user_id');
  }

  public function cleanSession(): void
  {
    $this->set('session_hash', null);
    $this->set('session_user_id', null);
  }

  public function cleanSessionHash(): void
  {
    $this->set('session_hash', null);
  }

	private function setId(): void
	{
		if( !$this->get('session_id')) {
      $this->set('session_id', session_id());
		}
  }

  static function getSession(): ?string
  {
    if($this->get('session_id')) {
      return $this->get('session_id');
    }
  }
}