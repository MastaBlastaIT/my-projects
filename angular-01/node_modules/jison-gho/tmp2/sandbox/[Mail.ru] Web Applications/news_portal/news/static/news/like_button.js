$(function(){
    $(document).ready(function(){
        $('[data-click-action]').click(function(){
            var el = $(this);
            //console.log(this);
            var api_link = el.data('click-action');
            //console.log(api_link);
            $.getJSON(api_link, function (data){
                //console.log('#'+String(data.model_name)+'-'+String(data.pk));
                $('#'+String(data.model_name)+'-'+String(data.pk)).children(".article-rating").html(data.likes);
                });
            });
        });
});
