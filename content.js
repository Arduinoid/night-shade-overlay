// content.js
$(document).ready(function() {
    let nightShadeOverlay = $('<div id="nightShadeOverlay"></div>'),
        bright = 0,
        dark = 0.99,
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
            let message = request.message;
            switch (message) {
                case 'moon_clicked':
                    brightness = dark;
                    break;
            
                case 'sun_clicked':
                    brightness = bright;
                    break;

                case 'change_shade':
                    let inputValue = parseInt(request.value),
                        mappedValue = inputValue * 0.01;
                    brightness = mappedValue;
                    break;
            }
            nightShadeOverlay.css('background-color', `rgba(0,0,0,${brightness})`);
        }
    );
})