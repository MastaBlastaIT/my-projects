function Uploader(file, onSuccess, onError, onProgress) {

    // fileId уникальным образом идентифицирует файл
    // можно добавить идентификатор сессии посетителя, но он и так будет в заголовках
    var fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;

    // сделать из fileId число (хеш, алгоритм неважен), мы будем передавать его в заголовке,
    // в заголовках разрешены только ASCII-символы
    fileId = hashCode(fileId);

    var errorCount = 0;

    // если количество ошибок подряд превысит MAX_ERROR_COUNT, то стоп
    var MAX_ERROR_COUNT = 6;

    var startByte = 0;
    var self = this;

    var xhrUpload;
    var xhrStatus;

    function upload() {
        console.log("upload: check status");
        xhrStatus = new XMLHttpRequest();

        xhrStatus.onload = xhrStatus.onerror = function() {

            if (this.status == 200) {
                startByte = +this.responseText || 0; // в статус-запросе получили от сервера информацию, сколько байт скачано
                console.log("upload: startByte=" + startByte);
                send();
                return;
            }

            // что-то не так
            if (errorCount++ < MAX_ERROR_COUNT) {
                setTimeout(upload, 1000 * errorCount); // через 1 сек пробуем ещё раз
            } else {
                onError(this.statusText);
            }

        };

        xhrStatus.open("GET", "status", true);
        xhrStatus.setRequestHeader('x-file-id', fileId);
        xhrStatus.send();
    }


    function send() {

        xhrUpload = new XMLHttpRequest();
        xhrUpload.onload = xhrUpload.onerror = function() {
            console.log("upload end status:" + this.status + " text:" + this.statusText);

            if (this.status == 200) {
                // успешное завершение загрузки
                onSuccess();
                return;
            }

            // что-то не так
            if (errorCount++ < MAX_ERROR_COUNT) {
                startByte = +this.responseText || 0;
                setTimeout(send, 1000 * errorCount); // через 1, 2, 4, 8, ... сек пробуем ещё раз
            } else {
                onError(this.statusText);
            }
        };

        xhrUpload.open("POST", "upload", true);
        // какой файл догружаем /загружаем
        xhrUpload.setRequestHeader('x-file-id', fileId);
        xhrUpload.setRequestHeader('x-start-byte', String(startByte));
        xhrUpload.setRequestHeader('x-file-size', file.size);

        xhrUpload.upload.onprogress = function(e) {
            onProgress(startByte + e.loaded, startByte + e.total);
        };

        // отослать, начиная с байта startByte
        xhrUpload.send(file.slice(startByte));
    }

    function pause() {
        xhrStatus && xhrStatus.abort();
        xhrUpload && xhrUpload.abort();
    }


    this.upload = upload;
    this.pause = pause;
}

// вспомогательная функция: получение 32-битного числа из строки

function hashCode(str) {
    if (str.length == 0) return 0;

    var hash = 0,
        i, chr, len;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};
