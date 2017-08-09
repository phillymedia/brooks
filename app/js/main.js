var Cookies = require("js-cookie");
var _ = require('lodash');
require("./modernizr");

$(document).ready(function() {

    $(".backgroundImage").addClass("fadeImage");
    $(".overlayText").addClass("fadeHeader");

    $(".cssgrid .gridSection").css("top", $(".header").height() + 4 + "px");
    $("body").append("<div class='addBookmark'><i class='fa fa-bookmark' aria-hidden='true'></i> <span id='savespot'>Save my spot for later</span></div>");

    if (Cookies('prev_scroll_position')) {
        $("body").append("<div class='cookie-load'><div class='cookie-wrap'><div class='closeWindow'>X</div><div class='cookie-text'>Welcome back. Would you like to continue where you left off?</div><div class='continueButtons'><div id='cbtn-yes' class='cbtn'>Yes, start where I left off</div><div class='cbtn' id='cbtn-no'>No, start at the beginning</div></div></div></div>");
    }

    $("#cbtn-yes").on("click", function() {
        var cookieSet = Number(prev_scroll_position) + $(".header").height() + 20;
        $("body").animate({
            scrollTop: prev_scroll_position
        }, 500);
        // $("body").append("<div class='bookmark'><i class='fa fa-bookmark' aria-hidden='true'></i>Bookmarked position</div>");
        // $(".bookmark").css("top", cookieSet + "px");
        $("body, html").css("overflow", "");
        $(".cookie-load").remove();
        $(".bodyContainer p").each(function() {
            var $element = $(this);
            var element_top_position = $element.offset().top;
            var window_top_position = $(window).scrollTop();
            if (element_top_position - $(".header").height() - 15 == prev_scroll_position) {
            $element.prepend("<div class='bookmarkPosition'><i class='fa fa-bookmark' aria-hidden='true'></i>Bookmarked position</div>")
            }
        })
    })

    $("#cbtn-no").on("click", function() {
        $("body, html").css("overflow", "");
        $(".cookie-load").remove();
        Cookies.remove('prev_scroll_position', {
            expires: 7,
            path: '/'
        });
        $("body").animate({
            scrollTop: 0
        }, 500);
    })

    $(".closeWindow").on("click", function() {
        $(".cookie-load").remove();
        Cookies.remove('prev_scroll_position', {
            expires: 7,
            path: '/'
        });
    })

    var prev_scroll_position = Cookies('prev_scroll_position');


    var scroll_positon = $(window).scrollTop();

    function checkScroll(event) {


        setTimeout(function() {
            Cookies('prev_scroll_position', scroll_positon, {
                expires: 7,
                path: '/'
            });
        }, 10);

        $(".bodyContainer p").each(function() {
            var $element = $(this);
            var element_top_position = $element.offset().top;
            var window_top_position = $(window).scrollTop();
            if (element_top_position - $(window).height()*.4 <= window_top_position) {
                scroll_positon = Number(element_top_position) - $(".header").height() - 15;
            }
        })

        $(".containerQuote").each(function() {
            var $element = $(this);
            var element_top_position = $element.offset().top;
            var window_top_position = $(window).scrollTop();

            if (element_top_position <= window_top_position + ($(window).height() + 200)) {
                $element.css("opacity", "1");
            }
        })
    }
    $(".addBookmark").on("click", function() {

        Cookies('prev_scroll_position', scroll_positon, {
            expires: 7,
            path: '/'
        });

        $(".bookmark").remove();

        $("#savespot").text("Bookmark saved");

        var cookieSet = Number(scroll_positon) + $(".header").height() + 20;
        // $("body").append("<div class='bookmark'><i class='fa fa-bookmark' aria-hidden='true'></i>Bookmarked position</div>");
        // $(".bookmark").css("top", cookieSet + "px");


        $(".bodyContainer p").each(function() {
            var $element = $(this);
            var element_top_position = $element.offset().top;
            var window_top_position = $(window).scrollTop();
            if (element_top_position - $(".header").height() - 15 == scroll_positon) {
            $element.prepend("<div class='bookmarkPosition'><i class='fa fa-bookmark' aria-hidden='true'></i>Bookmarked position</div>")
            }
        })


        // $.ajax({
        //     url: "https://docs.google.com/forms/d/1MydBN5zjxMnpejnsa0whIh2tXbm0Cdzh6leKR9SupN4/formResponse",
        //     data: {
        //         "entry.2044532047": scroll_positon
        //     },
        //     type: "POST",
        //     dataType: "xml",
        //     statusCode: {
        //         0: function() {
        //             //Success message
        //         },
        //         200: function() {
        //             //Success Message
        //         }
        //     }
        // });
    })
    $(".addBookmark").css("top", ($(".header").height() + 15 + "px"));
    $(window).scroll(_.throttle(checkScroll, 1000));
});
