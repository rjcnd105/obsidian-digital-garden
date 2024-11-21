---
{"dg-publish":true,"createdAt":"2024.07.19 금 오후 15:58","modifiedAt":"2024.07.19 금 오후 17:22","permalink":"/Dev/shell/shell 커멘드 모음/","dgPassFrontmatter":true}
---

#shell


### 권한

현재 유저 권한 부여
`sudo chown $(whoami) /usr/local/etc`



### 파일

파일 생성하면서 내용 작성 (>>는 추가)
`echo "address=/localhost/192.168.35.90" > brew --prefix)/etc/dnsmasq.conf
`echo 'address=/.local/127.0.0.1' >> $(brew --prefix)/etc/dnsmasq.conf`
