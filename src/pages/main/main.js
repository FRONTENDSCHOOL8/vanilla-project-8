import '/src/pages/main/main.css';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import {
  getNode,
  getNodes,
  comma,
  tiger,
  insertLast,
  getStorage,
  setStorage,
  setDocumentTitle,
  getPbImageURL,
} from '/src/lib/index.js';
import defaultAuthData from '/src/api/defaultAuthData';
import defaultImgData from '/src/api/defaultImgData';

setDocumentTitle('메인 페이지');

// swiper 기능 구현

const swiper = new Swiper('.swiper1', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 5000,
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const todaySwiper = new Swiper('.swiper2', {
  direction: 'horizontal',
  loop: true,

  slidesPerView: 4,

  slidesPerGroup: 4,

  pagination: {
    el: '.swiper-pagination2',
    // type: "fraction",
  },

  keyboard: {
    enabled: true, // 키보드 이벤트 활성화
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const todaySwiper2 = new Swiper('.swiper3', {
  direction: 'horizontal',
  loop: true,

  slidesPerView: 4,

  slidesPerGroup: 4,

  pagination: {
    el: '.swiper-pagination2',
    // type: "fraction",
  },

  keyboard: {
    enabled: true, // 키보드 이벤트 활성화
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// db 연동
let arr = [];
let imgArr = [];
async function renderProduct(slicea, sliceb, insert) {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );

  const userData = response.data.items;

  const firstUserData = userData.slice(slicea, sliceb);

  firstUserData.forEach((item, index) => {
    const ratio = item.price * (item.discount * 0.01);

    const discountTemplate =
      item.discount > 0
        ? `<div>
        <span class="discount">${item.discount}%</span>
        <span class="price">${Math.floor(Number(item.price - ratio))}원</span>
        </div>
        <span class="real-price">${item.price}원</span>

        `
        : `<span class="price">${comma(item.price)}원</span>`;

    const template =
      /* html */
      `
      <div class="swiper-slide">
              <a href="/src/pages/detail/index.html#${
                item.id
              }" class = "swiper-link" >
                <div class="today-card">
                  <figure>
                    <div class="card-shop" data-id = ${index}>
                      <img
                        src="${getPbImageURL(item)}"
                        alt="${item.description}"
                      />
                      <input type="button" class="shop-button2 hidden-button" data-index = ${
                        index + slicea
                      } />
                    </div>
                  </figure>

                  <div>
                    <span class="brand">${item.brand}</span>
                    <span class="desc"></span>
                  </div>
                  <span class="discount">${discountTemplate}</span>
                  
                </div>
              </a>
          </div>
  `;
    insertLast(insert, template);

    arr.push(item);
    imgArr.push(getPbImageURL(item));
    // 이벤트 리스너를 추가합니다.
    // shopButton.addEventListener('click', (e) => {
    //   e.preventDefault(); // a 태그의 기본 이동을 방지합니다.
    //   showModal(item); // 현재 상품의 데이터를 모달창 함수에 전달합니다.
    // });

    // 생성된 요소를 DOM에 삽입합니다.
  });
  console.log('가져온 값', response);
  console.log('내용물', userData);
}

renderProduct(0, 12, '.swiper3 > .swiper-wrapper');
renderProduct(0, 12, '.swiper2 > .swiper-wrapper');

// function showModal(item) {
//   const ratio = item.price * (item.discount * 0.01);

//   const modal = getNode('.add-cart');
//   console.log('모달창', arr);
//   modal.innerHTML = `
//   <p>가격: ${comma(item.price)}</p>

//         <div>
//           <span class="add-cart-name"
//             >${item.brand}</span
//           >
//         </div>

//         <div class="add-cart-sum">
//           <div class="price-list">
//             <span class="cart-price">${comma(item.price - ratio)}원</span>
//             <span class="cart-realprice">${item.price}원</span>
//           </div>
//           <div class="count-button-list">
//             <button
//               type="button"
//               aria-label="수량 감소"
//               class="minus-button hidden-button"
//             ></button>
//             <span class="count">1</span>
//             <button
//               type="button"
//               aria-label="수량 증가"
//               class="plus-button hidden-button"
//             ></button>
//           </div>
//         </div>

//         <div class="sum">
//           <span class="sum-name">합계</span>
//           <span class="sum-value">${item.price - ratio}원</span>
//         </div>

//         <div class="point">
//           <div class="point-badge">적립</div>
//           <span class="point-text">구매 시 5원 적립</span>
//         </div>

//         <div class="cart-button-list">
//           <button type="button" class="cart-button-cancel" value="cancel">
//             취소
//           </button>
//           <button type="button" class="cart-button-add">장바구니 담기</button>
//         </div>
//     </div>
//   `;

//   modal.style.display = 'flex';
// });

// document.addEventListener("keydown", function (e) {
//   // 첫 번째 Swiper에 대한 키보드 이벤트 처리
//   if (document.activeElement === document.body) {
//     swiper1.keyboard.handleKeyboard(e);
//   }

//   // 두 번째 Swiper에 대한 키보드 이벤트 처리
//   if (document.activeElement === document.body) {
//     swiper2.keyboard.handleKeyboard(e);
//   }
// });
let popupClose = getNode('.popup-button-close');
const popup = getNode('.popup-modal');

// 다이얼로그 버튼 이벤트 구현
let modal = document.querySelector('.shop-list');

function hideDialog(e) {
  const dialogBtn = e.target.value;
  const dialog = e.currentTarget;

  if (dialogBtn === 'cancel') {
    // popup.style.display = 'none';
    dialog.style.display = 'none';
    // modal.style.position = 'none';
    modal.style.display = 'none';

    console.log('테스트', dialog);
  }

  if (e.target.matches('.cart-button-add')) {
    console.log('장바구니 테스트');
    addRecentProduct();
  }
}

popup.addEventListener('click', hideDialog);

// shop 버튼 닫기 이벤트

let dialogClose = getNode('.add-cart');

dialogClose.addEventListener('click', hideDialog);

// shop 버튼 클릭 이벤트

let cartBtn = document.querySelectorAll('.shop-button2');

function viewDialog(e) {
  const addCart = getNode('.add-cart');
  if (e.target.matches('.shop-button2')) {
    e.preventDefault();

    dialogClose.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.display = 'block';

    const buttonIndex = e.target.dataset.index;
    const itemList = arr[buttonIndex];

    console.log(buttonIndex, itemList);
    console.log(typeof buttonIndex, '현재 arr', arr);
    const dialogBtn = e.target.currentTarget;

    const ratio = itemList.price * (itemList.discount * 0.01);

    addCart.innerHTML =
      /* html */
      `
    <div>
    <span class="add-cart-name"
      >${itemList.brand}</span
    >
  </div>

  <div class="add-cart-sum">
    <div class="price-list">
      <span class="cart-price">${Math.floor(
        Number(itemList.price - ratio)
      )}원</span>
      <span class="cart-realprice">${itemList.price}원</span>
    </div>
    <div class="count-button-list">
      <button
        type="button"
        aria-label="수량 감소"
        class="minus-button hidden-button"
      ></button>
      <span class="count">1</span>
      <button
        type="button"
        aria-label="수량 증가"
        class="plus-button hidden-button"
      ></button>
    </div>
  </div>

  <div class="sum">
    <span class="sum-name">합계</span>
    <span class="sum-value">${Math.floor(
      Number(itemList.price - ratio)
    )}원</span>
  </div>

  <div class="point">
    <div class="point-badge">적립</div>
    <span class="point-text">구매 시 5원 적립</span>
  </div>

  <div class="cart-button-list">
    <button type="button" class="cart-button-cancel" value="cancel">
      취소
    </button>
    <button type="button" class="cart-button-add">장바구니 담기</button>
  </div>
    `;
    // console.log(dialogBtn);
  }
}

cartBtn.forEach(function (cartBtn) {
  cartBtn.addEventListener('click', viewDialog);
});

let swiperBtntest2 = getNode('.swiper2');
let swiperBtntest3 = getNode('.swiper3');

swiperBtntest2.addEventListener('click', viewDialog);
swiperBtntest3.addEventListener('click', viewDialog);

const plusButton = getNode('.plus-button');
const minusButton = getNode('.minus-button');
const addCart = getNode('.add-cart');
// const count = getNode('.count');
// const sum = getNode('.sum-value');

function plusCount(e) {
  const count = e.target.closest('.add-cart').querySelector('.count');
  const sum = e.target.closest('.add-cart').querySelector('.sum-value');

  if (e.target.matches('.plus-button')) {
    // console.log('참');
    let number = count.innerText;
    if (number < 2) {
      number = parseInt(number) + 1;
      // console.log(number);
      let sumvalue = sum.innerText;
      let sumvalues = parseInt(sumvalue);
      // dP
      sumvalue = parseInt(sumvalue) + parseInt(sumvalue);
      count.innerText = number;
      sum.innerText = sumvalue + '원';
    }
  }
}

function minusCount(e) {
  const count = e.target.closest('.add-cart').querySelector('.count');
  const sum = e.target.closest('.add-cart').querySelector('.sum-value');
  if (e.target.matches('.minus-button')) {
    // console.log('거짓');
    let number = count.innerText;
    if (number > 1) {
      number = parseInt(number) - 1;
      // console.log(number);
      let sumvalue = sum.innerText;
      let sumvalues = parseInt(sumvalue);
      if (number !== 1) {
        sumvalue = parseInt(sumvalue) / number;
      } else {
        sumvalue = parseInt(sumvalue) - sumvalues / 2;
      }
      count.innerText = number;
      sum.innerText = sumvalue + '원';
    }
  }
}

addCart.addEventListener('click', plusCount);
addCart.addEventListener('click', minusCount);

// function a() {
//   let recentAdd = JSON.parse(localStorage.getItem('recent')) || [];
//   recentAdd.push({ img: arr[0].photo, url: '/src/pages/detail/index.html' });
//   let result = [...new Set(recentAdd)];

//   localStorage.setItem('recent', JSON.stringify(result));
// }

// a();

// 함수 호출

// 버튼 이벤트 등록
const hideToday = getNode('.popup-button-today');

hideToday.addEventListener('click', function () {
  // 현재 날짜를 로컬 스토리지에 저장
  let today = new Date();
  localStorage.setItem('hidePopup', today.toDateString());
  hidePopup();
});

function hidePopup() {
  // 팝업 요소를 숨김
  popup.style.display = 'none';
}

// 페이지 로드 시 팝업 확인
window.onload = function () {
  let hideDate = localStorage.getItem('hidePopup');
  let today = new Date();

  // 로컬 스토리지의 날짜와 오늘의 날짜가 같으면 팝업을 숨김
  if (hideDate === today.toDateString()) {
    hidePopup();
  }
};

let arrs = [];
function addRecentProduct(e) {
  if (!localStorage.getItem('recent')) {
    setStorage('recent', defaultImgData);
  }
  if (!e.target.matches('.shop-button2')) {
    // e.preventDefault();
    const buttonId = e.target.parentNode.dataset.id;

    console.log(arr[buttonId].id, imgArr[buttonId]);

    let recentList = JSON.parse(localStorage.getItem('recent'));
    recentList = JSON.parse(recentList);
    // console.log('id 테스트', arr['1'].id);
    // console.log('url :', imgArr['1']);
    // setStorage('recent', JSON.stringify(defaultImgData));

    // console.log(recnetList);

    recentList.push({ id: arr[buttonId].id, img: imgArr[buttonId] });

    if (recentList.length > 3) {
      recentList.shift(); // 배열의 첫 번째 요소 제거
    }
    // recentList.push();

    setStorage('recent', JSON.stringify(recentList));

    recentList = JSON.parse(recentList);
    let recentLength = recentList.length - 1;
    console.log(recentList.lenght);
    console.log(recentLength);
    console.log('테스트', recentList[recentLength].id);

    // 뽑아와서 그 값을 통해 a 태그 생성

    const templateLink =
      /* html */
      `
    <li>
      <a href="/src/pages/detail/index.html#${recentList[recentLength].id}">
          <img
            src="${recentList[recentLength].img}"
          />
      </a>
    </li>
    `;

    // alt="${arr[buttonId].brand}"
    insertLast('.recent-list > ul', templateLink);
  }
  // const recentList = JSON.parse(localStorage.getItem('recent'));
  // console.log(recentList);
}

function loadRecentProducts() {
  let recentList = JSON.parse(localStorage.getItem('recent') || '[]');
  console.log(recentList);
  console.log(typeof recentList);
  recentList = JSON.parse(recentList);

  recentList.forEach((product) => {
    const templateLink = `
      <li>
        <a href="/src/pages/detail/index.html#${product.id}">
          <img src="${product.img}" alt="상품 이미지" />
        </a>
      </li>
    `;
    insertLast('.recent-list > ul', templateLink);
  });
}

// 페이지 로드 완료 시 loadRecentProducts 함수 호출
document.addEventListener('DOMContentLoaded', loadRecentProducts);
// function addRecentProduct(e) {
//   let recentList;

//   if (!localStorage.getItem('recent')) {
//     setStorage('recent', JSON.stringify(defaultImgData));
//     recentList = defaultImgData;
//   } else {
//     recentList = JSON.parse(localStorage.getItem('recent'));
//   }

//   recentList.push({ img: imgArr['0'], id: arr['0'].id });
//   setStorage('recent', JSON.stringify(recentList));
// }

const swiperLink = document.querySelector('.swiper2');
const swiperLink2 = document.querySelector('.swiper3');
swiperLink.addEventListener('click', addRecentProduct);
swiperLink2.addEventListener('click', addRecentProduct);

// 모달창을 가져옵니다.
// let modal = document.querySelector('.shop-list');

// // 사용자가 모달창 외부를 클릭하면 모달창이 닫히지 않도록 합니다.
// window.onclick = function (event) {
//   if (event.target == modal) {
//     event.stopPropagation();
//   }
// };

// // "취소" 버튼을 클릭하면 모달창이 닫히도록 합니다.
// document.querySelector('.cart-button-cancel').onclick = function () {
//   modal.style.display = 'none';
// };
