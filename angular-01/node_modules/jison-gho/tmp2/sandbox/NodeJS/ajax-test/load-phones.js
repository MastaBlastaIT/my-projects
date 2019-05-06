function loadPhones() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'phones.json', true); // true - async запрос
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // даем серверу возможность отличить AJAX от обычного запроса

    xhr.onreadystatechange = function() {
        // xhr.status, xhr.statusText, xhr.responseText, xhr.responseXML.querySelector("...")
        if (xhr.readyState != 4) return;
        // Коды состояний:
        // const unsigned short UNSENT = 0; // начальное состояние
        // const unsigned short OPENED = 1; // вызван open
        // const unsigned short HEADERS_RECEIVED = 2; // получены заголовки
        // const unsigned short LOADING = 3; // загружается тело (получен очередной пакет данных)
        // const unsigned short DONE = 4; // запрос завершён

        button.innerHTML = 'Готово!';

        if (xhr.status != 200) { // обработать ошибку
            console.log(xhr.status + ': ' + xhr.statusText);
        } else { // вывести результат
            try {
                var phones = JSON.parse(xhr.responseText);
            } catch (e) {
                console.log('Invalid JSON received: ' + e.message);
            }
            document.getElementById('phones-list').innerHTML = render(phones);
        }

    };

    xhr.send(); // внутри send - тело запроса; для GET запроса - пустое

    button.innerHTML = 'Загружаю...';
    button.disabled = true;
}


function render(phones) { // returns rendered HTML
    var tmpl = _.template(document.getElementById('phones-template').innerHTML, {
        'variable': 'phones'
    });
    var res = tmpl(phones);

    return res;
}
