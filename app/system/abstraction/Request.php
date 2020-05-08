<?php declare(strict_types = 1);
namespace App\system\abstraction;

use App\system\collection\Collection;

abstract class Request
{
	protected $method = 'GET';
	protected $properties = [];
	protected $collection = [];
	protected $feedback = [];
	protected $objects = [];
	
	private $root = null;
	private $path = '/';
	private $entity = null;
	private $entityId = 0;
	private $status = 0;
	private $authStatus = false;

	public function __construct()
	{
		$this->init();
	}

	abstract public function init();

	public function getHeader(string $name): ?string
	{
		$n = strtoupper($name);

		return isset($_SERVER['HTTP_' . $n])
			? $_SERVER['HTTP_' . $n]
			: null;
	}

	public function isAcceptJson(): bool
	{
		if(!$this->getHeader('accept')) {
			return false;
		}
		
		return strstr(explode(',', $this->getHeader('accept'))[0], 'json')
			? true
			: false;
	}

	public function getRoot(): string
	{
		if(is_null($this->root)) {
			$documentRootArray = explode('/', $_SERVER['DOCUMENT_ROOT']);
			$rootServerDir = end($documentRootArray);

			$rootFilePath = $_SERVER['SCRIPT_FILENAME'];
			$rootFile = explode('/', $rootFilePath);

			$rootFile = '/' . end($rootFile);
			$position = strpos($rootFilePath, $rootServerDir) + strlen($rootServerDir) + 1;

			$rootScriptFilePath = substr($_SERVER['SCRIPT_FILENAME'], $position);
			$rootScriptDir = '/' . str_replace($rootFile, '', $rootScriptFilePath);
		
			$this->root = $rootScriptDir;
			$this->root = (substr($this->root, -1) != '/') ? $this->root . '/' : $this->root;
		}

		return $this->root;
	}

	public function getPath(): string
	{
		return $this->path;
	}

	protected function setPath(string $path): void
	{
		$this->path .= $path;
	}

	public function getEntity(): ?string
	{
		return $this->entity ? ucfirst(strtolower($this->entity)) : null;
	}

	public function getAction(): ?string
	{
		$entity = $this->getEntity();
		return $entity ? 'action' . $entity : null;
	}

	protected function setEntity(string $entity): void
	{
		$this->entity = $entity;
	}

	public function getId(): ?string
	{
		return ucfirst(strtolower($this->entityId));
	}

	protected function setId(string $entityId): void
	{
		$this->entityId = $entityId;
	}

	public function getStatus(): int
	{
		return $this->status ?? 0;
	}

	public function setStatus(int $status): void
	{
		$this->status = $status;
	}

	public function setObject($name, $object): void
	{
		$this->objects[$name] = $object;
	}

	public function getObject($name)
	{
		if(isset($this->objects[$name])) {
			return $this->objects[$name];
		}

		return null;
	}

	public function getMethod(): string
	{
		return $this->method;
	}

	public function isGET(): bool
	{
		return $this->getMethod() === 'GET' ? true : false;
	}

	public function isHEAD(): bool
	{
		return $this->getMethod() === 'HEAD' ? true : false;
	}

	public function isPUT(): bool
	{
		return ($this->getMethod() === 'PUT');
	}

	public function isPOST(): bool
	{
		return $this->getMethod() === 'POST' ? true : false;
	}


	public function getProperty(string $key): ?string
	{
		if(isset($this->properties[$key])) {
			return $this->properties[$key];
		}

		return null;
	}

	public function getProps(): array
	{
		return $this->properties;
	}

	public function getFirstProperty(): ?array
	{
		$props = $this->getProps();
		$propsKeys = array_keys($props);
		$firstProp = $propsKeys ? $props[$propsKeys[0]] : null;
		// $firstProp = isset($props[$propsKeys[0]])
		// 	? $props[$propsKeys[0]];

		return !$propsKeys
			? null
			:	isset($firstProp)
				? [ 
						$propsKeys[0] => $firstProp,
						0 => $firstProp
					]
				: null;
	}

	public function isProperty(string $key): bool
	{
		return is_null($this->getProperty($key)) ? false : true;
	}

	public function setProperty(string $key, string $value): void
	{
		// if(!isset($this->properties[$key])) {
		$this->properties[$key] = $value;	
		// }
	}

	public function getFeedback(): array
	{
		return $this->feedback;
	}

	public function getFeedbackString($separator = '\n'): string
	{
		return implode($separator, $this->feedback);
	}

	public function getLastFeedback()
	{
		return end($this->feedback);
	}

	public function addFeedback(string $message): void
	{
		array_push($this->feedback, $message);
	}

	public function clearFeedback(): void
	{
		$this->feedback = [];
	}

	public function getCollection(string $name): ?Collection
	{
		return ($this->collection[$name] ?? null);
	}

	public function setCollection(string $name, Collection $collection): void
	{
		$this->collection[$name] = $collection;
	}

	public function isAuth(): bool
	{
		return $this->authStatus;
	}

	public function getAuthStatus(): bool
	{
		return $this->authStatus;
	}

	public function setAuthStatus(bool $status): void
	{
		$this->authStatus = $status;
	}
}