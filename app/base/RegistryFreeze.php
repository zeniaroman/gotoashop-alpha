<?php declare(strict_types = 1);
namespace App\base;

class RegistryFreeze extends Registry
{
	protected static $instance = null;
	private $dirFreeze = null;
	private $freeze = array();

	public static function instance(): self
	{
		$self = null;

		if(self::$instance) {
			$self = self::$instance;
		} else {
			$self = new self();
			$self->dirFreeze = RegistryPath::i()->freeze();
		}

		return $self;
	}

	protected function get(string $key ) {
		$path = $this->dirFreeze . '/' . $key;

		if( file_exists( $path ) ) {
			clearstatcache();

			$mtime = filemtime( $path );

			if( ! isset( $this->mtimes[$key] ) ) {
				$this->mtimes[$key] = 0;
			}

			if( $mtime > $this->mtimes[$key] ){
				$data = file_get_contents( $path );
				$this->mtimes[$key] = $mtime;
				return ( $this->freeze[$key] = unserialize( $data ) );
			}
		}

		if( isset( $this->freeze[$key] ) ) {
			return $this->freeze[$key];
		}

		return null;
	}

	protected function set(string $key, $val ): void
	{
		$this->freeze[$key] = $val;
		$path = $this->dirFreeze . '/' . $key;
		file_put_contents( $path, serialize( $val ) );
		$this->mtimes[$key] = time();
	}

	public function getClientFront(): array
	{
		if(!$this->get('clientFrontLinks')) {
			$this->setClientFront();
		}

		return $this->get('clientFrontLinks');
	}

	public function setClientFront(): void
	{
		$version = intval(RegistryConfigure::i()->getConfig('clientVersion'));
		$regPath = RegistryPath::i();
		
		$client = $regPath->client($version);

		if(!isset($client['js'])) {
			$clientDirs = scandir($client['path']);
			$lastVersionDir = end($clientDirs);

			if($lastVersionDir[0] != 1) {
				// exseption
				var_dump('AAAAXXXX');
			}

			$version = intval($lastVersionDir);
		}

		$client = $regPath->client($version);
		$filesJs = scandir($client['js']);
		
		$files = [];
		$files['chunksJs'] = [];
		$files['chunksCss'] = [];

		$path = '/web/client/' . $version . '/';

		foreach ($filesJs as $value) {
			$pathJs = $path . 'js/';

			if(strstr($value, 'app')
				|| strstr($value, 'vendors')
				|| strstr($value, 'map')
				|| $value[0] === '.'
			) {
				if(strstr($value, 'app') && !strstr($value, 'map')) {
					$files['chunksJs'][] = $pathJs . $value;
					$files['chunkAppFile'] = $pathJs . $value;
				}
				if(strstr($value, 'vendors') && !strstr($value, 'map')) {
					$files['chunksJs'][] = $pathJs . $value;
					$files['chunkVendorsFile'] = $pathJs . $value;
				}

				continue;
			}

			$files['chunksJs'][] = $pathJs . $value;
		}

		if($client['css']) {
			$pathCss = $path . 'css/';
			$filesCss = scandir($client['css']);

			foreach ($filesCss as $value) {
				if(strstr($value, 'map')
					|| $value[0] === '.') {
					continue;
				}

				$files['chunksCss'][] = $pathCss . $value;
			}
		}

		$this->set('clientFrontLinks', $files);
	}

	private function doHtmlentities(string $str): string
	{
		return htmlentities($str);
	}
}