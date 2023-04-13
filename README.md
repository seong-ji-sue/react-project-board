# 게시판 만들기(프론트엔드 면접 과제)

## 내용
* 위키페이지는 제목과 본문으로 구성되며 각각 텍스트입니다.(0)
* 메인페이지에서는 여러개의 위키페이지제목이 목록으로 나옵니다.(0)
* 메인페이지에 목록으로 보여지는 제목의 갯수는 5개이며, 5개가 넘어가면 페이지를 구분해서 표시합니다.(0)
* 위키페이지 제목을 클릭하면 제목과 본문을 볼 수 있습니다.(0)
* 위키페이지 본문에 다른 위키페이지의 제목이 있으면 자동으로 링크가 걸리고,클릭하면 해당 위키페이지로 이동합니다.
* 메인페이지에서 추가 버튼을 누르면 새로이 입력할 수 있는 창이 나오고, 제목과 내용을 입력할 수 있습니다.(0)
* 위키내용페이지에는 수정 버튼이 있고, 수정을 누르면 내용을 수정해서 저장할 수 있습니다.(0)
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

## 활용한 것
- 게시글을 CRUD 하는 작업
- 게시물들을 관리하는 Context(useReducer, useContext 사용)
- 랜더링을 최소화하는 작업(useMemo, useCallback, useRef)
- 페이지 이동을 기능을 수행하는 커스텀 훅
- 페이지마다 다른 게시물 보여주고 페이지 < , > 누를 때 다른 페이지 보이도록 함
- 특정 타입을 부여하여 제어 (Typescript 사용)

## 체크사항
BulletinBoard 에서 페이지마다 초기상태를 업데이트 하는 useEffect를 써야 하는지
PostContext에서 불필요한 랜더링이 안일어나는지

## 스택
React, react-router, typescript

