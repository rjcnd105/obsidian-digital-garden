---
{"dg-publish":true,"createdAt":"2025.04.03 목 오후 16:14","modifiedAt":"2025.04.03 목 오후 19:05","tags":["liveview","phoenix"],"permalink":"/임시/Liveview에서 여러 phx- 잇는 방법./","dgPassFrontmatter":true}
---


```elixir

  attr(:"phx-mounted", JS, default: %JS{})

# ...
<div 
	phx-mounted={assigns[:"phx-mounted"] |> JS.dispatch("addEvent:enterSubmit", detail: %{event_name: "keyup"}) }
/>
```
