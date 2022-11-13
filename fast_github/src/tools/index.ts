import {
	DefaultConfig,
	defaultConfigs,
	LangDetectObject,
	languageData,
	RuntimeSendMessageType,
	TranslationBlockObject,
} from "../other";

export const saveLocalItem = (object: DefaultConfig) => {
	chrome.storage.sync.set({ configs: object });
};

export const getLocalItem = async () => {
	const result = await chrome.storage.sync.get("configs");
	return (result["configs"] as DefaultConfig) ?? defaultConfigs;
};

export const randomUniqueNumbers = (range: number, count: number) => {
	let numberContainer = new Set<number>();
	while (numberContainer.size < count) {
		numberContainer.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
	}
	return [...numberContainer];
};

export const checkSelector = (elem: HTMLElement): boolean => {
	return elem.querySelectorAll instanceof Function;
};

export const getOldVersionLocalItem = async () => {
	const result = await chrome.storage.sync.get("customList");
	return (result["customList"] as string[]) ?? [];
};

export const translateElem = async (
	rootElem: HTMLElement,
	elemName: string = ""
) => {
	if (!rootElem) {
		return;
	}

	if (rootElem.nodeType === 1) {
		rootElem.childNodes.forEach((item) => {
			const myItem = item as HTMLElement;
			const nodeName = item.nodeName.toLowerCase();

			if (
				nodeName === "pre" ||
				nodeName === "code" ||
				nodeName === "video" ||
				nodeName === "img" ||
				nodeName === "input" ||
				nodeName === "select" ||
				nodeName === "g-emoji"
			) {
				return;
			}

			translateElem(myItem, nodeName);
		});
	}

	if (rootElem.nodeType === 3) {
		if (elemName == "" || elemName === "pre" || elemName === "code") {
			return;
		}

		const content = rootElem.nodeValue ?? "";

		if (!content.length) {
			return;
		}

		const sendMessage: RuntimeSendMessageType = {
			content: content,
		};

		const data: RuntimeSendMessageType = await chrome.runtime.sendMessage(
			sendMessage
		);

		if (data.content) {
			rootElem.textContent = data.content;
		}
	}
};

export const translateByTencent = async (
	content: string
): Promise<[string | null, string | null]> => {
	const configs = await getLocalItem();

	return new Promise((resolve, _) => {
		fetch("https://transmart.qq.com/api/imt", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				header: {
					fn: "lang_detect",
					token: configs.token,
				},
				text: content,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				// D1.获取文本所属语言
				const myData = data as LangDetectObject;
				console.log("translate_by_tencent1: ", myData);
				const { language } = data as LangDetectObject;
				const item = languageData.find((item) => {
					return item.eng_name.toLowerCase() === language.toLowerCase();
				});
				console.log("code: ", item);
				if (!item) {
					resolve([null, "该语言无法识别翻译"]);
					return;
				}

				// D2.通过获取的语言code 在进行翻译

				fetch("https://transmart.qq.com/api/imt", {
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						header: {
							fn: "auto_translation_block",
							token: configs.token,
						},
						type: "plain",
						source: {
							lang: item.code,
							text_block: content,
						},
						target: {
							lang: configs.language,
						},
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						const myData = data as TranslationBlockObject;
						console.log("TranslationBlock: ", myData);
						resolve([myData.auto_translation, null]);
					})
					.catch(() => {
						resolve([null, "翻译发生错误"]);
					});
			})
			.catch(() => resolve([null, "翻译发生错误"]));
	});
};
