import {
    getObjectFromLocalStorage
} from '../options/config';

main();



async function main() {
    const fastgithub_button_name = "fast_github";

    //fastgit.org加速通道
    const fastgithub_url = "https://hub.fastgit.org";

    // cnpmjs.org加速通道
    const cnpmjs_url = "https://github.com.cnpmjs.org";

    // CF加速通道
    const customURL = await getObjectFromLocalStorage('customURL');
    const defaultURL = "https://github.91chi.fun/";
    console.log("customURL: ", customURL);
    const cf_url = customURL ? customURL : defaultURL;

    // ssh加速通道
    // zhlh6
    const ssh_url = "git@git.zhlh6.cn:";
    // fastgit
    const fast_git_ssh_url = "git@hub.fastgit.org:";

    // Github网址解析
    const path = getURLPath();
    const [github_auth_name, git_name, issues] = path;
    let isAddTag = false;
    let isAddRelease = false;

    function getMainOrMasterHref() {
        const elems = document.querySelectorAll(".Box-row a");
        for (let i = 0; i < elems.length; i++) {
            const item = elems[i];
            if (item && item.text.trim() == "Download ZIP") {
                return item.getAttribute("href")
            }
        }
        return false;
    }

    function download() {
        const source = document.querySelector('video source');
        // console.log("source: ", source.getAttribute('src'));
        const fileName = `${git_name}.zip`;
        const src = `${cf_url}/https://github.com${getMainOrMasterHref()}`;
        window.location.href = src;
        // fetch(src)
        //     .then(response => response.blob())
        //     .then(function (myBlob) {
        //         downLoadZip(myBlob, fileName)
        //     });
        // createAndDownloadFile(fileName, src);
    }

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

    document.addEventListener("pjax:end", function () {
        // run code/call function
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

    // if (issues && (issues === "issues")) {
    //     return;
    // }

    // const mutationObserver = new MutationObserver(() => {

    //     const id = document.getElementById("fast_github");

    //     if (!id) {
    //         addCloneButton();
    //     }
    // });

    // mutationObserver.observe(document.body, { childList: true, subtree: true });
    addCloneButton();
    addTagButton();
    addReleaseButton();


    //添加克隆按钮
    function addCloneButton() {
        const id = document.getElementById(fastgithub_button_name);

        if (id) {
            console.info("clone button has already existed.");
            return;
        }
        const template = `<span class="d-flex" id="${fastgithub_button_name}">
<details class="get-repo-select-menu js-get-repo-select-menu  position-relative details-overlay details-reset">
  <summary class="btn ml-2 btn-primary">
      加速
      <span class="dropdown-caret"></span>
  </summary>
  <div class="position-relative">
      <div class="get-repo-modal dropdown-menu dropdown-menu-sw pb-0 js-toggler-container js-get-repo-modal p-3" style="width:352px;">
          <div class="get-repo-modal-options">
              <div class="clone-options https-clone-options">
                  <h4 class="mb-1">
                      使用HTTPS克隆
                      <a class="muted-link" href="https://docs.github.com/cn/github/using-git/which-remote-url-should-i-use" target="_blank" title="Which remote URL should I use?">
                          <svg class="octicon octicon-question" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                              <path fill-rule="evenodd" d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path>
                          </svg>
                      </a>
                  </h4>
                  <div id="fast_cnpm">
                    <p class="mb-2 get-repo-decription-text">
                        CNPMJS.ORG加速通道
                    </p>
                    <div class="input-group mb-2">
                        <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="${cnpmjs_url}/${github_auth_name}/${git_name}.git" readonly="">
                        <div class="input-group-button">
                            <clipboard-copy value="${cnpmjs_url}/${github_auth_name}/${git_name}.git" class="btn btn-sm" tabindex="0" role="button"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                                </svg>
                            </clipboard-copy>
                        </div>
                    </div>
                  </div>
                  <div id="fast_fastgit">
                    <p class="mb-2 get-repo-decription-text">
                        <a href="https://fastgit.org" target="_blank">FastGit.ORG</a>加速通道
                    </p>
                    <div class="input-group mb-2">
                        <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="${fastgithub_url}/${github_auth_name}/${git_name}.git" readonly="">
                        <div class="input-group-button">
                            <clipboard-copy value="${fastgithub_url}/${github_auth_name}/${git_name}.git" class="btn btn-sm" tabindex="0" role="button"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                                </svg>
                            </clipboard-copy>
                        </div>
                    </div>
                  </div>
                  <p class="mb-2 get-repo-decription-text">
                      Cloudflare Workers加速通道
                  </p>
                  <div class="input-group">
                      <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="${cf_url}/https://github.com/${github_auth_name}/${git_name}.git" readonly="">
                      <div class="input-group-button">
                          <clipboard-copy value="${cf_url}/https://github.com/${github_auth_name}/${git_name}.git" class="btn btn-sm" tabindex="0" role="button"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                              <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                          </svg>
                          </clipboard-copy>
                      </div>
                  </div>
                  <div id="fast_zhlh6">
                  <h4 class="mb-1" style="margin-top:10px;">
                  使用SSH克隆
                      <a class="muted-link" href="https://docs.github.com/cn/github/using-git/which-remote-url-should-i-use" target="_blank" title="Which remote URL should I use?">
                          <svg class="octicon octicon-question" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                              <path fill-rule="evenodd" d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path>
                          </svg>
                      </a>
                  </h4>
                  <p class="mb-2 get-repo-decription-text">
                      <a href="https://github.zhlh6.cn/" target="_blank">github.zhlh6.cn</a>加速通道
                      <span>
                          <a href="https://github.com/fhefh2015/Fast-GitHub#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8ssh%E9%80%9A%E9%81%93" target="_blank">设置教程</a>
                      </span>
                  </p>
                  <div class="input-group">
                      <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="${ssh_url}${github_auth_name}/${git_name}.git" readonly="">
                      <div class="input-group-button">
                          <clipboard-copy value="${ssh_url}${github_auth_name}/${git_name}.git" class="btn btn-sm" tabindex="0" role="button"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                              <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                          </svg>
                          </clipboard-copy>
                      </div>
                  </div>
                  </div>
              </div>
              <div class="mt-2 d-flex" style="text-align:center;">
                <div class="flex-1 btn btn-outline get-repo-btn" id="downloadZIP">
                    加速下载ZIP
                </div>
              </div>
              <div id="info-wrap"></div>
          </div>
      </div>
  </div>
</details>
</span>`;
        const insertElem = document.querySelector(".file-navigation");
        const frag = document.createRange().createContextualFragment(template);
        insertElem && insertElem.appendChild(frag.firstChild);



        try {
            const downloadBtn = document.getElementById('downloadZIP');
            downloadBtn && downloadBtn.addEventListener('click', function () {
                download();
            }, false);

            const infoURL = "https://yidian.one/chrome/info.json";
            fetch(infoURL)
                .then(response => response.json())
                .then(data => {
                    const {
                        url,
                        title,
                        desc,
                        code,
                        color,
                        fast_cnpm,
                        fast_fastgit,
                        fast_zhlh6
                    } = data;
                    if (parseInt(code)) {
                        const infoTemplate = `<a href=${url} target="_blank" title="desc" style="display:block;width:100%;text-align:center;margin-top:10px;font-size:12px;color:${color};">${title}</a>`
                        const infoElem = document
                            .createRange()
                            .createContextualFragment(infoTemplate);
                        document.getElementById("info-wrap").appendChild(infoElem);

                        if (fast_cnpm) {
                            hideIt("fast_cnpm");
                        }

                        if (fast_fastgit) {
                            hideIt("fast_fastgit");
                        }

                        if (fast_zhlh6) {
                            hideIt("fast_zhlh6")
                        }
                    }
                })
                .catch(e => console.log("Oops, fetch error"))
        } catch (e) {
            console.log("Oops, try error")
        }
    }

    function hideIt(id) {
        const elem = document.getElementById(id);
        elem.style.display = "none";
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

            const href = elem.querySelector("a").getAttribute("href");
            elem.querySelector("a").setAttribute("data-button", 1);
            const template = `
    <a class="btn btn-outline" style="margin-top:10px;" rel="nofollow" href="${cf_url}/https://github.com/${href}">加速下载</a>
    `;
            const frag = document.createRange().createContextualFragment(template);
            elem.appendChild(frag);
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
                    const zip_frag = document
                        .createRange()
                        .createContextualFragment(zip_template);
                    el.appendChild(zip_frag);
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
}