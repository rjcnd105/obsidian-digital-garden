---
{"dg-publish":true,"createdAt":"2025.04.04 금 오후 17:40","modifiedAt":"2025.04.08 화 오전 9:46","tags":["phoenix","handle_async","heex","liveview"],"permalink":"/임시/Liveview handle_async simple exemple/","dgPassFrontmatter":true}
---


Liveview에서 비동기 렌더링을 위한 handle_async exemple

이렇게 수동 loading을 줄 수도 있고
[AsyncResult](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.AsyncResult.html) 랑 [<.async_result>](https://hexdocs.pm/phoenix_live_view/Phoenix.Component.html#async_result/1)  컴포넌트를 사용하는 방법으로도 쓸 수 있다.

```elixir
def render(assigns) do
  ~H"""
    <header class="h-12">
     <%= if @is_room_loading do %>
       <.header_contents room={@room} room_name_form={@room_name_form} />
     <% end %>
    </header>
  """
end



 def mount(%{"room_short_id" => room_short_id}, _, socket) do
    {:ok,
     socket
     |> assign(is_room_loading: false)
     |> start_async(:get_room, fn -> Settlement.get_room_by_short_id!(room_short_id) end)}
  end

  def handle_async(:get_room, {:ok, room}, socket) do
    {:noreply,
     assign(socket,
       room: room,
       room_name_form:
         room
         |> AshPhoenix.Form.for_update(:update_name, api: Settlement.Room)
         |> to_form(),
       is_room_loading: true
     )}
  end
```
