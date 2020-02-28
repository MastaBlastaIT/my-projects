<?php

$array = array(
'amount' => $_POST['amount'],
'description' => $_POST['description'],
'merchant_order_id' => $_POST['merchant_order_id'],

//Optinal fields
//'mobile' => $_POST['mobile'],
//'force3d' => $_POST['force3d'],
//'return_success_url' => $_POST['return_success_url'],
//'return_failure_url' => $_POST['return_failure_url'],
//'activation_required' => $_POST['activation_required'],
//'email' => $_POST['email'],
//'project' => $_POST['project'],
//'phone' => $_POST['phone'],
//'custom_numeric' => $_POST['custom_numeric'],
//'custom_text' => $_POST['custom_text'],
//'terminal' => $_POST['terminal'],
//'extended' => $_POST['extended'],
);
ksort($array);
$goto = '/checkout/pay;';
foreach ($array as $key => $value) {
  $goto .= $key . "=" . $value . ";";
}
$goto = rtrim($goto, ';');
#you need to put your site password here (token)
$hash = hash_hmac('sha1', $goto, 'YourSitePassword');
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "18210",//remove it, if use dev environment
  CURLOPT_URL => "https://api.sandbox.gateline.net:18210/checkout/pay",
  //CURLOPT_URL => "https://api.dev.gateline.net/checkout/pay",
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
if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $response = strstr(strstr($response, "http"),"<", TRUE);
    header("Location: " . $response);
}
?>
