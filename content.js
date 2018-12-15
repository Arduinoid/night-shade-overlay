// content.js
$(document).ready(function() {
    let nightShadeOverlay = $('<div id="nightShadeOverlay"></div>'),
        bright = 0,
        dark = 0.3,
        brightness;
    
    // add styling to tint the overlay element
    nightShadeOverlay.css({
        backgroundColor: 'rgba(0,0,0,0)',
        display: 'inline-block',
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: '0px',
        left: '0px',
        pointerEvents: 'none',
        zIndex: '9999',
    });
    
    // put overlay element on the page
    $('body').append(nightShadeOverlay);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.message === 'moon_clicked') {
                brightness = dark;
            }
            else if (request.message === 'sun_clicked') {
                brightness = bright;
            }
            nightShadeOverlay.css('background-color', `rgba(0,0,0,${brightness})`);
        }
    );
})