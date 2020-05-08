<?php

$regApp = App\base\RegistryApplication::i();
$clientFiles = $regApp->getFrontEndClientFiles();

// var_dump( App\system\factory\Registry::i()->req()->getRequest()->getRoot() );
var_dump( App\system\factory\Registry::i()->cookie()->getAuthCookie() );

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gotoashop | Make shopping easy with local shops online</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1">
  <style>
    *{margin: 0;padding: 0;font-size: 16px;letter-spacing: .02em;box-sizing: border-box;}
    html{color: #2E353E;font-family: "Helvetica", sans-serif;line-height: 1.375;}
    body{display: flex;flex-direction: column;}
    button{cursor: pointer;}
    p, h1, h2, h3, h4{cursor:default;}
    .header{z-index: 1000;width: 100%;padding: 10px;background: #fff;box-shadow: 0 0 2px 0 rgba(0, 0, 0, .25);transition: all ease .5s;}
    .header_white{background: #fff;}
    .header__wrap{display: flex;justify-content: space-between;align-items: center;width: 100%;max-width: 1440px;margin: 0 auto;}
    .header__logo{padding: 10px; color: #000;font-size: 1.25em;text-decoration: none;}
    .header__nav{display: flex;justify-content: space-between;align-items: center;margin-right: 10px;}
    .header__link{margin-left: 10px;padding: 10px;color: #2E353E;text-decoration: none;}
    .header__link:hover{text-decoration: underline;}
  </style>

  <?php 
    // JS links
    foreach ($clientFiles['chunksJs'] as $value) {
      if(strstr($value, 'app')) {
        echo '<link href="' . $value . '" rel="preload" as="script">';
      } elseif (strstr($value, 'vendors')) {
        echo '<link href="' . $value . '" rel="preload" as="script">';
      } else {
        echo '<link href="' . $value . '" rel="prefetch">';
      }
    }
  ?>

  <?php
    // CSS links
    foreach ($clientFiles['chunksCss'] as $value) { 
      if(strstr($value, 'app')) {
        echo '<link href="' . $value . '" rel="preload" as="style">';
      }

      $cssLinkRelValue = strstr($value, 'app') ? 'stylesheet' : 'prefetch';
      echo '<link href="' . $value . '" rel="' . $cssLinkRelValue . '">';
    }
  ?>

</head>
<body>
  <?php include_once($viewPath); ?>
</body>
</html>