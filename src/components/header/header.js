import { getNode } from '../../lib/index.js';

const category = getNode('.navigation');
const navMenu = getNode('.nav-menu-hide');

function showNavMenu() {
  navMenu.style.opacity = 1;
}

function closeNavMenu() {
  navMenu.style.opacity = 0;
}

category.addEventListener('mouseover', showNavMenu);
category.addEventListener('mouseout', closeNavMenu);
