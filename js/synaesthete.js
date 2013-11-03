chrome.tabs.onSelectionChanged.addListener(function(tabId) {
    chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
    chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendRequest(tab.id, {}, null);
});

var storage = chrome.storage.local;

var checkUrl = function checkUrl(tabId, changeInfo, tab) {

    if (tab.url.indexOf('https://appengine.google.com/') > -1) {

        // This is an appengine admin page.  Display the page action icon.
        chrome.pageAction.show(tabId);

        if (tab.url.indexOf('-dev') > -1) {
            // This is a DEV environment.
            console.log("About to pretty up dev.");
            chrome.tabs.executeScript({code: 'document.getElementById("hd").style.backgroundColor="#00ffcc"'});
        }
    }
    return false;
};

// Listen for changes to any URL in any tab
$(document).ready(function() {
    chrome.tabs.onUpdated.addListener(checkUrl);
});