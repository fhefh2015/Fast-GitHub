const FieldType = {
	speedNumber: "speedNumber",
	speedList: "speedList",
} as const;

export type FieldTypeKey = keyof typeof FieldType;

export interface DefaultConfig {
	importOldList?: boolean;
	speedNumber: number;
	speedList: string;
}

export const defaultConfigs: DefaultConfig = {
	importOldList: false,
	speedNumber: 1,
	speedList: "https://gh.api.99988866.xyz/",
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
