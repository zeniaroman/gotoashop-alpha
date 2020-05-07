<?php declare(strict_types = 1);
namespace App\component\store;

use App\system\factory\Registry as Reg;
use App\system\domain\DomainObject;
use App\system\domain\HelperFactory;

class Store extends DomainObject
{
  private $owner = null;
  private $country = null;
  private $city = null;
  private $area = null;
  private $address = null;
  private $name = null;
  private $payment = null;
  private $maplink = null;
  private $worktime = null;
  private $contact = null;
  private $description = null;
  private $preview = null;
  private $json = null;

  public function __construct(
    int $id = 0,
    int $owner,
    int $country,
    string $city,
    string $area,
    string $address,
    string $name,
    string $payment,
    string $maplink,
    string $worktime,
    string $contact,
    string $description,
    string $preview,
    string $json
  )
  {
    parent::__construct($id);

    $this->owner = $owner;
    $this->country = $country;
    $this->city = $city;
    $this->area = $area;
    $this->address = $address;
    $this->name = $name;
    $this->payment = $payment;
    $this->maplink = $maplink;
    $this->worktime = $worktime;
    $this->contact = $contact;
    $this->description = $description;
    $this->preview = $preview;
    $this->json = $json;
  }

  public function getOwner(): int
  {
    return $this->owner;
  }

  public function getCountry(): int
  {
    return $this->country;
  }

  public function getCity(): string
  {
    return $this->city;
  }

  public function getArea(): string
  {
    return $this->area;
  }

  public function getAddress(): string
  {
    return $this->address;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getPayment(): string
  {
    return $this->payment;
  }

  public function getMaplink(): string
  {
    return $this->maplink;
  }

  public function getWorktime(): string
  {
    return $this->worktime;
  }

  public function getContact(): string
  {
    return $this->contact;
  }

  public function getDescription(): string
  {
    return $this->description;
  }

  public function getPreview(): string
  {
    return $this->preview;
  }

  public function getJson(): string
  {
    return $this->json;
  }

  public static function findByUserId(int $id): ?StoreCollection
  {
    return self::getMapper()->findByUserId($id);
  }

  public static function findByLocation(int $country, string $city): ?StoreCollection
  {
    return self::getMapper()->findByLocation($country, $city);
  }
}