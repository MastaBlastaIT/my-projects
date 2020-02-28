<?php


$order_id = '123';
$goto = "'/'order'/'" . $order_id . "/cancel;";//or use settle for clearing

# OR
# $goto = "'/'order'/'" + $order_id + "/settle;";

# you can take and order_id by GET request

#you need to put your site password here (token)
$hash = hash_hmac('sha1', $goto, 'YourSitePassword');
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "18210",//remove it, if use dev environment
  CURLOPT_URL => "https://api.sandbox.gateline.net:18210/order/cancel",//or use settle for clearing
  //CURLOPT_URL => "https://api.dev.gateline.net/order/cancel",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_SSL_VERIFYPEER => false,
  #you need to parse you .p12 certificate to .crt and .key files
  CURLOPT_SSLCERT => 'YourCert.crt.pem',
  CURLOPT_SSLKEY => 'YourKey.key.pem',
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $array,
  CURLOPT_HTTPHEADER => array(
    "Cache-Control: no-cache",
    #you need to put UID (identifier) of your site here
    "X-Authorization: YourSiteName " . $hash
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
/*if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $response = strstr(strstr($response, "http"),"<", TRUE);
    header("Location: " . $response);
}*/
?>
