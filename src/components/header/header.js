import { getNode } from '../../lib/index.js';

const category = getNode('.nav-category');
const navMenu = getNode('.nav-menu-hide');
const button = getNode('.header-ad-btn');
const ad = getNode('.header-ad');

function showNavMenu() {
  navMenu.style.opacity = 1;
}

function closeNavMenu() {
  navMenu.style.opacity = 0;
}

function closeAd() {
  ad.style.display = 'none';
  navMenu.style.top = '150px';
}

category.addEventListener('mouseenter', showNavMenu);
navMenu.addEventListener('mouseenter', showNavMenu);
category.addEventListener('mouseleave', closeNavMenu);
navMenu.addEventListener('mouseleave', closeNavMenu);
button.addEventListener('click', closeAd);

const header = getNode('.header');
let headerHeight = header.offsetHeight;

window.onscroll = function () {
  let windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    header.classList.add('drop');
    header.classList.add('fixed2');
  } else {
    header.classList.remove('drop');
    header.classList.remove('fixed2');
  }
};
//
