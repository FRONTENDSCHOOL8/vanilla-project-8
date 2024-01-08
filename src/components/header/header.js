import { getNode } from '../../lib/index.js';

const category = getNode('.nav-category');
const navMenu = getNode('.nav-menu-hide1');
const navMenu2 = getNode('.nav-menu-hide2');
const button = getNode('.header-ad-btn');
const ad = getNode('.header-ad');

function showNavMenu() {
  navMenu.style.display = 'block';
}
function showNavMenu2() {
  navMenu2.style.display = 'block';
}

function closeNavMenu() {
  navMenu.style.display = 'none';
}
function closeNavMenu2() {
  navMenu2.style.opacity = 'none';
}

function closeAd() {
  ad.style.display = 'none';
}

category.addEventListener('mouseenter', showNavMenu);
category.addEventListener('mouseleave', closeNavMenu);
navMenu2.addEventListener('mouseenter', showNavMenu2);
navMenu2.addEventListener('mouseleave', closeNavMenu2);
button.addEventListener('click', closeAd);

// 아래는 스크롤에 따라 내려가면 카테고리 변화하는 코드

const header = getNode('.header');
const category2 = getNode('.fixed2');
let headerHeight = header.offsetHeight;

window.onscroll = function () {
  let windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    category2.classList.add('drop');
    category2.style.display = 'block';
  } else {
    category2.classList.remove('drop');
    category2.style.display = 'none';
  }
};
