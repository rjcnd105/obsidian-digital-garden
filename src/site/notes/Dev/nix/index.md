---
{"dg-publish":true,"permalink":"/Dev/nix/index/","tags":["nix","nix_flake"]}
---

> 언제까지 프로젝트를 시작할때 마다 매번 같은 환경 세팅을 하고, 누군가는 되는데 os가 다르다고 설치 과정에서 문제가 생기고, 각자 다른 시스템 환경 때문에 고생을 할 것인가. 

모든 환경에서 동일하게 실행 가능한 환경을 만들고, 환경을 코드베이스로 관리함으로써 git을 통해 환경을 언제든지 변경하고 복구할 수 있다.
이미 구성되어 있는 환경을 framework, 커뮤니티 기반의 모듈을 통해 쉽게 재사용하고 공유한다.  


### 0. install

https://zero-to-nix.com/start/install
여기서 제공되는 방법으로 설치하는 것이 초기 설정에 좋다. 공식홈페이지의 nix 초기 설치 설정은 커뮤니티에서의 활용과 조금 동떨어져 있다.
```
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```


---
#### 초기 experimental-features 설정

```bash
mkdir -p ~/.config/nix && touch ~/.config/nix/nix.conf && zed ~/.config/nix/nix.conf
```

nix.conf 내부 내용을 아래처럼 변경해서 저장
```
experimental-features = nix-command flakes
```

전체 옵션을 https://nix.dev/manual/nix/2.18/command-ref/conf-file.html#conf-experimental-features 여기서 확인 가능하다

### 1. nix-shell
nix-shell 명령어은 임시적으로 테스트해보는 용도로 주로 쓰인다.

https://nix.dev/tutorials/first-steps/ad-hoc-shell-environments

```shell
cowsay Hello, Nix! | lolcat
```

터미널에 위와 같이 입력하면 아래와 같이 에러가 뜰 것이다.
```shell
zsh: command not found: lolcat
zsh: command not found: cowsay
```

nix-shell을 사용하여 특정 패키지를 사용한다고 명시하고 쉘에 진입할 수 있다. 
그리고 control+D로 쉘에서 나갈 수 있다.
```
nix-shell -p cowsay lolcat

[nix-shell:~]$ cowsay Hello, Nix! | lolcat
 _____________
< Hello, Nix! >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

나간 이후에는 nix shell로 진입하기 전처럼 해당 패키지를 사용할 수 없다.

어떤 프로그램이든 즉시 실행시킬 수 있다.
```
nix-shell -p cowsay --run "cowsay Nix"
 _____
< Nix >
 -----
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

패키지들은 여기서 찾을 수 있다.
https://search.nixos.org/packages

nix-shell의 -p는 packages의 약자이다.

which로 어디에 위치하는지 봐보자.
```
[nix-shell:~]$ which cowsay
/nix/store/isxbnwiiw7n661gmw2q1fx92z3aw079a-cowsay-3.8.3/bin/cowsay

[nix-shell:~]$ which lolcat
/nix/store/q7bziszbn476ld5ksfxrzj3bpdbin85m-lolcat-100.0.1/bin/lolcat
```

nix-shell안에서 추가하고 싶으면 앞서 사용한대로 또 사용하면 된다.
```
nix-shell -p cowsay lolcat

[nix-shell:~]$ nix-shell -p git

[nix-shell:~]$ git --version
git version 2.46.0

[nix-shell:~]$ echo aaa | lolcat
aaa
```


재현성(reproducibility)이란 언제 어디서나 동일한 결과를 얻기를 원한다는 것이다.
패키지 버전을 지정해야 한다.
```
nix-shell -p git --run "git --version" --pure -I nixpkgs=https://github.com/NixOS/nixpkgs/tarball/2a601aafdc5605a5133a2ca506a34a3a73377247
```
 --pure: 기존 시스템의 환경 변수로부터 격리 실행
 --I: 패키지의 소스 지정


nixpkgs-releases.sh
```
#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash cacert curl jq python3Packages.xmljson
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/2a601aafdc5605a5133a2ca506a34a3a73377247.tar.gz

curl https://github.com/NixOS/nixpkgs/releases.atom | xml2json | jq .
```

`#!`는 shebang이라고 하는데 해석된 스크립트를 실행하는데 사용할 프로그램을 결정한다.

첫 번째 줄은 표준 shebang입니다. 추가 shebang 라인은 Nix 특정 구성입니다.

-i 옵션을 사용하여 파일의 나머지 부분에 대한 인터프리터로 bash 지정합니다.

스크립트를 실행할 시스템에 이미 존재할 수 있는 프로그램을 스크립트가 암시적으로 사용하는 것을 방지하기 위해 --pure 옵션을 활성화합니다.

-p 옵션을 사용하여 스크립트 실행에 필요한 패키지를 지정합니다. xml2json 명령은 python3Packages.xmljson 패키지에서 제공되는 반면, bash , jq 및 curl 동일한 이름의 패키지에서 제공됩니다. SSL 인증이 작동하려면 cacert 있어야 합니다


---
### nix flake


nix에서 부족했던 의존성을 정의하고 고정한다.
lock 파일로 모든 종속성에 대한 마치 package-lock.json처럼 의존성 트리를 명시적으로 관리함으로서 언제나 동일한 버전의 환경을 사용할 수 있게 한다.
표준화된 구조와 인터페이스를 제공함으로써 nix 생태계의 모듈화와 재사용성을 늘린다.

nix - nix flake는 docker - docker compose와의 관계랑 비슷한 면이 있다.



---
### Determinate Systems start guide

```
echo "Hello Nix" | nix run "https://flakehub.com/f/NixOS/nixpkgs/*#ponysay"
```



---
### etc

#### nix 패키지 검색
```bash
nix profile install github:peterldowns/nix-search-cli --refresh
nix-search curl
```


#### nix channels
https://channels.nixos.org/


#### zed, vscode에서 nix 파일 실행
[[Editor/zed config\|zed config]]