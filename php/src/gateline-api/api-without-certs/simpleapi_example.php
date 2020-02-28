<?php

$array = array(
'amount' => $_POST['amount'],
'description' => $_POST['description'],
'merchant_order_id' => $_POST['merchant_order_id'],
'email' => $_POST['email'], //Optional
'site' => "yourSiteUID",//input your uid here
);
$site_key='yourSitePassword';//input your site password(token) here
ksort($array);
$goto = '';
foreach ($array as $key => $value) {
    $goto .= $key . "=" . $value . ";";
}
$goto = rtrim($goto, ';');
$hash = hash_hmac('sha1', $goto, $site_key);
$array['checksum'] = $hash;
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "18610",//remove it, if use dev environment
  CURLOPT_URL => "https://simpleapi.sandbox.gateline.net:18610/pay",
  //CURLOPT_URL => "https://simpleapi.dev.gateline.net/pay",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_HEADER => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $array,
  CURLOPT_HTTPHEADER => array(
    "Cache-Control: no-cache",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $response = strstr(strstr($response, "http"),"Content", TRUE);
    header("Location: " . $response);
}
?>
