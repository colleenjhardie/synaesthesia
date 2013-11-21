
var setPageAction = function(tabId) {
    // Display the page action icon.
    chrome.pageAction.show(tabId);
};

var setColors = function(tab) {
    if (tab.url.indexOf('-dev') > -1) {
        // This is a DEV environment.
        tab.insertCSS(null, {file: "css/dev.css"});
    }
    else if (tab.url.indexOf('-test') > -1) {
        // This is a TEST environment.
        tab.insertCSS(null, {file: "css/test.css"});
    }
    else if (tab.url.indexOf('-demo') > -1) {
        // This is a TEST environment.
        tab.insertCSS(null, {file: "css/demo.css"});
    }
};

var checkUrl = function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('https://appengine.google.com/') > -1) {
        // This is an appengine admin page.
        // Display the page action icon.
        setPageAction(tabId);
        // Set the colors.
        setColors(tab);
    }
    return false;
};

// Listen for changes to any URL in any tab
chrome.tabs.onUpdated.addListener(checkUrl);
