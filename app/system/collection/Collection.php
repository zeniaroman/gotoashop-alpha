<?php
declare(strict_types = 1);
namespace App\system\collection;

use App\system\domain\DomainObject;
use App\system\factory\DomainObjectFactory;

abstract class Collection implements \Iterator
{
	protected $doFactory = null;
	protected $total = 0;
	protected $raw = [];

	private $pointer = 0;
	private $objects = [];

	public function __construct(array $raw = [], DomainObjectFactory $doFact = null)
	{
		$this->raw = $raw;
		$this->total = count($raw);

		if($this->total && is_null($doFact)) {
			throw new \Exception('Need \'Mapper\' to generate object ');
		}

		$this->doFactory = $doFact;
	}

	abstract public function targetClass(): string;

	public function add(DomainObject $object): void
	{
		$class = $this->targetClass();

		if(! ($object instanceof $class)) {
			throw new \Exception('This is a ' . $class . ' collection');
		}

		$this->notifyAccess();
		$this->objects[$this->total] = $object;
		$this->total++;
	}

	protected function notifyAccess(): void
	{
		// deliberately left blank
	}

	private function getRow($num): ?DomainObject
	{
		$this->notifyAccess();

		if($num >= $this->total || $num < 0) {
			return null;
		}

		if(isset($this->objects[$num])) {
			return $this->objects[$num];
		}

		if(isset($this->raw[$num])) {
			$this->objects[$num] = $this->doFactory->createObject($this->raw[$num]);

			return $this->objects[$num];
		}
	}

	public function rewind(): void
	{
		$this->pointer = 0;
	}

	public function current(): ?DomainObject
	{
		return $this->getRow($this->pointer);
	}

	public function key(): int
	{
		return $this->pointer;
	}

	public function next(): ?DomainObject
	{
		$row = $this->current();

		if($row) {
			$this->pointer++;
		}

		return $row;
	}

	public function valid(): bool
	{
		return (! is_null($this->current()));
	}
}
