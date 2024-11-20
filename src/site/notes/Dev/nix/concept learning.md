---
{"dg-publish":true,"permalink":"/Dev/nix/concept learning/","tags":["nix","flake","direnv","nix_develop","nix_profile","nix_flake"]}
---


### nix profile (구 nix-env)
시스템 global 환경 설정 프로필이라고 생각하면 된다. 
마치 git처럼 히스토리 관리가 된다.
프로필 변경(like branch checkout)은 작업들은 수동으로 처리해줘야 하는 불편함이 있다..

이러한 전역 환경 설정을 체계적으로 하고 싶으면 [home-manager](https://github.com/nix-community/home-manager)를 사용하는 건데, 초보자에게는 권하지 않는다.

```sh
nix profile install [package]

# example
# nix profile install github:peterldowns/nix-search-cli --refresh
# nix-search 

# 설치된 nix package 리스트
nix profile list

nix profile history

```



### nix flake

#### template
https://github.com/the-nix-way/dev-templates/blob/main/flake.nix#L141 의 경우에 방법은 아래와 같다. (전부 결과는 같음)
```sh
# github에서 
nix flake new --template github:the-nix-way/dev-templates#elixir my-elixir 
nix flake init --template github:the-nix-way/dev-templates#elixir
nix flake init --template github:the-nix-way/dev-templates?dir=elixir

# flakehub
nix flake init --template "https://flakehub.com/f/the-nix-way/dev-templates/*#elixir"
```


#### with direnv
구성된 것을 그대로 덮어서 사용하는 경우에 편하다. 

`touch .envrc`

**.envrc**
```
use flake "github:the-nix-way/dev-templates?dir=elixir"
use flake "github:the-nix-way/dev-templates?dir=gleam"
```

``direnv allow .`



특히 나만의 설정들을 모아놓은 스크립트들을 dvd라고 부르기도 한다.

```sh
echo "use flake \"github:hoejun/my-envs?dir=$1\"" >> .envrc
direnv allow
```
