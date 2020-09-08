let template = `<span class="d-flex">
    <details class="get-repo-select-menu js-get-repo-select-menu  position-relative details-overlay details-reset">
        <summary class="btn btn-sm ml-2 btn-primary">
            加速 克隆和下载
            <span class="dropdown-caret"></span>
        </summary>
        <div class="position-relative">
            <div class="get-repo-modal dropdown-menu dropdown-menu-sw pb-0 js-toggler-container on js-get-repo-modal">
                <div class="get-repo-modal-options">
                    <div class="clone-options https-clone-options">
                    <button name="button" class="btn-link btn-change-protocol js-toggler-target float-right">使用SSH</button>
                        <h4 class="mb-1">
                            使用HTTPS克隆
                            <a class="muted-link" href="https://help.github.com/articles/which-remote-url-should-i-use" target="_blank" title="Which remote URL should I use?">
                                <svg class="octicon octicon-question" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path>
                                </svg>
                            </a>
                        </h4>
                        <p class="mb-2 get-repo-decription-text">
                            通过URL使用Git或SVN。
                        </p>
                        <div class="input-group">
                            <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="https://github.com/RC1844/FastGithub.git" aria-label="Clone this repository at https://github.com/RC1844/FastGithub.git" readonly="">
                            <div class="input-group-button">
                                <clipboard-copy value="https://github.com/RC1844/FastGithub.git" aria-label="Copy to clipboard" class="btn btn-sm" data-hydro-click="{&quot;event_type&quot;:&quot;clone_or_download.click&quot;,&quot;payload&quot;:{&quot;feature_clicked&quot;:&quot;COPY_URL&quot;,&quot;git_repository_type&quot;:&quot;REPOSITORY&quot;,&quot;repository_id&quot;:244853632,&quot;originating_url&quot;:&quot;https://github.com/RC1844/FastGithub&quot;,&quot;user_id&quot;:14891797}}" data-hydro-click-hmac="99662fbbac092854275476c701bfed7dcd661363b16e93f35e901bc69f2497d2" tabindex="0" role="button"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                                    </svg></clipboard-copy>
                            </div>
                        </div>
                    </div>
                    <div class="clone-options ssh-clone-options">
                    <button name="button" class="btn-link btn-change-protocol js-toggler-target float-right">使用HTTPS</button>
                        <h4 class="mb-1">
                                使用SSH克隆
                            <a class="muted-link" href="https://help.github.com/articles/which-remote-url-should-i-use" target="_blank" title="Which remote URL should I use?">
                                <svg class="octicon octicon-question" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path>
                                </svg>
                            </a>
                        </h4>
                        <div class="flash flash-warn my-3">
                            您的GitHub帐户中没有任何公共SSH密钥。
                            您可以添加<a href="/settings/ssh/new">新的公共密钥</a>, 或尝试通过<button class="btn-link js-toggler-target">HTTPS</button>克隆此仓库。
                        </div>
                        <p class="mb-2 get-repo-decription-text">
                            使用受密码保护的SSH密钥。
                        </p>
                        <div class="input-group">
                            <input type="text" class="form-control input-monospace input-sm" data-autoselect="" value="git@github.com:RC1844/FastGithub.git" aria-label="Clone this repository at git@github.com:RC1844/FastGithub.git" readonly="">
                            <div class="input-group-button">
                                <clipboard-copy value="git@github.com:RC1844/FastGithub.git" aria-label="Copy to clipboard" class="btn btn-sm" data-hydro-click="{&quot;event_type&quot;:&quot;clone_or_download.click&quot;,&quot;payload&quot;:{&quot;feature_clicked&quot;:&quot;COPY_URL&quot;,&quot;git_repository_type&quot;:&quot;REPOSITORY&quot;,&quot;repository_id&quot;:244853632,&quot;originating_url&quot;:&quot;https://github.com/RC1844/FastGithub&quot;,&quot;user_id&quot;:14891797}}" data-hydro-click-hmac="99662fbbac092854275476c701bfed7dcd661363b16e93f35e901bc69f2497d2" tabindex="0" role="button"><svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path>
                                    </svg></clipboard-copy>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 d-flex">
                        <a class="flex-1 btn btn-outline get-repo-btn " rel="nofollow" href="/RC1844/FastGithub/archive/master.zip">
                            下载ZIP打包文件
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </details>
</span>`;