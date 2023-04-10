# 게시판 만들기(프론트엔드 과제: 글로벌 널리)

## 내용
* 위키페이지는 제목과 본문으로 구성되며 각각 텍스트입니다.(0)
* 메인페이지에서는 여러개의 위키페이지제목이 목록으로 나옵니다.(0)
* 메인페이지에 목록으로 보여지는 제목의 갯수는 5개이며, 5개가 넘어가면 페이지를 구분해서 표시합니다.(0)
* 위키페이지 제목을 클릭하면 제목과 본문을 볼 수 있습니다.(0)
* 위키페이지 본문에 다른 위키페이지의 제목이 있으면 자동으로 링크가 걸리고,클릭하면 해당 위키페이지로 이동합니다.
* 메인페이지에서 추가 버튼을 누르면 새로이 입력할 수 있는 창이 나오고, 제목과 내용을 입력할 수 있습니다.(0)
* 위키내용페이지에는 수정 버튼이 있고, 수정을 누르면 내용을 수정해서 저장할 수 있습니다.(0)
* 위키페이지 아래에는 위키페이지 제목을 포함하는 내용이 담긴 위키페이지의 제목을 나열합니다

## 페이지

- List Page(URL : /)
![image](https://user-images.githubusercontent.com/87159108/230866008-57221789-aeac-4212-9fff-1866e4bf27f1.png)

- Create Page(URL : /create)
![image](https://user-images.githubusercontent.com/87159108/230866142-93daf36f-0223-47e7-93c3-898e8cd7bb8e.png)

- Detail Page(URL : /detail/1)
![image](https://user-images.githubusercontent.com/87159108/230866191-a96707c4-76c0-49b3-a918-eabcee6b4282.png)

- Update Page(URL : /update/1)
![image](https://user-images.githubusercontent.com/87159108/230866230-15a458dd-f34e-458b-8f31-9456967ac035.png)



## 실행
`npm install
`

## 기능 정리
- 카드 리스트
- 페이지네이션
- 글작성, 수정, 상세 기능 완료

## 구현 못한 것
- 카드 제목 중 내용과 같은 것이 있다면(링크) -> 위키같이
- 랜더링 최소화

## 스택
React, react-router, typescript

