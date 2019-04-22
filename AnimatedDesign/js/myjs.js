$(window).load(function () {

    $('.sldr').each(function () {
        var th = $(this);
        th.sldr({
            focalClass: 'focalPoint',
            offset: th.width() / 2,
            sldrWidth: 'responsive',
            nextSlide: th.nextAll('.sldr-nav.next:first'),
            previousSlide: th.nextAll('.sldr-nav.prev:first'),
            selectors: th.nextAll('.selectors:first').find('li'),
            toggle: th.nextAll('.captions:first').find('div'),
            sldrInit: sliderInit,
            sldrStart: slideStart,
            sldrComplete: slideComplete,
            sldrLoaded: sliderLoaded,
            sldrAuto: true,
            sldrTime: 5000,
            hasChange: true
        });
    });

});


function sliderInit(args) {

}

function slideLoaded(args) {

}


function sliderLoaded(args) {

}


function slideStart(args) {

}

function slideComplete(args) {

}

$(document).ready(function () {
    new WOW().init();
    
    var amountScrolled = 300;

    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('slow');
        } else {
            $('a.back-to-top').fadeOut('slow');
        }
    });


});
