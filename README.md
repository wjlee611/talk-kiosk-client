# Talk-kiosk-client

## 개요
말하는 사이에 주문 완료! 프로젝트의 클라이언트 리파지토리 입니다!

## 데이터 양식
> ### 메뉴 아이디 값
> 101\~199: 메인 메뉴(햄버거)\
> 201\~299: 사이드 (감튀)\
> 301\~399: 음료수 (콜라)
> 
> ### 데이터 양식 설명
> `order`: 주문번호 (type: number)\
> `takeout`: 매장/포장 (type: boolean)\
> `menu`: 메뉴 (type: Array)
>> `id`: 메뉴의 아이디 값 (type: number)\
>> `set`: 메뉴의 세트 정보 (type: Array[메뉴의 아이디 값(number)])\
>> `option`: 메인 메뉴의 요구사항 (type: Array[옵션의 아이디 값(number)])
>
> `price`: 가격 총합 (type: number)

```json
{
  "order": number,
  "takeout": boolean,
  "menu": [
    {
      "id": 101,
      "set": [201, 301],
      "option": [],
    },
    {
      "id": 101,
      "set": [],
      "option": [1001, 1004],
    },
    {
      "id": 201,
    },
    {
      "id": 301,
    },
  ],
  "price": number,
}
```
