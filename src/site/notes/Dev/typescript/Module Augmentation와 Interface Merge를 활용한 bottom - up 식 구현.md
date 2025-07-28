---
{"dg-publish":true,"createdAt":"2025.07.28 월 오후 15:32","modifiedAt":"2025.07.28 월 오후 15:34","permalink":"/Dev/typescript/Module Augmentation와 Interface Merge를 활용한 bottom - up 식 구현/","dgPassFrontmatter":true}
---


과거 2022년 [티스토리](https://gggururu.tistory.com/104)에 썼던 내용

---

모듈의 [interface에 merge 함으로써](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) 타입을 관리하면 더 강력한 추상화와 중앙집권식이 구조가 아닌 개별 관리 구조를 가져갈 수 있다. (bottom - top)  

remix.run 프레임워크를 사용한 예제이나, 해당 프레임워크를 몰라도 상관없습니다.

**app/service/api.ts**

```ts
export interface ApiFns {}

export type ApiFnKeys = keyof ApiFns;

export type ApiProps = {
  [key in ApiFnKeys]: Parameters<ApiFns[key]>[0];
};

export type Method<M extends FormMethod> = { method: M };

type ApiMethod = {
  [key in ApiFnKeys]: ApiFns[key]['method'];
};

/* ... */
```

위에서의 ApiFns는 빈 인터페이스다. 

전혀 쓸모없는 코드 같지만 이는 처음에 빈 객체를 선언하고 나중에 key: value 채워넣는 것과 같은 방식으로 활용할 것이다.

**routes/api/payItem/create.ts**

```ts
import type { Payer, PayItem, Room } from '@prisma/client';
import type { Method } from 'app/service/api';
import { apiAction } from 'app/service/api';

import { db } from '~/utils/db.server';

const API_NAME = 'payItem/create';
type API_NAME = typeof API_NAME;

type ApiMethod = Method<'post'>;

type Props = {
  roomId: Room['id'];
  payerId: Payer['id'];
  payItem: Pick<PayItem, 'name' | 'amount'>;
};

const api = {
  [API_NAME]({ roomId, payerId, payItem }: Props) {
    return db.$transaction([
      db.payItem.create({
        data: {
          roomId,
          payerId,
          ...payItem,
        },
      }),
      db.payer.update({
        where: {
          id: payerId,
        },
        data: {
          paymentItemLastUpdatedDate: new Date(),
        },
      }),
    ]);
  },
};

export const action = apiAction(API_NAME, api[API_NAME]);

declare module 'app/service/api' {
  export interface ApiFns {
    readonly [API_NAME]: typeof api[API_NAME] & ApiMethod;
  }
}
```

위의 파일을 보면 declare module 'app/service/apl' { ... } 코드 부분이 보일 것이다.

그 안의 보면 API_NAME을 키값으로 하여 타입을 선언해주는데, 이것이 **app/service/api.ts** 파일의 interface ApiFns에 merge 된다.

이래서 미리 빈 객체를 선언해두고 나중에 값을 추가하는 것과 같은 방식과도 같다고 한 것이다.

위에 보면 함수를 굳이 api라는 객체로 감싼 것이 보이는데, 이는 객체로부터 API_NAME으로 함수를 추출하기 위해 일부로 한번 감싼 것이다.

이로 인해 API_NAME만 수정하면 모든 키 네임이 수정되어 훨신 수정하기 편하다.

위와 같은 식으로 파일들을 만들고 나중에 타입을 추출해보면?

![](https://blog.kakaocdn.net/dna/bg2thf/btrHZ7jNf1P/AAAAAAAAAAAAAAAAAAAAAHMcoYWNXLTFV1k5g-VIj2NSHul2hYkalxUym0mf7k28/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1753973999&allow_ip=&allow_referer=&signature=xCBHsC4dGJg2A2rCAMtxRRjOb8Q%3D)

ApiFns는 분명 비어있는데 키를 추출한 ApiFnKeys의 타입을 확인해보면 키 값들이 들어가 있는 것을 볼 수 있다.

이것이 각 파일에서 merge 시킨 타입이다.

![](https://blog.kakaocdn.net/dna/ba37nx/btrH1cyvcax/AAAAAAAAAAAAAAAAAAAAAGvmx3GJei8HueQsNymlB1P7A7rW3QpEU00oJ_cti9X4/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1753973999&allow_ip=&allow_referer=&signature=DeoRyEKbiirgcK9pP70v%2FAKteNo%3D)

등록해놨던 함수들의 파라미터를 추출해두면 타입을 활용하기 더 쉬워진다.

그러면 이제 이 타입들을 활용하여 type safety한 함수들을 생성하여 유용하게 사용할 수 있다.

이렇게 추출한 타입을 활용하는 api 파일의 전체 예시를 보겠다.

**app/service/api.ts**
```ts
import type { DataFunctionArgs } from '@remix-run/node';
import type { FetcherWithComponents, FormMethod } from '@remix-run/react';
import { useMemo } from 'react';
import superjson from 'superjson';

export interface ApiFns {}

export type ApiFnKeys = keyof ApiFns;

export type ApiProps = {
  [key in ApiFnKeys]: Parameters<ApiFns[key]>[0];
};

export type Method<M extends FormMethod> = { method: M };

type ApiMethod = {
  [key in ApiFnKeys]: ApiFns[key]['method'];
};

export const useCallApi = <K extends ApiFnKeys>(action: K, method: ApiMethod[K]) =>
  useMemo(() => {
    const props = {
      method,
      action: `/api/${action}`,
    };
    return {
      props,
      submit<T>(fetcher: FetcherWithComponents<T>, data: ApiProps[K]) {
        const formData = new FormData();
        formData.set('data', superjson.stringify(data));
        fetcher.submit(formData, props);
      },
    };
  }, [action]);

export function receiveApi<K extends ApiFnKeys>(action: K, formData: FormData) {
  const stringData = formData.get('data');
  if (typeof stringData !== 'string') {
    throw Error(`[API] ${action} - receive: data를 정상적으로 가져오지 못했습니다.`);
  }
  const data: ApiProps[K] = superjson.parse(stringData);
  return data;
}

export const apiAction =
  <R, K extends ApiFnKeys>(API_NAME: K, fn: (p: ApiProps[K]) => R) =>
  async ({ request }: DataFunctionArgs) =>
    fn(receiveApi(API_NAME, await request.formData()));
```

 이 파일 내용 전체를 보고 위의 **routes/api/payItem/create.ts** 파일을 보면 이해하기 쉬울 것이다.

이 방식을 활용하면 흔히들 사용되는 top - down 방식과는 다르게, 각 타입의 내용을 수정하려고 열심히 해당 파일로 찾아갈 필요가 없다.

수정하면 알아서 상위 타입의 값이 바뀌니 말이다.

그리고 보시다시피 추상화에 유리한 점이 있다는 것을 알 것이다.

단점이라면 각 파일마다 매번 module 선언해서 interface merge 하는 코드를 작성해야 한다는 것.

타입스크립트가 매크로가 안되니 어쩔 수 없다.

타입만이라도 매크로 지원이 됬으면 좋겠다..

이 방식을 활용하여 추후 [우회식 HKT](https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe)를 만들 수도 있다.
