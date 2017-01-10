/**
 * Created by alan on 09/01/17.
 */
// $("#flipbook").turn({
//     width: 650,
//     height: 500,
//     autoCenter: true
// });
window.addEventListener('resize', resize);

document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
    // e.stopPropagation();
});

function loadApp() {

    console.log('Load App');

    var size = getSize();
    console.log(size);

    // Create the flipbook

    $('#flipbook').turn({

        // Width
        width: size.width,

        // Height
        height: size.height,

        // Elevation
        elevation: 50,

        // Duration in millisecond
        duration: 1000,

        // Enable gradients
        gradients: true,

        // Auto center this flipbook
        autoCenter: true

    });

    // Zoom.js

    $('#flipbook').zoom({
        flipbook: $('#flipbook'),
        max: function() {

            return 2214/$('#flipbook').width();

        },
        when: {
            tap: function(event) {

                if ($(this).zoom('value')==1) {
                    $('#flipbook').
                    removeClass('animated').
                    addClass('zoom-in');
                    $(this).zoom('zoomIn', event);
                } else {
                    $(this).zoom('zoomOut');
                }
            },

            resize: function(event, scale, page, pageElement) {

                if (scale==1)
                    loadSmallPage(page, pageElement);
                else
                    loadLargePage(page, pageElement);

            },

            zoomIn: function () {

                $('#flipbook').addClass('zoom-in');

                if (!window.escTip && !$.isTouch) {
                    escTip = true;

                    $('<div />', {'class': 'esc'}).
                    html('<div>Pressione ESC para sair</div>').
                    appendTo($('body')).
                    delay(2000).
                    animate({opacity:0}, 500, function() {
                        $(this).remove();
                    });
                }
            },

            zoomOut: function () {

                $('.esc').hide();
                $('.thumbnails').fadeIn();
                $('.made').fadeIn();

                setTimeout(function(){
                    $('#flipbook').addClass('animated').removeClass('zoom-in');
                    resizeViewport();
                }, 0);

            },

            swipeLeft: function() {

                $('#flipbook').turn('next');

            },

            swipeRight: function() {

                $('#flipbook').turn('previous');

            }
        }
    });

    $(document).keydown(function(e){

        var previous = 37, next = 39, esc = 27;

        switch (e.keyCode) {
            case previous:

                // left arrow
                $('#flipbook').turn('previous');
                e.preventDefault();

                break;
            case next:

                //right arrow
                $('#flipbook').turn('next');
                e.preventDefault();

                break;
            case esc:

                $('.magazine-viewport').zoom('zoomOut');
                e.preventDefault();

                break;
        }
    });
}

function getSize() {
    console.log('get size');
    console.log('get size');
    var width = $('#content_size').width();
    var height = $('#content_size').height();


    return {
        width: width,
        height: height
    }
}

function resize() {
    console.log('resize event triggered');

    var size = getSize();
    console.log(size);

    if (size.width > size.height) { // landscape
        $('#flipbook').turn('display', 'double');
    }
    else {
        $('#flipbook').turn('display', 'single');
    }

    $('#flipbook').turn('size', size.width, size.height);
}

// Load App
loadApp();
