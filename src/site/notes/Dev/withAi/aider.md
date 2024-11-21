---
{"dg-publish":true,"createdAt":"2024.07.26 금 오후 14:35","modifiedAt":"2024.07.26 금 오후 14:45","permalink":"/Dev/withAi/aider/","dgPassFrontmatter":true}
---


### 발단
https://elixirforum.com/t/aider-claude-3-5-sonnet-works-really-well-with-elixir/65016/4

elixirforum에서 위 글을 보고 sonnet + aidar 시도



**자동 커밋이 싫을떄**
 .aider.conf.yml
```

## Enable/disable auto commit of LLM changes (default: True) 
auto-commits: false 

## Attribute aider code changes in the git author name (default: True) 
attribute-author: false

## Attribute aider commits in the git committer name (default: True) 
attribute-committer: false

```


**코딩 규칙 지정**
CONVENTIONS.md 처럼 파일을 만든 후 `aider CONVENTIONS.md useragent.py` 처럼 aidar 채팅에 파일 추가를 한다.
