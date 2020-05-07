<?php 

$reg = App\system\factory\Registry::i();
$clientFiles = $reg->app()->getFrontEndClientFiles();

// var_dump($reg->path()->root());
var_dump($request->getPath());
var_dump($request->getEntity());
var_dump($request->getAction());


include_once($viewPath); ?>