function loadDigits() {
    var digitsLog = document.getElementById('digits-log');

    var xhr = new XMLHttpRequest();
    digitsLog.innerHTML += "xhr.readyState: " + xhr.readyState + "<br/>";

    xhr.open('GET', '/digits', true); // true - async запрос
    digitsLog.innerHTML += "xhr.readyState: " + xhr.readyState + "<br/>";

    xhr.onreadystatechange = function() {
        digitsLog.innerHTML += "xhr.readyState: " + xhr.readyState 
                               + ". Получено символов xhr.responseText: " + xhr.responseText.length + "<br/>";
        if (xhr.readyState != 4) return;
        button2.innerHTML = 'Готово!';

        if (xhr.status != 200) { // обработать ошибку
            console.log(xhr.status + ': ' + xhr.statusText);
        }
    };

    xhr.send(); 

    button2.innerHTML = 'Загружаю...';
    button2.disabled = true;
}