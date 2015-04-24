
var setPageAction = function(tabId) {
    // Display the page action icon.
    chrome.pageAction.show(tabId);
};

var setColors = function(tab, environment) {

    if (environment === 'appengine') {
        if (tab.url.indexOf('-dev') > -1) {
            // This is a DEV environment.
            chrome.tabs.insertCSS(null, {file: "css/dev.css"});
        }
        else if (tab.url.indexOf('-test') > -1) {
            // This is a TEST environment.
            chrome.tabs.insertCSS(null, {file: "css/test.css"});
        }
        else if (tab.url.indexOf('-demo') > -1) {
            // This is a TEST environment.
            chrome.tabs.insertCSS(null, {file: "css/demo.css"});
        }
        else if (tab.url.indexOf('-prod') > -1) {
            // This is a TEST environment.
            chrome.tabs.insertCSS(null, {file: "css/prod.css"});
        }
    } else if (environment === 'cloud') {
        if (tab.url.indexOf('-dev') > -1) {
            // This is a DEV environment.
            chrome.tabs.insertCSS(null, {file: "css/dev-cloud.css"});
        }
        else if (tab.url.indexOf('-test') > -1) {
            // This is a TEST environment.
            chrome.tabs.insertCSS(null, {file: "css/test-cloud.css"});
        }
        else if (tab.url.indexOf('-demo') > -1) {
            // This is a TEST environment.
            chrome.tabs.insertCSS(null, {file: "css/demo-cloud.css"});
        }
        else if (tab.url.indexOf('-prod') > -1) {
            // This is a TEST environment.
            chrome.tabs.insertCSS(null, {file: "css/prod-cloud.css"});
        }
    } else {
        console.log('Encountered an unrecognized environment.  Please file a feature request at ' +
        'https://github.com/colleenjhardie/synaesthesia/issues');
    }
};


var checkUrl = function(tabId, changeInfo, tab) {
    var environment = 'wat';
    if (tab.url.indexOf('https://appengine.google.com/') > -1) {
        // This is an appengine admin page
        self.environment = 'appengine'
    } else if (tab.url.indexOf('https://console.developers.google.com/project/') > -1) {
        // This is a cloud console page.
        self.environment = 'cloud'
    }

    // Display the page action icon.
    setPageAction(tabId);
    //Set the colors.
    setColors(tab, self.environment);

    return false;
};

// Listen for changes to any URL in any tab
chrome.tabs.onUpdated.addListener(checkUrl);
