# Fast-GitHub
国内Github下载很慢，用上了这个插件后，下载速度嗖嗖嗖的~！

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
# 请我喝星巴克
<a href="https://www.buymeacoffee.com/fhefh2015" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
