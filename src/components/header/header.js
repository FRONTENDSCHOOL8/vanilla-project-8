import { getNode } from '../../lib/index.js';

const category = getNode('.nav-menu-ul');
const navMenu = getNode('.nav-menu-hide1');
const navMenu2 = getNode('.nav-menu-hide2');
const button = getNode('.header-ad-btn');
const ad = getNode('.header-ad');

function showNavMenu() {
  navMenu.style.opacity = 1;
  navMenu2.style.opacity = 1;
}

function closeNavMenu() {
  navMenu.style.opacity = 0;
  navMenu2.style.opacity = 0;
}

function closeAd() {
  ad.style.display = 'none';
  navMenu.style.top = '150px';
  navMenu2.style.top = '230px';
}

// category.addEventListener('mouseenter', showNavMenu);
// navMenu.addEventListener('mouseenter', showNavMenu);
// navMenu2.addEventListener('mouseenter', showNavMenu);
// category.addEventListener('mouseleave', closeNavMenu);
// navMenu.addEventListener('mouseleave', closeNavMenu);
// navMenu2.addEventListener('mouseleave', closeNavMenu);
button.addEventListener('click', closeAd);

const header = getNode('.header');
const category2 = getNode('.fixed2');
const nav = getNode('.navigation');
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
//
