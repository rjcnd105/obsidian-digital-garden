---
{"dg-publish":true,"createdAt":"2025.07.23 수 오후 12:58","modifiedAt":"2025.07.24 목 오전 10:03","permalink":"/임시/쿠키 기반 미디어쿼리 SSR/","dgPassFrontmatter":true}
---


회사 프로덕트에 적용한 내용
기존 회사 프로덕트 내에서는 미디어 쿼리 분기로 기능, 컴포넌트, 뷰가 달라지는 것들이 많아서(사실상 적응형 아니냐고..) 아래와 같은 기능을 제안해서 적용시킴. 결과는 꽤 맘에 든다. 전반적으로 속도가 많이 빨라졌다.

아이디어가 갑자기 떠올라서 한번 로컬에서 테스트 해봤는데요~ 제 생각대로 잘 되어서 공유해봅니다~!
window width size를 nextjs서버 통해 쿠키로 저장해서 sever side에서 값 읽어서 provider통해 해당 size값 hydration시켜서 SSR을 해당 size기준으로 하는 아이디어였어요

**기존 방식**

1. 초기에 server side에서 사이즈를 알 수 없으니 null -> e.g 초기에는 isMobile ? <Mo> : <PC> 분기로 렌더링시 desktop 기준 SSR이 이뤄짐
    
 2. 클라이언트 사이드에서 useEffect를 통해 미디어 사이즈 분기(e.g const isMobile = useBetterMediaQuery("(max-width: 767px)"))
    
3. 해당 값에 따라 CSR이 다시 이루어짐

**쿠키를 이용한 반응형 SSR 방식**

- 쿠키 없을 시(null)

1. 초기 접속시(쿠키 없을시) -> 위 기존 방식과 같은 방식으로 렌더링 됨

- 쿠키 있을 시

1. server side인 root layout에서 provider를 통해 해당 mediaSize cookie값 hydration
    
2. 이 후 media query로 분기되어 렌더링되는 컴포넌트들에 초기 SSR 기준을 해당 쿠키 사이즈 기준으로 잡음

- 공통

1. 클라이언트 사이드에서 window의 width 값이 기존 쿠키 값과 다르면 server action을 통해 server side통해 쿠키 set을 요청

**동작 영상**
아래 코드로 테스트시const isMobileSize = useBetterMediaQuery("(max-width: 767px)")

```
<div className="mt-20">
	{isMobileSize ? <span>is Mobile!</span> : <span>is PC!</span>}
	<br />
	{isMobileSize === null && <span>media size unknown!</span>}
</div>
```

**기존**
![[CleanShot 2025-06-27 at 15.43.28.mp4]]

**적용 후**
초기 렌더링시에는 같고 그 이후에는 기억하여 초기 SSR에 media size에 반영
영상에선 새로고침으로 보여주지만 url 이동시에도 마찬가지로 적용됩니다기존 useBetterMediaQuery  훅 그대로 사용하면서도 바로 적용될 수 있도록 호환시켜 확인해봤어요.
![[CleanShot 2025-06-27 at 15.42.09.mp4]]
