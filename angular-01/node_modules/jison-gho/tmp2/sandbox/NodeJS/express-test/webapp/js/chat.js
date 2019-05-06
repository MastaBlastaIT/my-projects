$(function () {
    var socket = io.connect({
        reconnectionAttempts: 10
    });  // no params: current server
    var $formEl = $('.chat__form');
    var $messageEl = $('#chat__message');
    var $statusEl = $('.chat__status');
    var isDisabled = false;
    var username;

    $formEl.submit(function () {
        var message = $messageEl.val();
        if (!isValid()) {
            $messageEl.addClass('chat__message_invalid');
        } else {
            $messageEl.removeClass('chat__message_invalid');
        }

        socket.emit('message_client', {message: message}, function (data) {  // get this user's message from server in callback
            console.log("Sent the message: ", data.message);
            addMessage(data.username, data.message);
        });
        $messageEl.val("");
        return false;  // prevent form submission
    });

    socket.on('message_server', function (data) {  // data = { message: "chat message" }
        addMessage(data.username, data.message);
    }).on('join', function (data) {
        if(data.username != username) {  // the same user can receive the message if she opened the chat in another browser tab
            addStatusMessage('User ' + data.username + ' has joined the chat');
        }
    }).on('leave', function (data) {
        if(data.username != username) {
            addStatusMessage('User ' + data.username + ' has left the chat');
        }
    }).on('logout', function () {
        addStatusMessage('You have left the chat');
    }).on('error', function (data) {
        addStatusMessage(data.message);
    }).on('session:data', function (data) {
        showStatus('Connection established.', 'text-success');
        username = data.username;
        console.log("Received session data: ", data);
    }).on('connect', function () {
        showStatus('Connection established.', 'text-success');
    }).on('disconnect', function () {
        showStatus('Disconnected.', 'text-warning');
    }).on('reconnect', function () {
        showStatus('Connection re-established.', 'text-success');
    }).on('reconnect_attempt', function () {
        showStatus('Attempting to reconnect.', 'text-info');
    }).on('reconnect_failed', function () {
        showStatus('Failed to reconnect.', 'text-warning');
    });


    function isValid() {
        var message = $messageEl.val();
        if (!message) return false;
        return true;
    }

    function addMessage(username, message, classStr) {
        classStr = classStr || "";
        var $messagesEl = $('.chat__messages').find('ul');  // <=> $('.chat__messageList', 'ul')
        var userStr = username ? username + ' > ' : '';
        $('<li>').append(  $('<b>').text(userStr)  ).append(message)
            .addClass('list-group-item').addClass(classStr)
            .appendTo($messagesEl);
    }

    function addStatusMessage(message) {
        addMessage(null, message, "text-info");
    }

    function showStatus(status, classStr) {
        classStr = classStr || "";
        $statusEl.removeClass();
        $statusEl.addClass(classStr).text(status);
        if (classStr !== 'text-success') {
            $messageEl.prop('disabled', true);
            $(':submit', $formEl).prop('disabled', true);
            isDisabled = true;
        } else if (isDisabled) {
            $messageEl.prop('disabled', "");
            $(':submit', $formEl).prop('disabled', "");
            isDisabled = false;
        }
    }

});