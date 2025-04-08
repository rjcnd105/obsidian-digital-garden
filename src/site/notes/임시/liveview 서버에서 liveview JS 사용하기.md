---
{"dg-publish":true,"createdAt":"2025.04.04 금 오후 17:44","modifiedAt":"2025.04.08 화 오전 9:46","tags":["liveview"],"permalink":"/임시/liveview 서버에서 liveview JS 사용하기/","dgPassFrontmatter":true}
---


서버측에서 클라이언트단 이벤트를 호출하여 Liveview.JS를 실행시키기

컴포넌트단
```elixir
attr(:show, :boolean, default: false)

<div
	id={@id}
	phx-mounted={@show && JS.exec("phx-show", to: "##{@id}")}
	phx-show={show(@id)}
	phx-hide={hide(@id)}
	class="fixed inset-0 max-h-screen max-w-screen backdrop-blur-dimm z-50 ease-in-out duration-100 hidden group/overlay"
	data-view-state={@view_state}
>
# ...


def show(js \\ %JS{}, id) when is_binary(id) do
 js
 |> JS.set_attribute({"data-view-state", "open"}, to: "##{id}")
 |> JS.show(to: "##{id}", transition: {"_", "_", "_"}, time: 100)
 |> JS.add_class("overflow-hidden", to: "body")
 |> JS.focus_first(to: "##{id}")
end

def hide(js \\ %JS{}, id) do
 js
 |> JS.set_attribute({"data-view-state", "closed"}, to: "##{id}")
 |> JS.hide(to: "##{id}", transition: {"_", "_", "_"}, time: 100)
 |> JS.remove_class("overflow-hidden", to: "body")
 |> JS.pop_focus()
end
```

서버단
```elixir

socket
 |> assign(room: room)
 |> push_event("js-exec", %{
	to: "#room-name-change-modal",
	attr: "phx-hide"
 })
          
```

assets의 app.ts에 아래 이벤트 추가
```typescript
window.addEventListener("phx:js-exec", ({ detail }: any) => {
  document.querySelectorAll(detail.to).forEach((el) => {
    window.liveSocket?.execJS(el, el.getAttribute(detail.attr));
  });
});
```

이제 js-exec로 모든 liveview JS를 실행 가능하다.
\
