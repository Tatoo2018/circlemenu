(function ($) {

    $.fn.circlemenu = function () {

        var menuelements = $(this).find(".circlemenu");

        if (menuelements[0]) {

            var menuelement = $(menuelements[0]);

            var touchStartX;
            var touchStartY;
            var touchStartX1;
            var touchStartY1;
            var firstinitmode = !1;
            var topspcirclemenulist = menuelement.find('ul li');
            var item_num = topspcirclemenulist.length;
            var deg = (360.0 / item_num);
            var circle_r = (menuelement.width()) / 2;
            var circle_centerx = menuelement.width() / 2;
            var circle_centery = menuelement.height() / 2 + 80;
            var listwidth = topspcirclemenulist.width() / 2;
            var isMove = !1;
            menuelement.css("opacity", "0.4");
            var defaultcircler = 30;
            var currentangle = -240;
            var startangle = currentangle;
            var swipewidth = 60;
            var swipewhieelr = deg;
            var inittopspcirclemenuposition = function (anglee) {
                var localangle = anglee;
                topspcirclemenulist.each(function (index, element) {
                    localangle = localangle + deg;
                    var x = circle_centerx + circle_r * Math.cos(localangle * (Math.PI / 180));
                    var y = circle_centery + circle_r * Math.sin(localangle * (Math.PI / 180));
                    $(element).css('left', x - listwidth).css('top', y);
                    if (firstinitmode) {
                        $(element).removeClass("active");
                        $(element).removeClass("active2");
                        if (y < 40 && y > 0) {
                            $(element).addClass("active2")
                        } else if (y < 75) {
                            $(element).addClass("active")
                        }
                        console.log(y)
                    }
                })
            };
            topspcirclemenulist.on("touchstart", function (event) {
                touchStartX = event.originalEvent.changedTouches[0].pageX;
                touchStartY = event.originalEvent.changedTouches[0].pageY;
                touchStartX1 = touchStartX;
                touchStartY1 = touchStartY;
                isMove = !0;
                startangle = currentangle;
            });
            topspcirclemenulist.on("touchmove", function (event) {
                event.preventDefault();
                var touchMoveX = event.originalEvent.changedTouches[0].pageX;
                var touchMoveY = event.originalEvent.changedTouches[0].pageY;
                if (isMove) {
                    if (touchStartX1 - touchMoveX > swipewidth) {
                        var toangle = currentangle - swipewhieelr;
                        movetonext(startangle, toangle);
                    } else if (touchStartX1 - touchMoveX < -swipewidth) {
                        var toangle = currentangle + swipewhieelr;
                        movetonext(startangle, toangle);
                    } else {
                        startangle = startangle + (touchMoveX - touchStartX) / 2;
                        inittopspcirclemenuposition(startangle);
                    }
                }
                touchStartX = touchMoveX;
                touchStartY = touchMoveY;
            });
            topspcirclemenulist.on("touchend", function (event) {
                if (isMove) {
                    $({
                        angle: startangle
                    }).animate({
                        angle: currentangle
                    }, {
                        duration: 300,
                        easing: 'easeOutBounce',
                        progress: function (anim, progress, fx) {
                            inittopspcirclemenuposition(anim.elem.angle);
                        }
                    })
                }
            });
            var movetonext = function (startangle, toangle) {
                $({
                    angle: startangle
                }).animate({
                    angle: toangle
                }, {
                    easing: 'easeOutBack',
                    duration: 400,
                    progress: function (anim, progress, fx) {
                        inittopspcirclemenuposition(anim.elem.angle);
                    },
                    complete: function () {
                        currentangle = toangle;
                        inittopspcirclemenuposition(currentangle);
                    }
                });
                isMove = !1;
            };
            window.addEventListener('load', function () {
                $({
                    angle: currentangle
                }).animate({
                    angle: defaultcircler
                }, {
                    duration: 2100,
                    easing: 'easeInOutBack',
                    progress: function (anim, progress, fx) {
                        currentangle = anim.elem.angle;
                        inittopspcirclemenuposition(currentangle);
                        if (defaultcircler <= currentangle) {
                            firstinitmode = !0;
                            menuelement.css("opacity", "1");
                            inittopspcirclemenuposition(currentangle);
                        }
                    },
                    complete: function () {
                        currentangle = defaultcircler;
                        inittopspcirclemenuposition(currentangle);
                    }
                });
            });
        }

    }



})(jQuery);