function subscribe_to_new_answers() {
  var $info = $('#comments-cent-data');
  var centrifuge = new Centrifuge({
    url: $info.data('cent-url'),
    user: $info.data('cent-user').toString(),
    timestamp: $info.data('cent-ts').toString(),
    info: $info.data('cent-info'),
    token: $info.data('cent-token'),
    debug: false,
  });

  var channel = $info.data('cent-channel');
  console.log('subscribe on channel ' + channel);
  centrifuge.subscribe(channel, function(msg) {
    console.log(msg);
    var row_html = '<tr><td>' + msg.data.text + '</td></tr>';
    $('.comments-table tr:last').after(row_html);
  });
  centrifuge.connect();
  return centrifuge;
}

var g_centrifuge = undefined;

$(document).ready(function() {
  g_centrifuge = subscribe_to_new_answers();
});

$('#comment-form').submit(function(e){
    $.post('', $(this).serialize(), function(data){
       // Do nothing, everything else is handled by socket.io
    });
    e.preventDefault();
});