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

category.addEventListener('mouseover', showNavMenu);
navMenu.addEventListener('mouseover', showNavMenu);
category.addEventListener('mouseout', closeNavMenu);
navMenu.addEventListener('mouseout', closeNavMenu);
button.addEventListener('click', closeAd);
