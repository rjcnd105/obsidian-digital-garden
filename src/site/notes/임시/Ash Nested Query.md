---
{"dg-publish":true,"createdAt":"2025.04.05 토 오후 17:54","modifiedAt":"2025.04.05 토 오후 17:55","tags":["ash","query"],"permalink":"/임시/Ash Nested Query/","dgPassFrontmatter":true}
---


```elixir

Settlement.get_room_by_short_id!(room_short_id,
	load: [payers: Payer |> Ash.Query.select([:id, :name])],
	query: [select: [:id, :name]]
 )
       
```
