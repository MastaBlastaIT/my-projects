function PublishForm(form, url) {
    form.onsubmit = function(e) {
        var message = form.message.value;
        if(!message.length) {  // check that message is not empty
            showNotification(e.target, "");
        }
        form.message.value = '';
        sendMessage(message, url);
        return false;  // prevent normal form submission
    }

    function sendMessage(message, url) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.send(message);  // use JSON.stringify to send the string as JSON
        xhr.onerror = function() {
            showNotification('error: ' + this.status + ' ' + this.statusText);
        };
    }
    
    function showNotification(notificationText) {
        notifications.innerHTML = notificationText;
    }
}


function SubscribePane(paneEl, url) {
    subscribe();

    function subscribe() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = xhr.onerror = function() {
            if(this.status == 200) {  // success
                printMessage(this.responseText);
                subscribe();  // received message successfully, reconnecting back (long-polling)
                return;
            }
            // something went wrong
            if(this.status != 404) {  // possible server restart
                console.log('Long-polling not successful. Error: ' + this.status + ' ' + this.statusText);
            }
            setTimeout(subscribe, 1000); // try again after 1s (to not overload server)
        };

        xhr.send();
    }

    function printMessage(message) {
        paneEl.insertAdjacentHTML('beforeEnd', render(message));
    }
    
    function render(message) {
        var tmpl = _.template(document.getElementById('template__message').innerHTML);
        return tmpl({message: message});
    }
}

