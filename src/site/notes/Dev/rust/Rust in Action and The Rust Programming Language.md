---
{"dg-publish":true,"permalink":"/Dev/rust/Rust in Action and The Rust Programming Language/","tags":["#rust","#book","#study"]}
---



![rust.png](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/rust.png)

## 인트로

모든 rust binary 프로젝트는 다음과 같은 구조에서 시작된다. 

![rust1.png](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/rust1.png)

기본 디렉토리에서 Cargo.toml 파일은 프로젝트 이름, 버전 및 종속성과 같은 프로젝트의 메타데이터를 설명합니다.

소스 코드는 src 디렉토리에 있습니다. Rust 소스 코드 파일은 .rs 파일 이름 확장자를 사용합니다.

### Rust 왜 써야 하냐?

**Rust는 다음과 같은 4가지에서 자유롭다**

1. 댕글링 포인터 - 프로그램이 진행되는 동안 유효하지 않게 된 데이터에 대한 실시간 참조(목록 1.5 참조)
2. 데이터 경쟁 - 외부 요인이 변하기 때문에 프로그램이 실행될 때마다 어떻게 작동할지 결정할 수 없음(목록 1.6 참조)
3. 버퍼 오버플로 - 6개 요소만 있는 배열의 12번째 요소에 액세스를 시도합니다(목록 1.7 참조).
4. 반복자 무효화 - 도중에 변경된 후 반복되는 항목으로 인해 발생하는 문제(목록 1.8 참조)

### Rust의 단점

1. 순환 데이터 구조 모델링 하기가 어렵다.
2. 컴파일 시간이 오래 걸릴 수 있다.
3. 매우 엄격함
4. 언어에서 알아야 하는게 많다(복잡한 유형 시스템, 소유권 시스템)

### Rust는 어떨때 가장 유용한가?

1. command line 유틸리티 제작. 설치 단계 없이 실행할 수 있는 프로그램을 배포하기 쉽다.
2. 데이터 처리. Rust의 정규식 처리 엔진은 가장 빠르다. 메모리 사용이 낮고 안정적이다.
3. 동적 언어로 작성된 프로그램들을 확장하는데 적합. 일부분에 모듈식으로 작성해서 안정성을 보장받을 수 있다.
4. 리소스가 제한된 환경에서 유용
5. server-side application.
6. desktop application. 적합하지만 생태계 부족
7. Mobile. swift, android처럼 인터페이스와 대화 가능하다. 추가적인 런타임 비용 없이.
8. Web. wasm 
9. System Programming. 여러 OS에서 러스트를 쓰려고 한다.

  

## 변수

### 변수 선언 방식

```rust
let a = "ddd"              // 변경 불가능함
let mut = String::new();   // mut(mutable) 키워드를 붙히면 변경 가능
```

## 문법

```rust
fn main() {
  let a = 10;
  let b: i32 = 20;
  let c = 30i32;
  let d = 30_i32;
  let e = add(add(a, b), add(c, d));
  println!("( a + b ) + ( c + d ) = {}", e);
}

fn add(i: i32, j: i32) -> i32 {
  i + j
}
```

항상 함수의 맨 마지막 표현식이 반환된다.

모든 변수는 기본적으로 불변적.

### 타입

```rust
// String의 인스턴스가 묶임. String은 확장가능한 UTF-8 인코딩의 문자열
// new 함수는 새로운 빈 String을 생성한다.
let mut guess = String::new();

```

## 문자열

String과 str은 비슷해보이지만 별개의 유형이다.

### String

*String*은 합치거나 추가, 공백 제거와 같은 다양한 기능들이 있다.
String은 awned(소유) type이다. 

소유자는 데이터를 변경할 수 있으며 범위를 벗어날 때 소유한 값을 삭제할 책임이 있다.

### str (string slice)

*str*은 기능이 적지만 고성능 유형이다. 
한번 생성된 str은 확장할 수 없다. 

마치 원시 메모리(c언어에서의 배열과 같은) 유사하지만 Rust는 UTF-8 문자를 보장한다.
str은 일반적으로 &str처럼 표시된다.
string slice라고 부른다.

str유형에 변수를 할당하면 실패한다. str 값은 임의의 길이일 수 있으므로 참조에 의해 지역 변수로만 저장할 수 있다.

&str은 borrowed(빌린) type이다. 

실용적인 측면에서 이것은 &str이 읽기 전용 데이터로 간주될 수 있는 반면 String은 읽기-쓰기로 간주될 수 있음을 의미한다.

### String vs str

String은 동적 메모리 할당을 사용하여 표시하는 텍스트를 저장한다. 
&str 값을 생성하면 메모리 할당을 피할 수 있다. 

String은 Vec\<u8\>에 대한 것이고 str은 [u8]에 대한 것이다.

### String literals

"hello world" 같은 String literals는 &`static str 이다.

### char

4바이트로 된 단일 문자.
1~4바이트로 이루어져있는 UTF-8에 비해 컴파일러가 추론하기 쉽다.

### Number

- **i
Signed integers, 부호 있는 정수**
i8, i16, i32, i64
- **u
Unsigned integers, 부호 없는 정수**
u8, u16, u32, u64
- **f
Floating-point types, 부동 소수점**
f32, f64

isize, usize: 32bit 컴퓨터의 경우 32, 64bit 컴퓨터의 경우 64,

```rust
// 숫자 유형
pub fn numeric_literals_and_basic_operations_on_numbers_in_rust() {
    // 3가지 numeric 타입 정의 방법
    let twenty = 20;
    let twenty_one: i32 = 21;
    let twenty_two = 22i32;

    let addition = twenty + twenty_one + twenty_two;
    println!(
        "{} + {} + {} = {}",
        twenty, twenty_one, twenty_two, addition
    );

    let one_million: i64 = 1_000_000; // _ 구분자로 사용 가능
    println!("{}", one_million.pow(2));

    let forty_twos = [42.3424, 42f32, 42.3423_f32];

    println!("{:02}", forty_twos[0]); 
}
/* Result
20 + 21 + 22 = 63
00000000000
42.3424
*/

// 진수
pub fn using_base_2_base_8_and_base_16_numeric_literals() {
    let three = 0b11; // b: 2진수
    let thirty = 0o36; // o: 8진수
    let three_hundred = 0x12C; // x: 16진수

    println!("base 10: {} {} {}", three, thirty, three_hundred);
    println!("base 2:  {:b} {:b} {:b}", three, thirty, three_hundred);
    println!("base 8:  {:o} {:o} {:o}", three, thirty, three_hundred);
    println!("base 16: {:x} {:x} {:x}", three, thirty, three_hundred);
}
/* Result
base 10: 3 30 300
base 2:  11 11110 100101100
base 8:  3 36 454
base 16: 3 1e 12c
*/

// 부동소수점 위험
/*
! 비교연산을 피하라

아래 f32는 성공하고 f64는 실패하는 이유는
수학적 연산이 실제 수학적 결과의 허용 가능한 범위 내에 있지 않기 때문이다.
방어적으로 프로그래밍하려면 is_nan() 및 is_finite() 메서드를 사용합니다. 수학적 오류를 자동으로 진행하지 않고 충돌을 유도하면 문제의 원인을 디버깅할 수 있습니다.
다음은 is_finite() 메서드를 사용하여 이 상태를 발생시키는 방법을 보여 줍니다.
*/
pub fn floating_point_hazards() {
    let abc: (f32, f32, f32) = (0.1, 0.2, 0.3);
    let xyz: (f64, f64, f64) = (0.1, 0.2, 0.3);

    println!("abc (f32)");
    println!("   0.1 + 0.2: {:x}", (abc.0 + abc.1).to_bits());
    println!("         0.3: {:x}", (abc.2).to_bits());
    println!();

    println!("xyz (f64)");
    println!("   0.1 + 0.2: {:x}", (xyz.0 + xyz.1).to_bits());
    println!("         0.3: {:x}", (xyz.2).to_bits());
    println!();

    assert_eq!(abc.0 + abc.1, abc.2); // success
    assert_eq!(xyz.0 + xyz.1, xyz.2); // failed
                                      /*
                                          left: `0.30000000000000004`,
                                          right: `0.3`'
                                      */

    let x: f32 = 1.0 / 0.0;
    assert!(x.is_finite()); // failed
}
/* Result
abc (f32)
   0.1 + 0.2: 3e99999a
         0.3: 3e99999a

xyz (f64)
   0.1 + 0.2: 3fd3333333333334
         0.3: 3fd3333333333333
*/

```

### Iteration 순회

```rust
let container = [1, 2, 3, 4];
let mut mutable_container = [11, 22, 33, 44];
for item in container {}

// for문에서 collection을 반복하는데는 3가지 방법이 있다.

// - Ownership only.
// 이 경우 container은 해당 로컬 범위를 벗어나면 라이프 사이클이 끝난다.
for item in container {
    // Equivalent to) for item in IntoIterator::into_iter(collection)
    println!("container {}", item);
}

// - read-only
// 이 경우 container의 라이프 사이클이 끝나지 않음
for item in &container {
    // Equivalent to) for item in collection.iter()
    println!("&container {}", item);
}

// - read-write
// 단 mutable collection 인 경우만 가능
for item in &mut mutable_container {
    // Equivalent to) for item in collection.iter_mut()
    println!("&mut mutable_container {}", item);
}

// - 익명인 경우에 _를 사용한다.
// 일정 횟수 만큼의 반복임을 강조함
for _ in 0..10 {
    // ...
}

// - 인덱스를 사용할 수도 있으나 권장되지 않는다.
// 1. 퍼포먼스가 안좋음
// 2. 안전하지 않음
let collection = [1, 2, 3, 4, 5];
for i in 0..collection.len() {
    let item = collection[i];
    // ...
}

// continue: 현재 반복을 스킵하고 다음 반복 진행
for n in 0..5 {
    if n % 2 == 0 {
        continue;
    }
    println!("odd {}", n);
}
// Result
// odd 1
// odd 3

// break: 반복 중단
for n in 0..5 {
    if n % 2 == 1 {
        break;
    }
    println!("even {}", n);
}
// Result
// even 0

// break: 루프 라벨에서 벗어나기
// 라벨은 (`)를 식별자를 붙혀 선언함
'outer: for x in 0.. {
    for y in 0.. {
        for z in 0.. {
            if x + y + z > 1000 {
                break 'outer;
            }
        }
    }
}

// while보다 왠만함 loop를 써라. 진보된 while
// 루프는 다음 예제와 같이 장기 실행 서버를 구현할 때 자주 나타난다.
loop {
    let requester, request = accept_request();
    let result = process_request(request);
    send_response(requester, result);
}
```

## 표현

rust는 표현기반의 언어이다.
if, fn, match, break 등에 해당 표현식의 기본적으로 마지막 라인을 반환한다.

```rust
let n = 123456;

// if
// if 안의 마지막 표현이 return 됨
let description = if is_even(n) { "even" } else { "odd" };

// match
let description_match = match is_even(n) {
    true => "even",
    false => "odd",
};

let n = loop {
    // break도 값을 반환함
    break 123;
};

let needle = 42;
let haystack = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862];

for item in &haystack {
    // _ => 는 default: 경우를 뜻함
    let result = match item {
        42 | 132 => "hit!",
        _ => "miss",
    };

    if result == "hit!" {
        println!("{}: {}", item, result);
    }
}
```

### Match

```rust
fn main() {
  let needle = 42;
  let haystack = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862];

  for item in &haystack {
    let result = match item {
      42 | 132 => "hit!",
      _ => "miss",
    };

    if result == "hit!" {
      println!("{}: {}", item, result);
    }
  }
}
```

## Generic

```rust

// Generic

/*
fn add<T>(i: T, j: T) -> T {
  i + j // ERROR!!
}
*/

// 제네릭 trait 제한
// 위에 fn Add<T> 처럼 T를 끼리 더하려고 하면 어떻게 더해야 할지 모르니 에러가 난다.
// 그래서 아래처럼 Add Trait을 구현한 타입에 한하여 받게끔 해야한다.
fn add<T: std::ops::Add<Output = T>>(i: T, j: T) -> T  {
  i + j
}

pub fn a_generic_function_with_a_type_variable_and_trait_bounds() {
    let floats = add(1.2, 3.4);
    let ints = add(10, 20);
    let durations = add(Duration::new(5, 0), Duration::new(10, 0));

    println!("floats {}", floats);
    println!("ints {}", ints);
    println!("durations {:?}", durations);
}
/* Result
floats 4.6
ints 30
durations 15s
*/
```

## Lifetime parameters

```rust
/*
i에 `a의 라이프 사이클을 바인딩 한다.
j에 `b의 라이프 사이클을 바인딩 한다.
*/
fn add_with_lifetimes<'a,'b>(i: &'ai32, j: &'bi32) -> i32 {
    *i + *j
}

fn lifetime() {
    let a = 10;
    let b = 20;
    let res = add_with_lifetimes(&a, &b);

    println!("{}", res);
}
```

## List

- **Array**
배열 내의 데이터는 수정할 수 있지만, 크기는 조정 불가능. [T, n]
- **Slice**
Array like object인데 크기가 동적임. 그렇기 때문에 동적 타이핑이 됨. [T]
Slice는 slice에 대한 trait을 더 구현하기 쉬움
읽기 권한을 빠르게 얻어올 수 있으므로 Array나 다른 slice에 대한 view 역할을 기능을 하기도 함.
크기가 동적이므로 일반적으로 &[T]로 참조 접근해서 사용함.
- **Vector**
확장 가능한 목록. 크기가 자유롭게 변경될 수 있기에 성능적 런타임 패널티가 발생.

```rust
pub fn defining_arrays_and_iterating_over_their_elements() {
    let one = [1, 2, 3];
    // u8가 3개인 array을 의미
    let two: [u8; 3] = [1, 2, 3];
    let blank1 = [0; 3]; // ;은 0으로 3개를 채운다는 뜻. 햇갈리네
    let blank2: [u8; 3] = [0; 3];

    let arrays = [one, two, blank1, blank2];

    for item in &arrays {
        print!("item: {:?}: ", item);
        for n in item.iter() {
            print!("\t{} + 10 = {},", n, n + 10);
        }

        let mut sum = 0;
        for i in 0..item.len() {
            sum += item[i];
        }
        println!("\t({:?} = {})", item, sum);
    }
}

```

### List: Arrays & Slices & Vector 차이점

자주 사용하게 될 List는 Vector와 Arrays이다.

Array는 너비가 고정되어 있으며 가볍고 빠르다.

Vector는 동적이지만 추가 bookkeeping 때문에 약간의 런타임 비용이 발생한다.

### RC (Reference Counted)

```rust
// RC: Reference Counted
// borrow를 카운트하여, 여러개를 빌려줄 수 있고 빌려준 갯수를 알 수 있다.
// 기본적으로 변경 불가능이다. 왜냐하면 여러개를 빌려주는데 전부 변경되는게 좋지 않기 때문에,
// 하지만 변경하고 싶은 경우는 RefCell을 쓰면 된다. 단 그래도 mut borrow는 오직 1개만 존재 가능하다.

// Rc<T>는 mutation을 허용하지 않기 때문에, RefCell로 감싸줘야만 가변적이게 된다.
// Rc<T>는 스레드로부터 안전하지 않다.
// 다중 스레드에서는 Arc<T>로, 가변은 Arc<Mutex<T>>로 바꾸는 것이 훨신 좋다.
// Arc: Atomic reference counter.
let base: Rc<RefCell<GroundStation>> = Rc::new(RefCell::new(
    GroundStation {
        radio_freq: 87.65
    }
));

println!("base: {:?}", base);
// base: RefCell { value: GroundStation { radio_freq: 87.65 } }

// 빌려주는 스코프를 지정
{
    // 오직 borrow_mut는 1개만 존재할 수 있다.
    let mut base_2 = base.borrow_mut();
    base_2.radio_freq -= 12.34;
    println!("base_2: {:?}", base_2);
    // base_2: GroundStation { radio_freq: 75.31 }
}

println!("base: {:?}", base);
// base: RefCell { value: GroundStation { radio_freq: 75.31 } }

let mut base_3 = base.borrow_mut();
base_3.radio_freq += 43.21;

println!("base: {:?}", base);
// base: RefCell { value: <borrowed> }
println!("base_3: {:?}", base_3);
// base_3: GroundStation { radio_freq: 118.52000000000001 }
```

## crate

crate는 패키지라 볼 수 있음.

[https://crates.io/](https://crates.io/) 에서 전체 crate들을 볼 수 있다.

Cargo.toml에 아래와 같이 crate를 dependencies에 추가하고 cargo build를 하면 된다.

```rust

[dependencies]
rand = "0.8.5"
```

## cli

### rustup

rust 설치를 관리

### rustc

러스트 소스코드 컴파일을 관리

- rustrc \<file\>: main이 있는 rust파일을 컴파일. 간단한 파일에 사용됨.

### cargo

패키지 관리

- **cargo new \<name\>:** 새 cargo 패키지 생성.
    - cargo new \<name\> —lib: 실행 가능하지 않은 라이브러리 패키지 생성
- **cargo run:** cargo build 하고 내부의 main() 실행
    - cargo run --release 하면 debug 라인들이 없음.
    - cargo run -q --release 하면 출력을 더 줄일 수 있음.
- **cargo build:** 종속성을 다운로드하고 컴파일
- cargo test: test 실행
- **cargo init:** 기존 패키지에 새 cargo package 생성
- **cargo doc:** 현재 프로젝트의 모든 종속성에 대한 HTML 문서를 빌드합니다.
- cargo add \<name\>: 패키지 종속성 파일인 cargo.toml를 생성해줌.

## 참고

- 예제 파일들
    
    [https://github.com/rust-in-action/code](https://github.com/rust-in-action/code)
    

## 문자열
String과 str은 비슷해보이지만 별개의 유형이다.
### String
*String*은 합치거나 추가, 공백 제거와 같은 다양한 기능들이 있다.
String은 awned(소유) type이다. 소유자는 데이터를 변경할 수 있으며 범위를 벗어날 때 소유한 값을 삭제할 책임이 있습니다.
String::from(&str)로 &str -> String 변환 가능

###str
*str*은 기능이 적지만 고성능 유형이다. 한번 생성된 str은 확장할 수 없다. 마치 원시 메모리(c언어에서의 배열과 같은) 유사하지만 Rust는 UTF-8 문자를 보장한다.
str은 일반적으로 &str처럼 표시된다.
string slice라고 부른다.
<br/>
str유형에 변수를 할당하면 실패한다. str 값은 임의의 길이일 수 있으므로 참조에 의해 지역 변수로만 저장할 수 있습니다.
<br/>
&str은 borrowed(빌린) type이다. 실용적인 측면에서 이것은 &str이 읽기 전용 데이터로 간주될 수 있는 반면 String은 읽기-쓰기로 간주될 수 있음을 의미합니다.

### String literals
"hello world" 같은 String literals는 &`static str
처럼

### char
4바이트로 된 단일 문자.
1~4바이트로 이루어져있는 UTF-8에 비해 컴파일러가 추론하기 쉽다.

String은 동적 메모리 할당을 사용하여 표시하는 텍스트를 저장합니다. &str 값을 생성하면 메모리 할당을 피할 수 있다.

Vec\<u8\> - 일반적으로 [u8] 데이터를 사용할 때 생성되는 원시 바이트 벡터입니다. String은 Vec\<u8\>에 대한 것이고 str은 [u8]에 대한 것입니다.