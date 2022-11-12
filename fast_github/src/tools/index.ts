import { DefaultConfig, defaultConfigs } from "../other";

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
