---
{"dg-publish":true,"createdAt":"2024.05.21 화 오후 15:31","modifiedAt":"2025.08.07 목 오전 10:40","tags":["css"],"permalink":"/Dev/web/useage_pattern/css patern/","dgPassFrontmatter":true}
---


#### 자동 grid

grid-cols-[repeat(auto-fill,minmax(102px,1fr))]

#### 아코디언

grid를 이용하면 height auto에 해당하는 애니메이션을 쉽게 줄 수 있다.

li > div[inert] { grid-template-rows: 0fr; }
li > div { grid-template-rows: 1fr; transition: grid-template-rows .3s; }

#### 완벽한 중앙 배치를 위한 텍스트 사이즈 컴팩트하게 잡기

```css
.text {  text-box: cap alphabetic;}
```

#### 커서가 있는 경우에만 hover 효과 적용

모바일에서 hover effect가 롱프레스-취소시 풀리지 않는 문제를 수정하기 위함.

```css
	 @media (hover: hover) and (pointer: fine) {
		&:hover {
		  background-color: #dfe3e8;
		}
	 }
```
