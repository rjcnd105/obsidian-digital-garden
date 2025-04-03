---
{"dg-publish":true,"createdAt":"2025.04.01 화 오후 13:50","modifiedAt":"2025.04.01 화 오후 13:54","tags":["ash","ash_query"],"permalink":"/임시/Ash Query filter/","dgPassFrontmatter":true}
---


상단에 Ash.Query require가 필요.
```elixir
require Ash.Query
```

### is nil

```elixir
{ :ok, rooms } = Ash.Query.filter(Room, is_nil short_id) |> Ash.read()
```
