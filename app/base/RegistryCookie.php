<?php declare(strict_types = 1);

namespace App\base;

class RegistryCookie extends Registry
{
	protected static $instance = null;

	public static function instance(): self
	{
		return !self::$instance ?
			self::$instance = new self() :
			self::$instance;
	}

	public static function createCookieArray( string $path, int $expiry, string $name, string $id, string $token, string $session = null ): array
	{
		return [
      'path' => $path,
			'expiry' => $expiry,
      'name' => $name,
      'id' => $id,
      'token' => $token
    ];
	}

	public function prepareCookie( array $cookie ): string
	{
		return serialize($cookie);
	}

	protected function set( string $name, $cookieArray ): void
	{
		if( !$this->get( $cookieArray['name'] ) ) {
      $cookieData = $this->prepareCookie( $cookieArray );

		  setcookie( $cookieArray['name'], $cookieData, $cookieArray['expiry'], $cookieArray['path']);
      $_COOKIE[$cookieArray['name']] = $cookieData;
		}
  }

  protected function get(string $name): ?array
  {
    $cookie = $_COOKIE;

    if(in_array($name, array_keys($cookie))){
      $cookieArray = unserialize($cookie[$name]);

      return is_array($cookieArray) ? $cookieArray : null;
    }

    return null;
  }

  public function setCookie( array $cookieArray ): void
  {
    $this->set( $cookieArray['name'], $cookieArray );
  }

  public function getCookie(string $name): ?array
  {
    return $this->get($name);
  }

  public function getGuestCookie(): ?array
  {
    return $this->get('GuestCookie') ?? null;
  }

  public function setAuthCookie(array $authCookieArray): void
  {
  	$authCookieArray['name'] = 'AuthCookie';

  	$this->setCookie($authCookieArray);
  }

  public function getAuthCookie(): ?array
  {
  	return $this->get('AuthCookie') ?? null;
  }

  public function cleanCookie(string $name): void
  {
    $cookie = $this->getCookie($name);

    if($cookie) {
      setcookie($name, '', -1, $cookie['path']);
      $_COOKIE[$name] = '';
    }
  }

  public function cleanAuthCookie(): void
  {
  	self::cleanCookie('AuthCookie');
  }
}