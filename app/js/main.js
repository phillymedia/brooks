var Cookies = require("js-cookie");
var _ = require('lodash');
require("./modernizr");

$(document).ready(function() {

    $(".backgroundImage").addClass("fadeImage");
    $(".overlayText").addClass("fadeHeader");

    $(".cssgrid .gridSection").css("top",$(".header").height() + 4 + "px");


    if (Cookies('prev_scroll_position')) {
        $("body").append("<div class='cookie-load'><div class='cookie-wrap'><div class='closeWindow'>X</div><div class='cookie-text'>Welcome back. Would you like to continue where you left off?</div><div class='continueButtons'><div id='cbtn-yes' class='cbtn'>Yes, start where I left off</div><div class='cbtn' id='cbtn-no'>No, start at the beginning</div></div></div></div>");

    }

    $("#cbtn-yes").on("click", function() {
        $("body").animate({scrollTop: prev_scroll_position}, 500);
        $("body").append("<div class='bookmark'>This is where you stopped --></div>");
        $(".bookmark").css("top", prev_scroll_position + $(".header").height() + 500 + "px")
        $("body, html").css("overflow","");
        $(".cookie-load").remove();
    })

    $("#cbtn-no").on("click", function() {
        $("body, html").css("overflow","");
        $(".cookie-load").remove();
        Cookies.remove('prev_scroll_position', {
            expires: 7,
            path: '/'
        });
            $("body").animate({scrollTop: 0}, 500);
    })

    $(".closeWindow").on("click", function(){
        $(".cookie-load").remove();
        Cookies.remove('prev_scroll_position', {
            expires: 7,
            path: '/'
        });
    })


    var prev_scroll_position = Cookies('prev_scroll_position');

    function checkScroll(event) {
        var scroll_positon = $(window).scrollTop();

        setTimeout(function() {
            Cookies('prev_scroll_position', scroll_positon, {
                expires: 7,
                path: '/'
            });
        }, 10);

        $("p").each(function() {
            var $element = $(this);
            var element_top_position = $element.offset().top;
            var window_top_position = $(window).scrollTop();
            if(element_top_position - $(".header").height() <= window_top_position) {
                scroll_positon = element_top_position - $(".header").height() - 15;
            }
        })

        $(".containerQuote").each(function() {
            var $element = $(this);
            var element_top_position = $element.offset().top;
            var window_top_position = $(window).scrollTop();

            if(element_top_position <= window_top_position + ($(window).height()+200)) {
                $element.css("opacity","1");
            }
        })

    }


    $(window).scroll(_.throttle(checkScroll, 1000));


});
