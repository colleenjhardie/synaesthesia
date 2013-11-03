chrome.tabs.onSelectionChanged.addListener(function(tabId) {
    chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
    chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendRequest(tab.id, {}, null);
});

// SYNAESTHETIC COLOURS

var synaestheticDevColor = '#5882FA'
var synaestheticTestColor = '#8C7853'
var synaestheticDemoColor = '#5882FA'

// NORMAL COLOURS

var normalDevColor = '#58FA58'
var normalTestColor = '#F4FA58'
var normalDemoColor = '#FF8000'

var setPageAction = function(tabId) {
    // Display the page action icon.
    chrome.pageAction.show(tabId);
};

var setColors = function(tab) {
    if (tab.url.indexOf('-dev') > -1) {
        // This is a DEV environment.
        chrome.tabs.executeScript({code: 'document.getElementById("hd").style.backgroundColor="' + synaestheticDevColor + '"'});
    }
    else if (tab.url.indexOf('-test') > -1) {
        // This is a TEST environment.
        chrome.tabs.executeScript({code: 'document.getElementById("hd").style.backgroundColor="' + synaestheticTestColor + '"'});
    }
    else if (tab.url.indexOf('-demo') > -1) {
        // This is a TEST environment.
        chrome.tabs.executeScript({code: 'document.getElementById("hd").style.backgroundColor="' + synaestheticDemoColor + '"'});
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