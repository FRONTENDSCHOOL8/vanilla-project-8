
<!-- ![header](https://capsule-render.vercel.app/api?text=Market%20Karly&fontAlign=70&=Desc&descAlign=20) -->
![header](https://capsule-render.vercel.app/api?type=waving&color=0:5F0080,100:FFFFFF)
<div align="center"><img src="https://user-images.githubusercontent.com/112063987/233669862-47a68263-8187-465d-bcd5-c3c94568818a.png" width="400"></div>

# 🦁 8조 나만 또E다영
멋쟁이 사자처럼 프론트엔드 스쿨 8기 8조 나만 또E다영 프로젝트 저장소 <br>

 <h4> 노션 페이지 : <a href="https://www.notion.so/8-E-ba768f7fe0fe4815a17d183153ca9f51">notion</a></h4>

<br>


## 💜 프로젝트 소개
![image](https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/c74e1fe3-5100-4cfe-b548-d06baf889c04)
<h4> 마켓컬리 사이트를 pure css를 통해 클론 코딩 하는 팀 프로젝트입니다 </h4>
<h4>git branch 전략으로 git flow 방식을 선택</h4>

<br>

## 📅 프로젝트 진행기간

<h4>마켓컬리 프로젝트는 24년 1월 4일 ~ 24년 1월 16일까지 진행되었습니다.</h4>


<br>

## 📚 기술 스택
<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/pocketbase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=black">
</div>

<br><br>

## 👨‍👩‍👧‍👧 프로젝트 구성원

|조장 김다영(ryujinzz)|조원 김경민(highballplz)|조원 김소영(Lulurem)|조원 이동훈(dlehdg)|
|:-------------------:|:---------------------:|:-----------------:|:----------------:|
|<img width="150px" alt="셀카" src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/146301783/ab9062ef-bcf4-48c5-ad65-57123ea34db5">|<img width="150px" alt="노션 자기소개에 있는 사진" src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/118330822/b58afcfc-edfe-451d-9313-1bd3a978208e">|<img width="150px" alt="대신넣을사진2" src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/126847944/fb713de2-2163-4f69-9025-0c6303a6198e">|<img width="150px" alt="대신넣을사진33" src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/54a1f5d5-7f2d-4a84-b6a9-fccb5c10b220">|

<br><br>



## ✨ 요구 사항

- 슬라이드가 필요한 ui에서는 [**swiper.js**](https://swiperjs.com/)를 사용해주세요.
    - 각 슬라이드를 데이터로 받아 동적으로 렌더링 되도록 만들어주세요.
    - 슬라이드의 `prev`, `next` 버튼도 구현해주세요.
    - 키보드 키로도 작동되도록 구현해주세요.
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 사용하여 “최근 본 항목”의 UI를 구성해주세요.
- “마이크로 애니메이션”이 필요하다면 추가해주세요.
- “회원가입 기능”을 구현해주세요.
    - 최소한 이메일, 비밀번호 입력 필드(`input`), 제출 버튼(`button`)을 가지도록 구성해주세요.
- 이메일과 비밀번호의 유효성을 확인합니다.
    - 이메일 조건 : 최소 `@`, `.` 포함
    - 비밀번호 조건 : 특수문자 포함 최소 6자 - 최대 16자
    - 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 구현해주세요.
- 회원가입을 통해 사용자(user)를 생성하고 관리합니다.
    - 데이터 통신을 통해 유저를 생성하고 관리해주세요
    - 유저의 회원을 탈퇴할 수 있는 기능을 구현해주세요
    - 로그인된 유저를 인식하여 UI를 다르게 랜더링해주세요
    - 로그인되지 않은 사용자면 회원가입 페이지로 리디렉션 시켜주세요
    - 회원가입시 중복된 유저가 있는지 체크해주세요
- 장바구니 기능을 구현해 주세요
    - 사용자가 장바구니에 항목을 담으면 장바구니 페이지에 랜더링이 되도록 구현해 주세요.

<br>

## 📜 주요 페이지 (구현 기능)

 <details>
 <summary>
  <h3> 🛠 메인 페이지 </h3>
 </summary>
  <img src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/fdc4b94c-2644-45aa-81af-ef479203ce6d" /> 
<pre>
 1. 스와이퍼 기능 구현
 2. 광고 기능 구현
 3. 장바구니 모달창 구현
 4. 최근 본 상품 구현
</pre>

 </details>

<details>
 <summary>
  <h3> 🛠 로그인 페이지 </h3> 
 </summary>
   <img src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/c081b67f-d73f-4917-8d93-b2b4e381e7e3" />
<pre>
 1. 테스트
 2. 테스트2
 3. 테스트3
</pre>
</details>

 <details>
 <summary>
  <h3> 🛠 상품 리스트 페이지 </h3> 
 </summary>
  <img src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/bc28b50e-e69e-4554-adbb-a94a97bc9cc0" />
<pre>
 1. 테스트
 2. 테스트2
 3. 테스트3
</pre>
</details>


<details>
 <summary>
  <h3> 🛠 장바구니 페이지 </h3> 
 </summary>
 
 <img src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/ff3e56f4-d77b-4640-b11c-7b41e07443c4" />
<pre>
 1. 테스트
 2. 테스트2
 3. 테스트3
</pre>
</details>


<details>
 <summary>
  <h3> 🛠 상세 페이지 </h3> 
 </summary>
 <img src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/97c02973-2b21-4b12-b4f4-430ce60422a2" />
<pre>
 1. 테스트
 2. 테스트2
 3. 테스트3
</pre>
</details>

<details>
 <summary>
  <h3> 🛠 회원 가입 페이지 </h3> 
 </summary>
 <img src="https://github.com/FRONTENDSCHOOL8/vanilla-project-8/assets/80308340/8c1cde62-a6fc-446e-a848-4aad13a56593" />
<pre>
 1. 테스트
 2. 테스트2
 3. 테스트3
</pre>
</details>



<br>

## 🏹 디렉토리 구조
<details>
 <summary><h3>디렉토리 구조 보기</h3></summary>
 <pre>
  <code>
   📦src
 ┣ 📂api
 ┃ ┣ 📜defaultAuthData.js
 ┃ ┣ 📜defaultCartData.js
 ┃ ┣ 📜defaultImgData.js
 ┃ ┗ 📜pocketbase.js
 ┣ 📂components
 ┃ ┣ 📂css
 ┃ ┃ ┣ 📜components.css
 ┃ ┃ ┣ 📜reset.css
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂footer
 ┃ ┃ ┣ 📜footer.css
 ┃ ┃ ┗ 📜index.html
 ┃ ┣ 📂header
 ┃ ┃ ┣ 📜header.css
 ┃ ┃ ┣ 📜header.js
 ┃ ┃ ┗ 📜index.html
 ┃ ┗ 📜include.js
 ┣ 📂lib
 ┃ ┣ 📂animation
 ┃ ┃ ┣ 📜dice.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜shake.js
 ┃ ┣ 📂dom
 ┃ ┃ ┣ 📜attr.js
 ┃ ┃ ┣ 📜bindEvent.js
 ┃ ┃ ┣ 📜clear.js
 ┃ ┃ ┣ 📜css.js
 ┃ ┃ ┣ 📜endScroll.js
 ┃ ┃ ┣ 📜getNode.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜insert.js
 ┃ ┃ ┣ 📜showAlert.js
 ┃ ┃ ┗ 📜userList.js
 ┃ ┣ 📂error
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜refError.js
 ┃ ┃ ┣ 📜syntaxError.js
 ┃ ┃ ┗ 📜typeError.js
 ┃ ┣ 📂math
 ┃ ┃ ┣ 📜getRandom.js
 ┃ ┃ ┣ 📜getRandomMinMax.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜toDeg.js
 ┃ ┃ ┗ 📜toRadian.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜color.js
 ┃ ┃ ┣ 📜comma.js
 ┃ ┃ ┣ 📜copy.js
 ┃ ┃ ┣ 📜delay.js
 ┃ ┃ ┣ 📜getPbImageURL.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜memo.js
 ┃ ┃ ┣ 📜setDocumentTitle.js
 ┃ ┃ ┣ 📜storage.js
 ┃ ┃ ┣ 📜tiger.js
 ┃ ┃ ┣ 📜typeOf.js
 ┃ ┃ ┣ 📜validation.js
 ┃ ┃ ┗ 📜xhr.js
 ┃ ┗ 📜index.js
 ┣ 📂pages
 ┃ ┣ 📂address
 ┃ ┃ ┣ 📜address.css
 ┃ ┃ ┣ 📜address.js
 ┃ ┃ ┗ 📜index.html
 ┃ ┣ 📂cart
 ┃ ┃ ┣ 📜cart.css
 ┃ ┃ ┣ 📜cart.js
 ┃ ┃ ┗ 📜index.html
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📜detail.css
 ┃ ┃ ┣ 📜detail.js
 ┃ ┃ ┗ 📜index.html
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜login.css
 ┃ ┃ ┗ 📜login.js
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜main.css
 ┃ ┃ ┗ 📜main.js
 ┃ ┣ 📂product
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜product.css
 ┃ ┃ ┗ 📜product.js
 ┃ ┗ 📂register
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜register.css
 ┃ ┃ ┗ 📜register.js
 ┗ 📂styles
 ┃ ┣ 📜base.css
 ┃ ┣ 📜reset.css
 ┃ ┗ 📜style.css
  </code>
 </pre>
</details>


<br>

## 💜 프로젝트 느낀 점

### 김다영 : 

### 김경민 :

### 김소영 :

### 이동훈 :

<br>

## 💻 실행 방법

### 클론 후, 패키지 설치

```
npm install
```


### 로컬 환경 실행
```
npm run dev
```

## 배포 링크




![footer](https://capsule-render.vercel.app/api?section=footer&type=waving&color=0:FFFFFF,100:5F0080)
