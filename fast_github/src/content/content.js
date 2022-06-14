
main();

async function main() {
    const urlInfo = new URL(window.location.href);
    const urlPath = urlInfo.pathname.split("/").slice(1, 4);

    const [p1, p2, p3] = urlPath;

    if (!p1 && !p2) {
        return;
    }

    if ((p3 && p3 === "commits") || (p3 && p3 === "issues")) {
        return;
    }

    let defaultList = ["https://github.91chi.fun/github_proxy"];
    let customList;
    if (isSafari()) {
        const localStorageValue = window.localStorage.getItem("customList");
        customList = localStorageValue ? localStorageValue.split("\n") : [];
    } else {
        customList = await getObjectFromLocalStorage("customList");
    }

    if (customList && customList.length) {
        defaultList = customList;
    }

    let cf_url = "";
    const github_url = urlInfo.origin;
    const [github_author, github_project] = urlPath;
    const github_project_git = `${github_project}.git`;
    const github_project_url = `${github_url}/${github_author}/${github_project}`;
    const github_project_url_git = `${github_project_url}.git`;
    const github_proxy = github_project_url_git;

    defaultList.map((item) => {
        if (item.indexOf("github_proxy") !== -1) {
            cf_url = item.replace("/github_proxy", "");
        }
    });

    // console.log("github_url: ", github_url);
    // console.log("github_author: ", github_author);
    // console.log("github_project: ", github_project);
    // console.log("github_project_git: ", github_project_git);
    // console.log("github_project_url: ", github_project_url);
    // console.log("github_project_url_git: ", github_project_url_git);
    // console.log("github_proxy: ", github_proxy);
    // console.log("defaultList: ", defaultList);
    // console.log("cf_url: ", cf_url);

    document.addEventListener("pjax:end", function () {
        const id = document.getElementById("fast_github");

        if (id) {
            return;
        }

        const [f1, f2, f3] = getURLPath();

        if (f3 === undefined) {
            addCloneButton();
        }

        switch (f3) {
            case "tags":
                addTagButton();
                break;
            case "releases":
                addReleaseButton();
                break;
        }
    });

    const id = document.getElementById("fast_github");

    if (!id) {
        addCloneButton();
    }

    addTagButton();
    addReleaseButton();

    let isAddTag = false;
    let isAddRelease = false;

    // 获取ZIP压缩包下载地址
    function getMainOrMasterHref() {
        const elems = document.querySelectorAll(".Box-row a");
        for (let i = 0; i < elems.length; i++) {
            const item = elems[i];
            if (item && item.text.trim() == "Download ZIP") {
                return item.getAttribute("href");
            }
        }
        return false;
    }

    // 点击下载ZIP压缩包
    function download() {
        const source = document.querySelector("video source");
        // console.log("source: ", source.getAttribute('src'));
        const fileName = `${github_project}.zip`;
        const src = `${cf_url}/https://github.com${getMainOrMasterHref()}`;
        window.location.href = src;
        // fetch(src)
        //     .then(response => response.blob())
        //     .then(function (myBlob) {
        //         downLoadZip(myBlob, fileName)
        //     });
        // createAndDownloadFile(fileName, src);
    }

    // 模拟点击下载ZIP压缩包
    function downLoadZip(blob, name) {
        const element = document.createElement("a");
        element.style.display = "none";
        document.body.appendChild(element);

        element.href = window.URL.createObjectURL(blob);
        element.setAttribute("target", "_blank");
        element.setAttribute("download", name);
        element.click();

        window.URL.revokeObjectURL(element.href);
        document.body.removeChild(element);
    }

    //添加克隆按钮
    function addCloneButton() {
        let listTemplate = "";

        defaultList.map((item, index) => {
            if (item.indexOf("github_proxy") !== -1) {
                const url = item.replace("github_proxy", github_proxy);
                const urlInfo = new URL(url);
                listTemplate += `
                <div class="fast_github_item fast_github_item${index}" style="margin-bottom:5px;">
                            <p class="mb-2 get-repo-decription-text">
                                <a href="${urlInfo.origin}" target="_blank">${urlInfo.host}</a>加速通道
                            </p>
                            <div class="input-group">
                                <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="${url}" readonly="" />
                                <div class="input-group-button">
                                    <clipboard-copy value="${url}" class="btn btn-sm" tabindex="0" role="button">
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
            }
        });

        const template = `<span class="d-flex" id="fast_github">
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
                                <h4 class="mb-1">加速通道列表</h4>
                                ${listTemplate}
                            </div>
                            <div class="mt-2 d-flex" style="text-align: center;">
                                <div class="flex-1 btn btn-outline get-repo-btn" id="settingConfigButton" style="display:${isSafari() ? "block" : "none"}">
                                    设置
                                </div>
                            </div>
                            <div class="mt-2 d-flex" style="text-align: center;">
                                <div class="flex-1 btn btn-outline get-repo-btn" id="downloadZIP">
                                    加速下载ZIP
                                </div>
                            </div>
                            <div id="info-wrap"></div>
                        </div>
                        <div class="fast-github-setting-wrap" id="fastGithubSettingWrap" style="display:none;">
                            <textarea class="form-control input-block" style="height:120px;" id="fastGithubSettingTextarea"></textarea>
                            <div class="mt-2 d-flex" style="text-align: center;">
                                <div class="flex-1 btn btn-outline get-repo-btn" id="saveConfigButton">
                                    保存配置
                                </div>
                            </div>
                            <a href="https://github.com/fhefh2015/Fast-GitHub/issues/44" style="display:block;width:100%;text-align:center;margin-top:10px;font-size:12px;" target="_blank" title="desc">加速地址</a>
                        </div>
                    </div>
                </div>
            </div>
        </details>
    </span>`;
        const insertElem = document.querySelector(".file-navigation");
        insertElem && insertElem.appendChild(createDoc(template).firstChild);

        try {
            const downloadBtn = document.getElementById("downloadZIP");
            downloadBtn &&
                downloadBtn.addEventListener(
                    "click",
                    function () {
                        download();
                    },
                    false
                );

            const fastGithubListWrap = document.getElementById("fastGithubListWrap");
            const fastGithubSettingWrap = document.getElementById(
                "fastGithubSettingWrap"
            );

            const settingConfigButton = document.getElementById(
                "settingConfigButton"
            );
            settingConfigButton &&
                settingConfigButton.addEventListener(
                    "click",
                    function () {
                        elemHide(fastGithubListWrap);
                        elemShow(fastGithubSettingWrap);
                    },
                    false
                );

            const textareaElem = document.getElementById("fastGithubSettingTextarea");

            if (isSafari()) {
                const customList = window.localStorage.getItem("customList");
                if (customList) {
                    textareaElem.value = customList;
                } else {
                    textareaElem.value = defaultList.join("\n");
                }
            }

            const saveConfigButton = document.getElementById("saveConfigButton");
            saveConfigButton && saveConfigButton.addEventListener("click", function () {
                const textareaValue = textareaElem.value;
                if (textareaValue === "") {
                    alert("不能为空");
                    return;
                }
                window.localStorage.setItem("customList", textareaValue)
                alert("已保存");
                elemHide(fastGithubSettingWrap);
                elemShow(fastGithubListWrap);
            }, false);

            const infoURL = "https://yidian.one/chrome/info.json";
            fetch(infoURL)
                .then((response) => response.json())
                .then((data) => {
                    const { url, title, desc, code, color } = data;
                    if (parseInt(code)) {
                        const infoTemplate = `<a href=${url} target="_blank" title="desc" style="display:block;width:100%;text-align:center;margin-top:10px;font-size:12px;color:${color};">${title}</a>`;

                        document
                            .getElementById("info-wrap")
                            .appendChild(createDoc(infoTemplate).firstChild);
                    }
                })
                .catch((e) => console.log("Oops, fetch error"));
        } catch (e) {
            console.log("Oops, error: ", e);
        }
    }

    //release页面加速
    function addReleaseButton() {
        const releaseElems = document.querySelectorAll(
            ".repository-content .Box--condensed .Box-row"
        );

        releaseElems.forEach(function (elem) {
            // 修复按钮重复创建问题
            const buttonData = elem.querySelector("a").getAttribute("data-button");
            if (parseInt(buttonData)) {
                return true;
            }
            elem.style.alignItem = 'center';
            const href = elem.querySelector("a").getAttribute("href");
            elem.querySelector("a").setAttribute("data-button", 1);
            const template = `
    <a class="btn btn-outline" style="margin-left: 8px;" rel="nofollow" href="${cf_url}/https://github.com/${href}">加速下载</a>
    `;
            elem.appendChild(createDoc(template).firstChild);
        });

        isAddRelease = true;
    }

    function addTagButton() {
        const zipedElems = document.querySelectorAll(".repository-content .commit");
        zipedElems.forEach(function (elem, index) {
            const elems = elem.querySelectorAll("ul .d-inline-block");

            elems.forEach(function (el, index) {
                if (index > 1) {
                    const zipElem = el.querySelector("a");
                    const zip_href = zipElem.getAttribute("href");
                    const zip_text = zipElem.innerText;
                    const zip_template = `
          <a class="muted-link" href="${cf_url}/https://github.com/${zip_href}" rel="nofollow" data-create="1">
          <svg class="octicon octicon-file-zip" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>
          加速${zip_text}
        </a>
        `;
                    el.appendChild(createDoc(zip_template).firstChild);
                }
            });

            isAddTag = true;
        });
    }

    function getURLPath() {
        const url = new URL(window.location.href);
        const path = url.pathname.split("/").slice(1, 4);
        return path;
    }

    function elemHide(elem) {
        elem.style.display = "none";
    }

    function elemShow(elem) {
        elem.style.display = "block";
    }

    function isSafari() {
        const result = (
            /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
        )
        return result;
        // return true;
    }

    function createDoc(template) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(template, "text/html");
        return doc;
    }

    function getObjectFromLocalStorage(key) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.get(key, function (value) {
                    resolve(value[key]);
                });
            } catch (ex) {
                reject(ex);
            }
        });
    };

}
