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

// db 연동

async function renderProduct(slicea, sliceb, insert) {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );

  const userData = response.data.items;

  const firstUserData = userData.slice(slicea, sliceb);

  firstUserData.forEach((item) => {
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
                <div class="today-card">
                  <figure>
                    <div class="card-shop">
                      <img
                        src="${getPbImageURL(item)}"
                        alt="${item.description}"
                      />
                      <input type="button" class="shop-button2 hidden-button" />
                    </div>
                  </figure>

                  <div>
                    <span class="brand">${item.brand}</span>
                    <span class="desc"></span>
                  </div>
                  <span class="discount">${discountTemplate}</span>
                  
                                  </div>
              </div>
  `;
    insertLast(insert, template);
  });
  console.log('가져온 값', response);
  console.log('내용물', userData);
}

renderProduct(0, 12, '.swiper3 > .swiper-wrapper');
// renderProduct(13, 25, '.swiper2 > .swiper-wrapper');

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

let cartBtn = document.querySelectorAll('.shop-button2');

function viewDialog(e) {
  dialogClose.style.display = 'flex';
  const dialogBtn = e.target.currentTarget;
  console.log(dialogBtn);
}

cartBtn.forEach(function (cartBtn) {
  cartBtn.addEventListener('click', viewDialog);
});

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
