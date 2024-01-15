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

import pb from '/src/api/pocketbase';

// setDocumentTitle('메인 페이지');

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

  // keyboard: {
  //   enabled: true,
  // },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// db 데이터를 가져와 동적 렌더링 실행
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

    // 생성된 요소를 DOM에 삽입합니다.
  });
}

renderProduct(0, 12, '.swiper3 > .swiper-wrapper');
renderProduct(0, 12, '.swiper2 > .swiper-wrapper');

const popup = getNode('.popup-modal');

// 다이얼로그 버튼 이벤트 구현
let modal = document.querySelector('.shop-list');

function hideDialog(e) {
  const dialogBtn = e.target.value;
  const dialog = e.currentTarget;

  if (dialogBtn === 'cancel') {
    dialog.style.display = 'none';
    modal.style.display = 'none';
  }

  if (e.target.matches('.cart-button-add')) {
    const cartIndex = e.target.dataset.index;
    const cartId = arr[cartIndex].id;
    console.log(cartId);
    renderProductData(cartId);
    dialog.style.display = 'none';
    modal.style.display = 'none';
  }
}

popup.addEventListener('click', hideDialog);

// shop 버튼 닫기 이벤트

let dialogClose = getNode('.add-cart');

dialogClose.addEventListener('click', hideDialog);

// shop 버튼 클릭 이벤트

let cartBtn = document.querySelectorAll('.shop-button2');

// 장바구니 다이얼로그 동적 렌더링
function viewDialog(e) {
  const addCart = getNode('.add-cart');
  if (e.target.matches('.shop-button2')) {
    e.preventDefault();

    dialogClose.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.display = 'block';

    const buttonIndex = e.target.dataset.index;
    const itemList = arr[buttonIndex];

    const ratio = itemList.price * (itemList.discount * 0.01);

    addCart.innerHTML = '';
    const htmlAddCart =
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
    <button type="button" class="cart-button-add" data-index = ${buttonIndex}>장바구니 담기</button>
  </div>
    `;
    addCart.insertAdjacentHTML('beforeend', htmlAddCart);
  }
}

cartBtn.forEach(function (cartBtn) {
  cartBtn.addEventListener('click', viewDialog);
});

let swiperBtntest2 = getNode('.swiper2');
let swiperBtntest3 = getNode('.swiper3');

swiperBtntest2.addEventListener('click', viewDialog);
swiperBtntest3.addEventListener('click', viewDialog);

const addCart = getNode('.add-cart');

function plusCount(e) {
  const count = e.target.closest('.add-cart').querySelector('.count');
  const sum = e.target.closest('.add-cart').querySelector('.sum-value');

  if (e.target.matches('.plus-button')) {
    let number = count.innerText;
    if (number < 2) {
      number = parseInt(number) + 1;
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

// 최근 본 상품 렌더링

function addRecentProduct(e) {
  if (!localStorage.getItem('recent')) {
    setStorage('recent', JSON.stringify([]));
  }
  if (!e.target.matches('.shop-button2')) {
    // e.preventDefault();
    const buttonId = e.target.parentNode.dataset.id;

    let recentList = JSON.parse(localStorage.getItem('recent'));
    recentList = JSON.parse(recentList);

    recentList.push({ id: arr[buttonId].id, img: imgArr[buttonId] });

    if (recentList.length > 3) {
      recentList.shift(); // 배열의 첫 번째 요소 제거
    }

    setStorage('recent', JSON.stringify(recentList));

    recentList = JSON.parse(recentList);
    let recentLength = recentList.length - 1;

    // 뽑아와서 그 값을 통해 a 태그 생성
  }
}

const swiperLink = document.querySelector('.swiper2');
const swiperLink2 = document.querySelector('.swiper3');
swiperLink.addEventListener('click', addRecentProduct);
swiperLink2.addEventListener('click', addRecentProduct);

// localStorage 저장소의 내용을 통해 최근 본 상품 불러오기
function loadRecentProducts() {
  let recentList = JSON.parse(localStorage.getItem('recent') || '[]');

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

async function renderProductData(item) {
  const productData = await pb.collection('products').getOne(item);
  console.log(productData);
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  // function sendToCart() {
  let cartData = JSON.parse(localStorage.getItem('cart'));
  if (!Array.isArray(cartData)) {
    cartData = [];
  }
  cartData.push(productData);
  localStorage.setItem('cart', JSON.stringify(cartData));
  // }
}
