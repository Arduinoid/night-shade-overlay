let node = $('#node'),
    main = $('#main'),
    icons = $('img'),
    moon = $(icons[0]),
    sun = $(icons[1]);

node.on('mousedown', function(event) {
    let nodeClicked = $(this),
        initialPosition = event.pageX,
        rest,x,y,newTranslationX,direction;
    nodeClicked.addClass('node-hold');

    main.on('mousemove', function(event) {
        [y,x,...rest] = nodeClicked.css('transform').replace(/[(matrix)\(\)]/g,'').split(',').reverse();

        if (event.pageX > initialPosition)
        { direction = 1; }
        else if (event.pageX < initialPosition)
        { direction = -1; }

        if (typeof x !== typeof undefined)
        { newTranslationX = parseInt(x) + direction; }
        else
        { newTranslationX = direction; }

        nodeClicked.css('transform', `translate(${newTranslationX}px, ${y}px)`);
        // nodeClicked.animate({transform: `translate(${newTranslationX}px, ${y}px)`});
        console.log(`newTranslationX: ${newTranslationX}`);
        console.log(`x: ${x}`);
        console.log(y);
        console.log(`rest: ${rest}`);
    })
    
})

main.on('mouseup', function() {
    node.removeClass('node-hold');
    $(this).off('mousemove');
})

moon.click(function() {
    console.log('moon clicked');
    // send message to active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: "moon_clicked"});
    });
})

sun.click(function() {
    console.log('sun clicked');
    // send message to active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: "sun_clicked"});
    });
})