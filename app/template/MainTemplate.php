<?php 

$reg = App\system\factory\Registry::i();
$clientFiles = $reg->app()->getFrontEndClientFiles();

var_dump($reg->path()->root());
// var_dump($request->getRoot());

include_once($viewPath); ?>