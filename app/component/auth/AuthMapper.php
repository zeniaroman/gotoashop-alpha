<?php
declare(strict_types = 1);
namespace App\component\auth;

use App\system\domain\DomainObject;
use App\system\mapper\Mapper;

class AuthMapper extends Mapper
{
	private $selectAllStmt;
	private $selectStmt;
	private $updateStmt;
	private $insertStmt;

	public function __construct()
	{
		parent::__construct();
		
		$this->selectAllStmt = $this->pdo->prepare(
			"SELECT * FROM users"
		);

		$this->selectStmt = $this->pdo->prepare(
			"SELECT * FROM users WHERE id=?"
		);

		$this->updateStmt = $this->pdo->prepare(
			"UPDATE users SET users.key=?, name=?, session_tokens=?, id=? WHERE id=?"
		);

		$this->insertStmt = $this->pdo->prepare(
			"INSERT INTO users (permission, email, hash, `key`, name, username, avatar, json, reg_date, session_tokens) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
		);

		$this->findByEmailStmt = $this->pdo->prepare(
			"SELECT * FROM users WHERE email=?"
		);

		$this->updateSessionTokensStmt = $this->pdo->prepare(
			"UPDATE users SET session_tokens=? WHERE id=?"
		);
	}

	protected function targetClass(): string
	{
		return Auth::class;
	}

	protected function doInsert(DomainObject $object): void
	{
		$this->insertStmt->execute($object->getObjectArray(false, true));

		$id = (int) $this->pdo->lastInsertId();

		$object->setId($id);
	}

	public function update(DomainObject $object): void
	{
		$values = [
			$object->getKey(),
			$object->getName(),
			$object->getSessionTokens(),
			$object->getId(),
			$object->getId()
		];

		$this->updateStmt->execute($values);
	}

	protected function selectAllStmt(): \PDOStatement
	{
		return $this->selectAllStmt;
	}

	protected function selectStmt(): \PDOStatement
	{
		return $this->selectStmt;
	}

	public function findByEmail(string $email): ?Auth
	{
		$this->findByEmailStmt->execute([$email]);

		$row = $this->findByEmailStmt->fetchAll();
		if( !empty($row[0]) ) {
			$authFactory = new AuthObjectFactory();

			return $authFactory->createObject( $row[0] );	
		}

		return null;
	}

	public function updateSessionTokens( $id, $tokensJsonString ): void
	{
		$values = array( $tokensJsonString, $id );
		$this->updateSessionTokensStmt->execute( $values );
	}
}