---
{"dg-publish":true,"createdAt":"2024.04.01 월 오후 18:10","modifiedAt":"2025.01.10 금 오후 13:00","tags":["elixir","zed","pkgx","erlang","lexical-lsp","next-ls"],"permalink":"/Dev/elixir/elixir install/","dgPassFrontmatter":true}
---


언어는 좋은데 좀.. 환경 설정이 그지같다...

이것저것 다 해봤는데.. 다 문제가 조금씩 있어서 다음에는 [nix flake&direnv](https://elixirforum.com/t/flake-nix-phoenix-postgresql/52622/5)로 해봐야겠음.
혹은 [devbox](https://www.jetpack.io/devbox/docs/devbox_examples/languages/elixir/),

전부 mac 환경 기준입니다.

### 버전 관리 안할꺼면 그냥 brew로 설치

```
brew install elixir elixir-ls next-ls erlang
```

---

### asdf 통해 elixir 설치

버전 대신에 latest를 하거나, 다른 버전 입력하거나 맘대로

```shell
brew install asdf

asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git
asdf plugin add elixir https://github.com/asdf-vm/asdf-elixir.git

asdf list-all erlang
asdf list-all elixir

asdf install erlang 27.0.1
asdf install elixir 1.17.2-otp-27	

asdf global erlang 27.0.1  
asdf global elixir 1.17.2-otp-27
```

.zshrc에 다음 내용 추가
```

. /opt/homebrew/opt/asdf/libexec/asdf.sh
export PATH="$PATH:$HOME/.asdf/shims"
```

---

brew로 asdf 업데이트하고 난 후 아래 command 실행
```

asdf reshim

```

#### asdf로 postgres 설치 (또는 업그레이드시)

필요한 패키지들 설치 안되어있다면 설치
```
brew install gcc readline zlib curl ossp-uuid icu4c pkg-config
```

.zshrc 등에 다음 환경 변수 추가
```shell
# brew
export HOMEBREW_PREFIX=/opt/homebrew
export PKG_CONFIG_PATH="/opt/homebrew/bin/pkg-config:$(brew --prefix icu4c)/lib/pkgconfig:$(brew --prefix curl)/lib/pkgconfig:$(brew --prefix zlib)/lib/pkgconfig"
```

그 다음 아래 커맨드 실행
```shell

asdf reshim
asdf plugin-add postgres

asdf install postgres 17.1
asdf global postgres 17.1
```

---

### pkgx 통해 elixir 설치

---  24.11.15 현재로선 아직은 asdf 사용하는게 나은 것 같다.

https://dev.to/jonlauridsen/perfect-elixir-environment-setup-1145
위 글이 아주 좋다.

vscode를 사용할꺼면 pkgx가 잘 작동한다.

#### vscode

elixir, erlang은 pkgx 설치한다.
기존에 다른 방식으로 설치되어 있으면 제거

```shell
brew install pkgxdev/made/pkgx

eval "$(pkgx integrate)"
```

프로젝트 내에 pkgx.yml을 작성한다.
pkgx.yml
```
dependencies:
  erlang.org@26 elixir-lang.org@1.16
```

그 후
```shell
dev
```

#### 주의할점

pkgx기반으로 에디터가 작동하게 하려면 해당 프로젝트에서 에디터를 실행시켜라.

+etc
install.zsh
```
#!/bin/zsh
set +euo pipefail

command -v brew &>/dev/null || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
command -v pkgx &>/dev/null || brew install pkgxdev/made/pkgx
command -v dev &>/dev/null || eval "$(pkgx integrate)"
command -v erl &>/dev/null || dev

echo "Setup complete."
```

작성 후 zsh install.zsh

***

### LSP 설치

https://github.com/lexical-lsp/lexical

vscode 사용시 lexical lsp 사용가능
https://github.com/lexical-lsp/lexical/blob/main/pages/installation.md#visual-studio-code

zed의 경우에는 lexical lsp를 제대로 지원하지 않는 것 같으니 https://www.elixir-tools.dev/docs/next-ls/editors/#zed
nextls를 사용하도록 하자

-> 현재는 제대로 지원함.
https://github.com/zed-industries/zed/pull/10948

```
{
  "languages": {
    "Elixir": {
      "language_servers": [ "lexical", "!elixir-ls", "!next-ls", "..."]
    }
  }
}
```

---

### postgresql install

```
brew install postgresql@16
```
