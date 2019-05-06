window.onload = document.getElementById('myPopup').style.background = `#ffffff url('spinner.gif') no-repeat center center`;

let popup = document.getElementById('popupBack');

let payForm = document.getElementById('payForm');

let iframe = document.getElementById('myPopup');

function SendRequest() {
    let site = 'glnet_demo';

    $('#site').val(site);
    let encrypted = '9af64dca109a0075716bc8700310feb876ffb72f';

    $('#checksum').val(encrypted);
    popup.style.display = 'block';
    $('#payForm').submit();
}


function listener(event) {

    if (event.data == 'pay_fail') {
        alert('Платёж завершился неуспешно');
        popup.style.display = 'none';
        iframe.src = '';
    } else if (event.data == 'pay_success') {
        alert('Платёж завершился успешно');
        popup.style.display = 'none';
        iframe.src = '';
    }
}
if (window.addEventListener) {
    window.addEventListener('message', listener);
} else {
    window.attachEvent('onmessage', listener); // IE8
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
        iframe.src = '';
    }
}
