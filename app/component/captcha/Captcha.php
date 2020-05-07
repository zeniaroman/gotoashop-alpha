<?php
declare(strict_types = 1);
namespace App\component\captcha;

use App\base\RegistrySession;
use App\system\domain\DomainObject;

class Captcha extends DomainObject
{
	private $token = null;
	private $captcha = null;
	private $variants = [];

	public function __construct()
	{
	}

	public function check(string $token, int $answer): bool
	{
		$session = RegistrySession::i();
		$captcha = $session->getCaptcha();

		if(isset($captcha['token']) && isset($captcha['value'])) {
			if($captcha['token'] === $token && $captcha['value'] === $answer) {
				$session->setCaptchaOk();
				return true;
			}
		}

		$session->cleanCaptcha();
		return false;
	}

	public function generate(): void
	{
		$this->token = bin2hex(random_bytes(2));

		$captcha = imagecreatetruecolor(80, 40);
		$text_color = imagecolorallocate($captcha, 0, 0, 0);

		imagefilledrectangle($captcha, 0, 0, 80, 40, 
			imagecolorallocate($captcha, 255, 255, 255)
		);
		
		$w = 80;
		$h = 40;
		$t = rand(50, 75);
		$x1 = [];
		$y1 = [];
		$x2 = [];
		$y2 = [];

		for($i = 1; $t > $i; $i++) {
			$x1[$i] = rand(0, (int) round($w / 2));
			$y1[$i] = rand(0, (int) round($h / 2));

			$x2[$i] = rand(0, (int) round($w));
			$y2[$i] = rand(0, (int) round($h));

			$color = imagecolorallocate($captcha, rand(55, 210), rand(55, 210), rand(55, 210));

			imageellipse($captcha, $x1[$i], $y1[$i], $x2[$i], $y2[$i], $color);
			imageline($captcha, $x1[$i], $y1[$i], $x2[$i], $y2[$i], $color);
		}

		$firstRandNum = rand(1, 4);
		$secondRandNum = rand(1, 5);
		$captchaText = $firstRandNum . ' + ' . $secondRandNum . ' =';

		$this->setResult($firstRandNum + $secondRandNum);

		imagestring($captcha, 4, 8, 12,  $captchaText, $text_color);

		ob_start();

		imagepng($captcha);
		imagedestroy($captcha);

		$captcha = ob_get_clean();

		$this->captcha = base64_encode($captcha);
	}

	private function setResult(int $result): void
	{
		$variants = [];
		$position = rand(1, 4);

		for($i = 1; $i <= 9; $i++) {
			$variants[$i] = $i;
		}

		$randVariants = array_rand($variants, 8);

		if (($key = array_search($result, $randVariants)) !== false) {
			unset($randVariants[$key]);
			$randVariants = array_values($randVariants);
		}
		
		for($i = 1; $i <= 6; $i++) {
			if($position == $i) {
				$this->variants[$i] = $result;
			} else {
				$this->variants[$i] = $randVariants[$i];
			}
		}

		RegistrySession::i()->setCaptcha($this->token, $result, false);
	}

	public function getDataArray(): array
	{
		return [
			'captchaBase64' => $this->captcha,
			'variants' => $this->variants,
			'token' => $this->token
		];
	}
}