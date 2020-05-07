<?php declare(strict_types = 1);
namespace App\component\good;

use App\system\factory\Registry as Reg;
use App\system\domain\DomainObject;
use App\system\domain\HelperFactory;

class Good extends DomainObject
{
  private $store = null;
  private $seller = null;
  private $name = null;
  private $price = null;
  private $amount = null;
  private $preview = null;
  private $images = null;
  private $description = null;

  public function __construct(
    int $id = 0,
    int $store,
    int $seller,
    string $name,
    string $price,
    string $amount,
    string $preview,
    string $images,
    string $description
  )
  {
    parent::__construct($id);

    $this->store = $store;
    $this->seller = $seller;
    $this->name = $name;
    $this->price = $price;
    $this->amount = $amount;
    $this->preview = $preview;
    $this->images = $images;
    $this->description = $description;
  }

  public function getStore(): int
  {
    return $this->store;
  }

  public function getSeller(): int
  {
    return $this->seller;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getPrice(): string
  {
    return $this->price;
  }

  public function getAmount(): string
  {
    return $this->amount;
  }

  public function getPreview(): string
  {
    return $this->preview;
  }

  public function getImages(): string
  {
    return $this->images;
  }

  public function getDescription(): string
  {
    return $this->description;
  }

  public static function findAllByStore(int $id): ?GoodCollection
  {
    return self::getMapper()->findAllByStore($id);
  }
}