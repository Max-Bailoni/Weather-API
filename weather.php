<?php
$apiKey = ;
$cityKey = $_GET['cityKey'];

$url = "http://dataservice.accuweather.com/currentconditions/v1/{$cityKey}?apikey={$apiKey}&language=en-us&details=true";

$response = file_get_contents($url);

echo $response; 