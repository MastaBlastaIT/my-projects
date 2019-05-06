$(function () {
    $(document.forms['login-form']).on('submit', function () {
        var form = $(this);

        $('.error', form).html('');
        $(":submit", form).html("Loading...").prop("disabled", true);

        $.ajax({
            url: "/login",
            method: "POST",
            data: form.serialize(),
            complete: function () {
            },
            statusCode: {
                200: function () {
                    form.html("You have entered the site").addClass('alert-success');
                    window.location.href = "/";
                },
                403: function (jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    $('.error', form).html(error.message);
                }
            }
        });

        return false;
    });
});