$(function() {
    "use strict"


    // Tooltip js
    $('[data-toggle="tooltip"]').tooltip();

    // sticky menu
    $(window).scroll(function(){
        if($(window).scrollTop() > 200){
            $(".header-area").addClass('sticky-nav');
        }else{
            $(".header-area").removeClass('sticky-nav');
        }        
    });

    
    // Mobile Menu
    $('.header-menu').clone().prependTo('.mobile-menu')

    $('.menu-trigger, .menu-close').on('click', function(e) {
        e.stopPropagation()
        $('.menu-trigger').toggleClass('active')
        $('.mobile-menu-wrap').toggleClass('active-menu')
        $('body, .header-area').toggleClass('active-mobile-menu')
    })
    $('.mobile-menu-wrap').on('click', function(e) {
        e.stopPropagation()
    })

    function mobileMenu() {
        $('.menu-trigger').removeClass('active')
        $('.mobile-menu-wrap').removeClass('active-menu')
        $('body, .header-area').removeClass('active-mobile-menu')
    }

    $(document).on('click', function() {
        mobileMenu()
    })


    // product details plus/minus input counter
    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    // scroll to top
    $(".gotop").click(function() {
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
    });

    // filter block
    $(".foi-title").click(function(){
        $(this).parent().siblings().removeClass('active');
        $(this).parent().toggleClass('active');
    });
    $(".fd-title").click(function(){
        // $(this).parent().siblings().children('.fd-content').slideUp('active');
        $(this).parent().children('.fd-content').slideToggle();
    });
    $(".av-filter-trigger").click(function(){
        $(".advance-filter-sec").addClass('active');
    });
    $(".af-close").click(function(){
        $(".advance-filter-sec").removeClass('active');
    });



    // Owlcarousel
    $(".cat-list-carousel").owlCarousel({
        items: 5,
        margin: 10,
        removeClass: true,
        responsive: {
            0: {
                items: 3
            },
            575: {
                items: 4
            },
            767: {
                items: 6
            },
            991: {
                items: 9
            },
            1199: {
                items: 12
            },
        }
    });

    $(".pd-thumb-slider").owlCarousel({
        items: 1,
        autoHeight: true
    });

    // jqeury countdown
    if ($(".sell-countdown").length) {
        $(".sell-countdown").countdown('2021/12/7', function(event) {
            $(this).html(event.strftime('%Hh %Mm %Ss'));
        });
    }



    // Slick Slider
    $('.favorite-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<i class="icofont-thin-left"></i>',
        nextArrow: '<i class="icofont-thin-right"></i>',
        fade: true,
        asNavFor: '.fs-nav',
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }, ]
    });
    $('.fs-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.favorite-slider',
        dots: false,
        prevArrow: '<i class="icofont-thin-up"></i>',
        nextArrow: '<i class="icofont-thin-down"></i>',
        focusOnSelect: true,
        vertical: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                vertical: false,
                slidesToShow: 4,
                prevArrow: '<i class="icofont-thin-left"></i>',
                nextArrow: '<i class="icofont-thin-right"></i>',
            }
        }, ]
    });


    


 




    // Replace all SVG images with inline SVG
    jQuery('img').each(function() {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
    // menu option
    $(".toggle-bar").on("click", function() {
        $(this).toggleClass('active');
        $('.navbar-area').toggleClass('active');
        $('body').toggleClass('overlay');
    });
    // search box
    $('.search-box').on("click", function(e) {
        e.stopPropagation()
        $('.search-input-wrap').toggleClass('active');
    });
    $('.search-input-wrap').click(function(e) {
        e.stopPropagation()
    })
    $(document).click(function() {
        $('.search-input-wrap').removeClass('active')
    })
});