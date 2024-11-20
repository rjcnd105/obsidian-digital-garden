---
{"dg-publish":true,"permalink":"/Dev/haskell/haskell in action/","tags":["#haskell","#ghcup","#study"]}
---

# Install

ghcup이라는 강력한 툴이 나왔다

[https://www.haskell.org/ghcup/](https://www.haskell.org/ghcup/)

ghcup tui를 사용하면 끝임.

## 프로젝트 구성

```bash
stack config set resolver nightly
stack new my-project —resolver=nightly
cd my-project
stack setup
```

```haskell
-- 파일 하나 실행
stack script ghci/bubbleSort.hs --resolver=nightly
```

### 기본 용어 사전

- ghcup
하스켈 표준화를 위해 새롭게 만든 패키지 관리 툴. 덕분에 아주 설치가 쉬워짐
    - tui: 하스켈 관련 패키지들을 ui로 쉽게 확인하고 설치할 수 있다.
- cabal
빌드 툴. 패키지 의존성 문제가 있음
- stack
cabal을 대체하기 위해 나온 신규 툴. 그러나 아직 cabal로만 할 수 있는 것들이 있다.
    
    stack을 이용하여 hs file 실행
    
    stack runghc vocab1 ../data/texts/hamlet.txt
    
- GHCi
대화형 인터페이스
- GHC
하스켈 컴파일러

## Introduce

Haskell에서는 무조건 값을 반환해야 합니다.

# List

```haskell

-- [1,2,3]은 :1:2:3:[]에 대한 구문 설탕이다.
[1,2,3]
1:2:3:[]

-- ++ 가 :보다 비용이 훨신 비싸다.
ghci> [1,2,3,4] ++ [9,10,11,12]

ghci> :t (:)
(:) :: a-> [a] -> [a]

-- 첫번째 엘리먼트 구하기
Prelude> head [1,4,9]
1
Prelude> (\(x:xs) -> x) [1,4,9]
1

-- 마지막 엘리먼트 구하기
Prelude> last [1,4,9]
9
Prelude> foldl1 (\x y -> y) [1,4,9]
9

-- 마지막 제외한 엘리먼트 구하기
Prelude> init [1,4,9]
[1,4]

-- 첫번째 제외한 엘리먼트 구하기
Prelude> (\(x:xs) -> xs) [1,4,9]
[4,9]
Prelude> tail [1,4,9]
[4,9]
```

# [List comprehension](https://wiki.haskell.org/List_comprehension)

```haskell
ghci> take 10 [ (i,j) | i <- [1..], let k = i*i, j <- [1..k] ]
[(1,1),(2,1),(2,2),(2,3),(2,4),(3,1),(3,2),(3,3),(3,4),(3,5)]

-- x*2는 정의, x <- [1..10]는 입력 집합, x*2 >= 12는 술어(pred)
ghci> [x*2 | x <- [1..10], x*2 >= 12]
[12,14,16,18,20]

ghci> [ x*y | x <- [2,5,10], y <- [8,10,11], x*y > 50]
[55,80,100,110]

-- Pattern Matching
-- Just x 패턴에 매칭되지 않으면 엘리멘트는 추가되지 않는다.
ghci> catMaybes ls = [x | Just x <- ls] -- catMaybes :: [Maybe a] -> [a]
ghci> catMaybes [Just 10, Nothing, Nothing, Just 3, Nothing]
[10, 3]

-- 함수에도 정의시에도 사용 가능
ghci> numLength xs = sum [1 | _ <- xs]
numLength :: Num a => [t] -> a
ghci> :t numLength [1,4,2]
Num a => a
```

## List Monad

List comprehension대신 사용할 수 있다.

```haskell
sumnd xs ys = do
  x <- xs
  y <- ys
  return (x + y)

-- 이런 문법으로 선언도 가능하다 (특히 ghci에서)
ghci> sumnd xs ys = do { x <- xs; y <- ys; return (x + y) }

ghci> sumnd [10, 20] [100, 200]
[110,210,120,220]
```

# Anonymous function

익명 함수. 람다식을 사용

```haskell
ghci> (\x -> x + 1) 4
5

-- 어디서든 사용 가능
maximum' = foldr1 (\x acc -> if x > acc then x else acc)
head' = foldr1 (\x _ -> x)
last' = foldl1 (\_ x -> x)
```

# Typeclass

- **Eq**

```haskell
ghci> :t (==)
(==) :: (Eq a) => a -> a -> Bool
```

Eq a ⇒ a 는 a는 Eq 클래스를 구현한 Generic을 의미한다.

⇒ 심볼 앞의 모든 것들은 클래스 제약 조건이다. 

- **Ord, Compare**

```haskell
ghci> :t (>)  
(>) :: (Ord a) => a -> a -> Bool
ghci> :t compare
compare :: Ord a => a -> a -> Ordering

ghci> compare 'a' 'b'
ghci> 'a' `compare` 'b'
```

Compare 함수는 두 Ord 클래스를 구현한 맴버를 받아서 Ordering을 내뱉는다.

함수를 중위 연산자처럼 쓰려면 ``안에 함수를 넣으면 됨.

- **Show, Read**

```haskell
ghci> show 3
"3"
ghci> read "8.2" + 3.8
12
ghci> read "4"
<interactive>:1:0:  
    Ambiguous type variable `a' in the constraint:  
      `Read a' arising from a use of `read' at <interactive>:1:0-7  
    Probable fix: add a type signature that fixes these type variable(s)
ghci> read "5" :: Int  -- 유형 지정
5  
ghci> read "5" :: Float  
5.0  
ghci> (read "5" :: Float) * 4  
20.0
```

read가 "8.2" + 3.8 같은 경우는 어떤 식으로 read 되어야 하는지 알 수 있지만 (뒤의 + 3.8 덕분에) 하나의 값만 쓰는 경우 어떤 타입으로 변환을 해야 하는지 모른다.

그렇기 때문에 :: 로 유형을 지정해줘야 한다. Typescript의 as 같은 느낌이나, haskell에서는 유형이 데이터와 결부되어 있기에 실제로 값이 해당 유형으로 컴파일된다.

- **Enum**
enum의 맴버는 List에서 ..를 통해 열거할 수 있으며, succ, pred함수로 후속, 선행 작업을 정의했다. 
Types in this class: (), Bool, Char, Ordering, Int, Integer, Float and Double.

```haskell
ghci> ['a'..'e']  
"abcde"  
ghci> [LT .. GT]  
[LT,EQ,GT]  
ghci> [3 .. 5]  
[3,4,5]  
ghci> succ 'B'  
'C'
```

- **Bounded**
Bounded의 맴버들은 상한과 하한이 있다.

```haskell
ghci> minBound :: Int  
-9223372036854775808  
ghci> maxBound :: Char  
'\1114111'
ghci> maxBound :: Bool  
True  
ghci> minBound :: Bool  
False
```

- Num
Num의 맴버들은 숫자처럼 행동한다.
To join Num, a type must already be friends with Show and Eq.
: Int, Integer, Float, Double
    - Integral
    정수만 포함(Int, Integer)
    - Floating
    실수만 포함(Float and Double)

```haskell
ghci> :t 20  
20 :: (Num t) => t
ghci> 20 :: Int  
20  
ghci> 20 :: Integer  
20  
ghci> 20 :: Float  
20.0  
ghci> 20 :: Double  
20.0
ghci> :t (*)  
(*) :: (Num a) => a -> a -> a
```

*는 하나의 타입에만 적용이 되므로 (5 :: Int) * (6 :: Integer)은 안되고 5 * (6 :: Integer) 일땐 5가 Integer로 컴파일된다.

fromIntegral함수는 아주 유용한게 Integral를 Num으로 바꿔준다. 그러므로 Floating과도 연산이 가능해짐.

```haskell
length :: [a] -> Int
-- length는 Int를 반환하는... 잘못 설계되어있음.
fromletegral (length [1,2,3]) + 3.5
```

# Expressions

## prefix, infix (`fn`)

중위연산자. 단순히 중위 연산으로 사용하는 것 뿐 아니라 이항연산의 항을 반대로 curry할 수 있다.

```haskell
-- 연산자들은 기본적으로 중위 연산을 지원한다.
ghci> 10 + 5
15

ghci (+) 10 5
15

-- [결합법칙](https://www.notion.so/01f55ada5f6548b3a071275a984e03a7?pvs=21)을 만족시키지 못하는 연산에 대해서는 이에 따라 결과가 달라짐.
Prelude> map (/5) [10,20,30,40,50]
[2.0,4.0,6.0,8.0,10.0]

Prelude> map (5/) [10,20,30,40,50]
[0.5,0.25,0.16666666666666666,0.125,0.1]

-- -- 함수의 경우에는 `fn`로 감싸서 중위로 사용 가능
-- List의 elem이 right에 적용됨(curry)
Prelude> map (div 20) [10,40,20]
[2,0,1]
-- List의 elem이 left에 적용됨
Prelude> map (`div` 20) [10,40,20]
[0,2,1]

-- 당연하지만 결합법칙을 만족시키면 어떤 차이도 없다.
Prelude> map (max 5) [9,4,7,1]
[9,5,7,5]
Prelude> map (`max` 5) [9,4,7,1]
[9,5,7,5]
```

## if else

if else 는 표현식이며 어떤 곳이든 사용할 수 있다.

```haskell
ghci> [if 5 > 3 then "Woo" else "Boo", if 'a' > 'b' then "Foo" else "Bar"]  
["Woo", "Bar"]  
ghci> 4 * (if 10 > 5 then 10 else 0) + 2  
42
```

where은 뒤에서 바인딩, Let은 앞에서 바인딩 한다.

## where

```haskell
-- **[Guard에서의](https://www.notion.so/Haskell-08b93eca0f6c440ea8c3abf0a9693c1d?pvs=21)** bmiTell를 where를 사용해서 개선할 수 있다.
bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= skinny = "You're underweight, you emo, you!"  
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"  
    | otherwise     = "You're a whale, congratulations!"  
    where bmi = weight / height ^ 2  
          skinny = 18.5  
          normal = 25.0  
          fat = 30.0

-- 패턴 일치에 대한 바인딩 사용
...  
where bmi = weight / height ^ 2  
      (skinny, normal, fat) = (18.5, 25.0, 30.0)

initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "." where {(f:_) = firstname; (l:_) = lastname }
ghci> initials "Kim" "Hoejun"
K. H.

-- where 절에 도우미 함수를 선언하여 사용하는 것이 일반적인 패턴. (내부 함수 같은 느낌)
calcBmis :: (RealFloat a) => [(a, a)] -> [a]  
calcBmis xs = [bmi w h | (w, h) <- xs]  
    where bmi weight height = weight / height ^ 2
```

## let

```haskell
cylinder :: (RealFloat a) => a -> a -> a  
cylinder r h = 
    let sideArea = 2 * pi * r * h  
        topArea = pi * r ^2  
    in  sideArea + 2 * topArea

ghci> 4 * (let a = 9 in a + 1) + 2  
42
ghci> [let square x = x * x in (square 5, square 3, square 2)]  
[(25,9,4)]

-- 여러개의 변수 사용
ghci> (let a = 100; b = 200; c = 300 in a*b*c, let foo="Hey "; bar = "there!" in foo ++ bar)  
(6000000,"Hey there!")

calcBmis :: (RealFloat a) => [(a, a)] -> [a]  
-- (w, h) <- xs 에서 bmi를 사용할 수 없다. 왜냐하면 bmi는 그 이후에 정의되기 때문.
calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^ 2, bmi >= 25.0]

-- scope 차이
ghci> let zoot x y z = x * y + z  
ghci> zoot 3 9 2  
29  
ghci> let boot x y z = x * y + z in boot 3 4 2  
14  
-- in 을 사용하면 scope가 in에 한정되기 때문.
ghci> boot -- Error Not in scope: `boot'
```

let에서 정의한 이름들은 in에서 사용 가능하다. let은 바인딩 구문 구조일 뿐이다.

## case

```haskell
head' :: [a] -> a  
head' xs = case xs of [] -> error "No head for empty lists!"  
                      (x:_) -> x

-- 위의 case를 아래 패턴 매칭에서 다음과 같이 정의할 수 있다. (구문 설탕)
head' :: [a] -> a  
head' [] = error "No head for empty lists!"  
head' (x:_) = x
-- 다만 pattern matching과는 다르게 case는 거의 모든 곳에서 사용가능하다.

describeList :: [a] -> String  
describeList xs = "The list is " ++ case xs of [] -> "empty."  
                                               [x] -> "a singleton list."   
                                               xs -> "a longer list."

-- where을 사용해서 정의도 가능. where에서의 패턴 매칭도 case의 구문 설탕이나 마찬가지.
describeList :: [a] -> String  
describeList xs = "The list is " ++ what xs  
    where what [] = "empty."  
          what [x] = "a singleton list."  
          what xs = "a longer list."

```

## Pattern matching

case문에 대한 구문 설탕이다.

```haskell
factorial :: (Integral a) => a -> a  
factorial 0 = 1  
factorial n = n * factorial (n - 1)

sayMe :: (Integral a) => a -> String  
sayMe 1 = "One!"  
sayMe 2 = "Two!"  
sayMe 3 = "Three!"  
sayMe 4 = "Four!"  
sayMe 5 = "Five!"  
sayMe x = "Not between 1 and 5"

-- 객체 분해 같은 개념의 패턴 매칭
addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)  
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

first :: (a, b, c) -> a  
first (x, _, _) = x  
  
second :: (a, b, c) -> b  
second (_, y, _) = y

-- List comprehension pattern matching
ghci> let xs = [(1,3), (4,3), (2,4), (5,3), (5,6), (3,1)]  
ghci> [a+b | (a,b) <- xs]  
[4,7,6,8,11,4]

-- 본인을 활용
sum' :: (Num a) => [a] -> a  
sum' [] = 0  
sum' (x:xs) = x + sum' xs
ghci> sum [1,5]
6

-- 배열 전체를 따로 추출
capital :: String -> String  
capital "" = "Empty string, whoops!"  
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]
ghci> capital "Dracula"  
"The first letter of Dracula is D"
```

## Guard

```haskell
bmiTell :: (RealFloat a) => a -> String  
bmiTell weight height  
    | weight / height ^ 2 <= 18.5 = "You're underweight, you emo, you!"  
    | weight / height ^ 2 <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | weight / height ^ 2 <= 30.0 = "You're fat! Lose some weight, fatty!"  
    | otherwise                   = "You're a whale, congratulations!"

max' :: (Ord a) => a -> a -> a  
max' a b | a > b = a | otherwise = b
```

# Operator

## . (Function composition)

단항 함수 2개를 받아 합성. f: a → b, g: b → c 일때 g∘f 를 함으로써 a → c를 만듦
b → c를 먼저 받음에 주의.

여러 매개변수를 사용하는 함수는 어떻습니까? 글쎄, 우리가 그것들을 함수 합성에서 사용하고 싶다면, 우리는 일반적으로 각 함수가 하나의 매개변수를 취하도록 부분적으로 적용해야 합니다.

```haskell
Prelude> :t (.)
(.) :: (b -> c) -> (a -> b) -> a -> c
Prelude> (.) (\x -> x*x) (\(x:xs) -> x) [7,2] 
49

ghci> map (\xs -> negate (sum (tail xs))) [[1..5],[3..6],[1..7]]
ghci> map (negate . sum . tail) [[1..5],[3..6],[1..7]]
[-14,-15,-27]

ghci> sum (replicate 5 (max 6.7 8.9))
ghci> (sum . replicate 5 . max 6.7) 8.9
ghci> sum . replicate 5 . max 6.7 $ 8.9 -- 위에 코드를 이처럼 작성 가능

```

### $ (Function application)

언뜻보면 기능이 없어 보이지만.. $함수는 우선순위가 가장 낮아진다.

```haskell
ghci> head . sort $ "julie"
'e'
ghci> head . sort "julie" -- Error!

ghci> sort "julie" ++ "moronuki"
"eijlumoronuki"
ghci> sort $ "julie" ++ "moronuki"
"eiijklmnooruu"

sum (map sqrt [1..130])
sum $ map sqrt [1..130] -- 이렇게 괄호를 제거하는 역활로 사용 할 수 있다.
sum (filter (> 10) (map (*2) [2..10]))
sum $ filter (> 10) $ map (*2) [2..10]

-- 다른 함수처럼 취급하게 할 수도 있음.. 아래와 같이 함수 목록에 매핑되게..
-- 어떤 원리로??
ghci> map ($ 3) [(4+), (10*), (^2), sqrt]  
[7.0,30.0,9.0,1.7320508075688772]

```

# Recursion(재귀)

haskell에는 for나 while이 없다.

```haskell
maximum' :: (Ord a) => [a] -> a  
maximum' [] = error "maximum of empty list"  
maximum' [x] = x  
maximum' (x:xs)  -- 여기서 xs는 tail. 재귀할때 자주 쓰는 패턴임.
    | x > maxTail = x  
    | otherwise = maxTail  
    where maxTail = maximum' xs
-- max 함수를 사용(이항에서 큰 값 반환)
maximum' (x:xs) = max x (maximum' xs)

ghci> maximum' [1,7,3]
-> 7

replicate' :: (Num i, Ord i) => i -> a -> [a]  
replicate' n x  
    | n <= 0    = []  
    | otherwise = x:replicate' (n-1) x
-- 위의 식에서 x:replicate' (n-1) x는 x가 이전 요소로 포함되는 것을 의미함. [(link 참고)](https://www.notion.so/Haskell-08b93eca0f6c440ea8c3abf0a9693c1d?pvs=21)
ghci> replicate' 3 5
-> [5, 5, 5]

take' :: (Num i, Ord i) => i -> [a] -> [a]  
take' n _  
    | n <= 0   = []  
take' _ []     = []  
take' n (x:xs) = x : take' (n-1) xs

reverse' :: [a] -> [a]  
reverse' [] = []  
reverse' (x:xs) = reverse' xs ++ [x]

zip' :: [a] -> [b] -> [(a,b)]  
zip' _ [] = []  
zip' [] _ = []  
zip' (x:xs) (y:ys) = (x,y):zip' xs ys

-- Collatz sequences: 짝수일땐 2로 나누고, 홀수일땐 3을 곱하고 + 1을 한다
chain :: (Integral a) => a -> [a]  
chain 1 = [1]  
chain n  
    | even n =  n:chain (n `div` 2)  
    | odd n  =  n:chain (n*3 + 1)
```

재귀할때 [항등원](https://www.notion.so/01f55ada5f6548b3a071275a984e03a7?pvs=21)을 아는 것이 중요하다. 맨 마지막엔 항등식으로 끝나기 때문. 

곱의 항등원은 1, 더하기 빼기는 0, 배열은 [] ...

퀵정렬 구현이 이렇게 쉽다고?

```haskell
quicksort :: (Ord a) => [a] -> [a]  
quicksort [] = []  
quicksort (x:xs) =   
    let smallerSorted = quicksort [a | a <- xs, a <= x]  
        biggerSorted = quicksort [a | a <- xs, a > x]  
    in  smallerSorted ++ [x] ++ biggerSorted

-- 더 이해하기 쉬운 구현
quicksort (x:xs) =     
    let smallerSorted = quicksort (filter (<=x) xs)  
        biggerSorted = quicksort (filter (>x) xs)   
    in  smallerSorted ++ [x] ++ biggerSorted

ghci> quicksort [5,1,9,4,6,7,3]
[1,3,4,5,6,7,9]
```

![Untitled](Haskell%2008b93eca0f6c440ea8c3abf0a9693c1d/Untitled.png)

# Higher order function

함수에서 함수를 받아서 사용

```haskell
-- 중위 함수를 부분적으로 사용 가능하다.
-- ()로 감싸면 됌
divideByTen :: (Floating a) => a -> a  
divideByTen = (/10)

ghci> divideByTen 300 -- 300/10 으로 계산됌
30.0

isUpperAlphanum :: Char -> Bool  
isUpperAlphanum = (`elem` ['A'..'Z'])

minus10 = (subtract 10) -- (-10) 은 그냥 숫자 -10을 의미하기 때문에 subtract로 사용한다.

applyTwice :: (a -> a) -> a -> a  
applyTwice f x = f (f x)

ghci> applyTwice (+3) 10  
16  

ghci> applyTwice (++ " HAHA") "HEY"  
"HEY HAHA HAHA"  

ghci> applyTwice ("HAHA " ++) "HEY"  
"HAHA HAHA HEY"  

ghci> applyTwice divideByTen 30
0.3

ghci> applyTwice (3:) [1]  
[3,3,1]

largestDivisible = head (filter p [100000,99999..])  
    where p x = x `mod` 3829 == 0
ghci> largestDivisible
99554

```

## [zipWith](https://hackage.haskell.org/package/base-4.15.0.0/docs/Prelude.html#v:zipWith)

함수를 받고 리스트 두개를 받아서 그 리스트 두 개를 함수를 태워서 병합시킴

```haskell
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]  
zipWith' _ [] _ = []  
zipWith' _ _ [] = []  
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

-- examples
ghci> zipWith' (+) [4,2,5,6] [2,6,2,3]  
[6,8,7,9]  

ghci> zipWith' max [6,3,2,1] [7,3,1,5]  
[7,3,2,5]  

ghci> zipWith' (++) ["foo ", "bar ", "baz "] ["fighters", "hoppers", "aldrin"]  
["foo fighters","bar hoppers","baz aldrin"]  

ghci> zipWith' (*) (replicate 5 2) [1..]  
[2,4,6,8,10]  

ghci> zipWith' (zipWith' (*)) [[1,2,3],[3,5,6],[2,3,4]] [[3,2,2],[3,4,5],[5,4,3]]  
[[3,4,6],[9,20,30],[10,12,12]]

ghci> zipWith' (\x y -> 2*x + y) [1..4] [5..8]
[7,10,13,16]
```

## [flip](https://hackage.haskell.org/package/base-4.15.0.0/docs/Prelude.html#v:flip)

a → b → c 함수를 b → a → c 처럼 사용할 수 있게 해줌 

```haskell
flip' :: (a -> b -> c) -> (b -> a -> c)  
flip' f = g  
    where g x y = f y x
-- 위의 선언을 아래처럼 할 수 있다.
flip' f y x = f x y

-- exampls
ghci> flip' zip [1,2,3,4,5] "hello"  
[('h',1),('e',2),('l',3),('l',4),('o',5)]  

ghci> zipWith (flip' div) [2,2..] [10,8,6,4,2]  
[5,4,3,2,1]
```

## [map](https://hackage.haskell.org/package/base-4.15.0.0/docs/Prelude.html#v:map)

함수를 받아 리스트에 적용

```haskell
map' :: (a -> b) -> [a] -> [b]  
map' _ [] = []  
map' f (x:xs) = f x : map' f xs

-- examples
ghci> map' (+3) [1,5,3,1,6]  
[4,8,6,4,9]  

ghci> map' (++ "!") ["BIFF", "BANG", "POW"]  
["BIFF!","BANG!","POW!"]  

ghci> map' (replicate 3) [3..6]  
[[3,3,3],[4,4,4],[5,5,5],[6,6,6]]  

ghci> map' (map' (^2)) [[1,2],[3,4,5,6],[7,8]]  
[[1,4],[9,16,25,36],[49,64]]  

ghci> map' fst [(1,2),(3,5),(6,3),(2,6),(2,5)]  
[1,3,6,2,2]
```

## [filter](https://hackage.haskell.org/package/base-4.15.0.0/docs/Prelude.html#v:filter)

조건에 맞지 않는 것들을 거른 리스트를 반환

```haskell
filter' :: (a -> Bool) -> [a] -> [a]  
filter' _ [] = []  
filter' p (x:xs)   
    | p x       = x : filter' p xs  
    | otherwise = filter' p xs

-- examples
ghci> filter' (>3) [1,2,7,5,8]
[7, 5, 8]

ghci> filter' (==3) [1,2,3,4,5]  
[3]

ghci> filter' even [1..10]  
[2,4,6,8,10]

ghci> let notNull x = not (null x) in filter' notNull [[1,2,3],[],[3,4,5],[2,2],[],[],[]]  
[[1,2,3],[3,4,5],[2,2]]  

ghci> filter' (`elem` ['a'..'z']) "u LaUgH aT mE BeCaUsE I aM diFfeRent"  
"uagameasadifeent"  

ghci> filter' (`elem` ['A'..'Z']) "i lauGh At You BecAuse u r aLL the Same"  
"GAYBALLS"

ghci> filter' (\x -> length x > 4) ["aaaa","bbbbbbbbbbbbb","cc","ddddd"]
["bbbbbbbbbbbbb", "ddddd"]
```

## [takeWhile](https://hackage.haskell.org/package/base-4.15.0.0/docs/Prelude.html#v:takeWhile)

해당 predicate에 적합할 때 까지만 리스트를 뽑음  

```haskell
ghci> takeWhile (< 3) [1,2,3,4,1,2,3,4]
[1,2]

ghci> sum (takeWhile (<10000) (filter odd (map (^2) [1..])))  
166650

-- [list comprehensions](https://www.notion.so/Haskell-08b93eca0f6c440ea8c3abf0a9693c1d?pvs=21) 사용
ghci> sum (takeWhile (<10000) [n^2 | n <- [1..], odd (n^2)])  
166650
```

# fold, scan

foldl, foldr 에서의 큰 차이점은 foldr는 무한 목록에서 작동하지만 foldl은 그렇지 않다는 것입니다! 
간단히 말해서 무한 목록을 어느 지점에서 가져 와서 오른쪽에서 접으면 결국 목록의 시작 부분에 도달하게 됩니다. 그러나 한 지점에서 무한 목록을 가져 와서 왼쪽에서 접으려고 하면 끝이 없을 것입니다!

fold는 최종 결과, scan으로 중간 결과들을 볼 수 있음.

```haskell
ghci> foldl (+) 0 [1,2,3,4,5]
15

-- 어떤 차이로써 이렇게 되는지?
Prelude> foldl1 (/) [64,4,2]
8.0 -- (64 / 4) / 2 
Prelude> foldr1 (/) [64,4,2]
32.0 -- 2 / (4 / 64)
Prelude> foldl (/) 64 [4,2]
8.0 -- (64 / 4) / 2 
Prelude> foldr (/) 64 [4,2]
128.0 -- 64 / (2 / 4)

Prelude> scanl (/) 64 [4,2]
[64.0,16.0,8.0] -- [64, 64/4, (64/4)/2)]
Prelude> scanl (flip (/)) 64 [4, 2]
[64.0,6.25e-2,32.0] -- [64, 4/64, 2/(4/64)]
Prelude> scanl1 (/) [64, 4, 2]
[64.0,16.0,8.0] -- [64, 64/4, (64/4)/2)]
Prelude> scanr (/) 64 [4, 2]
[128.0,3.125e-2,64.0] -- [4/(2/64), 2/64, 64]
Prelude> scanr (flip (/)) 64 [4, 2]
[8.0,32.0,64.0] -- [(64/2)/4, 64/2, 64]
Prelude> scanr1 (/) [64, 4, 2]
[32.0,2.0,2.0] -- [64/(4/2), 4/2, 2]
```

fold에 함수 curry로 유용한 함수들을 창작할 수 있다.

```haskell
maximum' :: (Ord a) => [a] -> a  
maximum' = foldr1 (\x acc -> if x > acc then x else acc)  
  
reverse' :: [a] -> [a]  
reverse' = foldl (\acc x -> x : acc) []  
  
product' :: (Num a) => [a] -> a  
product' = foldr1 (*)  
  
filter' :: (a -> Bool) -> [a] -> [a]  
filter' p = foldr (\x acc -> if p x then x : acc else acc) []  
  
head' :: [a] -> a  
head' = foldr1 (\x _ -> x)  
  
last' :: [a] -> a  
last' = foldl1 (\_ x -> x)
```

# Modules

## import

기본적인 구문은 import이다.

```jsx
import Data.List  
  
numUniques :: (Eq a) => [a] -> Int  
numUniques = length . nub

-- 일부를 선택적으로 가져오기
import Data.List (nub, sort)

-- 특정 맴버 제외하고 가져오기
import Data.List hiding (nub)

-- 이름 중첩되지 않도록 
import qualified Data.Map
Data.Map.filter ...

-- 근데 저러면 너무 기니깐
import qualified Data.Map as M
M.filter ...

```

## :m (ghci)

ghci 상에서 모듈 사용 

```jsx
:m + Data.List Data.Map Data.Set
```

## Data

### [Data.List](https://hackage.haskell.org/package/base-4.15.0.0/docs/Data-List.html)

Operations on lists.

```jsx
ghci> intersperse '.' "MONKEY"  
"M.O.N.K.E.Y"  
ghci> intersperse 0 [1,2,3,4,5,6]  
[1,0,2,0,3,0,4,0,5,0,6]

ghci> intercalate " " ["hey","there","guys"]  
"hey there guys"  
ghci> intercalate [0,0,0] [[1,2,3],[4,5,6],[7,8,9]]  
[1,2,3,0,0,0,4,5,6,0,0,0,7,8,9]

ghci> transpose [[1,2,3],[4,5,6],[7,8,9]]  
[[1,4,7],[2,5,8],[3,6,9]]  
ghci> transpose ["hey","there","guys"]  
["htg","ehu","yey","rs","e"]

ghci> map sum $ transpose [[0,3,5,9],[10,0,0,9],[8,5,1,-1]]  
[18,8,6,17]

ghci> concat ["foo","bar","car"]  
"foobarcar"  
ghci> concat [[3,4,5],[2,3,4],[2,1,1]]  
[3,4,5,2,3,4,2,1,1]
ghci> concatMap (replicate 4) [1..3]  
[1,1,1,1,2,2,2,2,3,3,3,3]
ghci> and $ map (>4) [5,6,7,8]  
True  
ghci> and $ map (==4) [4,4,4,3,4]  
False
ghci> or $ map (==4) [2,3,4,5,6,1]  
True  
ghci> or $ map (>4) [1,2,3]  
False
ghci> any (==4) [2,3,5,6,1,4]  
True  
ghci> all (>4) [6,9,10]  
True  
ghci> all (`elem` ['A'..'Z']) "HEYGUYSwhatsup"  
False  
ghci> any (`elem` ['A'..'Z']) "HEYGUYSwhatsup"  
True
ghci> take 10 $ iterate (*2) 1  
[1,2,4,8,16,32,64,128,256,512]  
ghci> take 3 $ iterate (++ "haha") "haha"  
["haha","hahahaha","hahahahahaha"]
```

### [Data.char](https://hackage.haskell.org/package/base-4.15.0.0/docs/Data-Char.html)

The Char type and associated operations.

[get programming with haskell](https://www.notion.so/get-programming-with-haskell-a1741cd7cbbf44cba344469438bedecb?pvs=21)

[Haskell playground](https://www.notion.so/Haskell-playground-3d4d6b15337c4405ae8c75daeebdf411?pvs=21)