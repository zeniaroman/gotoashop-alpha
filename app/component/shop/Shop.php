<?php declare(strict_types = 1);
namespace App\component\shop;

use App\system\factory\Registry as Reg;
use App\system\domain\DomainObject;
use App\system\domain\HelperFactory;

class Shop extends DomainObject
{
  private $owner = null;
  private $country = null;
  private $category = null;
  private $city = null;
  private $area = null;
  private $name = null;
  private $rating = null;
  private $verified = null;
  private $payments = null;
  private $address = null;
  private $maplink = null;
  private $worktime = null;
  private $contact = null;
  private $description = null;
  private $preview = null;
  private $joined = null;
  private $referral = null;

  public function __construct(
    int $id = 0,
    int $owner,
    int $country,
    string $category,
    string $city,
    string $area,
    string $name,
    float $rating,
    int $verified,
    string $payments,
    string $address,
    string $maplink,
    string $worktime,
    string $contact,
    string $description,
    string $preview,
    string $joined,
    int $referral
  )
  {
    parent::__construct($id);

    $this->owner = $owner;
    $this->country = $country;
    $this->category = $category;
    $this->city = $city;
    $this->area = $area;
    $this->name = $name;
    $this->rating = $rating;
    $this->verified = $verified;
    $this->payments = $payments;
    $this->address = $address;
    $this->maplink = $maplink;
    $this->worktime = $worktime;
    $this->contact = $contact;
    $this->description = $description;
    $this->preview = $preview;
    $this->joined = $joined;
    $this->referral = $referral;
  }

  public function getOwner(): int
  {
    return $this->owner;
  }

  public function getCountry(): int
  {
    return $this->country;
  }

  public function getCategory(): string
  {
    return $this->category;
  }

  public function getCity(): string
  {
    return $this->city;
  }

  public function getArea(): string
  {
    return $this->area;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function getRating(): float
  {
    return $this->rating;
  }

  public function getVerified(): int
  {
    return $this->verified;
  }

  public function getPayments(): string
  {
    return $this->payments;
  }

  public function getAddress(): string
  {
    return $this->address;
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

  public function getJoined(): string
  {
    return $this->joined;
  }

  public function getReferral(): int
  {
    return $this->referral;
  }

  public static function findByUserId(int $id): ?ShopCollection
  {
    return self::getMapper()->findByUserId($id);
  }

  public static function findByLocation(int $country, string $city): ?ShopCollection
  {
    return self::getMapper()->findByLocation($country, $city);
  }
}