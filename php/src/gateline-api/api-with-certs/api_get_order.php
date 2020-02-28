<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function set_error($type, $message)
{
    return json_encode(array(
        'error' => $type,
        'message' => $message
    ));
}

function get_order_data($order_id)
{
    if (!$order_id) {
        return set_error('order_id error', 'order_id is required');
    }

    if ($order_id === '') {
        return set_error('order_id error', 'order_id is empty');
    }

    $goto = '/order/' . $order_id . ';';

    # you need to put your site password here (token)
    $hash = hash_hmac('sha1', $goto, 'fab670d1f3dd8f1c2ae53c87a1ad017b');
    //$hash = hash_hmac('sha1', $goto, 'YourSitePassword');
    $curl = curl_init();

    curl_setopt_array($curl, array(
        //CURLOPT_PORT => "18210",//remove it, if you use a production environment
        //CURLOPT_URL => "https://api.sandbox.gateline.net:18210/order" . $order_id,
        CURLOPT_URL => "https://api.dev.gateline.net/order/" . $order_id,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_SSL_VERIFYPEER => false,
        # you need to parse you .p12 certificate to .crt and .key files
        # commands to parse .p12:
        # openssl pkcs12 -in file.p12 -clcerts -nokeys -out file.crt.pem
        # openssl pkcs12 -in file.p12 -nocerts -out file.key.pem

        //CURLOPT_SSLCERT => 'path/to/filename.crt.pem',
        //CURLOPT_SSLKEY => 'path/to/filename.key.pem',
        CURLOPT_SSLCERT => 'certs/testacc.crt.pem',
        CURLOPT_SSLKEY => 'certs/new.testacc.key.pem',
        # if it necessary - use pass phrase for key CURLOPT_SSLKEYPASSWD
        //CURLOPT_SSLKEYPASSWD => 'B+eVPox07neO',
        //CURLOPT_SSLKEYPASSWD => 'your_pass_phrase',

        # you can remove pass phrase by this command:
        # openssl rsa -in file1.key -out file2.key
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            //"Cache-Control: no-cache",
            # you need to put UID (identifier) of your site here
            //"X-Authorization: YourSiteName " . $hash
            "X-Authorization: TESTACC " . $hash
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
        return set_error('cURL error', $err);
    }
    $parsed_xml_response = simplexml_load_string($response);
    if (!empty($parsed_xml_response->message)) {
        $parsed_xml_response->addChild('error', 'error returned from gateline');
    }
    return json_encode($parsed_xml_response);
}

function by_request_method_get_order($method)
{
    $param = 'order_id';

    if ($method === 'GET') {
        return get_order_data($_GET[$param]);
    } elseif ($method === 'POST') {
        return get_order_data($_POST[$param]);
    }
    return set_error('request error', $method . ' request is unsupported');
}

$res = by_request_method_get_order($_SERVER['REQUEST_METHOD']);
echo $res;

?>
