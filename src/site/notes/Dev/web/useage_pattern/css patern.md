---
{"dg-publish":true,"createdAt":"2024.05.21 화 오후 15:31","modifiedAt":"2025.04.08 화 오전 9:48","tags":["css"],"permalink":"/Dev/web/useage_pattern/css patern/","dgPassFrontmatter":true}
---


#### 자동 grid

grid-cols-[repeat(auto-fill,minmax(102px,1fr))]

#### 아코디언

li > div[inert] { grid-template-rows: 0fr; }
li > div { grid-template-rows: 1fr; transition: grid-template-rows .3s; }

#### 완벽한 중앙 배치를 위한 텍스트 사이즈 컴팩트하게 잡기

```css
.text {  text-box: cap alphabetic;}
```
