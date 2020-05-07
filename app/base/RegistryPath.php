<?php declare(strict_types = 1);
namespace App\base;

class RegistryPath extends Registry
{
	const APP_DIR = '/app';
	const WEB_DIR = '/web';
	const APP_FREEZE_DIR = '/freeze';
	const CONFIGURE_DIR = '/configure';

	const CONFIG_FILE = 'configures.json.php';
	const COMMANDS_FILE = 'commands.json.php';

	protected static $instance = null;

	public static function instance(): self
	{
		return self::$instance ?? self::$instance = new self();
	}

	public function root(): string
	{
		if(!$this->get('root')) {
			$this->set('root', pathinfo($_SERVER['SCRIPT_FILENAME'], PATHINFO_DIRNAME));
		}
		
		return $this->get('root');
	}

	public function app(): string
	{
		if(!$this->get('app')) {
			$this->set('app', $this->root() . self::APP_DIR);
		}

		return $this->get('app');
	}

	public function web($dir = ''): ?string
	{
		if(!$this->get('web')) {
			$this->set('web', $this->root() . self::WEB_DIR);
		}

		$path = $this->get('web') . $dir;

		return (!empty($dir) && !is_dir($path))
			? null
			: $path;
	}

	public function client(int $version): ?array
	{
		$path = $this->web() . '/client/';

		$client['path'] = $path;
		$client['version'] = $client['path'] . $version;

		if(is_dir($client['version'])) {
			$client['js'] = $client['version'] . '/js';
			$client['css'] = $client['version'] . '/css';
			$client['css'] = is_dir($client['css']) ? $client['css'] : null;
		}

		return $client;
	}

	public function freeze($dir = ''): string
	{
		// get method name string
		if(!$this->get('freeze')) {
			$this->set('freeze', $this->app() . self::APP_FREEZE_DIR);
		}

		return $this->get('freeze') . $dir;
	}

	public function configure(): string
	{
		if(!$this->get('configure')) {
			$this->set('configure', $this->root() . self::CONFIGURE_DIR);
		}

		return $this->get('configure');
	}

	public function configFile(): string
	{
		return $this->configure() . '/' . self::CONFIG_FILE;
	}

	public function commandsFile(): string
	{
		return $this->configure() . '/' . self::COMMANDS_FILE;
	}
}