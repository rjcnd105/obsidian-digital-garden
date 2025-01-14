---
{"dg-publish":true,"createdAt":"2024.07.19 금 오후 15:58","modifiedAt":"2025.01.14 화 오후 12:03","permalink":"/Dev/shell/bash/","dgPassFrontmatter":true}
---


#shell

### 권한

현재 유저 권한 부여
`sudo chown $(whoami) /usr/local/etc`

### 파일

파일 생성하면서 내용 작성 (>>는 추가)
`echo "address=/localhost/192.168.35.90" > brew --prefix)/etc/dnsmasq.conf
`echo 'address=/.local/127.0.0.1' >> $(brew --prefix)/etc/dnsmasq.conf`

### 조건

**파일 여부 분기**

```bash

if [[ -f "$HOME/.config/mise/config.toml" ]]; then
	cat "$HOME/.config/mise/config.toml"
fi
```

**폴더 여부 분기**
```bash
if [ ! -d "lib" ]; then
	echo "Creating lib directory..."
	mkdir lib
fi
```
