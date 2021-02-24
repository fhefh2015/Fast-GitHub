chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const { status } = changeInfo;

  if (status == "complete") {
    chrome.tabs.sendMessage(tabId, "url-update");
  }

});
