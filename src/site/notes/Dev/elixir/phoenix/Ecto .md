---
{"dg-publish":true,"createdAt":"2025.02.09 일 오전 10:58","modifiedAt":"2025.02.09 일 오전 11:27","permalink":"/Dev/elixir/phoenix/Ecto /","dgPassFrontmatter":true}
---


테이블을 수정하고 싶다면 다음과 같은 절차가 필요하다.
1. ecto.migration 생성
2. ecto.migration에 수정 사항 작성
3. migrate

#### unique 제약사항 추가 예제

```sh
# 1
mix ecto.gen.migration create_unique_index_on_room_name
* creating apps/dutchpay/priv/repo/migrations/20250209015612_create_unique_index_on_room_name.exs
```

```elixir
defmodule Dutchpay.Repo.Migrations.CreateUniqueIndexOnRoomName do
  use Ecto.Migration

# table, columns에 unique index 추가
  def change do
 	create unique_index(:rooms, :name)</mark>
  end
end
```

```sh
mix ecto.migration
```

제약 사항에 추가

```elixir
defmodule Dutchpay.Chat.Room.Schema do
  @moduledoc false
  use Ecto.Schema

  import Ecto.Changeset

  ...
  @doc false
  # 제약 조건 추가
  def changeset(room, attrs) do
    room
	 ...
    # unique_constraint는 db 삽입시 확인되므로, 그 전에 validate에러가 발생시에는 고유한지 아닌지 알 수 없다.
    # unsafe_validate_unique는 거의 동시에 발생하는 unique 제약은 검증할 수 없지만
    # 유저에게 정보를 주기 위한 validate 시점의 unique 검증을 한다.
    |> unsafe_validate_unique(:name, Dutchpay.Repo, message: "이미 같은 방 이름이 있습니다.")
    # unique_constraint 제약사항이 없어도 db 제약이 있기 때문에 유니크 값이 들어가지는 않지만
    # 500 에러가 뜨며 터지기 때문에 필요하다
    |> unique_constraint(:name, message: "이미 같은 방 이름이 있습니다.")
  end
end

```
