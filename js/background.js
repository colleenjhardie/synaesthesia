chrome.tabs.onSelectionChanged.addListener(function(tabId) {
    chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
    chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendRequest(tab.id, {}, null);
});

// Check to see if a tab URL is that of a GAE console or the GAE 'My Applictions' summary page.  If so, call the page
// action.
function checkUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('https://appengine.google.com/') > -1) {
        console.log("Found an appengine page...");
        chrome.pageAction.show(tabId);
	}
    if (tab.url.indexOf('-dev') > -1) {
        console.log("About to pretty up dev.");
        var color = $( this ).css( "ae-dashboard-body" );
        console.log(color);
      //$this.getAttribute('body').css("ae-dashboard-body", "#ff0000");
    }
}

// Listen for changes to any URL in any tab
$(document).ready(function() {
    chrome.tabs.onUpdated.addListener(checkUrl);
});