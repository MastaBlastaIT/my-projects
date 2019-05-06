$(function () {
    $('#logout').on('click', function () {
        $('<form method="POST" action="/logout">').submit();
        return false;
    });
});
