$(function() {
    var button = $('#page-top');
    button.hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            button.fadeIn();
        } else {
            button.fadeOut();
        }
    });
    button.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});