---
{"dg-publish":true,"createdAt":"2024.11.08 금 오후 17:26","modifiedAt":"2025.01.17 금 오후 16:55","permalink":"/Dev/elixir/language/Elixir study/","dgPassFrontmatter":true}
---


# Elixir in action - part1

## Basic - section2

Hello World

```elixir
IO.puts("hello world")
```

## Modules 정의 기본

```elixir
# 모듈 정의
defmodule Geometry do
  def rectangle_area(a, b) do
    a * b
  end

  # 압축 표현식
  def rectangle_area3D(a, b, z), do: rectangle_area(a, b) * z
end

Geometry.rectangle_area3D(4, 3, -7) |> abs() |> IO.puts()
```

## override

```elixir
defmodule Calculator do
  # 아래와 같이 오버라이드를 하고 위임할 수 있음  
  # def add(a), do: add(a, 0)
  # def add(a, b), do: a + b

  # 디폴트 값 지정 
  def add(a, b \\ 0), do: a + b
end

Calculator.add(8, 4)
```

## Module advanced

```elixir
defmodule TestPrivate do
  import IO

  def double(a) do
    sum(a, a)
  end

  # p는 private의 약어로써, defp라고 하면 외부에서 사용 불가능함
  defp sum(a, b) do
    a + b
  end

  def test, do: puts("my test")
end

defmodule MyModule do
  alias IO, as: MyIO

  defmodule DeepModule do
    def my_deep_function, do: MyIO.puts("Calling imported deep function.")
  end

  def my_function do
    MyIO.puts("Calling imported function.")
  end
end

defmodule MyTestModule do
  # as 사용하지 않을시 자동 축약
  # ~= alias MyModule.DeepModule, as: DeepModule
  alias MyModule.DeepModule

  def t, do: DeepModule.my_deep_function()
end

MyTestModule.t()
```

## Module Attribute, docs, types

```elixir
defmodule Circle do
  @moduledoc "원에 대한 기본 계산 기능들 구현"

  # 여기서 @pi 중요한 점은 상수에 대한 참조가 인라인될 때 모듈을 컴파일하는 동안에만 존재한다는 것이다.
  @pi 3.14159

  @doc "원 면적 계산"
  def area(r), do: r * r * @pi

  @doc "원 둘레 계산"
  def circumference(r), do: 2 * r * @pi
end

Circle.area(2) |> IO.puts()

Code.fetch_docs(Circle)
```

https://hexdocs.pm/ex_doc/readme.html 사용시 바로 @doc, @moduledoc을 기반으로 HTML 문서를 생성할 수 있다.

```elixir
defmodule Circle2 do
  @moduledoc "원에 대한 기본 계산 기능들 구현"

  # 여기서 @pi 중요한 점은 상수에 대한 참조가 인라인될 때 모듈을 컴파일하는 동안에만 존재한다는 것이다.
  @pi 3.14159

  @spec area(number) :: number
  def area(r), do: r * r * @pi

  @spec circumference(number) :: number
  def circumference(r), do: 2 * r * @pi
end
```

[dialyzer](https://github.com/jeremyjh/dialyxir)와 같은 도구 사용시 정적 타입 체크를 할 수 있다. 복잡한 프로젝트라면 타입을 작성하기를 매우 추천한다.

[Typespecs 공식 문서 참고](https://hexdocs.pm/elixir/typespecs.html)

## Atoms

상수. F#에 있는 열거형과 비슷하다.

```elixir
:an_atom
:another_atom

# 공백이 있는 경우
:"an atom with spaces"

# Aliases 구문
# :"Elixir.MyAtom" 처럼 변환된다.
MyAtom

alias IO, as: MyIO
IO.puts(MyIO == Elixir.IO)
# -> true
```

## Bool

Elixir에는 전용 부울이 없다. 대신 :true, :false atom을 사용한다.<br>
콜론 없이도 사용할 수 있다.

```elixir
true == true |> IO.puts()

# and
true and false |> IO.puts()

# or
false or true |> IO.puts()

# not
not false |> IO.puts()

# ||, &&, ! 사용 가능
# 5
(nil || false || 5 || true) |> IO.puts()
# 6
true && 6 |> IO.puts()
IO.puts(!true)

# none atom
not :an_atom_other_than_true_or_false
```

## Tuples

고정된 수의 요소를 그룹화할때 사용

```elixir
person = {"Bob", 25}

# 튜플에서 요소를 추출하려면 Kernel.elem을 사용할 수 있다. 
# Kernal 모듈은 auto import 되므로 바로 사용 가능.
age = elem(person, 1)

# 수정하려면 아래와 같이 가능
# {"Bob", 26}
put_elem(person, 1, 26)

# with List

# atom으로 찾을시 {{a: 1}, {b: 2}}로 취급함
# [b: 2]
List.keydelete([a: 1, b: 2], :a, 0)
# {:b, 2}
List.keyfind([a: 1, b: 2], :b, 0)
# {:b, 2}
List.keyfind([a: 1, b: 2], 2, 1)
# List.keyfind([a: 1, b: 2], :c, 0) # nil
```

```elixir
# 수정된 튜플은 항상 이전 버전의 얕은 복사본입니다. 
[a, b, c] = [~c"a", ~c"b", ~c"c"]
b2 = ~c"b2"
a_tuple = {a, b, c}
new_tuple = put_elem(a_tuple, 1, b2)

# 리바인드를 하면 가비지 콜렉션이 됩니다.
```

![](files/tuple1.png)

<!-- livebook:{"break_markdown":true} -->

![](files/tuple2.png)

## Lists

목록은 배열처럼 보이지만 singly linked lists처럼 작동한다. 목록으로 작업을 수행하려면 탐색해야한다.
https://hexdocs.pm/elixir/main/List.html

```elixir
prime_numbers = [2, 3, 5, 7]
length(prime_numbers)

# 재귀 목록 정의 (Recursive list definition)
list = [1, 2, 3]
# list = [1 | [2 | [3 | []]]] # 재귀 목록식 정의
# fast, [0, 1, 2, 3]
[0 | list]
# slow, [1, 2, 3, 4]
list ++ [4]

# concats, delets
# [1, 2, 3, 4, 5, 6]
[1, 2, 3] ++ [4, 5, 6]
# [1, 2, 3, true]
[1, true, 2, false, 3, true] -- [true, false]

# head, tail
# [head | tail] = [1, 2, 3]
# head # 1
# tail # [2, 3]

# delete
# [:a, :b, :c]
List.delete([:a, :b, :b, :c], :b)
# [1, 2]
List.delete_at([1, 2, 3], -1)

# foldl, foldr
# {6, -6}
List.foldl([1, 2, 3], {0, 0}, fn x, {a1, a2} -> {a1 + x, a2 - x} end)
# -2
List.foldr([1, 2, 3, 4], 0, fn x, acc -> x - acc end)

# flatten
# [1, 2, 3]
List.flatten([1, [[2], 3]])

# first, last
# 1
List.first([1, 2, 3])
# 3
List.last([1, 2, 3])
# with default, 7 
List.last([], 7)

# replace
# [0, 2, 3]
List.replace_at([1, 2, 3], 0, 0)
# [1, 2, 0]
List.replace_at([1, 2, 3], -1, 0)

# zip
# [{1, 3, 5}, {2, 4, 6}]
List.zip([[1, 2], [3, 4], [5, 6]])
# to_tuple
# {:share, [:elixir, 163]}
List.to_tuple([:share, [:elixir, 163]])
```

List의 꼬리쪽에 수정하게되면 앞에 있는 요소들을 전부 얕은 복사를 하므로 비용이 크게 든다. <br>
새 요소를 맨 앞으로 푸쉬하면 훨신 비용이 적게 든다

<!-- livebook:{"break_markdown":true} -->

![](files/list1.png)

<!-- livebook:{"break_markdown":true} -->

![](files/list2.png)

## Maps

맵은 키와 값이 임의의 용어일 수 있는 키-값 저장소입니다. Elixir에서는 지도를 두 가지 용도로 사용합니다. 이는 동적으로 크기가 조정된 키-값 구조를 강화하는 데 사용되지만 간단한 레코드(잘 정의된 두 개의 이름이 함께 묶인 필드)를 관리하는 데에도 사용됩니다.

```elixir
empty_map = %{}
squares = %{1 => 1, 2 => 4, 3 => 9}

# Map.new로 튜플을 받아 생성 가능
squaresFromTuple = Map.new([{1, 1}, {2, 4}, {3, 9}])

# 4
squares[2]

## Map.get을 사용해서도 가져올 수 있음. 3번째 인자를 넣을시 default 값
# nil
Map.get(squares, 4)
# not_found
Map.get(squares, 4, :not_found)

## 안전하게 값 가져오기
# :ok, :error 와 함께 가져옴
# {:ok, 4}
Map.fetch(squares, 2)
# :error
Map.fetch(squares, 4)
# 값이 없는 경우 예외 발생 시키고자 할때 !를 써줌 
# Map.fetch!(squares, 4) 

## 값 추가
# Map.put(squares, 4, 16) # %{1 => 1, 2 => 4, 3 => 9, 4 => 16}

## 다음과 같이 map을 사용하여 데이터를 관리하는 것은 엘릭서에서 자주 사용되는 패턴임. 특히 데이터가 동적인 경우! 
# 키가 원자인 경우 다음과 같이 짧게 만들 수 있음
bob = %{name: "Bob", age: 25, works_at: "Initech"}

# 값 수정
# %{age: 26, name: "Bob", works_at: "Initrode"}
next_years_bob = %{bob | age: 26, works_at: "Initrode"}
```

## Binaries, bitsequence, bitstring, string, Character lists

```elixir
# 바이너리는 바이트 덩어리이다
# 3byte
<<1, 2, 3>>

# 255보다 큰 값을 제공하면 바이트 크기에 맞게 잘립니다.
# <<3>>
<<259>>

# 각 값의 크기를 지정할 수 있으므로 해당 특정 값에 사용할 비트 수를 컴파일러에 알릴 수 있습니다.
# <<1, 3>>
<<259::16>>

# 모든 값의 크기가 8의 배수가 아닌 경우 비트 시퀀스라고 한다.
# <<5::size(3)>>
<<1::1, 0::1, 1::1>>

# <>를 사용하여 바이너리 또는 비트열을 연결할 수 있다.
# <<1, 2, 3, 4>>
<<1, 2>> <> <<3, 4>>
```

바이너리 문자열

```elixir
# 바이너리 문자열

# 다음과 같이 ${}로 표현식 넣기 가능
str = "Embedded expression: #{3 + 0.14}"

# "\r \n \" \\" 이스케이프 사용 가능

# 줄로 끝날 필요 없음 (linebreak는 \n으로 들어감) 
str = " 
This is
a multiline string
"

# "\nThis is\na multiline string\n"

# heredocs 표현 
str = """
Heredoc must end on its own line ""
ㅎㅎㅎ
"""

# "Heredoc must end on its own line \"\"\n"ㅎㅎㅎ\n

# sigils 표현 - 다음과 같이 따옴표 없이 ~s를 넣어 사용 가능. 따옴표를 포함하려는 경우 유용
str = ~s("Do... or do not. There is no try." -Master Yoda)

# ~S 대문자 사용시 보간이나 이스케이프를 처리하지 않는다 
# "Not interpolated \\n value: \#{3 + 0.14}"
str = ~S(Not interpolated \n value: #{3 + 0.14})
```

#### Character lists

일반적으로 바이너리 스트링 (~s)를 더 선호해야 함<br>
ASCII의 범위 내에 있는 정수 코드의 리스트임

```elixir
# ABC
IO.puts([65, 66, 67])

# ~c를 사용해서 생성 가능
# ABC
IO.puts(~c"ABC")

# 작은 따옴표로 생성 가능
# ABC
IO.puts(~c"ABC")

# ~c를 권장하고 작은 따옴표로 써도 ~c로 변환됨
```

## IO lists

IO 목록은 바이트 스트림을 점진적으로 구축해야 할 때 유용합니다. 목록에 추가하는 것은 O(n) 작업이기 때문에 일반적으로 이 경우 목록은 효과적이지 않습니다. 대조적으로, IO 목록에 추가하는 것은 중첩을 사용할 수 있기 때문에 O(1)입니다.

내부적으로는 구조가 평면화되어 사람이 읽을 수 있는 출력을 볼 수 있습니다. IO 목록을 파일이나 네트워크 소켓으로 보내면 동일한 효과를 얻을 수 있습니다.

```elixir
iolist = []
iolist = [iolist, "This"]
iolist = [iolist, " is"]
iolist = [iolist, " an"]
iolist = [iolist, " IO list."]

# iolist # [[[[[], "This"], " is"], " an"], " IO list."]

# This is an IO list.
IO.puts(iolist)
```

## Enum

Enum은 열거 가능한 구조를 다루며 List에만 국한되지 않는다. <br>
Enum의 함수들은 호출되면 모든 열거 가능한 항목을 순회하기 때문에 lazy하게 처리하고 싶다면 Stream 모듈을 사용하시오

[Enum 모듈 문서](https://hexdocs.pm/elixir/main/Enum.html)

[Enum Cheatsheet](https://hexdocs.pm/elixir/main/enum-cheat.html)

## 일급 함수(익명 함수, 람다)

명명된 함수에 대해서는 괄호를 쓰지만, 람다는 괄호를 쓰지 않음<br>
변수 뒤에 .을 붙혀서 호출할 수 있음 (.)을 붙혀쓰게끔 하는 것은 명확하게 하기 위함임<br>

다른 함수의 인자로 전달 가능

```elixir
square = fn x -> x * x end

# 16
square.(4)

print_element = fn x -> IO.puts(x) end

Enum.each(
  [1, 2, 3],
  # or fn x -> IO.puts(x) end 직접 써도 무방
  print_element
)

# 1
# 2
# 3
# :ok

## 캡쳐 연산자
# &를 사용해 함수 한정자(모듈 이름, 함수 이름, 인자 개수)를 가져와 람다로 변환한다.
Enum.each(
  [11, 22, 33],
  &IO.puts/1
)

# 인자를 지정하여 람다 함수를 간략하게 만들 수 있음
# fn x, y, z -> x * y + z end
lambda = &(&1 * &2 + &3)

# 10
lambda.(2, 3, 4)

## closure
# 변수가 외부 범위에 속하더라도 참조를 보유함. 선언 시점에서 캡쳐함. 
# 그래서 아래 코드에서 5가 가비지 콜렉션이 되지 않음.
outside_var = 5
lambda = fn -> IO.puts(outside_var) end
outside_var = 6
# 5
lambda.()
```

## 그 외 상위 레벨 유형1: Range, Keyword, MapSet, Stream, IO

[Range](https://hexdocs.pm/elixir/Range.html)<br>
[Keyword](https://hexdocs.pm/elixir/Keyword.html)<br>
[MapSet](https://hexdocs.pm/elixir/MapSet.html)<br>
[Stream](https://hexdocs.pm/elixir/Stream.html)

```elixir
## Range
# 범위를 표현하는 map이나 마찬가지므로, 메모리를 거의 차지하지 않음
# 1..2
range = 1..6
# true
2 in range

# [1, 4, 9, 16, 25, 36]
Enum.map(range, &(&1 * &1))

## Keyword lists
# 키워드 목록은 각 요소가 두 요소로 구성된 튜플이고 각 튜플의 첫 번째 요소가 원자인 목록의 특별한 경우이다.
# 두 번째 요소는 모든 유형이 될 수 있다.
# 키가 원자인 작은 크기의 키-값 구조에 자주 사용됩니다
# List기반이기 때문에 복잡성은 O(n)이다.
# also [{:monday, 1}, {:tuesday, 2}, {:wednesday, 3}]
days = [monday: 1, tuesday: 2, wednesday: 3]

# 1
Keyword.get(days, :monday)
# nil
Keyword.get(days, :noday)
# 2
days[:tuesday]

# 키워드 목록은 클라이언트가 임의 개수의 선택적 인수를 전달할 수 있도록 하는 데 가장 유용하다.
# 이 패턴은 너무 자주 발생하기 때문에 Elixir에서는 마지막 인수가 키워드 목록인 경우 대괄호를 생략할 수 있다.
# also IO.inspect([100, 200, 300], [width: 3, limit: 1]) 
IO.inspect([100, 200, 300], width: 3, limit: 1)
# [100, ...]

# 키워드 대신 Map을 사용하는 것이 더 나은지 궁금할 수 있다. 
# 키워드 목록에는 동일한 키에 대한 여러 값이 포함될 수 있다. 
# 또한 키워드 목록 요소의 순서를 제어할 수 있습니다. 이는 Map에서는 ​​불가능한 일이다. 

## MapSet
# javascript의 set과 같다고 보면 됨. 열거 순서를 보장하지 않음
days = MapSet.new([:monday, :tuesday, :wednesday])
MapSet.new([:monday, :tuesday, :wednesday])

MapSet.member?(days, :monday)
# true     

MapSet.member?(days, :noday)
# false     

days = MapSet.put(days, :thursday)
MapSet.new([:monday, :tuesday, :wednesday, :thursday])

Enum.each(days, &IO.puts/1)
# monday
# thursday
# tuesday
# wednesday
```

## 2: Times, Date, DateTime

[Date](https://hexdocs.pm/elixir/Date.html)<br>
[Time](https://hexdocs.pm/elixir/Date.html)<br>
[DateTime](https://hexdocs.pm/elixir/DateTime.html)<br>
[NativeDateTime](https://hexdocs.pm/elixir/NaiveDateTime.html)

```elixir
## Dates
# ~D sigil을 사용해서 만들 수 있다.
date = ~D[2023-01-31]
# 2023
date.year

## Times
time = ~T[11:59:12.00007]
# 11
time.hour

## Datetime (UTC)
datetime = ~U[2023-01-31 11:59:12.000007Z]
# 2023
datetime.year
# "Etc/UTC"
datetime.time_zone

## NativeDatetime
naive_datetime = ~N[2023-01-31 11:59:12.000007]
# 2023
naive_datetime.year
# 11
naive_datetime.hour
```

## Macro

매크로는 입력 코드의 의미를 변경할 수 있는 Elixir 코드로 구성됩니다. 매크로는 항상 컴파일 타임에 호출됩니다. 입력 Elixir 코드의 구문 분석된 표현을 수신하고 해당 코드의 대체 버전을 반환할 기회가 있습니다.

중요한 점은 매크로가 컴파일 타임 코드 변환기라는 것입니다. 어떤 것이 매크로라는 것을 알 때마다 기본 의미는 그것이 컴파일 타임에 실행되고 대체 코드를 생성한다는 것입니다.

매크로에 대해 배울라면 너무 양이 많으므로 [메타프로그래밍 가이드](https://hexdocs.pm/elixir/quote-and-unquote.html)를 보세요

## Elixir script, Mix, iex

#### Elixir

```shell
# 스크립트 실행
elixir script.exs

# BEAM 인스턴스 종료되지 않게 하려면 --no-halt
elixir --no-halt script.exs
```

<!-- livebook:{"break_markdown":true} -->

#### Mix

Mix 프로젝트를 시작하는 방법에 관계없이 ebin 폴더(.beam 파일이 있는 위치)가 로드 경로에 있으므로 VM이 모듈을 찾을 수 있습니다.

```shell
# 새 프로젝트 시작
mix new my_project

# 컴파일
mix compile

# 테스트
mix test

mix run -e "IO.puts(MyProject.hello())"
```

## Pattern matching

= 는 대입이 아닌 패턴 매칭이다.<br>
해당 케이스의 매칭이 아닐경우 에러가 발생한다.<br>
상수를 작성함으로써 특정 케이스에 매칭되도록 할 수 있다.

<!-- livebook:{"break_markdown":true} -->

### Tuple

```elixir
{name, age} = {"Bob", 25}
{:person, name, age} = {:person, "Bob2", 26}

# 오른 tuple의 2번째가 "Bob2"인 경우 에러가 발생
{:person, "Bob", age} = {:person, "Bob", 27}

# Bob2
IO.puts(name)
# 27
IO.puts(age)

# 대입이 아니기 때문에 아래와 같이 해도 에러가 나지 않음
# 1
1 = 1

## 매칭을 시키기 위해 주로 첫번째에 atom을 넣음
# Either같은 경우 :error, :ok 라는 atom을 자주 사용함.
{:error, reason} = File.read("my_app.config")
{result, reason2} = File.read("my_app.config")

# :error
IO.puts(result)

## _가 붙으면 익명 변수로서, 사용하면 컴파일러가 경고를 띄운다.
{_date, {hour, _, _}} = :calendar.local_time()
# 20
IO.puts(hour)

# 아래와 같이 같은 변수명으로 하면 값이 하나라도 다르면 에러가 발생
{a, a, a} = {127, 127, 127}

# 에러 발생!
# {a, a, a} = {127, 0, 127}

## 변수와 일치시키기 (^) 
expected_name = "Bob"
{^expected_name, _} = {"Bob", 25}
# 에러 발생
# {^expected_name, _} = {"Bob2", 25}
```

### List, Map, binary

```elixir
first = 1
[^first, _, third] = [1, 2, 3]

%{age: age} = %{name: "Bob", age: 25}

binary = <<1, 2, 3>>

## 임의의 크기를 기대함
<<b1, rest::binary>> = binary

# rest # <<2, 3>>

## ::를 통해 4비트씩 나눔
<<a::4, b::4>> = <<155>>
# a # 9
# b # 11

## 문자열은 바이너리이므로 문자열에서 비트나 바이트를 추출 가능
<<b1, b2, b3>> = "ABC"
# b1 # 65

## 문자열의 시작 부분을 일치
command = "ping www.example.com"
"ping " <> url = command
# www.example.com
IO.puts(url)
```

### 복합 일치

```elixir
[_, {name, _}, _] = [{"Bob", 25}, {"Alice", 30}, {"John", 35}]

a = b = 1 + 3

date_time = {_, {hour, _, _}} = :calendar.local_time()

# date_time # {{2023, 11, 11}, {21, 32, 34}}
# hour #21
```

### 함수와의 매칭

```elixir
defmodule Geometry2 do
  # 위에서부터 매칭하므로 순서가 중요
  def area({:rectangle, a, b}) do
    a * b
  end

  def area({:square, a}) do
    a * a
  end

  def area({:circle, r}) do
    r * r * 3.14
  end

  # 모든 케이스가 매칭되므로 맨 아래에 와야한다!
  def area(unknown) do
    {:error, {:unknown_shape, unknown}}
  end
end

Geometry2.area({:rectangle, 4, 5})
# 20

Geometry2.area({:square, 5})
# 25

Geometry2.area({:circle, 4})
# 50.24

## 여러 절로 되어 있어도 단일 함수 취급을 받는다
fun = &Geometry2.area/1

# 50.24
fun.({:circle, 4})

# {:error, {:unknown_shape, {:triangle, 1, 2, 3}}}
Geometry2.area({:triangle, 1, 2, 3})

## 다중 절 람다
test_num = fn
  x when is_number(x) and x < 0 -> :negative
  x when x == 0 -> :zero
  x when is_number(x) and x > 0 -> :positive
end

# :positive
test_num.(2)

## 재귀 활용
defmodule Fact do
  def fact(0), do: 1
  def fact(n), do: n * fact(n - 1)
end

# 120
Fact.fact(5)

defmodule ListHelper do
  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)
end

# 0
ListHelper.sum([])
# 6
ListHelper.sum([1, 2, 3])
```

### 가드

제한된 형태로 사용가능하다. https://hexdocs.pm/elixir/patterns-and-guards.html#guards 여기서 확인 가능

```elixir
defmodule TestNum do
  def test(x) when x < 0 do
    :negative
  end

  def test(x) when x == 0 do
    :zero
  end

  def test(x) when x > 0 do
    :positive
  end
end

TestNum.test(-1)
# :negative

TestNum.test(0)
# :zero

TestNum.test(1)
# :positive

## 숫자가 아닌 값으로 해도 결과가 나온다.
# number < atom < reference < fun < port < pid <tuple < map < list < bitstring (binary)
# 순서에 따라 같은 유형이 아니더라도 <, >로 비교할  수 있기 때문이다.
TestNum.test(:not_a_number)
# :positive

## 그래서 아래와 같이 짜야 함
defmodule TestNum2 do
  def test(x) when is_number(x) and x < 0 do
    :negative
  end

  def test(x) when x == 0 do
    :zero
  end

  def test(x) when is_number(x) and x > 0 do
    :positive
  end
end
```

## 분기 표현

```elixir
defmodule UserExtraction do
  ## if
  def max(a, b) do
    if a >= b, do: a, else: b
  end

  ## unless는 if와 반대
  def min(a, b) do
    unless a >= b, do: a, else: b
  end

  ## cond 
  # if-else-if 패턴과도 같은 맥락으로 사용
  def call_status(call) do
    cond do
      call.ended_at != nil -> :ended
      call.started_at != nil -> :started
      true -> :pending
    end
  end

  ## case를 태운 후 패턴 매칭
  # 실제로 다중절 방식이랑 차이가 없음
  # defp fun(pattern_1), do: ...
  # defp fun(pattern_2), do: ...

  def max2(a, b) do
    case a >= b do
      true -> a
      false -> b
    end
  end

  # 입력 map의 예
  # %{
  # "login" => "alice",
  # "email" => "some_email",
  # "password" => "password",
  # "other_field" => "some_value",
  # "yet_another_field" => "...",
  # ...
  # }

  # 필드 집합이 잘 정의되어 있고 미리 알려진 경우 원자로 나타낼 수 있다. 즉 아래와 같이 할 수 있다.
  # %{login: "alice", email: "some_email", password: "password"}

  defp extract_login(%{"login" => login}), do: {:ok, login}
  defp extract_login(_), do: {:error, "login missing"}

  defp extract_email(%{"email" => email}), do: {:ok, email}
  defp extract_email(_), do: {:error, "email missing"}

  defp extract_password(%{"password" => password}), do: {:ok, password}
  defp extract_password(_), do: {:error, "password missing"}

  ## case로 작성한다면 굉장히 지저분하게 된다.
  def bad_extract_user(user) do
    case extract_login(user) do
      {:error, reason} ->
        {:error, reason}

      {:ok, login} ->
        case extract_email(user) do
          {:error, reason} ->
            {:error, reason}

          {:ok, email} ->
            case extract_password(user) do
              {:error, reason} ->
                {:error, reason}

              {:ok, password} ->
                %{login: login, email: email, password: password}
            end
        end
    end
  end

  ## with로 이으면 실패시 함수의 결과가 바로 반환된다.
  def extract_user(user) do
    with {:ok, login} <- extract_login(user),
         {:ok, email} <- extract_email(user),
         {:ok, password} <- extract_password(user) do
      {:ok, %{login: login, email: email, password: password}}
    end
  end
end

# {:error, "login missing"}
UserExtraction.extract_user(%{})
# {:error, "email missing"}
UserExtraction.extract_user(%{"login" => "some_login"})

UserExtraction.extract_user(%{
  "login" => "some_login",
  "email" => "some_email"
})

# {:error, "password missing"}

UserExtraction.extract_user(%{
  "login" => "some_login",
  "email" => "some_email",
  "password" => "some_password"
})

# {:ok, %{email: "some_email", login: "some_login", password: "some_password"}}
```

## 반복

elixir에는 while이 없다. <br>
다만 마지막으로 호출하는 함수에 대한 꼬리재귀 최적화가 되어있어 스택이 쌓이지 않아 추가적인 메모리를 소모하지 않는다.

<!-- livebook:{"reevaluate_automatically":true} -->

```elixir
defmodule IteratorStudy1 do
  def sum_positive_num([]), do: 0

  def sum_positive_num([head | tail]) do
    if head > 0 do
      head + sum_positive_num(tail)
    else
      sum_positive_num(tail)
    end
  end

  def nagative_list([]), do: []

  def nagative_list([head | tail]) do
    if head < 0 do
      [head | nagative_list(tail)]
    else
      nagative_list(tail)
    end
  end

  def sum_nums(enumerable) do
    Enum.reduce(enumerable, 0, &add_num/2)
  end

  defp add_num(num, sum) when is_number(num), do: sum + num
  defp add_num(_, sum), do: sum
end

IteratorStudy1.sum_positive_num([1, 6, 8, 3, -3])

IteratorStudy1.nagative_list([5, 8, 2, -6, -1, 7, -4])

Enum.reduce(
  [1, 2, 3],
  0,
  # + 함수의 2인자 바인드
  &+/2
)

# 6

# 10
IteratorStudy1.sum_nums([1, "not a number", 2, :x, 3, 4])
```

## Comprehensions

https://hexdocs.pm/elixir/Kernel.SpecialForms.html#for/1

```elixir
# 열거형 도우미 역할
for x <- [1, 2, 3] do
  x * x
end

# [{1, 1, 1}, {1, 2, 2}, {2, 1, 2}, {2, 2, 4}, {3, 1, 3}, {3, 2, 6}]
for x <- [1, 2, 3], y <- [1, 2], do: {x, y, x * y}

# 열거형이면 전부 가능
for x <- 1..9, y <- 1..9, do: x * y

# into: 콜렉션 지정
# 아래 같은 경우 Map을 지정해서 Map으로 수집됨
multiplication_table =
  for x <- 1..9, y <- 1..9, x <= y, into: %{} do
    {{x, y}, x * y}
  end

# 42
Map.get(multiplication_table, {6, 7})
# string으로 수집됨
# "helloworld"
for <<c <- " hello world ">>, c != ?\s, into: "", do: <<c>>

languages = [elixir: :erlang, erlang: :prolog, prolog: nil]

for {language, parent} <- languages, grandparent <- [languages[parent]] do
  {language, grandparent}
end

# [elixir: :prolog, erlang: nil, prolog: nil]

# 3 unique: 고유 값만  수집
# [2, 4, 6]
for x <- [1, 1, 2, 3], uniq: true, do: x * 2

## reduce: 누산기로 활용
# 대문자를 무시하고 소문자의 발생 횟수 계산
for <<x <- "AbCabCABc">>, x in ?a..?z, reduce: %{} do
  acc -> Map.update(acc, <<x>>, 1, &(&1 + 1))
end

# %{"a" => 1, "b" => 2, "c" => 1}
```

## Stream

Stream은 lazy한 enum이라 보면 된다. <br>
Stream에 대한 여러 처리는 평가될때 병합되어 계산된다.

```elixir
# 아래 예에서 filter, map 등의 처리들은 여러번 순회가 아닌 한번의 순회에서 처리되도록 병합됨.
# 지연 계산을 하려면 계산을 수행하는 람다를 반환해야 한다.
[9, -1, "foo", 25, 49]
|> Stream.filter(&(is_number(&1) and &1 > 0))
|> Stream.map(&{&1, :math.sqrt(&1)})
|> Stream.with_index()
|> Enum.each(fn {{input, result}, index} ->
  IO.puts("#{index + 1}. sqrt(#{input}) = #{result}")
end)

# 파일 이름을 받아 해당 파일에서 80자보다 긴 모든 줄의 목록을 반환합니다.
defmodule StudyStream do
  def large_lines!(path) do
    File.stream!(path)
    |> Stream.map(&String.trim_trailing(&1, "\n"))
    |> Enum.filter(&(String.length(&1) > 80))
  end
end

## 무한 컬렉션 생성
natural_numbers =
  Stream.iterate(
    1,
    fn previous -> previous + 1 end
  )

# [1, 2, 3, 4, 5, 6, 7]
Enum.take(natural_numbers, 7)

# iex에서 빈 입력을 받으면 중지
# Stream.repeatedly(fn -> IO.gets("> ") end)
#   |> Stream.map(&String.trim_trailing(&1, "\n"))
#   |> Enum.take_while(&(&1 != ""))

# in iex
# > Hello
# > World
# ["Hello", "World"]
```

## 데이터 추상화

```elixir
defmodule TodoList_proto1 do
  def new(), do: %{}

  def add_entry(todo_list, date, title) do
    Map.update(
      todo_list,
      date,
      [title],
      fn titles -> [title | titles] end
    )
  end

  def entries(todo_list, date) do
    Map.get(todo_list, date, [])
  end
end
```

```elixir
# 위의 코드를 Composing abstractions(추상화 구성) 을 통하면 더 깔끔하게 할 수 있다.
# 책임을 별도의 추상화로 추출하는 고전적인 관심사 분리 방법

# 구현을 Map으로 할 시 런타임시 인스턴스 구별이 불가능함. 이러한 경우를 위해 struct(구조체)가 있음
defmodule MultiDict do
  def new(), do: %{}

  def add(dict, key, value) do
    Map.update(dict, key, [value], &[value | &1])
  end

  def get(dict, key) do
    Map.get(dict, key, [])
  end
end

defmodule TodoList_proto2 do
  def new(), do: MultiDict.new()

  def add_entry(todo_list, entry) do
    MultiDict.add(todo_list, entry.date, entry)
  end

  def entries(todo_list, date) do
    MultiDict.get(todo_list, date)
  end
end

todo_list =
  TodoList_proto2.new()
  |> TodoList_proto2.add_entry(%{date: ~D[2023-12-19], title: "Dentist"})
```

## Struct (구조체)

구조체는 단순한 맵이므로 성능 및 메모리에서 동일한 특성을 갖는다. <br>
하지만 구조체 인스턴스는 맵으로 수행할 수 있는 일부 작업이 작동하지 않는다. (예: enum)

Map.to_list(one_half) # [__struct__: Fraction, a: 1, b: 2] <br>
처럼 __struct__ 비트가 있는데, 구조체에 자동으로 포함되어 적절한 런타임 디스패치와 패턴 일치에 사용됩니다.

https://hexdocs.pm/elixir/Kernel.html#defstruct/1

```elixir
# 만약에 프로그램에서 분수만을 처리한다고 했을때 문제가 생길 여지가 많음. 
# 이런 경우 작은 추상화를 하는게 좋음 

defmodule Fraction do
  defstruct a: nil, b: nil

  def new(a, b) do
    %Fraction{a: a, b: b}
  end

  def value(%Fraction{a: a, b: b}) do
    a / b
  end

  def add(%Fraction{a: a1, b: b1}, %Fraction{a: a2, b: b2}) do
    new(a1 * b2 + a2 * b1, b1 * b2)
  end
end
```

```elixir
one_half = %Fraction{a: 1, b: 2}

# success
%Fraction{} = one_half
# %Fraction{} = %{a: 1, b: 2} # fail

# Map과 같이 업데이트 가능
# %Fraction{a: 1, b: 4}
one_quarter = %Fraction{one_half | b: 4}

Fraction.new(1, 2)
|> Fraction.add(Fraction.new(1, 4))
# 0.75
|> Fraction.value()
```

## Inspect

기본적으로 Elixir는 모든 데이터를 공개한다. <br>
Kernel.inspect/1 함수를 재정의하여 출력시 다르게 보이게 할 수는 있다. <br>
디버깅을 하는데 유용하지만 너무 믿지는 말라. <br>

디버깅에는 다음과 같은 매크로도 있다.
https://hexdocs.pm/elixir/Kernel.html#dbg/2

```elixir
# MapSet.new([:monday])
MapSet.new([:monday])
# %{__struct__: MapSet, map: %{monday: []}}
IO.puts(inspect(MapSet.new([:monday]), structs: false))

# 다음과 같이 디버깅을 할 수 있다.
Fraction.new(1, 4)
|> IO.inspect()
|> Fraction.add(Fraction.new(1, 4))
|> IO.inspect()
|> Fraction.add(Fraction.new(1, 2))
|> IO.inspect()
|> Fraction.value()
```

## 증분 ID

```elixir
# id를 키로 하는 예제, 그러면 별도의 ModuleDics 같은 추상화가 필요 없어짐
defmodule TodoList_proto3 do
  defstruct next_id: 1, entries: %{}

  @type input_todo_item :: %{date: Date.t(), title: String.t()}
  @type todo_item :: %{id: integer(), date: Date.t(), title: String.t()}
  @type todo_list :: %{integer() => todo_item()}
  @type t :: %TodoList_proto3{next_id: pos_integer(), entries: %{integer() => todo_item()}}

  def new() do
    %TodoList_proto3{}
  end

  # 함수가 중간에 실패한다면 모든 변경사항이 적용되지 않음.
  # 모두 적용 되거나, 모두 안되거나 둘 중 하나임
  @spec add_entry(t(), input_todo_item()) :: t()
  def add_entry(todo_list, entry) do
    # 새 항목의 ID를 설정합니다.
    entry = Map.put(entry, :id, todo_list.next_id)

    # 항목 목록에 새 항목을 추가
    new_entries =
      Map.put(
        todo_list.entries,
        todo_list.next_id,
        entry
      )

    # struct 구조체를 업데이트
    %TodoList_proto3{todo_list | entries: new_entries, next_id: todo_list.next_id + 1}
  end

  @spec entries(t(), Date.t()) :: t()
  def entries(todo_list, date) do
    todo_list.entries
    |> Map.values()
    |> Enum.filter(fn entry -> entry.date == date end)
  end

  # 연습과제1 - 항목 업데이트
  @spec update_entry(t(), integer(), (id :: integer() -> todo_list())) :: t()
  def update_entry(todo_list, entry_id, updater_fun) do
    # Map.fetch/2는 항목을 찾아서 존재하면 {:ok, value}, 없으면 :error를 반환
    case Map.fetch(todo_list.entries, entry_id) do
      :error ->
        todo_list

      {:ok, old_entry} ->
        new_entry = updater_fun.(old_entry)
        new_entries = Map.put(todo_list.entries, new_entry.id, new_entry)
        %TodoList_proto3{todo_list | entries: new_entries}
    end
  end

  # 연습과제2 - 항목 삭제 
  @spec delete_entry(t(), integer()) :: t()
  def delete_entry(todo_list, entry_id) do
    case Map.fetch(todo_list.entries, entry_id) do
      :error ->
        todo_list

      {:ok, old_entry} ->
        new_entries = Map.delete(todo_list.entries, old_entry.id)
        %TodoList_proto3{todo_list | entries: new_entries}
    end
  end
end

todo_list =
  TodoList_proto3.new()
  |> TodoList_proto3.add_entry(%{date: ~D[2023-12-19], title: "Dentist"})
  |> TodoList_proto3.add_entry(%{date: ~D[2023-12-20], title: "Shopping"})
  |> TodoList_proto3.add_entry(%{date: ~D[2023-12-19], title: "Movies"})

TodoList_proto3.entries(todo_list, ~D[2023-12-19])
|> IO.inspect(pretty: true, label: ~c"hihi2")

todo_list =
  TodoList_proto3.update_entry(
    todo_list,
    1,
    &Map.put(&1, :date, ~D[2023-12-20])
  )

inspect(todo_list)

## 업데이트 도우미 매크로 
# 재귀적으로 변경 후 상위 단에 상위 요소를 불변적으로 업데이트한다.
# @see https://hexdocs.pm/elixir/Access.html
# Kernel Module의 put_in, get_in, update_in, get_and_update_in
todo_map = %{
  1423 => %{date: ~D[2023-12-19], title: "Dentist"},
  8232 => %{date: ~D[2023-12-20], title: "Shopping"},
  9423 => %{date: ~D[2023-12-19], title: "Movies"}
}

todo_map = put_in(todo_map[8232].title, "Theater")
# put_in(todo_map, [8232, :title], "Theater")

TodoList_proto3.delete_entry(todo_list, 2)
```

## csv file -> todolist 연습문제

### 요구사항

파일을 읽어서 TodoList의 모양을 반환해라

```elixir
defmodule TodoList_proto3.CsvImporter do
  @spec from_file(charlist()) :: TodoList_proto3.t()
  def from_file(path) do
    File.stream!(path)
    |> Stream.map(&String.trim/1)
    |> Stream.map(fn v ->
      [date, name] = String.split(v, ",", trim: true)
      %{date: Date.from_iso8601!(date), name: name}
    end)
    |> Enum.reduce(TodoList_proto3.new(), &TodoList_proto3.add_entry(&2, &1))
  end
end

TodoList_proto3.CsvImporter.from_file(
  "/Users/hj/study/elixir-action/livebook/2024_03_24/10_26_57ke/files/data.csv"
)
```
