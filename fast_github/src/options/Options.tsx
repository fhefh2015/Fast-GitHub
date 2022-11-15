import React, { ChangeEvent, useEffect, useState } from "react";
import { getLocalItem, getOldVersionLocalItem, saveLocalItem } from "../tools";
import {
	DefaultConfig,
	defaultConfigs,
	FieldTypeKey,
	onlySupportSelect,
	WebIDEItemValue,
} from "../types";
import "./style.css";

const Options: React.FC = () => {
	const webIDEItems: WebIDEItemValue[] = [
		"Nothing",
		"GitHub.Dev",
		"GitHub1s.Com",
	];

	const [configs, setConfigs] = useState<DefaultConfig>(defaultConfigs);

	const handleChange = (
		type: FieldTypeKey,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const value = e.target.value;
		console.log("value: ", value);
		const saveConfigs = Object.assign({}, configs, { [type]: value });
		setConfigs(saveConfigs);
	};

	const handleSave = () => {
		const listNumber = configs.speedList
			.replace(/(\n)+/g, "\n")
			.replace(/\n+$/, "")
			.split("\n").length;

		const saveConfigs = Object.assign({}, configs, {
			speedNumber:
				configs.speedNumber > listNumber ? listNumber : configs.speedNumber,
			speedList: configs.speedList.replace(/(\n)+/g, "\n").replace(/\n+$/, ""),
		});

		setConfigs(saveConfigs);
		saveLocalItem(saveConfigs);

		alert("设置已保存");
	};

	useEffect(() => {
		document.title = "设置";

		const getConfigs = async () => {
			const configs = (await getLocalItem()) as DefaultConfig;
			const oldConfigs = await getOldVersionLocalItem();

			if (configs) {
				if (!configs.importOldList) {
					// v1.5之前的数据导入
					if (oldConfigs && oldConfigs.length) {
						try {
							const oldWithDefault: DefaultConfig = {
								importOldList: true,
								speedNumber: defaultConfigs.speedNumber,
								speedList: oldConfigs
									.join("\n")
									.replace(/\n+$/, "")
									.replace(/github_proxy/g, ""),
							};
							setConfigs(oldWithDefault);
						} catch (e) {
							setConfigs(configs);
						}
					} else {
						setConfigs(configs);
					}
				} else {
					setConfigs(configs);
				}
			}
		};

		getConfigs();
	}, []);

	return (
		<>
			{configs && (
				<div className="flex justify-center my-2 mx-4 md:mx-0">
					<div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
						<div className="flex flex-wrap -mx-3">
							<div className="w-full md:w-full px-3 mb-6">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="input"
								>
									负载均衡:
								</label>
								<input
									id="input"
									className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
									type="text"
									onChange={(e) => handleChange("speedNumber", e)}
									value={configs.speedNumber}
								/>
							</div>
							<div className="w-full md:w-full px-3 mb-6">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="input"
								>
									腾讯AI翻译Token:
								</label>
								<input
									id="input"
									className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
									type="text"
									onChange={(e) => handleChange("token", e)}
									value={configs.token}
									placeholder="请填写Token，才能使用"
								/>
							</div>
							<div className="w-full md:w-full px-3 mb-6">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="language"
								>
									{/* 
									腾讯交互翻译 https://transmart.qq.com/zh-CN/index
									目标语言 只有 中文和英文让你选择；
									为啥用这个，目前免费~~~
									*/}
									翻译目标语言:
								</label>
								<select
									id="language"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={configs.language}
									onChange={(e) => {
										handleChange("language", e);
									}}
								>
									{onlySupportSelect.map((item) => {
										if (item.code === configs.language) {
											return (
												<option value={item.code} selected>
													{item.chn_name}
												</option>
											);
										}

										return <option value={item.code}>{item.chn_name}</option>;
									})}
								</select>
							</div>

							<div className="w-full md:w-full px-3 mb-6">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="webIDE"
								>
									Web IDE:
								</label>
								<select
									id="webIDE"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={configs.webIDE}
									onChange={(e) => {
										handleChange("webIDE", e);
									}}
								>
									{webIDEItems.map((item) => {
										if (item === configs.webIDE) {
											return (
												<option value={item} selected>
													{item}
												</option>
											);
										}

										return <option value={item}>{item}</option>;
									})}
								</select>
								<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									查看源码使用的Web IDE，默认使用GitHub1s
								</div>
								<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									关于GitHub1s：
									<a
										href="https://github.com/conwnet/github1s"
										target="_blank"
										className=" text-blue-600 hover:underline dark:text-blue-500"
									>
										点击查看
									</a>
								</div>
							</div>

							<div className="w-full md:w-full px-3 mb-6">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="message"
								>
									加速列表:
								</label>
								<textarea
									id="message"
									rows={6}
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="请填写加速列表，一行代表一个，回车分隔"
									onChange={(e) => handleChange("speedList", e)}
									value={configs.speedList}
								></textarea>
							</div>

							<div className="w-full md:w-full px-3 mb-6">
								<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									如果您不想做任何操作，也请点击一下保存配置。
								</div>
								<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									如果没有看到v1.5以前的加速列表,请重新添加并保存。
								</div>
								<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									自行搭建加速教程：
									<a
										href="https://github.com/hunshcn/gh-proxy"
										target="_blank"
										className=" text-blue-600 hover:underline dark:text-blue-500"
									>
										点击查看
									</a>
								</div>
								<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									如何使用：
									<a
										href="https://github.com/fhefh2015/Fast-GitHub/issues/44"
										target="_blank"
										className=" text-blue-600 hover:underline dark:text-blue-500"
									>
										点击查看
									</a>
								</div>
							</div>

							<div className="w-full md:w-full px-3 mb-6">
								<button
									className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500"
									onClick={handleSave}
								>
									保存配置
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Options;
