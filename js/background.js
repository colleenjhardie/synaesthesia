// Check to see if a tab URL is that of a GAE console or the GAE 'My Applictions' summary page.  If so, call the page action.
function checkUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('https://appengine.google.com/') > -1) {
    chrome.pageAction.show(tabId);
	}
};

// Listen for changes to any URL in any tab
chrome.tabs.onUpdated.addListener(checkUrl);

// Listen for clicks on the page icon
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url": "./html/options.html"})
});