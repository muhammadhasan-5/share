(function ($) {
    'use strict';

    // Index of jQuery Active Code
    var $window = $(window);

    // :: 1.0 Preloader Active Code
    // $window.on('load', function () {
    //     $('#preloader').fadeOut('slow', function () {
    //         $(this).remove();
    //     });
    // });
    $window.on('load', function () {
        $('#preloader').fadeOut(10);
    });
    


    // :: 9.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1500,
            easingType: 'easeInOutQuart',
            scrollText: ['<i class="ti-angle-up"></i>'],
            scrollImg: false
        });
    }

    // :: 10.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // :: 13.0 Sticky Active Code
    $window.on('scroll', function () {
        if ($window.scrollTop() > 150) {
            $('.main_header_area').addClass('sticky slideInDown');
        } else {
            $('.main_header_area').removeClass('sticky slideInDown');
        }
    });

    $(document).on('click', '.nav-link', function(cb){
        
        if( document.body.className.match('sidebar-collapse') ) { 
            
            console.log('yes')
            // deve mostrar somente o icone
            $('.hulk-logo').addClass('d-none')
            $('.hulk-icon').removeClass('d-none')
        }
        else{
            // deve mostrar a logo inteira
            console.log('no') 
            $('.hulk-logo').removeClass('d-none')
            $('.hulk-icon').addClass('d-none')
          }
    });



})(jQuery);

function wcqib_refresh_quantity_increments() {
    jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function(a, b) {
        var c = jQuery(b);
        c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
    })
}
String.prototype.getDecimals || (String.prototype.getDecimals = function() {
    var a = this,
        b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function() {
    var a = jQuery(this).closest(".quantity").find(".qty"),
        b = parseFloat(a.val()),
        c = parseFloat(a.attr("max")),
        d = parseFloat(a.attr("min")),
        e = a.attr("step");
    b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});

