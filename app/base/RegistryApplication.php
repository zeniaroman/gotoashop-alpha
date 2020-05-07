<?php declare(strict_types = 1);
namespace App\base;

use App\controller\ApplicationHelper;
use App\system\lib\FileReader;

class RegistryApplication extends Registry
{
  protected static $instance = null;
  private $pdo = null;
  private $freeze = null;

  public static function instance(): self
  {
    return self::$instance ?? self::$instance = new self();
  }

  // protected function freezeFront(): void
  // {
  //  // var_dump(scandir(RegistryPath::i()->web('/client')));
  // }

  public function helper(): ApplicationHelper
  {
    if(!$this->get(ApplicationHelper::class)) {
      $this->set(ApplicationHelper::class, new ApplicationHelper());
    }

    return $this->get(ApplicationHelper::class);
  }

  public function getPdo(): \PDO
  {
    if(is_null($this->pdo)) {
      $dsn = RegistryConfigure::i()->getConfig('dsn')['mysql'];

      if(is_null($dsn['dsn']) || empty($dsn['dsn'])) {
        throw new \Exception('No Mysql DSN');
      }

      $this->pdo = new \PDO($dsn['dsn'], $dsn['user'], $dsn['pass']);
      $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }

    return $this->pdo;
  }

  public function getFileReader(string $path): FileReader
  {
    return new FileReader($path);
  }

  public function getConf(array $values = []): Conf
  {
    if(!empty($values)) {
      return new Conf($values);
    }

    return new Conf();
  }

  public function getFrontEndClientFiles(): array
  {
    return RegistryFreeze::i()->getClientFront();
  }

  public function resetFrontEnd(): void
  {
    RegistryFreeze::i()->setClientFront();
  }
}