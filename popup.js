let slider = $('#slider'),
    main = $('#main'),
    moon = $('#moon'),
    sun = $('#sun'),
    activeTab = {active: true, currentWindow: true};

slider.on('mousedown', function() {
    main.on('mousemove', function() {
        let value = slider.val();
        sendActiveTabMessage("change_shade", value);
    })
}).on('change', function() {
    sendActiveTabMessage("change_shade", $(this).val());
})

main.on('mouseup', function() {
    main.off('mousemove');
})

moon.click(function() {
    slider.val(99);
    // send message to active tab
    sendActiveTabMessage("moon_clicked")
})

sun.click(function() {
    slider.val(0);
    // send message to active tab
    sendActiveTabMessage("sun_clicked");
})

let sendActiveTabMessage = function(message, value) {
    chrome.tabs.query(activeTab, function(tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: message, value: value});
    });
}