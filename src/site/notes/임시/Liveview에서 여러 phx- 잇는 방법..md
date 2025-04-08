---
{"dg-publish":true,"createdAt":"2025.04.03 목 오후 16:14","modifiedAt":"2025.04.08 화 오전 9:45","tags":["liveview","phoenix"],"permalink":"/임시/Liveview에서 여러 phx- 잇는 방법./","dgPassFrontmatter":true}
---


attr로 받는 Liveview.JS 객체를 pipe 하기

```elixir

  attr(:"phx-mounted", JS, default: %JS{})

# ...
<div 
	phx-mounted={assigns[:"phx-mounted"] |> JS.dispatch("addEvent:enterSubmit", detail: %{event_name: "keyup"}) }
/>
```
