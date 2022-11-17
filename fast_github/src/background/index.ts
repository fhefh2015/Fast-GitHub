import { getLocalItem, translateByTencent } from "../tools";
import { ResponseData, ResponseError, RuntimeSendMessageType } from "../types";

chrome.runtime.onInstalled.addListener((details) => {
	const { reason } = details;

	if (reason === "install") {
		chrome.runtime.openOptionsPage();
		return;
	}

	getLocalItem().then((configs) => {
		if (!configs.importOldList) {
			if (reason === "update") {
				chrome.runtime.openOptionsPage();
			}
		}
	});
});

type SendResponseMessageType = [ResponseData, ResponseError];

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
	const data = message as RuntimeSendMessageType;
	const content = data.content;

	const sendResponseMessage = (dataObject: SendResponseMessageType) => {
		console.log("content: ", content);
		const [data, error] = dataObject;
		let sendMessageObject: RuntimeSendMessageType = { content: "" };

		if (data) {
			sendMessageObject.content = data;
		}

		if (error) {
			sendMessageObject.content = error;
		}

		sendResponse(sendMessageObject);
	};

	translateByTencent(content).then((responseData) => {
		sendResponseMessage(responseData);
	});
	return true;
});

// (async () => {
// 	translateByTencent("hello").then((responseData) => {
// 		console.log("data: ", responseData);
// 	});
// })();

// chrome.webNavigation.onHistoryStateUpdated.addListener(
// 	(details) => {
// 		console.log(`onHistoryStateUpdated: ${details.url}`);

// 		if (details.url.includes("github.com")) {
// 			const message: MessageType = {
// 				status: "complete",
// 				url: details.url,
// 			};

// 			chrome.tabs.sendMessage(details.tabId, message);
// 		}

// 		console.log(`Transition type: ${details.transitionType}`);
// 		console.log(`Transition qualifiers: ${details.transitionQualifiers}`);
// 	},
// 	{
// 		url: [{ hostContains: "github.com" }],
// 	}
// );

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// 	if (tab.status === "complete" && tab.url && tab.url.includes("github.com")) {
// 		const message: MessageType = {
// 			status: "complete",
// 			url: tab.url,
// 		};
// 		chrome.tabs.sendMessage(tabId, message);
// 	}
// });
