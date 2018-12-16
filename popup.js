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
})

moon.click(function() {
    console.log('moon clicked');
    // send message to active tab
    sendActiveTabMessage("moon_clicked")
})

sun.click(function() {
    console.log('sun clicked');
    // send message to active tab
    sendActiveTabMessage("sun_clicked");
})

let sendActiveTabMessage = function(message, value) {
    chrome.tabs.query(activeTab, function(tabs) {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: message, value: value});
    });
}