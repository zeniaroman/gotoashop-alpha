<?php

$method = 'aes-256-cbc';

$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
$hashId =  openssl_encrypt('Test', $method, '111', 0, $iv);

var_dump($hashId);


$decrypt = openssl_decrypt($hashId, $method, '111', 0, $iv);

var_dump($decrypt);