# Version

v1.1.1

1.Github part of the page structure modified to accommodate the new layout.

Known issues

Octotree 6.0.0 has an impact on GitHub page layouts

Solution

Disable Octotree or use <a href="https://chrome.google.com/webstore/detail/git-master/klmeolbcejnhefkapdchfhlhhjgobhmo" target="_blank">Git Master</a>

![3b1kD43](https://i.imgur.com/3b1kD43.png)

v1.1.0

1. add fusion mode, please check in plugin options
2. Fix custom accelerated URL problem
3. Fix UI display problems

![pV9pLOW](https://i.imgur.com/pV9pLOW.png)


# INTRODUCTION

# Fast-GitHub
Github download speeds are generally slow in Asia, and with this plugin the download speeds will be insane!

[![Page Views Count](https://badges.toozhao.com/badges/01EH1R0YMQANV1ACQXTEBK7JCN/green.svg)](https://badges.toozhao.com/badges/01EH1R0YMQANV1ACQXTEBK7JCN/green.svg "Get your own page views count badge on badges.toozhao.com")

# Download plugin
<a href="https://chrome.google.com/webstore/detail/github%E5%8A%A0%E9%80%9F/mfnkflidjnladnkldfonnaicljppahpg" target="_blank">Chrome Download</a>

# Plugin Preview

![OP5jdNK](https://i.imgur.com/OP5jdNK.png)



# How to use SSH channels

Configuring user profiles (`~/.ssh/config`)

```bash
Host github.com
	HostName github.com
	User git
	IdentityFile Specify the path to the private key file used for key authentication
# Add the following
Host git.zhlh6.cn
	HostName git.zhlh6.cn
	User git
	IdentityFile Using the secret key of github.com
```
Testing SSH Connections
```bash
ssh -T git@git.zhlh6.cn

# successful
You've successfully authenticated, but GitHub does not provide shell access
```
-----
# 版本记录

v1.1.1

Github部分网页结构修改 适配新布局

已知问题

Octotree 6.0.0 对GitHub页面布局有影响

解决

禁用Octotree或者使用<a href="https://chrome.google.com/webstore/detail/git-master/klmeolbcejnhefkapdchfhlhhjgobhmo" target="_blank">Git Master</a>

![3b1kD43](https://i.imgur.com/3b1kD43.png)

v1.1.0

1.新增融合模式，请在插件选项中查看

2.修复自定义加速网址问题

3.修复界面显示问题

![pV9pLOW](https://i.imgur.com/pV9pLOW.png)

# 简介
# Fast-GitHub

国内Github下载很慢，用上了这个插件后，下载速度嗖嗖嗖的~！

[![Page Views Count](https://badges.toozhao.com/badges/01EH1R0YMQANV1ACQXTEBK7JCN/green.svg)](https://badges.toozhao.com/badges/01EH1R0YMQANV1ACQXTEBK7JCN/green.svg "Get your own page views count badge on badges.toozhao.com")

# 下载插件
<a href="https://chrome.google.com/webstore/detail/github%E5%8A%A0%E9%80%9F/mfnkflidjnladnkldfonnaicljppahpg" target="_blank">Chrome插件下载</a>

# 插件预览

![OP5jdNK](https://i.imgur.com/OP5jdNK.png)

# 如何使用SSH通道

配置用户配置文件 (`~/.ssh/config`)

```bash
Host github.com
	HostName github.com
	User git
	IdentityFile 指定密钥认证使用的私钥文件路径
# 新增如下内容
Host git.zhlh6.cn
	HostName git.zhlh6.cn
	User git
	IdentityFile 使用github.com的秘钥
```
测试 SSH 连接
```bash
ssh -T git@git.zhlh6.cn

# 成功
You've successfully authenticated, but GitHub does not provide shell access
```
