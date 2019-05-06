<?php
if ((!isset($_SERVER['PHP_AUTH_USER'])) && (!isset($_SERVER['PHP_AUTH_PW']))) {
    header('WWW-Authenticate: Basic');
    header('HTTP/1.1 401 UNAUTHORIZED');
    echo '<html><head><title>ERROR</title></head><body>UNAUTHORIZED</body></html>';
    //unset($_SERVER['PHP_AUTH_USER']);
    //unset($_SERVER['PHP_AUTH_PW']);
    exit;
} else {
    if (($_SERVER['PHP_AUTH_USER'] == 'admin') && ($_SERVER['PHP_AUTH_PW'] == 'password')) {
        header('HTTP/1.1 200 OK');
        echo 'SUCCESS';
        //unset($_SERVER['PHP_AUTH_USER']);
        //unset($_SERVER['PHP_AUTH_PW']);
        exit;
    } else {
        if ($_SERVER['PHP_AUTH_USER'] != 'admin') {
            header('HTTP/1.1 500 INCORRECT LOGIN');
            echo 'INCORRECT LOGIN';
        } elseif ($_SERVER['PHP_AUTH_PW'] != 'password') {
            header('HTTP/1.1 500 INCORRECT PASSWORD');
            echo 'INCORRECT PASSWORD';
        }
        //unset($_SERVER['PHP_AUTH_USER']);
        //unset($_SERVER['PHP_AUTH_PW']);
        exit;
    }
}
session_unset();
?>
