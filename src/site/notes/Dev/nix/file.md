---
{"dg-publish":true,"createdAt":"2024.12.27 금 오후 15:43","modifiedAt":"2025.03.06 목 오전 10:13","permalink":"/Dev/nix/file/","dgPassFrontmatter":true}
---


기본적인 쉘 스크립트 실행
```nix
{ pkgs, ... }: { 
t = builtins.readFile ( 
	pkgs.runCommand  "timestamp" { when = builtins.currentTime; } "echo -n `date -d @$when +%Y-%m-%d_%H-%M-%S` > $out" 
)
```

폴더링으로 할 수 있다.

```nix
pkgs.runCommandLocal "ex-dir" {} "
	
"
