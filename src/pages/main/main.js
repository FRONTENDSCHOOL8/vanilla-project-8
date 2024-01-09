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
        <span class="price">${comma(item.price - ratio)}원</span>
        </div>
        <span class="real-price">${item.price}원</span>

        `
        : `<span class="price">${comma(item.price)}원</span>`;

    const template =
      /* html */
      `
      <div class="swiper-slide">
              <a href="/src/pages/detail/index.html">
                <div class="today-card">
                  <figure>
                    <div class="card-shop">
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
renderProduct(13, 25, '.swiper2 > .swiper-wrapper');

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

function hideDialog(e) {
  const dialogBtn = e.target.value;
  const dialog = e.currentTarget;

  if (dialogBtn === 'cancel') {
    // popup.style.display = 'none';
    dialog.style.display = 'none';
    console.log(dialog);
  }
}

popup.addEventListener('click', hideDialog);

// shop 버튼 닫기 이벤트

let dialogClose = getNode('.add-cart');

dialogClose.addEventListener('click', hideDialog);

// shop 버튼 클릭 이벤트

let cartBtn = document.querySelectorAll('.shop-button2');

function viewDialog(e) {
  e.preventDefault();

  const addCart = getNode('.add-cart');

  if (e.target.matches('.shop-button2')) {
    dialogClose.style.display = 'flex';
    const dialogBtn = e.target.currentTarget;
    const itemList = arr[0];

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
      <span class="cart-price">${itemList.price - ratio}원</span>
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
    <span class="sum-value">${itemList.price - ratio}원</span>
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
const count = getNode('.count');
const sum = getNode('.sum-value');

function plusCount() {
  let number = count.innerText;
  if (number <= 2) {
    number = parseInt(number) + 1;
    console.log(number);
    let sumvalue = sum.innerText;
    sumvalue = parseInt(sumvalue) + parseInt(sumvalue);
    count.innerText = number;
    sum.innerText = sumvalue + '원';
  }
}

function minusCount() {
  let number = count.innerText;
  if (number > 1) {
    number = parseInt(number) - 1;
    console.log(number);
    let sumvalue = sum.innerText;
    if (number !== 1) {
      sumvalue = parseInt(sumvalue) / number;
    } else {
      sumvalue = parseInt(sumvalue) - parseInt(sumvalue) / 2;
    }
    count.innerText = number;
    sum.innerText = sumvalue + '원';
  }
}

plusButton.addEventListener('click', plusCount);
minusButton.addEventListener('click', minusCount);
