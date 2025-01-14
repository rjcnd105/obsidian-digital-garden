---
{"dg-publish":true,"createdAt":"2024.07.19 금 오후 15:58","modifiedAt":"2025.01.14 화 오후 12:09","tags":["shell","bash"],"permalink":"/Dev/shell/shell scripts/","dgPassFrontmatter":true}
---


### 권한

현재 유저 권한 부여
`sudo chown $(whoami) /usr/local/etc`

### 파일

파일 생성하면서 내용 작성 (>>는 추가)
`echo "address=/localhost/192.168.35.90" > brew --prefix)/etc/dnsmasq.conf
`echo 'address=/.local/127.0.0.1' >> $(brew --prefix)/etc/dnsmasq.conf`

```bash
cat > lib/app_config.ex << EOF
	 defmodule AppConfig do
		@app :${APP_NAME}
		@web_app :${APP_NAME}_web

		# runtime variable
		def app, do: @app
		def web_app, do: @web_app

		# compile variable
		defmacro app_macro, do: quote do: unquote(@app)
		defmacro web_app_macro, do: quote do: unquote(@web_app)
	 end
  EOF 
```

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

**파이프라인**
한 줄에서 실행하는 것처럼 실행됨.

`-e` (errexit)
- 명령어가 0이 아닌 종료 코드를 반환하면 즉시 스크립트 실행을 중단
- 에러가 발생하면 스크립트가 즉시 종료되어 실패한 상태에서 계속 실행되는 것을 방지
- 예외: if 문의 조건, while/until 루프의 조건 등

`-u` (nounset)
- 정의되지 않은 변수를 참조하면 에러를 발생시킴
- 변수 오타나 초기화되지 않은 변수 사용을 방지
- 예: `echo $UNDEFINED_VAR`는 에러를 발생시킴

`-x` (xtrace)
- 실행되는 각 명령어를 실행 전에 출력
- 디버깅에 유용함
- 명령어 앞에 `+` 기호와 함께 출력됨

`-o pipefail`
- 파이프라인에서 마지막 명령어의 종료 상태가 아닌, 실패한 명령어의 종료 상태를 반환
- 파이프라인의 중간 단계에서 발생한 오류도 감지 가능
- 예: `false | true`의 종료 상태가 0이 아닌 1이 됨

```bash
 set -euo pipefail
 source {{root_dir}}/createEnv.sh
 nix build .#darwinConfigurations.workspace_hj.system --show-trace --impure --fallback

```
