---
{"dg-publish":true,"permalink":"/Dev/haskell/get programming with haskell/","tags":["#haskell","#study"]}
---

source
[Get Programming with Haskell](https://www.manning.com/books/get-programming-with-haskell?ar=true&lpse=A)

기존 학습 내역
[[Dev/haskell/haskell in action\|haskell in action]] 
***

### chapter 2

함수의 3 법칙

- 모든 함수는 인수를 받아야 합니다.
- 모든 함수는 값을 반환해야 합니다.
- 함수가 동일한 인수로 호출될 때마다 동일한 값을 반환해야 합니다.

[https://livebook.manning.com/book/get-programming-with-haskell/chapter-2/1](https://livebook.manning.com/book/get-programming-with-haskell/chapter-2/1)

```haskell
-- Q2.2
inc x = x + 1
double x = x + x
square x = x^2

-- Q2.3
q231 n = if even n then n - 2 else 3*n+1
q232 n = if n `mod` 2 == 0 then n - 2 else 3*n+1
q233 n = if modX == 0 then n - 2 else 3*n+1 where modX = mod n 2
```

### chapter 3

lambda, let

```haskell
-- Lambda functions
(\x -> x) 4
-> 4

-- 이렇게 값을 야매로 덮어 쓸 수 있다.
(\x -> (\x -> (\x -> x) 4) 3) 2
-> 4

-- let을 사용해서 함수 내에서 값 재정의 하기
overwrite x = let x = 2 in let x = 3 in let x = 4 in x
```

### chapter 4

튜플

```haskell
-- tuple
author = ("Will","Kurt")
GHCi> fst author
"Will"
GHCi> snd author
"Kurt"

```

일급함수

```haskell
:{
ifEven myFunction x = if even x
                      then myFunction x
                      else x
:}

-- 람다 함수 전달
ifEven (\n -> n^2) 10
-> 100

-- 함수는 항상 연산자보다 연산 우선순위가 높다.
add x y = x + y
add 1 2 * 3
-> 9

:{
names = [("Ian", "Curtis"),
         ("Bernard","Sumner"),
         ("Peter", "Hook"),
         ("Stephen","Morris")]
:}
GHCi> sort names
[("Bernard","Sumner"),("Ian", "Curtis"),("Peter", "Hook"),
("Stephen","Morris")]

:{
compareLastNames name1 name2 = if lastName1 > lastName2
                               then GT
                               else if lastName1 < lastName2
                                    then LT
                                    else EQ
  where lastName1 = snd name1
        lastName2 = snd name2
:}
```

파일 맨 위에

`import Data.List`

하면 가져올 수 있다.

### chapter 5

curry, partial application, flip

```haskell

divide a b = a / b
divide 10 2
-> 5.0

-- flip은 2개의 인자를 뒤집는다. 그러나 인자가 3개 이상인 곳에도 쓸 수 있다.
flip divide 10 2
-> 0.2

subtract (-2) 3
-5
flip subtract (-2) 3
5
-- 뒷 항에 -2 적용. 다음 인자 들어올 시 앞에 인자로 들어옴.
subtract2 = flip (-) 2

-- Q5.1
ifEvenInc = ifEven (\x -> x + 1)
ifEvenDouble = ifEven (\x -> x * 2)
```

### capter 6.

Lists

List는 함수형 프로그래밍에서 가장 중요한 단일 데이터 구조입니다. 

주요 이유 중 하나는 목록이 본질적으로 재귀적이라는 것입니다. 
목록은 빈 목록이거나 뒤에 다른 목록이 오는 요소입니다. 
목록을 분해하고 작성하는 것은 함수형 프로그래밍의 많은 기술을 위한 기본 도구입니다.

Data.List를 보면 전부 볼 수 있다.

[Data.List](https://hackage.haskell.org/package/base-4.17.0.0/docs/Data-List.html)

```haskell
-- consing 연산자.
ghci> 1:2:3:4:[]
[1,2,3,4]
ghci> (1,2):(3,4):(5,6):[]
[(1,2),(3,4),(5,6)]

'h':"ello"
-> "hello"

-- consing 연산자는 엘리먼트를 추가하기 위함이고, 목록끼리의 결합은 (++)를 이용해야한다
ghci> "he" ++ "llo"
"hello"
ghci> [4, 7] ++ [2, 6]
[4,7,2,6]

-- List generate
ghci> [1 .. 10]
[1,2,3,4,5,6,7,8,9,10]

ghci> [1,3 .. 10]
[1,3,5,7,9]

ghci> [1, 1.5 .. 5]
[1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0]

ghci> [1,0 .. -10]
[1,0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]

-- 무한 List, 평가하지 않은 상태로 lazy evaluation List로써 함수나 변수에서 사용 가능하다.
ghci> simple x = x
ghci> longList = [1 .. ]
ghci> stillLongList = simple longList
ghci> backwardsInfinity = reverse [1..]

-- !! operator
-- 해당 인덱스에 대한 요소를 반환, 없으면 에러
ghci> [1,2,3] !! 0
1
ghci> "puppies" !! 4
'i'
ghci> [1..10] !! 11
*** Exception: Prelude.!!: index too large

-- right argument binding
ghci> index2 = (!! 2)
ghci> index2 "dog"
'g'

ghci> rightDivide10 = (`divide` 10)
ghci> rightDivide10 3
0.3

-- left argument binding
ghci> dogIndex =  ("dog" !!)
ghci> dogIndex 1
'o'
ghci> left10Divide = (10 `divide` )
ghci> left10Divide 3
3.3333333333333335

-- reverse
-- reverse를 사용해서 회문검사기 가능. == 가 레퍼런스 비교가 아닌 데이터 비교.
isPalindrome word = word == reverse word

GHCi> isPalindrome "cheese"
False
GHCi> isPalindrome "racecar"
True
GHCi> isPalindrome [1,2,3]
False
GHCi> isPalindome [1,2,1]
True

-- elem
-- 요소가 리스트에 있는지 확인
GHCi> elem 13 [0,13 .. 100]
True
GHCi> elem 'p' "cheese"
False

-- take, drop
GHCi> take 5 [2,4..100]
[2,4,6,8,10]
GHCi> drop 2 [1,2,3,4,5]
[3,4,5]

-- zip
GHCi> zip "dog" "rabbit"
[('d','r'),('o','a'),('g','b')]
GHCi> zip ['a' .. 'f'] [1 .. ]
[('a',1),('b',2),('c',3),('d',4),('e',5),('f',6)]

-- cycle
-- 주어진 List를 무한 순환 List로 만듦 
ghci> take 5 (cycle [1, 3])
[1,3,1,3,1]

-- 그룹으로 분배할때에 유용하다.
assignToGroups n aList = zip groups aList
  where groups = cycle [1..n]

GHCi> assignToGroups 3 ["file1.txt","file2.txt","file3.txt"
                     ,"file4.txt","file5.txt","file6.txt","file7.txt"
                     ,"file8.txt"]

[(1,"file1.txt"),(2,"file2.txt"),(3,"file3.txt"),(1,"file4.txt"),
(2,"file5.txt"),(3,"file6.txt"),(1,"file7.txt"),(2,"file8.txt")]

GHCi> assignToGroups 2 ["Bob","Kathy","Sue","Joan","Jim","Mike"]
[(1,"Bob"),(2,"Kathy"),(1,"Sue"),(2,"Joan"),(1,"Jim"),(2,"Mike")]

-- Q6.1
repeat' n = cycle [n]

-- Q6.2
subseq start end list = (take (end - start) (drop start list))

-- Q6.3
inFirstHalf word list = elem word halfList 
	where halfList = take (div (length list) 2) list
```

### chapter 7

Recursion

재귀라고 생각하지 말라.
달성해야 하는 목표와 그 목표를 이루기 위한 분기처리만 하면 된다.

```haskell
-- 최대 공약수 구하기
myGCD a b = if remainder == 0
            then b
            else myGCD b remainder
            where remainder = a `mod` b

ghci> myGCD 20 50
10
ghci> myGCD 15 4
1
ghci> myGCD 50 20
10

--Q7.2
myGCD a b case reainder of
  0 -> b
  _ -> myGCD b remainder
  where remainder = a `mod` b

```

pattern matching

```haskell
-- 패턴 매칭은 if 처럼 >, < 같은 연산은 못하고 딱 _를 제외하곤 1:1 매칭이다.
sayAmount n = case n of
  1 -> "one"
  2 -> "two"
  n -> "a bunch"

-- 그냥 이렇게 일일히 선언해도 된다
ghci> isEmpty [] = True
ghci> isEmpty _ = False

ghci> isEmpty []
True

-- 목록에서의 패턴 매칭에 대한 관례는 하나의 값은 x, 그 외는 xs라고 한다.
myHead (x:xs) = x
myHead [] = error "No head for empty list"

myTail (_:xs) = xs
myTail [] = error "No Tail for empty list"
```

![h2.png|200](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/h2.png)
### chapter 8

Recursion

1. Identify the end goal(s).
최종 목표 식별
2. Determine what happens when a goal is reached.
목표에 도달하면 어떻게 할지. 즉 밑에 myLength의 경우에 `myLength [] = 0`
3. List all alternate possibilities.
모든 대체 가능성 나열. case, if
4. Determine your “rinse and repeat” process.
rule 3을 통한 재귀 반복
5. Ensure that each alternative moves you toward the goal.
각 대안이 1에서 정한 목표를 향해 나아가도록 설정

```haskell
myLength [] = 0
myLength (x:xs) = 1 + myLength xs

myTake 0 _ = []
myTake _ [] = []
myTake n (x:xs) = x : myTake (n - 1) xs
```

cycle 함수 만들기

```haskell
myCycle [] = []
myCycle list = list ++ myCycle list
```

**The Ackermann function**

- If m = 0, return n + 1.
- If n = 0, then A(m – 1, 1).
- If both m != 0 and n != 0, then A(m –1, A(m, n – 1)).

이렇게 재귀 함수가 자신을 중첩 호출하면 런타임 비용이 폭발적으로 증가한다… 본인 컴퓨터의 경우엔 아예 멈춤

```haskell
ackermann m 0 = ackermann (m-1) 1
ackermann m n = ackermann (m-1) (ackermann m (n-1))

-- :set +s를 ghci에서 하면 시간이 보여진다.
GHCi> ackermann 3 8
2045
(3.15 secs)

```

**Collatz conjecture**

- If n is 1, you’re finished.
- If n is even, repeat with n/2.
- If n is odd, repeat with n × 3 + 1.

왜 내 컴터에선 멈추냐…

```haskell
collatz 1 = 1
-- 길이를 알기 위해 1 + 를 해준다. 한번 반복시마다 길이가 + 1 되는 샘.
collatz n = if even n
            then 1 + collatz (n `div` 2)
            else 1 + collatz (n*3 + 1)

GHCi> collatz 91
93
```

```haskell
-- Q8.1
reverse' [] = []
reverse' (x:[]) = [x]
reverse' (x:xs) = (reverse' xs) ++ [x]

-- Q8.2
fibonacci = fibonacci' [0, 1] 
fibonacci' list = fibonacci' (list ++ [x1 + x2]) 
    where (x1:x2:xs) = reverse list

-- 왜 안됌??
fibonacci !! 1000
-- 쌓이는 entry가 없어 얼마까지 반복해야 하는지 알 수 없어 무한 반복하게 된다.

fastFib _ _ 0 = 0
fastFib _ _ 1 = 1
fastFib _ _ 2 = 1
fastFib x y 3 = x + y
fastFib x y c = fastFib (x + y) x (c - 1)
fib = fastFib 1 1

```

### chapter 9

fold, high order function

```haskell
-- map
GHCi> map reverse ["dog","cat", "moose"]
["god","tac","esoom"]
GHCi> map head ["dog","cat", "moose"]
"dcm"
GHCi> map (take 4) ["pumpkin","pie","peanut butter"]
["pump","pie","pean"]

GHCi> map ("a "++) ["train","plane","boat"]
["a train","a plane","a boat"]
GHCi> map (^2) [1,2,3]
[1,4,9]

-- map 직접 구현
map' f [] = []
map' f (x:xs) = f x:map f xs

-- filter
GHCi> filter even [1,2,3,4]
[2,4]
GHCi> filter (\(x:xs) -> x == 'a') ["apple","banana","avocado"]
["apple","avocado"]

-- filter 직접 구현

filter' test [] = []
filter' test (x:xs) = if test x
                      then x:myFilter test xs
                      else myFilter test xs

```

**fold**

fold는 왼쪽부터 리스트가 끝날때까지 folding한다.

foldr은 오른쪽부터 리스트 시작점까지 folding한다.

그래서 무한 리스트에서 foldl은 무한히 돌고, foldr은 일정 지점부터 잡아서 무한히 돌지 않게 할 수 있다.

foldl’은 lazy하지 않게 folding한다.

```haskell
-- folding
foldl (+) 0 [1,2,3,4]
10
sumOfSquares xs = foldl (+) 0 $ map (^2) xs
sumOfSquares [1,2,3,4]
30

-- foldl를 이용한 reverse 구현
reverseCons x y = y:x
myReverse list = foldl reverseCons [] list

-- foldl 구현
myFoldl f init [] = init
myFoldl f init (x:xs) = myFoldl f (f init x) xs

-- foldr
-- foldr은 오른쪽에서 부터 접는다.
GHCi> foldl (-) 0 [1,2,3,4] -- foldl1 (-) [0,1,2,3,4]
-10
GHCi> foldr (-) 0 [1,2,3,4] -- foldr1 (-) [1,2,3,4,0]
-2
-- step1: 4 - 0
-- step2: 3 - 4
-- step3: 2 -(-1)
-- step4: 1 - 3 

foldl (/) 64 [4,2]
8.0 -- (64 / 4) / 2 
foldr (/) 64 [4,2]
128.0 -- 64 / (2 / 4)

-- Q9.1
-- Use filter and length to re-create the elem function.
:{
myElem list el = if (length $ filter (\x -> x == el) list) > 0 
  then True 
  else False
:}

-- Q9.2
-- filter와 map을 사용해서 회문(시작과 끝이 같음) 판별을 공백 제거 후
--  대소문자 구분하지 않게 하기
-- “A man a plan a canal Panama” "amanaplanacanalpanama"여서 은 회문임
-- 모르겠다....
-- 책 정답
isPalindrome text = processedText == reverse processedText
   where noSpaces = filter (/= ' ') text
         processedText = map toLower noSpaces

-- Q9.3
-- 조화급수(harmonic series) 합을 인수 n을 취하고 더하게 만들어라
-- 1/1 + 1/2 + 1/3 + ... 1/n
-- 지연평가를 사용
-- 내 답
hamonic n = foldl1 (+) $ map (1/) [1 .. n]
-- 다른 사람 대답들

hamonic' 1 = 1
hamonic' n = (1/n) + hamonic' (n-1) 
```

### chapter 10

**Functional object-oriented programming**

일급 함수를 사용하기 때문에 함수 클로저에 값을 저장시켜 데이터처럼 취급할 수 있다.

기존에서의 `car.start()` 를 `start car` 의 패러다임으로 바꾸게 될 것이다.

```haskell
-- 람다 함수를 넣음으로써 처음 받은 인자를 그 후에 받을 함수의 인자로 넣음.
-- lazy dependency!

-- constructor에 해당함.
cup flOz = \message -> message flOz

myCup = cup 10
getOz aCup = aCup (\flOz -> flOz)

getOz myCup
-> 10
```

햇갈려서... 이해를 돕기위해
만약 타입스크립트로 짠다면 다음과 같음.
![Untitled 1.png|600](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Untitled%201.png)

그렇다면 상태변화는 어떻게 할까??

```haskell
drink aCup ozDrank = if ozDiff >= 0 
    then cup ozDiff
    else cup 0
    where ozDiff = getOz aCup - ozDrank

afterASip = drink myCup 1

getOz afterASip
-> 9

afterTwoSips = drink afterASip 1
getOz afterTwoSips
-> 8

isEmpty aCup = getOz aCup == 0

isEmpty (cup 0)
-> True
isEmpty myCup
-> False
afterManySips = foldl drink myCup [1,1,1,1,1]
getOz afterManySips
-> 5
```
![Untitled 2.png|600](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Untitled%202.png)

로봇 예제

```haskell
robot (name,attack,hp)  = \message -> message (name,attack,hp)

killerRobot = robot ("Kill3r",25,200)

-- 아래의 접근자를 만들면, 튜플의 순서를 외우지 않아도 된다.
name (n,_,_) = n
attack (_,a,_) = a
hp (_,_,hp) = hp

getName aRobot = aRobot name
getAttack aRobot = aRobot attack
getHP aRobot = aRobot hp

setName aRobot newName = aRobot (\(n,a,h) -> robot (newName,a,h))
setAttack aRobot newAttack = aRobot (\(n,a,h) -> robot (n,newAttack,h))
setHP aRobot newHP = aRobot (\(n,a,h) -> robot (n,a,newHP))

gentleGiant = robot ("Mr. Friendly", 10, 300)

damage aRobot attackDamage = aRobot (\(n,a,h) ->
                                      robot (n,a,h-attackDamage))

fight aRobot defender = damage defender attack
  where attack = if getHP aRobot > 10
                 then getAttack aRobot
                 else 0

printRobot aRobot = aRobot (\(n,a,h) -> n ++
                                        " attack:" ++ (show a) ++
                                        " hp:"++ (show h))
fastRobot = robot ("speedy", 15, 40)
slowRobot = robot ("slowpoke",20,30)

-- 하스켈은 코드 순서를 재정렬해서 상관 없다!
-- 즉 코드 순서에 상관 없이 동일한 결과를 얻는다.
fastRobotRound3 = fight slowRobotRound3 fastRobotRound2
fastRobotRound2 = fight slowRobotRound2 fastRobotRound1
fastRobotRound1 = fight slowRobotRound1 fastRobot
slowRobotRound2 = fight fastRobotRound1 slowRobotRound1
slowRobotRound3 = fight fastRobotRound2 slowRobotRound2
slowRobotRound1 = fight fastRobot slowRobot

GHCi> printRobot fastRobotRound3
"speedy attack:15 hp:20"
GHCi> printRobot slowRobotRound3
"slowpoke attack:20 hp:-15"

```

Question

threeRoundFight 작성

두 대의 로봇이 3라운드 동안 싸워 승자를 돌려주는 기능입니다.

```haskell
battle firstRobot secondRobot = if getHp attackedRobot > 0 
  then [(firstRobot, attackedRobot)] ++ battle attackedRobot firstRobot
  else [(firstRobot, attackedRobot)] 
    where attackedRobot = fight firstRobot secondRobot

threeRoundFight = take 6 battle fastRobot slowRobot

-- 왜 안되지...ㅠㅠ
-- 포기..
```

### chapter 11

type

직접 타입을 지정할 수 있고, 지정하지 않을시 컴파일러가 타입을 추론해서 넣는다.

```haskell
-- Int
-- 범위 제한이 있는 숫자
x :: Int
x = 2
x * 2000 -- 4000
x ^ 2000 -- 0, 범위를 초과하면 0을 반환

-- Interger
-- 수학적 정의에 따른 숫자. 수 제한, 메모리 제한이 없음
y :: Integer
y = 2
y * 2000 -- 4000
y ^ 2000 -- 114813069527425452423283320117768198402231770208869520047764273682576626139237031385665948631650626991844596463898746277344711896086305533142593135616665318539129989145312280000688779148240044871428926990063486244781615463646388363947317026040466353970904996558162398808944629605623311649536164221970332681344168908984458505602379484807914058900934776500429002716706625830522008132236281291761267883317206598995396418127021779858404042159853183251540889433902091920554957783589672039160081957216630582755380425583726015528348786419432054508915275783882625175435528800822842770817965453762184851149029376

-- Integral
-- 정수 나눗셈을 지원하는 정수... 내가 직접 선언은 불가능 왜?

letter :: Char
letter = 'a'

interestRate :: Double
interestRate = 0.375

isFun :: Bool
isFun = True

values :: [Int]
values = [1,2,3]

testScores :: [Double]
testScores = [0.99,0.7,0.8]

-- Haskell에서는 [Char]와 String이 같다. type alias.
letters :: [Char]
letters = ['a','b','c']

anotherPet :: String
anotherPet = "dog"

-- Tuple
ageAndHeight ::(Int,Int)
ageAndHeight = (34,74)

firstLastMiddle :: (String,String,Char)
firstLastMiddle = ("Oscar","Grouch",'D')

streetAddress :: (Int,String)
streetAddress = (123,"Happy St.")
```

**함수 타입**

하스켈은 암시적 타입 변환을 허용하지 않는다

```haskell
half :: Int -> Double
-- error!
-- half n = n/2  
half n = fromInteger n / 2
half 5
-> 2.5

-- Q1. div 함수를 이용해 정수 나누기 2를 하는 halve 함수를 만들어라 
halve :: Int -> Int
halve = (`div` 2)
```

**show, read**

show: 다른 타입을 String으로

read: string을 다른 타입으로

```haskell
GHCi> show 6
"6"
GHCi> show 'c'
"'c'" -- ', c, '의 length 3의 String
GHCi>show 6.0
"6.0"

-- read는 타입을 어떤 타입으로 바꿔야 하는지 모르므로 알려줘야한다.
myInt :: Int
myInt = read "20"

-- or

myDouble = read "20" :: Double
```

**일급 함수**

()로 감싸줌으로써 일급 함수를 받는다고 명시할 수 있다.

```haskell
ifEven :: (Int -> Int) -> Int -> Int
ifEven f n = if even n then f n else n
```

**제네릭**

```haskell
simple :: a -> a
simple x = x

makeTriple :: a -> b -> c -> (a,b,c)
makeTriple x y z = (x,y,z)

nameTriple = makeTriple "Oscar" 'D' 10 -- (String, Char, Num)

-- 자기 동형 사상
f1 :: a -> a
-- a -> b라고 해서 꼭 형태가 같아야 하는 것은 아니다.
-- 같을 수도 있고, 아닐 수도 있다.
f2 :: a -> b
```

### chapter 12

**유형 동의어(*type synonym)** 
→* [Char] 을 String처럼 부르는 것을 말한다. (타입스크립트에서 type aliase) 

```haskell
-- **type synonym**
type FirstName = String
type LastName = String
type Age = Int
type Height = Int

type PatientName = (FirstName, LastName)

firstName :: PatientName -> FirstName
lastName :: PatientName -> LastName

firstName = fst
lastName = snd

```

**data**: 새 타입 만들기

```haskell
-- 이러면 자동으로 Male, Female이 선언됌.
-- typescript로 치면 타입이자 unique symbole 과도 비슷한 것 같다.
data Sex = Male | Female

-- Male은 Sex의 인스턴스이나 마찬가지다.
ghci> :t Male
Male :: Sex

sexInitial :: Sex -> Char
sexInitial Male = 'M'
sexInitial Female = 'F'

data RhType = Pos | Neg
data ABOType = A | B | AB | O

-- BloodType을 data 생성자처럼 선언하기
data BloodType = BloodType ABOType RhType

patient1BT :: BloodType
patient2BT :: BloodType
patient3BT :: BloodType
patient1BT = BloodType A Pos
patient2BT = BloodType O Neg
patient3BT = BloodType AB Pos

-- 현재로썬 출력할 수 있는 방법이 없으므로 추가해준다. (다음 챕터에서 더 나은 방법을 배움)
showRh :: RhType -> String
showRh Pos = "+"
showRh Neg = "-"
showABO :: ABOType -> String
showABO A = "A"
showABO B = "B"
showABO AB = "AB"
showABO O = "O"
showBloodType :: BloodType -> String
showBloodType (BloodType abo rh)  = showABO abo ++ showRh rh

-- ** Rh는 계산하지 않음 **
canDonateTo :: BloodType -> BloodType -> Bool
-- O형은 모든 형에 기부 가능
canDonateTo (BloodType O _) _ = True
-- 모든 형은 AB형에 기부 가능
canDonateTo _ (BloodType AB _) = True
-- A형은 A, AB형에 기부 가능
canDonateTo (BloodType A _) (BloodType A _) = True
-- B형은 B, AB형에 기부 가능
canDonateTo (BloodType B _) (BloodType B _) = True
-- 위의 패턴이 아닌 나머지는 기부 불가능
canDonateTo _ _ = False --otherwise

ghci> canDonateTo (BloodType A Pos) (BloodType AB Pos) 
True
ghci> canDonateTo (BloodType AB Pos) (BloodType A Pos) 
False
```

![Untitled 3.png|600](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Untitled%203.png)


Name 유형 만들기 

```haskell
type FirstName = String
type LastName = String
type MiddleName = String
data Name = Name FirstName LastName 
  | NameWithMiddle FirstName MiddleName LastName

showName :: Name -> String
showName (Name f l) = f ++ " " ++ l
showName (NameWithMiddle f m l) = f ++ " " ++ m ++ " " ++ l

ghci> showName myName
"kim Hoejun"
ghci> showName myName2
"kim gururu jun"
```

하지만 많은 속성을 지닌 경우 저렇게 나열하는게 힘들다…

그래서 Record 구문이 있다!

```haskell
data Patient = Patient { name :: Name
                       , sex :: Sex
                       , age :: Int
                       , height :: Int
                       , weight :: Int
                       , bloodType :: BloodType }

jackieSmith :: Patient
jackieSmith = Patient {name = Name "Jackie" "Smith"
                      , age = 43
                      , sex = Female
                      , height = 62
                      , weight = 115
                      , bloodType = BloodType O Neg }

-- 또한 getter가 필요 없다.
-- 근데 순서가 반대다
ghci> height jackieSmith
62

```

Q

```haskell
-- Q12.1
-- 두 개의 BloodType이 아닌 두 명의 환자를 인수로 사용하는 canDonateTo와 유사한 함수를 작성하십시오.
-- 패턴 매칭 어떻게 하는지 몰라....

-- Q12.2
-- 최종 환자 유형을 사용하는 patientSummary 함수를 구현하십시오. 
-- Patient-Summary는 다음과 같은 문자열을 출력해야 합니다.
{-
  **************
  Patient Name: Smith, John
  Sex: Male
  Age: 46
  Height: 72 in.
  Weight: 210 lbs.
  Blood Type: AB+
-}
showSex :: Sex -> String
showSex Male = "Male"
showSex Female = "Female"

patientSummary :: Patient -> String
patientSummary patient =  "**************\n" ++ 
  "Patient Name: " ++ showName (name patient) ++ "\n" ++
  "Sex: " ++ showSex (sex patient) ++ "\n" ++
  "Age: " ++ show (age patient) ++ "\n" ++
  "Height: " ++ show (height patient) ++ " in.\n" ++
  "Weight: " ++ show (weight patient) ++ " lbs.\n" ++
  "Blood Type: " ++ showBloodType (bloodType patient) ++ "\n"
```

A

```haskell
-- Q12.1
donorFor :: Patient -> Patient -> Bool
donorFor p1 p2 = canDonateTo (bloodType p1) (bloodType p2)

```

### chapter 13

type classes

Type classes는 모두 같은 방식으로 작동하는 유형 그룹을 설명하려는 방식이다. (OOP의 클래스, Rust의 Trait에 해당한다. 개념은 많이 다르지만 추상화를 시킨다는 개념에서 보면 그렇다는 의미.)

Num은 숫자를 일반화하려는 타입클래스이다.

```haskell
-- :t를 통해 함수의 타입을 볼 수 있다
ghci> :t (+)
(+) :: Num a => a -> a -> a

-- :info를 통해 타입클래스의 정의를 확인할 수 있다.
ghci> :info Num
type Num :: * -> Constraint
class Num a where
  (+) :: a -> a -> a
  (-) :: a -> a -> a
  (*) :: a -> a -> a
  negate :: a -> a
  abs :: a -> a
  signum :: a -> a
  fromInteger :: Integer -> a
  {-# MINIMAL (+), (*), abs, signum, fromInteger, (negate | (-)) #-}
        -- Defined in ‘GHC.Num’
instance Num Double -- Defined in ‘GHC.Float’
instance Num Float -- Defined in ‘GHC.Float’
instance Num Int -- Defined in ‘GHC.Num’
instance Num Integer -- Defined in ‘GHC.Num’
instance Num Word -- Defined in ‘GHC.Num’

-- Num에 나눗셈이 없는 이유는, 모든 수가 나눗셈을 정의하고는 있지 않기 때문이다.

-- 앞으로 Num 유형클래스를 구현한 모든 타입은 이 기능을 활용할 수 있음!
addThenDouble :: Num a => a -> a -> a
addThenDouble x y = (x + y)*2
```

예제 `(Num a, Ord a) => a -> (t -> t) -> t -> t` 에서의 ⇒ 는 

- 왼쪽은 타입 클래스 제약 조건이 있고
- 오른쪽은 실제 유형이 있다.

즉 a 유형에 대한 Num, Ord 인스턴스가 구현이 되어있어야 한다.

instance는 implements Interface라고 보면 된다. 

```haskell
instance Num Double -- Defined in ‘GHC.Float’
instance Num Float -- Defined in ‘GHC.Float’
instance Num Int -- Defined in ‘GHC.Num’
instance Num Integer -- Defined in ‘GHC.Num’
instance Num Word -- Defined in ‘GHC.Num’
```

에서 `instance Num Double` 는 

**“Double은 이 타입클래스의 인스턴스이므로 이 타입클래스의 메소드를 사용할 수 있다”** 라고 보면 된다.

Ord를 보면 class Eq a ⇒ Ord a where

처럼 되어 있는데, 이는 Ord 클래스의 정의에 Eq 클래스가 포함하는 이유를 설명한다.

```haskell
type Ord :: * -> Constraint
class Eq a => Ord a where
  compare :: a -> a -> Ordering
  (<) :: a -> a -> Bool
  (<=) :: a -> a -> Bool
  (>) :: a -> a -> Bool
  (>=) :: a -> a -> Bool
  max :: a -> a -> a
  min :: a -> a -> a
```

Bounded 클래스에는 최소값 최대값이 정의되어 있다.

여기에서의 minBound, maxBound는 값이다.

```haskell
ghci> :info Bounded
type Bounded :: * -> Constraint
class Bounded a where
  minBound :: a
  maxBound :: a

ghci> minBound :: Char
'\NUL'
ghci> minBound :: Int
-9223372036854775808
```

- Eq: 모든 것을 동등하거나, 동등하지 않거나를 비교할 수 있게끔 함
- Ord: 모든 것을 비교해서 정렬할 수 있게끔 함
- Show: String으로 바꿈 (ghci는 기본적으로 show를 해준다)

**deriving**

하스켈에서 정해놓은 몇가지 타입 클래스를 파생시킬 수 있다.

```haskell
data Icecream = Chocolate | Vanilla deriving (Show, Eq, Ord)

-- 원래 하스켈이 데이터 생성자를 출력하는 방법을 모른다는 것을 알아두어라!
ghci> Chocolate
Chocolate 
ghci> Chocolate /= Vanilla
True
-- 데이터 생성자 순서가 뒤에 있는게 더 크다.
ghci> Chocolate < Vanilla
True
```

### chapter 14

implement type class

deriving으로 구현하면 하스켈에서 지정된 방식으로 구현이 되므로, 직접 구현을 해보자.

```haskell
-- 이걸 Show를 
data SixSidedDie = S1 | S2 | S3 | S4 | S5 | S6

instance Show SixSidedDie where
   show S1 = "one"
   show S2 = "two"
   show S3 = "three"
   show S4 = "four"
   show S5 = "five"
   show S6 = "six"

ghci> S1
"one"
```

하스켈은 똑똑하게도 Eq 타입클래스를 구현할때 ==만 구현하면 =/는 알아서 구현이 된다.

```haskell
instance Eq SixSidedDie where
   (==) S6 S6 = True
   (==) S5 S5 = True
   (==) S4 S4 = True
   (==) S3 S3 = True
   (==) S2 S2 = True
   (==) S1 S1 = True
   (==) _ _ = False

GHCi> S6 == S6
True
GHCi> S6 == S5
False
GHCi> S5 == S6
False
GHCi> S5 /= S6
True
GHCi> S6 /= S6
False
```

이렇게 어떻게 구현해야할지에 대한 자세한 문서를 보고 싶다면

[Data.Eq](https://hackage.haskell.org/package/base-4.17.0.0/docs/Data-Eq.html)

hackage에서 찾아보면 된다.
![Untitled 4.png|400](/img/user/env/%EC%B2%A8%EB%B6%80%ED%8C%8C%EC%9D%BC/Untitled%204.png)

라고 나와있는데 둘 중  하나만 정의하면 나머지는 정의된다는 의미이다.

Ord implement 

[Ord](https://hackage.haskell.org/package/base-4.17.0.0/docs/Prelude.html#t:Ord) 

**Minimal complete definition**

[compare](https://hackage.haskell.org/package/base-4.17.0.0/docs/Prelude.html#v:compare) | [(<=)](https://hackage.haskell.org/package/base-4.17.0.0/docs/Prelude.html#v:-60--61-)

```haskell
instance Ord SixSidedDie where
   compare S6 S6 = EQ
   compare S6 _ = GT
   compare _ S6 = LT
   compare S5 S5 = EQ
   compare S5 _ = GT
   compare _ S5 = LT

-- 이런식으로 정하면 되는데 .... 언제 이걸 다 하고 있겠어?

-- 파생(deriving)을 통해 손쉽게 구현
data SixSidedDie = S1 | S2 | S3 | S4 | S5 | S6 deriving (Eq,Ord,Enum)
GHCi> [S1 .. ]
[one,two,three,four,five,six]

-- Show를 SixSidedDie에 구현시킨다는 의미
instance Show SixSidedDie where
   show S1 = "one"
   show S2 = "two"
   show S3 = "three"
   show S4 = "four"
   show S5 = "five"
   show S6 = "six"

-- 파생을 할때 더 강력한 것은 Enum 이다.
-- 이렇게 일일히 써주는게 매우 귀찮다.
instance Enum SixSidedDie where
   toEnum 0 = S1
   toEnum 1 = S2
   toEnum 2 = S3
   toEnum 3 = S4
   toEnum 4 = S5
   toEnum 5 = S6
   toEnum _ = error "No such value"

   fromEnum S1 = 0
   fromEnum S2 = 1
   fromEnum S3 = 2
   fromEnum S4 = 3
   fromEnum S5 = 4
   fromEnum S6 = 5

GHCi> [S1 .. S6]
[one,two,three,four,five,six]
GHCi> [S2,S4 .. S6]
[two,four,six]
GHCi> [S4 .. S6]
[four,five,six]

-- 위의 것을 간단히 이렇게 파생시킬 수 있다.
data SixSidedDie = S1 | S2 | S3 | S4 | S5 | S6 deriving (Enum)
GHCi> [S1 .. ]
[one,two,three,four,five,six]
```

Name 예

유형생성자와 하나의 유형만 사용할 경우 newtype으로 선언하는게 컴파일러 속도, 용량이 훨신 좋다.

```haskell
newtype Name = Name (String, String) deriving (Eq)

instance Ord Name where
   compare (Name (f1,l1)) (Name (f2,l2)) = compare (l1,f1) (l2,f2)

instance Show Name where
   show (Name (f,l)) = l ++ " " ++ f
	

person1 :: Name
person2 :: Name
person3 :: Name
people :: [Name]

person1 = Name ("Emil","Cioran")
person2 = Name ("Eugene","Thacker")
person3 = Name ("Friedrich","Nietzsche")
people = [person1, person2, person3]

-- -- ghci에선 기본적으로 show 메서드를 사용 
-- ghci> person1
-- Cioran Emil

-- ghci> person2
-- Thacker Eugene

-- ghci> person2 > person3
-- True

-- ghci> people
-- [Cioran Emil,Thacker Eugene,Nietzsche Friedrich]

-- ghci> import Data.List
-- ghci> sort names
-- ["Cioran Emil", "Nietzsche Friedrich", "Thacker Eugene"]
```

```haskell
-- Q14.1
-- Enum만 deriving해서 Eq, Ord 직접 구현
data MyNumber = One | Two | Three deriving Enum

instance Eq MyNumber where
   (==) num1 num2 = (fromEnum num1) == (fromEnum num2)

-- fromEnum은 Enum의 인덱스를 리턴한다. One은 0, Two는 1
instance Ord MyNumber where 
   (<=) num1 num2 = (fromEnum num1) <= (fromEnum num2)

-- Q14.2
-- Dice 공용 클래스 만들어서 구현시키기
data FiveDice = Side1 | Side2 | Side3 | Side4 | Side5 deriving (Eq, Ord, Enum, Show)

class (Eq a, Enum a) => Dice a where
   roll :: Int -> a

instance Dice FiveDice where
   roll n = toEnum (n `mod` 5)

-- ghci> roll 5 :: FiveDice
```

### Chapter 15

문자 회전시키는 예제 작성하기

```tsx

```






