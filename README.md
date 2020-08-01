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
