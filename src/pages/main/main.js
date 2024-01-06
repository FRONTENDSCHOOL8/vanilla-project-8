import './main.css';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { getNode } from '/src/lib';

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
