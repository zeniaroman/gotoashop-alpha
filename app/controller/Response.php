<?php declare(strict_types = 1);
namespace App\controller;

class Response {
	const HTTP_OK = 200;
	const HTTP_CREATED = 201;
	const HTTP_ACCEPTED = 202;
	const HTTP_MOVED_PERMANENTLY = 301;
  const HTTP_FOUND = 302;
  const HTTP_SEE_OTHER = 303;
  const HTTP_NOT_MODIFIED = 304;
	const HTTP_BAD_REQUEST = 400;
	const HTTP_UNAUTHORIZED = 401;
	const HTTP_FORBIDDEN = 403;
	const HTTP_NOT_FOUND = 404;
	const HTTP_GONE = 410;
	const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
	const HTTP_I_AM_A_TEAPOT = 418;
	const HTTP_AUTHENTICATION_TIMEOUT = 419;
	const HTTP_MISDIRECTED_REQUEST = 421;
	const HTTP_UNPROCESSABLE_ENTITY = 422;
	const HTTP_INTERNAL_SERVER_ERROR = 500;
	const HTTP_NOT_IMPLEMENTED = 501;
	const HTTP_BAD_GATEWAY = 502;
	const HTTP_SERVICE_UNAVAILABLE = 503;
	const HTTP_GATEWAY_TIMEOUT = 504;

	const HEADER_JSON = 'Content-Type: application/json; charset=UTF-8';
	const HEADER_HTML = 'Content-Type: text/html; charset=UTF-8';
	const HEADER_LOCATION = 'Location: ';

	const STATUS_DEFAULT = 501;

	private $status = self::STATUS_DEFAULT;
	private $statusText = null;
	private $headers = [];
	private $response = [];
	private $body = [];
	private $isView = true;

	public function __construct()
	{
	}

	public function setHeaders($headers = [], $template = null): void
	{
		if($template) {
			switch ($template) {
				case 'json':
					$headers[] = self::HEADER_JSON;
					break;
				case 'html':
					$headers[] = self::HEADER_HTML;
					break;
				case 'redirect':
					$headers[] = self::HEADER_LOCATION;
					break;
			}
		}

		foreach ($headers as $key => $value) {
			$this->headers[] = $value;
		}
	}

	public function getStatus(): int
	{
		return $this->status;
	}

	public function setStatus(int $status): void
	{
		$selfNamespace = self::class;

		$rResponse = new \ReflectionClass($selfNamespace);
		foreach ($rResponse->getConstants() as $name => $value) {
			if(constant($selfNamespace . '::' . $name) === $status) {
				$this->status = $status;
				$this->statusText = ucwords(str_replace('http ', '',str_replace('_', ' ', strtolower($name))));
			}
		}
	}

	public function getStatusText(): ?string
	{
		return $this->statusText;
	}

	public function send(): void
	{
		if(strval($this->getStatus())[0] != 2) {
			$this->setBody(null);
		}

		array_unshift($this->headers, 'HTTP/1.1 ' . $this->getStatus() . ' ' . $this->getStatusText());

		foreach ($this->headers as $header) {
			header($header);
		}

		if(!empty($this->response)) {
			echo json_encode($this->response);
		}
	}

	public function getResponseBody(): ?array
	{
		return $this->body;
	}

	public function setBody(?array $body, string $bodyName = 'body', $isView = false): void
	{
		$this->body = $body;
		$this->response = [
			'success' => (strval($this->getStatus())[0] == '2') ? true : false,
			'status' => $this->getStatus(),
			'statusText' => $this->statusText,
			$bodyName => $body
		];

		$this->isView = $isView;
	}

	public function push(string $url): void
	{
		self::redirect($url);
	}

	public static function redirect(string $url): void
	{
		$self = new self();

		$self->setStatus(302);
		$self->setHeaders([self::HEADER_LOCATION . $url]);
		$self->send();

		exit(0);
	}

	public function isView(): bool
	{
		return $this->isView;
	}
}