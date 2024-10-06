/*! This script in this file is minified but the premium maps include a full file */
function isTouchEnabled() {
    return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
}
jQuery(function() {
    jQuery("path[id^=tryjs]").each(function(i, e) {
        tryaddEvent(jQuery(e).attr("id"))
    })
});

function tryaddEvent(id, relationId) {
    var _obj = jQuery("#" + id);
    var arr = id.split("");
    var _Textobj = jQuery("#" + id + "," + "#tryjsvn" + arr.slice(5).join(""));
    jQuery("#" + ["visnames"]).attr({
        "fill": tryjsconfig.general.visibleNames
    });
    _obj.attr({
        "fill": tryjsconfig[id].upColor,
        "stroke": tryjsconfig.general.borderColor
    });
    _Textobj.attr({
        "cursor": "default"
    });
    if (tryjsconfig[id].active === !0) {
        _Textobj.attr({
            "cursor": "pointer"
        });
        _Textobj.hover(function() {
            jQuery("#tryjstip").show().html(tryjsconfig[id].hover);
            _obj.css({
                "fill": tryjsconfig[id].overColor
            })
        }, function() {
            jQuery("#tryjstip").hide();
            jQuery("#" + id).css({
                "fill": tryjsconfig[id].upColor
            })
        });
        if (tryjsconfig[id].target !== "none") {
            _Textobj.mousedown(function() {
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].downColor
                })
            })
        }
        _Textobj.mouseup(function() {
            jQuery("#" + id).css({
                "fill": tryjsconfig[id].overColor
            });
            if (tryjsconfig[id].target === "new_window") {
                window.open(tryjsconfig[id].url)
            } else if (tryjsconfig[id].target === "same_window") {
                window.parent.location.href = tryjsconfig[id].url
            } else if (tryjsconfig[id].target === "modal") {
                jQuery(tryjsconfig[id].url).modal("show")
            }
        });
        _Textobj.mousemove(function(e) {
            var x = e.pageX + 10,
                y = e.pageY + 15;
            var tipw = jQuery("#tryjstip").outerWidth(),
                tiph = jQuery("#tryjstip").outerHeight(),
                x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
            y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
            jQuery("#tryjstip").css({
                left: x,
                top: y
            })
        });
        if (isTouchEnabled()) {
            _Textobj.on("touchstart", function(e) {
                var touch = e.originalEvent.touches[0];
                var x = touch.pageX + 10,
                    y = touch.pageY + 15;
                var tipw = jQuery("#tryjstip").outerWidth(),
                    tiph = jQuery("#tryjstip").outerHeight(),
                    x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
                y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].downColor
                });
                jQuery("#tryjstip").show().html(tryjsconfig[id].hover);
                jQuery("#tryjstip").css({
                    left: x,
                    top: y
                })
            });
            _Textobj.on("touchend", function() {
                jQuery("#" + id).css({
                    "fill": tryjsconfig[id].upColor
                });
                if (tryjsconfig[id].target === "new_window") {
                    window.open(tryjsconfig[id].url)
                } else if (tryjsconfig[id].target === "same_window") {
                    window.parent.location.href = tryjsconfig[id].url
                } else if (tryjsconfig[id].target === "modal") {
                    jQuery(tryjsconfig[id].url).modal("show")
                }
            })
        }
    }
}