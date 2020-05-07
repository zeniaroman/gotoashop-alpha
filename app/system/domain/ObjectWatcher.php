<?php
declare(strict_types = 1);
namespace App\system\domain;

class ObjectWatcher
{
	private static $instance = null;
	private $all = [];
	private $dirty = [];
	private $new = [];
	private $delete = [];

	private function __construct()
	{
	}

	public static function instance(): self
	{
		if(is_null(self::$instance)) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public static function reset(): void
	{
		self::$instance = null;
	}

	public function globalKey(DomainObject $object): string
	{
		$key = get_class($object) . '.' . $object->getId();

		return $key;
	}

	public static function add(DomainObject $object): DomainObject
	{
		$self = self::instance();
		$self->all[$self->globalKey($object)] = $object;

		return $object;
	}

	public static function exists($className, $id): ?DomainObject
	{
		$self = self::instance();
		$key = $className . '.' . $id;

		if(isset($self->all[$key])) {
			return $self->all[$key];
		}

		return null;
	}

	public static function addDelete(DomainObject $object): void
	{
		$self = self::instance();
		$self->delete[$self->globalKey($object)] = $object;
	}

	public static function addDirty(DomainObject $object): void
	{
		$self = self::instance();

		if(! in_array($object, $self->new, true)) {
			$self->dirty[$self->globalKey($object)] = $object;
		}
	}

	public static function addNew(DomainObject $object): void
	{
		$self = self::instance();
		$self->new[] = $object;
	}

	public static function addClean(DomainObject $object): void
	{
		$self = self::instance();

		unset($self->delete[$self->globalKey($object)]);
		unset($self->dirty[$self->globalKey($object)]);

		$self->new = array_filter(
			$self->new,
			function ($a) use ($object) {
				return !($a === $object);
			}
		);
	}

	public function performOperations(): void
	{
		foreach($this->dirty as $key =>$object) {
			$object->getMapper()->update($object);
		}

		foreach($this->new as $key => $object) {
			$object->getMapper()->insert($object);
		}

		$this->dirty = [];
		$this->new = [];
	}
}