---
{"dg-publish":true,"createdAt":"2025.04.05 토 오후 17:54","modifiedAt":"2025.04.08 화 오전 9:45","tags":["ash","query"],"permalink":"/임시/Ash Nested Query/","dgPassFrontmatter":true}
---


load 하는 relation resource에 대한 Query 하기
```elixir

Settlement.get_room_by_short_id!(room_short_id,
	load: [payers: Payer |> Ash.Query.select([:id, :name])],
	query: [select: [:id, :name]]
 )
       
```
