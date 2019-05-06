var uploader;

document.forms.upload.onsubmit = function() {
    var file = this.elements.myfile.files[0];
    if (!file) return false;

    var isDummyMode = this.elements['is-dummy'].checked;

    if(!isDummyMode) {
        uploader = new Uploader(file, onSuccess, onError, onProgress);
        uploader.upload();
    } else {
        upload(file);
    }

    return false;
}

document.forms.upload.onchange = function(e) {
    var target = e.target.closest('input[name="is-dummy"]')
    if(target) {
        switch(target.checked) {
            case true:
                document.getElementById('upload-pause').style.display = "none";
                break;
            case false:
                document.getElementById('upload-pause').style.display = "";
                break;
        }
    }
}


function log(html) {
    document.getElementById('upload-log').innerHTML = html;
}

function onSuccess() {
    log('success');
}

function onError(message) {
    log('error: ' + message);
}

function onProgress(loaded, total) {
    log("progress: " + loaded + ' / ' + total);
}


function upload(file) {
    var xhr = new XMLHttpRequest();
    xhr.onload = xhr.onerror = function() {
        if(this.status == 200) {
            onSuccess();
        } else {
            onError(this.status);
        }
    };

    xhr.upload.onprogress = function(e) {
        onProgress(e.loaded, e.total);
    };

    xhr.open("POST", "dummy-upload", true);
    xhr.send(file);  // отправляем содержимое POST запросом
    // var formData = new FormData(document.forms.upload);  // будет использован multipart/form-data
    // xhr.send(formData);
}