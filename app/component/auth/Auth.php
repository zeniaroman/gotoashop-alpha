<?php declare(strict_types = 1);
namespace App\component\auth;

use App\system\factory\Registry as Reg;
use App\system\domain\DomainObject;
use App\system\domain\HelperFactory;

use App\base\RegistrySession;

class Auth extends DomainObject
{
  private $permission = null;
  private $username = null;
  private $email = null;
  private $key = null;
  private $hash = null;
  private $name = null;
  private $avatar = null;
  private $json = null;
  private $regDate = null;
  private $sessionTokens = null;

  public function __construct(
    int $id = 0,
    int $permission,
    string $username,
    string $email = null,
    string $key,
    string $hash,
    string $name,
    string $avatar = null,
    string $json,
    string $regDate,
    string $sessionTokens
  )
  {
    parent::__construct($id);

    $this->permission = $permission;
    $this->username = $username;
    $this->email = $email;
    $this->key = $key;
    $this->hash = $hash;
    $this->name = $name;
    $this->avatar = $avatar;
    $this->json = $json;
    $this->regDate = $regDate;
    $this->sessionTokens = $sessionTokens;
  }

  public function getPermission(): int
  {
    return $this->permission;
  }

  public function getUsername(): string
  {
    return $this->username;
  }

  public function getEmail(): string
  {
    return $this->email;
  }

  public function getKey(): string
  {
    return $this->key;
  }

  public function getHash(): string
  {
    return $this->hash;
  }

  public function getAvatar(): string
  {
    return $this->avatar;
  }

  public function getJson(): string
  {
    return $this->json;
  }

  public function getRegDate(): string
  {
    return $this->regDate;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function setName(string $name): void
  {
    $this->name = $name;
    $this->markDirty();
  }

  public static function logout(): bool
  {
    if(!self::check()) {
      return false;
    }

    $cookie = Reg::i()->cookie()->getAuthCookie();

    if($cookie) {
      $id = self::getDecryptedIdFromCookie($cookie);

      if($id > 0) {
        $user = self::find($id);
        $user->cleanCurrentSessionToken();
      }
    }

    Reg::i()->cookie()->cleanAuthCookie();
    Reg::i()->session()->cleanSessionHash();

    return true;
  }

  public static function signup( string $email, string $key ): bool
  {
    $captcha = Reg::i()->session()->getCaptcha();

    if($captcha['resolve']) {
      return self::createUser($email, $key);
    }

    return false;
  }

  public static function signin(string $email, string $password = null, Auth $user = null): bool
  {
    if(!$user) {
      $user = self::findByEmail($email);
    }
    if(!$user) {
      return false;
    }

    if(!$password) {
      return false;
    }

    if($user->verify($password)) {
      $cookie = Reg::i()->cookie();
      $session = Reg::i()->session();

      $expiry = strtotime('+160 day');

      $user->cleanExpiredSessionTokens();
      $user->setSessionToken($expiry);

      $sessionToken = $user->getSessionTokensArray()[$expiry]['hash'];
      $session->setSessionHash($sessionToken, $expiry);
      $session->setSessionUserId($user->getId());

      $authCookieArray = $cookie->createCookieArray(
        Reg::i()->req()->getRequest()->getRoot(),
        $expiry,
        'auth',
        self::getNewHashIdBySession($user->getId(), $session),
        $session->getSessionHash()
      );

      $cookie->setAuthCookie($authCookieArray);

      return true;
    }
    return false;
  }

  private static function getNewHashIdBySession(int $id, RegistrySession $session): string
  {
    $hash = $session->getSessionHash();
    $expiry = (string) $session->getSessionHashExpiry();

    $hashArray = str_split($hash);
    $expiryhArray = array_reverse(str_split($expiry));

    $secret = '';
    foreach ($hashArray as $key => $value) {
      if($key < 4) {
        $secret .= $value . $expiryhArray[$key];
      }

      if($key > 8) {
        $secret .= $value;
      }
    }
    
    $hashChunk = substr($hash, 0, 5);
    $encrypt = $secret . '|||' . $id . '|||' . $hashChunk;
    $secret .= $hashChunk;

    $method = 'aes-256-cbc';
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
    $hashId =  openssl_encrypt($encrypt, $method, $secret, 0, $iv);
    return $hashId . '.|?/' . $iv;
  }

  private static function getDecryptedIdFromCookie(array $cookie): int
  {
    $hash = $cookie['token'];
    $expiry = (string) $cookie['expiry'];
    $hashId = $cookie['id'];

    $hashArray = str_split($hash);
    $expiryhArray = array_reverse(str_split($expiry));
    $hashIdArray = explode('.|?/', $hashId);

    $secret = '';
    foreach ($hashArray as $key => $value) {
      if($key < 4) {
        $secret .= $value . $expiryhArray[$key];
      }
      if($key > 8) {
        $secret .= $value;
      }
    }

    $hashChunk = substr($hash, 0, 5);
    $secret .= $hashChunk;

    $method = 'aes-256-cbc';
    $decrypt = openssl_decrypt($hashIdArray[0], $method, $secret, 0, $hashIdArray[1]);
    $decryptArray = explode('|||', $decrypt);
    return intval($decryptArray[1]);
  }
 
  public function setSessionToken(int $expiry): void
  {
    $tokens = $this->getSessionTokensArray();
    $tokens[$expiry]['hash'] = $this->getRandomHash();

    $this->setSessionTokens($tokens);
  }

  public function getSessionTokens(): string
  {
    return $this->sessionTokens;
  }

  private function setSessionTokens(array $tokens): void
  {
    $this->sessionTokens = json_encode($tokens);
    $this->markDirty();
  }

  public static function check(): bool
  {
    $reg = Reg::i();

    if($reg->session()->getSessionHash()) {
      if(time() < $reg->session()->getSessionHashExpiry()) {
        return true;
      }
    }

    $cookie = $reg->cookie()->getAuthCookie();
    if($cookie) {
      $id = self::getDecryptedIdFromCookie($cookie);
      if(!$id) {
        return false;
      }

      $user = self::find($id);
      $cookie = (object) $cookie;

      if(self::checkCookie($cookie, $user->getSessionTokensArray())){
        $user->setSessionToken($cookie->expiry);
        $token = $user->getSessionTokensArray()[$cookie->expiry]['hash'];

        $reg->session()->setSessionHash($token, $cookie->expiry);
        $reg->session()->setSessionUserId($id);

        $authCookieArray = $reg->cookie()->createCookieArray(
          Reg::i()->req()->getRequest()->getRoot(),
          $cookie->expiry,
          $cookie->name,
          self::getNewHashIdBySession($user->getId(), $reg->session()),
          $reg->session()->getSessionHash()
        );

        $reg->cookie()->cleanAuthCookie();
        $reg->cookie()->setAuthCookie($authCookieArray);

        return true;
      }
    }

    $reg->cookie()->cleanAuthCookie();
    $reg->session()->cleanSessionHash();

    return false;
  }

  public function cleanCurrentSessionToken(): void
  {
    $token = Reg::i()->cookie()->getAuthCookie();

    if($token) {
      $tokens = array_diff_key($this->getSessionTokensArray(), [$token['expiry'] => '']);

      $this->setSessionTokens($tokens);
    }
  }

  private function cleanExpiredSessionTokens(): void
  {
    $tokens = array_filter($this->getSessionTokensArray(), function($value, $key) {
    
      if(time() > $key) {
        return false;
      }

      return true;
    }, ARRAY_FILTER_USE_BOTH);

    $this->setSessionTokens($tokens);
  }

  private static function checkCookie( object $cookie, array $tokens ): bool
  {
    if(array_key_exists($cookie->expiry, $tokens)) {
      $token = $tokens[$cookie->expiry]['hash'];
      if($token === $cookie->token && time() < $cookie->expiry) {
        return true;
      }
    }

    return false;
  }

  private function getRandomHash(): string
  {
    return str_replace( ['=', '+', '/'], ['', '_', '-'], base64_encode( random_bytes(8) ) );
  }

  static private function passwordToHash(string $password): string
  {
    return password_hash( $password, PASSWORD_BCRYPT, array( 'cost' => 5 ));
  }

  private function verify( $password ): bool
  {
    return ( password_verify( $password, $this->getHash() ) ) ? true : false;
  }

  public function getSessionTokensArray(): array
  {
    return json_decode($this->getSessionTokens(), true) ?? array();
  }

  private static function createUser( string $email, string $password ): bool
  {
    if(self::findByEmail($email)) {
      return false;
    }

    new Auth(0, 1, '', $email, '', self::passwordToHash($password), 'Username', '', '', '', '');

    return true;
  }

  private static function findByEmail(string $email): ?DomainObject
  {
    return self::getMapper()->findByEmail($email);
  }
}