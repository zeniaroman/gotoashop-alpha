<?php declare(strict_types = 1);

namespace App\system;

class FileReader
{
	private $path = null;
	private $content = null;

	public function __construct(string $path)
	{
		$this->path = $path;

		$this->exists();
		$this->read();
	}

	private function read(): void
	{
		$this->content = file_get_contents($this->path);
	}

	private function exists(): void
	{
		$this->ensure(
			! file_exists($this->path), 
			'Could not find file on path: ' . $this->path
		);
	}

	private function ensure($expr, string $message): void
	{
		if($expr) {
			throw new \Exception($message);
		}
	}

	public function plain(): string
	{
		return $this->content;
	}

	public function jsonAsClass(): \StdClass
	{
		$object = json_decode($this->content);

		$this->ensure(
			! $object,
			$this->failJson()
		);

		return $object;
	}

	public function jsonAsArray(): array
	{
		$array = json_decode($this->content, true);

		$this->ensure(
			! $array,
			$this->failJson()
		);
		return json_decode($this->content, true);
	}

	private function failJson(): string
	{
		return 'Incorrect JSON syntax on file ' . $this->path;
	}
}