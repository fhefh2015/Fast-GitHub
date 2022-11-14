const FieldType = {
	speedNumber: "speedNumber",
	speedList: "speedList",
	token: "token",
	language: "language",
	webIDE: "webIDE",
} as const;

export type FieldTypeKey = keyof typeof FieldType;

const PageTypeItem = {
	releases: "releases",
	tags: "tags",
	issues: "issues",
	undefined: undefined,
	tree: "tree",
} as const;

export type PageTypeKey = keyof typeof PageTypeItem;
export type PageTypeItemValue = typeof PageTypeItem[PageTypeKey];

export type ResponseData = string | null;
export type ResponseError = string | null;

const LanguageItem = {
	nothing: "nothing",
	zh: "zh",
	en: "en",
} as const;

export type LanguageItemKey = keyof typeof LanguageItem;
// export type LanguageItemValue = typeof LanguageItem[PageTypeKey];

const WebIDEItem = {
	nothing: "Nothing",
	github1s: "GitHub1s.Com",
	githubDev: "GitHub.Dev",
} as const;

export type WebIDEItemKey = keyof typeof WebIDEItem;
export type WebIDEItemValue = typeof WebIDEItem[WebIDEItemKey];

export interface DefaultConfig {
	importOldList?: boolean;
	speedNumber: number;
	speedList: string;
	token?: string;
	language?: LanguageItemKey;
	webIDE?: WebIDEItemValue;
}

export const defaultConfigs: DefaultConfig = {
	importOldList: false,
	speedNumber: 1,
	speedList: "https://gh.api.99988866.xyz/",
	token: "",
	language: "nothing",
	webIDE: "GitHub1s.Com",
};

const Status = {
	loading: "loading",
	complete: "complete",
} as const;

export type StatusKey = keyof typeof Status;

export interface MessageType {
	status: StatusKey;
	url: string;
}

export interface LanguageType {
	code: string;
	eng_name: string;
	chn_name: string;
}

export const languageData: Array<LanguageType> = [
	{
		code: "ar",
		eng_name: "arabic",
		chn_name: "阿拉伯语",
	},
	{
		code: "de",
		eng_name: "german",
		chn_name: "德语",
	},
	{
		code: "ru",
		eng_name: "russian",
		chn_name: "俄语",
	},
	{
		code: "fr",
		eng_name: "french",
		chn_name: "法语",
	},
	{
		code: "fil",
		eng_name: "filipino",
		chn_name: "菲律宾语",
	},
	{
		code: "km",
		eng_name: "khmer",
		chn_name: "高棉语",
	},
	{
		code: "ko",
		eng_name: "korean",
		chn_name: "韩语",
	},
	{
		code: "lo",
		eng_name: "laos",
		chn_name: "老挝语",
	},
	{
		code: "pt",
		eng_name: "portuguese",
		chn_name: "葡萄牙语",
	},
	{
		code: "es",
		eng_name: "spanish",
		chn_name: "西班牙语",
	},
	{
		code: "it",
		eng_name: "italian",
		chn_name: "意大利语",
	},
	{
		code: "id",
		eng_name: "indonesian",
		chn_name: "印度尼西亚语",
	},
	{
		code: "en",
		eng_name: "english",
		chn_name: "英语",
	},
	{
		code: "vi",
		eng_name: "vietnamese",
		chn_name: "越南语",
	},
	{
		code: "zh",
		eng_name: "chinese",
		chn_name: "中文",
	},
];

export const onlySupportSelect: Array<LanguageType> = [
	{
		code: "nothing",
		eng_name: "nothing",
		chn_name: "不翻译",
	},
	{
		code: "en",
		eng_name: "english",
		chn_name: "英语",
	},
	{
		code: "zh",
		eng_name: "chinese",
		chn_name: "中文",
	},
];

export interface RuntimeSendMessageType {
	content: string;
}

interface Header {
	type: string;
	ret_code: string;
	time_cost: number;
	request_id: string;
}

export interface LangDetectObject {
	header: Header;
	language: string;
}

export interface TranslationBlockObject {
	header: Header;
	auto_translation: string;
}
