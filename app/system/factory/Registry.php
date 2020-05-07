<?php declare(strict_types = 1);

namespace App\system\factory;

use App\system\abstraction\Registry as RegistryAbstract;
use App\base\Registry as RegistryBase;

use App\base\RegistryApplication;
use App\base\RegistryConfigure;
use App\base\RegistryRequest;
use App\base\RegistrySession;
use App\base\RegistryCookie;
use App\base\RegistryPath;

class Registry extends RegistryAbstract
{
	private static $instance = null;
	private $values = [];

	private function __construct()
	{}

	public static function instance(): self
	{
		return self::$instance ?? self::$instance = new self();
	}

	public static function i(): self
	{
		return self::instance();
	}

	public static function reset(RegistryBase $registry): bool
	{
		$values = &self::i()->values;
		$class = get_class($registry);
		$object = isset($values[$class]) ? $values[$class] : null;

		if($object && $object instanceof $registry) {
			$values[$class]->reset();
			unset($values[$class]);

			return true;
		}

		return false;
	}

	protected function get(string $key)
	{
		return isset($this->values[$key]) ?
			$this->values[$key] :
			null;
	}

	protected function set(string $key, RegistryBase $object): void
	{
		$this->values[$key] = $object;
	}

	private function ensure(string $namespace): void
	{
		if(!$this->get($namespace)) {
			$this->set($namespace, $namespace::i());
		}
	}

	public function app(): RegistryApplication
	{
		$this->ensure(RegistryApplication::class);

		return $this->get(RegistryApplication::class);
	}

	public function req(): RegistryRequest
	{
		$this->ensure(RegistryRequest::class);

		return $this->get(RegistryRequest::class);
	}

	public function conf(): RegistryConfigure
	{
		$this->ensure(RegistryConfigure::class);

		return $this->get(RegistryConfigure::class);
	}

	public function path(): RegistryPath
	{
		$this->ensure(RegistryPath::class);

		return $this->get(RegistryPath::class);
	}

	public function cookie(): RegistryCookie
	{
		$this->ensure(RegistryCookie::class);

		return $this->get(RegistryCookie::class);
	}

	public function session(): RegistrySession
	{
		$this->ensure(RegistrySession::class);

		return $this->get(RegistrySession::class);
	}
}