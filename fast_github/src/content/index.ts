import { saveAs } from "file-saver";
import {
	checkSelector,
	getLocalItem,
	randomUniqueNumbers,
	translateElem,
} from "../tools";
import { PageTypeItemValue } from "../types";
import "./style.css";

const main = async () => {
	const speedButtonId = "fast_github";

	const urlInfo = new URL(window.location.href);
	const urlPath = urlInfo.pathname.split("/").slice(1, 5);

	const configs = await await getLocalItem();
	const defaultList = configs.speedList.split("\n");
	const speedNumber = configs.speedNumber;

	const my_github_url = urlInfo.origin;
	const [my_github_author, my_github_project, pageType] = urlPath;
	// const my_github_project_git = `${my_github_project}.git`;
	const my_github_project_url = `${my_github_url}/${my_github_author}/${my_github_project}`;

	if (!my_github_author && !my_github_project) {
		return;
	}

	const checkPrivateProject = () => {
		const spanList = document.querySelectorAll("span.Label--secondary");

		console.log("checkPrivateProject: ", spanList);

		const [item] = Array.from(spanList).filter((item) => {
			return item.textContent?.trim() === "Private";
		});

		return item ? true : false;
	};

	const getMainOrMasterURL = (): string | null => {
		const elemList = document.querySelectorAll(".Box-row a");

		const [result] = Array.from(elemList).filter((elem) => {
			return elem.textContent?.trim().includes("Download ZIP");
		});

		return result?.getAttribute("href") ?? null;
	};

	const addIDEButton = () => {
		const rowList = document.querySelectorAll(
			'div.js-active-navigation-container div.js-navigation-item[role="row"]'
		);
		const id = "add-my-github-ide";
		const buttonId = "my-github-ide-button";

		console.log("js-active-navigation-container: ", rowList);

		if (!rowList) {
			return;
		}

		rowList.forEach((item) => {
			if (item.classList.contains(id)) {
				return;
			}

			const headerDiv = item.querySelector('div[role="rowheader"] a');

			if (
				headerDiv
					?.getAttribute("title")
					?.trim()
					.includes("Go to parent directory")
			) {
				return;
			}

			item.classList.add(id);

			const urlList = item.querySelectorAll("a");
			const [urlItem] = Array.from(urlList).filter((item) => {
				return !item
					.getAttribute("href")
					?.includes(`/${my_github_project}/commit/`);
			});

			console.log("urlItem: ", urlItem);

			if (!urlItem) {
				return;
			}

			const href = urlItem.getAttribute("href");

			if (!href) {
				return;
			}

			const webIDE = configs.webIDE;

			if (!webIDE) {
				return;
			}

			if (webIDE === "Nothing") {
				return;
			}

			const template = `
			<a href="https://${
				webIDE.toLowerCase() ?? "github1s.com"
			}${href}" target="_blank" role="gridcell" class="mr-2 ml-3 ${buttonId}" style="width: 16px;display: flex;align-content: center;align-items: center;justify-content: center;cursor: pointer;" title="使用Web IDE查看文件">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="${buttonId}"><path fill-rule="evenodd" d="M1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm9.22 3.72a.75.75 0 000 1.06L10.69 8 9.22 9.47a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.78 6.53a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.31 8l1.47-1.47z" fill="#57606a"></path></svg>
			</a>
			`;
			item.insertAdjacentHTML("beforeend", template);

			if (
				item
					.querySelector("svg.octicon")
					?.getAttribute("aria-label")
					?.trim() !== "File"
			) {
				return;
			}

			// 添加下载按钮
			const rawURL = href.replace("/blob/", "/");
			const [downloadFileName] = href.split("/").slice(-1);

			const downloadIconTemplate = `
			<div class="download_file" role="gridcell" class="mr-1 ml-3 ${buttonId}" style="width: 16px;display: flex;align-content: center;align-items: center;justify-content: center;cursor: pointer;" title="点击下载${downloadFileName}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="${buttonId} download-icon">
					<path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" fill="#57606a"></path>
				</svg>
				<svg class="${buttonId} loading-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: none; shape-rendering: auto;" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
						<circle cx="50" cy="50" r="28" stroke-width="8" stroke="#57606a" stroke-dasharray="43.982297150257104 43.982297150257104" fill="none" stroke-linecap="round">
						<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
					</circle>
				</svg>
			</div>
			`;

			item.insertAdjacentHTML("beforeend", downloadIconTemplate);

			item.querySelector(".download_file")?.addEventListener(
				"click",
				(e) => {
					e.preventDefault();
					const target = e.currentTarget as HTMLElement;
					console.log("downloadFile123: ", target);

					if (target.getAttribute("data-download") === "true") {
						alert("正在下载中...");
						return;
					}

					target.setAttribute("data-download", "true");

					const downloadIconElem = target.querySelector(
						".download-icon"
					) as HTMLElement;
					const loadingIconElem = target.querySelector(
						".loading-icon"
					) as HTMLElement;

					downloadIconElem.style.display = "none";
					loadingIconElem.style.display = "block";

					const random = randomUniqueNumbers(defaultList.length, 1)[0];
					const url = defaultList[random - 1];
					const cf_url = url.endsWith("/") ? url : `${url}/`;
					const downloadURL = `${cf_url}https://raw.githubusercontent.com${rawURL}`;

					fetch(downloadURL)
						.then((response) => response.blob())
						.then(function (data) {
							console.log("fetch: ", data);

							saveAs(data, downloadFileName);

							downloadIconElem.style.display = "block";
							loadingIconElem.style.display = "none";
							target.setAttribute("data-download", "false");
						})
						.catch((e: Error) => {
							alert(e.message);
							target.setAttribute("data-download", "false");
							downloadIconElem.style.display = "block";
							loadingIconElem.style.display = "none";
						});
				},
				false
			);
		});
	};

	const mainPage = async () => {
		console.log("mainPage");
		const addSpeedButton = () => {
			if (document.querySelector(`#${speedButtonId}`)) {
				return;
			}

			let listTemplate = "";
			const list = defaultList;

			const rangeNumber = randomUniqueNumbers(list.length, speedNumber);

			rangeNumber.map((index) => {
				const item = list[index - 1];
				const url = item.endsWith("/") ? item : `${item}/`;
				const urlInfo = new URL(url);

				listTemplate += `
									<div class="fast_github_item fast_github_item${index}" style="margin-bottom:5px;">
															<p class="mb-2 get-repo-decription-text">
																	<a href="${urlInfo.origin}" target="_blank">${urlInfo.host}</a>通道
															</p>
															<div class="input-group">
																	<input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="${url}${my_github_project_url}.git" readonly="" />
																	<div class="input-group-button">
																			<clipboard-copy value="${url}${my_github_project_url}.git" class="btn btn-sm" tabindex="0" role="button">
																					<svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
																							<path
																									fill-rule="evenodd"
																									d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
																							></path>
																					</svg>
																			</clipboard-copy>
																	</div>
															</div>
													</div>
									`;
			});

			const template = `<span class="d-flex" id="${speedButtonId}">
					<details class="get-repo-select-menu js-get-repo-select-menu position-relative details-overlay details-reset">
							<summary class="btn ml-2 btn-primary">
									加速
									<span class="dropdown-caret"></span>
							</summary>
							<div class="position-relative">
									<div class="get-repo-modal dropdown-menu dropdown-menu-sw pb-0 js-toggler-container js-get-repo-modal p-3" style="width: 352px;">
											<div class="get-repo-modal-options">
													<div class="fast-github-list-wrap" id="fastGithubListWrap">
															<div class="clone-options https-clone-options">
																	<h4 class="mb-1">通道列表</h4>
																	${listTemplate}
															</div>
															<div class="mt-2 d-flex" style="text-align: center;">
																	<div class="flex-1 btn btn-outline get-repo-btn" id="downloadZIP">
																			下载ZIP
																	</div>
															</div>
															<div id="info-wrap"></div>
													</div>
											</div>
									</div>
							</div>
					</details>
			</span>`;
			const insertElem = document.querySelector(".file-navigation");

			insertElem?.insertAdjacentHTML("beforeend", template);

			try {
				const downloadBtn = document.getElementById("downloadZIP");

				downloadBtn?.addEventListener(
					"click",
					function () {
						// const fileName = `${my_github_project}.zip`;
						const href = getMainOrMasterURL();
						if (!href) {
							alert("无法获取压缩包下载地址");
							return;
						}

						const random = randomUniqueNumbers(defaultList.length, 1)[0];
						const cf_url = defaultList[random - 1];
						const src = `${cf_url}/https://github.com${href}`;

						window.location.href = src;
					},
					false
				);

				const infoURL = "https://yidian.one/chrome/info.json";
				fetch(infoURL)
					.then((response) => response.json())
					.then((data) => {
						type DataType = {
							url: string;
							title: string;
							desc: string;
							code: string;
							color: string;
						};
						const { url, title, desc, code, color } = data as DataType;
						if (parseInt(code)) {
							const infoTemplate = `<a id="my-notice" href=${url} target="_blank" title="${desc}" style="display:block;width:100%;text-align:center;margin-top:10px;font-size:12px;color:${color};">${title}</a>`;

							const elem = document.getElementById("info-wrap");

							if (elem?.querySelector("#my-notice")) {
								return;
							}

							elem?.insertAdjacentHTML("beforeend", infoTemplate);
						}
					})
					.catch(() => console.log("Oops, fetch error"));
			} catch (e) {
				console.log("Oops, error: ", e);
			}
		};

		addSpeedButton();
	};

	const releasesPage = (elem?: HTMLElement) => {
		const liList = elem
			? checkSelector(elem)
				? elem.querySelectorAll("li.Box-row")
				: document.querySelectorAll("li.Box-row")
			: document.querySelectorAll("li.Box-row");

		const myElem = elem as HTMLElement;
		const id = "my-fast-github";

		if (!liList) {
			return;
		}

		liList.forEach((item) => {
			if (item.classList.contains(id)) {
				return;
			}

			const href = item.querySelector("a")?.getAttribute("href");

			if (!href) {
				return;
			}

			item.classList.add(id);

			const rangeNumber = randomUniqueNumbers(defaultList.length, 1);
			const url = defaultList[rangeNumber[0] - 1];
			const itemURL = url.endsWith("/") ? url : `${url}/`;
			const divTemplate = `
			<div data-view-component="true" class="d-flex ml-md-3">
				<svg t="1668210029451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2795" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M508.746667 299.2L485.333333 452.373333a5.333333 5.333333 0 0 0 4 5.973334l217.386667 53.333333a5.333333 5.333333 0 0 1 2.72 8.693333l-184.906667 208.8a5.333333 5.333333 0 0 1-9.28-4.32l23.413334-153.226666a5.333333 5.333333 0 0 0-4-5.973334L317.173333 512a5.333333 5.333333 0 0 1-2.506666-8.48l184.8-208.693333a5.333333 5.333333 0 0 1 9.28 4.373333z m-329.493334 256l271.253334 66.666667a5.333333 5.333333 0 0 1 4 5.973333l-51.04 335.68a5.333333 5.333333 0 0 0 9.226666 4.32l434.773334-490.346667a5.333333 5.333333 0 0 0-2.72-8.693333l-271.253334-66.666667a5.333333 5.333333 0 0 1-4-5.973333l51.04-335.626667a5.333333 5.333333 0 0 0-9.226666-4.373333L176.533333 546.506667a5.333333 5.333333 0 0 0 2.72 8.693333z" p-id="2796" fill="#57606a"></path>
				</svg>
				<a href="${itemURL}${my_github_url}${href}" rel="nofollow" data-turbo="false" data-view-component="true" class="Truncate">
					<span data-view-component="true" class="Truncate-text text-bold">下载</span>
					<span data-view-component="true" class="Truncate-text"></span>
				</a>
			</div>
			`;

			item.insertAdjacentHTML("beforeend", divTemplate);
		});
	};

	const tagPage = (elem?: HTMLElement) => {
		const list = elem
			? checkSelector(elem)
				? elem.querySelectorAll("div.commit")
				: document.querySelectorAll("div.commit")
			: document.querySelectorAll("div.commit");

		const id = "my-fast-github";

		if (!list) {
			return;
		}

		list.forEach((item) => {
			const liList = item.querySelectorAll("ul>li.d-inline-block");

			if (!liList) {
				return;
			}

			liList.forEach((liItem) => {
				console.log("liItem: ", liItem);
				if (liItem.classList.contains(id)) {
					return;
				}

				const zipElem = liItem.querySelector("a");
				const zip_href = zipElem?.getAttribute("href");

				console.log("zip_href: ", zip_href, zip_href?.includes(".zip"));

				if (zip_href?.endsWith(".tar.gz") || zip_href?.endsWith(".zip")) {
					liItem.classList.add(id);

					const zip_text = zipElem?.textContent;
					const rangeNumber = randomUniqueNumbers(defaultList.length, 1);
					const url = defaultList[rangeNumber[0] - 1];
					console.log("url: ", url);
					const itemURL = url.endsWith("/") ? url : `${url}/`;
					const zip_template = `
          <a class="muted-link" href="${itemURL}${my_github_url}${zip_href}" rel="nofollow" data-create="1">
          <svg class="octicon octicon-file-zip" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>
          加速${zip_text}
        </a>
        `;
					liItem.insertAdjacentHTML("beforeend", zip_template);
				}
			});
		});
	};

	const issuesPage = () => {
		if (configs.language === "nothing" || configs.token?.trim() === "") {
			return;
		}

		const issuesLists = document.querySelectorAll(
			".edit-comment-hide table.user-select-contain tr.d-block>td"
		);

		if (!issuesLists) {
			return;
		}

		issuesLists.forEach((item) => {
			const button = item.parentNode?.querySelector(
				".issues-translation-button"
			);

			if (button) {
				return;
			}

			const clickButton = document.createElement("div");
			clickButton.textContent = "翻译";
			clickButton.className = "issues-translation-button";

			clickButton.style.cssText =
				"font-size: 15px;cursor: pointer;color: rgb(29, 155, 240);padding: 0px 16px;margin-bottom:10px;text-align:right;";

			item.after(clickButton);

			clickButton.addEventListener(
				"click",
				async (e) => {
					e.preventDefault();

					const cloneElem = item.cloneNode(true) as HTMLElement;
					const contentElem = item.parentNode?.querySelector(
						".issues-translation-content"
					);

					if (contentElem) {
						contentElem.remove();
					}

					cloneElem.classList.add("issues-translation-content");
					cloneElem.style.cssText = "display:block;margin-top:10px;";

					translateElem(cloneElem);

					clickButton.after(cloneElem);

					return;
				},
				false
			);
		});
	};

	if (my_github_author && my_github_project) {
		// 个人私有项目 按钮不添加
		if (checkPrivateProject()) {
			return;
		}

		const myPageType = pageType as PageTypeItemValue;
		if (myPageType === undefined) {
			// 项目首页 https://github.com/torvalds/linux
			mainPage();
			addIDEButton();
			console.log("getMainOrMasterURL main: ", getMainOrMasterURL());
		}

		if (myPageType === "tree") {
			addIDEButton();

			// 项目分支 https://github.com/GameServerManagers/LinuxGSM/tree/develop/lgsm
			if (!getMainOrMasterURL()) {
				return;
			}

			mainPage();

			console.log("getMainOrMasterURL tree: ", getMainOrMasterURL());
		}

		if (myPageType === "releases") {
			console.log("release");
			// release页面 https://github.com/GameServerManagers/LinuxGSM/releases
			releasesPage();
		}

		if (myPageType === "tags") {
			// tag页面 https://github.com/torvalds/linux/tags
			tagPage();
		}

		if (myPageType === "issues") {
			issuesPage();
		}
	}
};

// 监听Github URL的变化 因为ta用了Pjax刷新
const observer = new MutationObserver(function (mutations) {
	console.log("c3");
	main();
});

observer.observe(document, {
	childList: true,
	subtree: true,
});

// if (!chrome.runtime.onMessage.hasListeners()) {
// 	chrome.runtime.onMessage.addListener(function (
// 		request,
// 		sender,
// 		sendResponse
// 	) {
// 		// 监听Github URL的变化 因为ta用了Pjax刷新
// 		const message: MessageType = request;
// 		console.log("c0");
// 		if (message.status === "complete") {
// 			console.log("c1");
// 			main();
// 		}
// 	});
// }
