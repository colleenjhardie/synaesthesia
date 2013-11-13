// SYNAESTHETIC COLOURS

var synaestheticDevColor = '#CEE3F6';
var synaestheticTestColor = '#CDC0B0';
var synaestheticDemoColor = '#CEE3F6';

// NORMAL COLOURS

var normalDevColor = '#E6F8E0';
var normalTestColor = '#F5F6CE';
var normalDemoColor = '#F6E3CE';


var setPageAction = function(tabId) {
    // Display the page action icon.
    chrome.pageAction.show(tabId);
};

var setColors = function(tab) {
    if (tab.url.indexOf('-dev') > -1) {
        // This is a DEV environment.
        chrome.tabs.insertCSS(null, {file: "css/dev.css"});
        console.log('inserting css bitch')
    }
    else if (tab.url.indexOf('-test') > -1) {
        // This is a TEST environment.
        chrome.tabs.executeScript({code: 'document.body.style.backgroundColor="' + normalTestColor + '"'});
    }
    else if (tab.url.indexOf('-demo') > -1) {
        // This is a TEST environment.
        chrome.tabs.executeScript({code: 'document.body.style.backgroundColor="' + normalDemoColor + '"'});
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
