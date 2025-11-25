<?php
$apiKey = ... ;
$cityKey = $_GET['cityKey'];
$url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/{$cityKey}?apikey={$apiKey}&language=en-us&details=true";
$response = file_get_contents($url);
echo $response;