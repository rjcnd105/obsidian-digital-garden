---
{"dg-publish":true,"createdAt":"2025.02.09 일 오전 10:58","modifiedAt":"2025.02.10 월 오후 14:07","permalink":"/Dev/elixir/phoenix/Ecto /","dgPassFrontmatter":true}
---


테이블을 수정하고 싶다면 공통적으로 다음과 같은 절차가 필요하다.
1. ecto.migration 생성
2. ecto.migration에 수정 사항 작성
3. (optional) 스키마 제약 사항 추가
4. migrate

### unique 제약사항 추가 예제

1. `mix ecto.gen.migration create_unique_index_on_room_name`
2. 추가된 priv/repo/migrations 내에 해당 파일을 아래와 같이 수정
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

3. 스키마 제약 사항에 추가

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
    ...
  end
end

```

4. `mix ecto.migrate

### notnull 추가

```elixir
# 1. `mix ecto.gen.migration add_not_null_constraint_to_rooms_name`
# 2. 추가된 priv/repo/migrations 내에 해당 파일을 아래와 같이 수정 
defmodule Dutchpay.Repo.Migrations.AddNotNullConstraintToRoomsName do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      modify :name, :text, null: false
    end
  end
end

# 3. 스키마에 validate_required 제약 사항 추가
defmodule Dutchpay.Chat.Room.Schema do
  ...  
  # 제약 조건 추가
  def changeset(room, attrs) do
    room
    ...
    |> validate_required(:name, message: "방 이름을 입력해주세요.")
    ...
  end
end

# 4. mix ecto.migrate
```
2. 제약 사항 추가
3. `mix ecto.migrate

### timestamp() 매크로로 넣은 날짜 형식 변경

처음부터 timestamp(type: :utc_datetime)로 했어야하는걸 나중에 수정할때 예시
매크로가 inserted_at, updated_at 두 컬럼을 생성한다.
수정시에는 직접 바꿔줘야한다.

```elixir
# 1. mix ecto.gen.migration update_timestamps_to_utc
# 2. 추가된 priv/repo/migrations 내에 해당 파일을 아래와 같이 수정
defmodule Dutchpay.Repo.Migrations.TimeTypeUtc do
  use Ecto.Migration

  def change do
    alter table(:messages) do
      modify :inserted_at, :utc_datetime, from: :naive_datetime
      modify :updated_at, :utc_datetime, from: :naive_datetime
    end
  end
end

# 3. mix ecto.migrate
```
