<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Payment Form (widget test)</title>
        <style>
            #start {
                padding: 5px 0;
            }
        </style>

        <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" media="screen">
        <link rel="stylesheet" type="text/css" href="css/bootstrap-override.css" media="screen">
        <script src="js/jquery/jquery-1.7.2.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js" type="text/javascript"></script>
        <script src="https://checkout.sandbox.gateline.net:18310/js/pay_widget.js"></script>

    </head>

    <div id="no-footer" style="display: block;">
        <div id="start" style="width: 350px; margin: 0 auto">
          <form id="layer1" method="post" action="<?PHP $_SERVER['PHP_SELF']?>">
            <label>Сумма</label>
            <input id="amount" name="amount" pattern="^[0-9.]+$" required><br/>
            <br/><label>Описание заказа</label>
            <input id="description" name="description" required><br/>
            <br/><label>Номер заказа</label>
            <input id="merchant_order_id" name="merchant_order_id" pattern="^[0-9]+$" required><br/>
            <br/><label>E-mail клиента</label>
            <input id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required><br/>
            <br/><input class="btn btn-success" type="submit" id="button" value="Send">
          </form>
        </div>
    </div>

<?php
    $array = array(
    'amount' => $_POST['amount'],
    'description' => $_POST['description'],
    'merchant_order_id' => $_POST['merchant_order_id'],
    'mobile' => $_POST['mobile'],
    'force3d' => $_POST['force3d'],
    'return_success_url' => $_POST['return_success_url'],
    'return_failure_url' => $_POST['return_failure_url'],
    'activation_required' => $_POST['activation_required'],
    'email' => $_POST['email'],
    'project' => $_POST['project'],
    'phone' => $_POST['phone'],
    'custom_numeric' => $_POST['custom_numeric'],
    'custom_text' => $_POST['custom_text'],
    'terminal' => $_POST['terminal'],
    'extended' => $_POST['extended'],
    );
  $site_key='fab670d1f3dd8f1c2ae53c87a1ad017b';
  ksort($array);
  $goto = '/checkout/pay;';
  foreach ($array as $key => $value) {
      $goto .= $key . "=" . $value . ";";
  }
  $goto = rtrim($goto, ';');
  $hash = hash_hmac('sha1', $goto, $site_key);
  $XAuth = 'TESTACC ' . $hash;
  //$url='https://requestb.in/spr5hmsp';
  $url = 'https://api.sandbox.gateline.net:18210/checkout/pay';
  $crtfile = "TESTACC.crt.pem";
  $keyfile = "TESTACC.key.pem";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_ENCODING, "");
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_SSLCERT, $crtfile);
  curl_setopt($ch, CURLOPT_SSLKEY, $keyfile);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $array);
  curl_setopt($ch, CURLOPT_HTTPHEADER,
  array(
    "Cache-Control: no-cache",
    "X-Authorization: " . $XAuth
  ));
  $response = curl_exec($ch);
  $err = curl_error($ch);
  curl_close($ch);
  $token = ltrim( strstr( strstr($response, "token="), "</", TRUE), "token=");
  echo '<input type=hidden style="width:100%" id=TokenToSend name=TokenToSend value ="'.$token.'">';
?>

<script>
    $(document).ready(function(){
        var widget = new PaymentWidget(
            function () { // success
                alert('Success');

            },
            function () { // fail
                alert('Failed');
            },
            {
                url: 'https://checkout.sandbox.gateline.net:18310'
            },
        );
        function test() {
            widget.show($('#TokenToSend').val());
        }
        window.onload = test;
    });
</script>

</html>
