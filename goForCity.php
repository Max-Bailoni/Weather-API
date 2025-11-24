<?php
$apiKey = 'apikey';

if (!isset($_GET['cityName'])) {
    echo json_encode([]);
    exit;
}

$cityName = urlencode($_GET['cityName']);
$url = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey={$apiKey}&q={$cityName}&language=en-us&details=true";

$response = file_get_contents($url);

echo $response; 