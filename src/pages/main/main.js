import '/src/pages/main/main.css';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { getNode, getNodes, comma } from '/src/lib/index.js';

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
