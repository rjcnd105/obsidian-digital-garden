---
{"dg-publish":true,"createdAt":"2024.04.03 수 오후 13:57","modifiedAt":"2025.01.17 금 오후 18:15","tags":["elixir","mix","hex","phoenix","ecto"],"permalink":"/Dev/elixir/mix/","dgPassFrontmatter":true}
---


elixir의 통합 관리자 cli

[mix guide](https://hexdocs.pm/elixir/introduction-to-mix.html)
mix내에 있는 hex는 패키지 관리자임

https://hex.pm/packages
에서 패키지 검색

## Packages manager

`mix help`: 도움말
`mix deps.get`: 종속성 설치
`mix hex.outdated`: 업데이트가 필요한 패키지 확인
`mix deps.update --all`: 패키지 전부 업데이트
`mix app.tree`: 패키지 종속성 트리 보기

***

## Phoenix

`mix phx.routes $APP_NAME`

app에 대한 routes 보기
![CleanShot 2025-01-15 at 17.14.58@2x.jpg](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/CleanShot%202025-01-15%20at%2017.14.58@2x.jpg)

[mix phx.gen.schema](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Schema.html)
ex) `mix phx.gen.schema Chat.Room rooms name:text topic:text`

ecto 스키마, 마이그레이션 생성
`$APP_NAME/lib/$APP_NAME/{Context}` 에

## Ecto

[mix ecto.migrate](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Migrate.html)

[mix ecto.migrations](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Migrate.html)
전체 migration 내역 보기

![CleanShot 2025-01-17 at 16.55.19@2x.jpg](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/CleanShot%202025-01-17%20at%2016.55.19@2x.jpg)

[mix ecto.rollback](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Rollback.html)

ecto migrate 되돌리기

[mix ecto.get.migration](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Gen.Migration.html)

migration 생성

workflow ex)
name 컬럼에 not null을 추가하고 싶을때
1. `mix ecto.gen.migration add_not_null_constraint_to_rooms_name`
2. priv/repo/migrations/$DATE_add_not_null_constraint_to_rooms_name.ex 파일을 아래와 같이 수정한다.
```elixir
defmodule Dutchpay.Repo.Migrations.AddNotNullConstraintToRoomsName do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      modify :name, :text, null: false
    end
  end
end

```
3. `mix ecto.migrate`

[mix ecto.dump](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Dump.html)

ecto migration 기반의 확인 용도의 sql 파일 생성
