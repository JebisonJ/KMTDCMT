(function ($) {
    "use strict";

    // Check if element exists
    function exists(element) {
        return $(element).length > 0;
    }

    // Preloader
    $(window).on('load', function () {
        if (exists('#preloader-active')) {
            $('#preloader-active').delay(450).fadeOut('slow');
            $('body').delay(450).css({
                'overflow': 'visible'
            });
        }
    });

    /* 4. MainSlider */
    function mainSlider() {
        // Only initialize if element exists
        if (!exists('.slider-active')) return;

        var basicSlider = $('.slider-active');
        basicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });

        basicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });

        if (pluginExists('slick')) {
            basicSlider.slick({
                autoplay: true,
                autoplaySpeed: 4000,
                dots: false,
                fade: true,
                arrows: false,
                prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                }]
            });
        }
    }

    // Handle animations
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }

    // Check if plugin exists
    function pluginExists(pluginName) {
        return typeof $.fn[pluginName] !== 'undefined';
    }

    // Initialize functions
    $(document).ready(function() {
        mainSlider();
    });

})(jQuery);