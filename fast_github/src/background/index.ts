import { MessageType } from "../other";

chrome.runtime.onInstalled.addListener((details) => {
	const { reason } = details;

	if (reason === "install") {
		chrome.runtime.openOptionsPage();
		return;
	}

	if (reason === "update") {
		chrome.runtime.openOptionsPage();
		return;
	}
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (tab.status === "complete" && tab.url && tab.url.includes("github.com")) {
		const message: MessageType = {
			status: "complete",
			url: tab.url,
		};
		chrome.tabs.sendMessage(tabId, message);
	}
});
