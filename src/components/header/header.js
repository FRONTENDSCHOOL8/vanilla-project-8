import '/src/components/header/header.css';
import { getNode } from '/src/lib/index.js';

export function headerjs() {
  const category = getNode('.nav-capture');
  const category1 = getNode('.nav-capture2');
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
    navMenu2.style.display = 'none';
  }

  function closeAd() {
    ad.style.display = 'none';
  }

  category.addEventListener('mouseover', showNavMenu);
  category.addEventListener('mouseout', closeNavMenu);
  category1.addEventListener('mouseover', showNavMenu2);
  category1.addEventListener('mouseout', closeNavMenu2);
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

  const addPackage = getNode('.ect-menu-add-package');
  const bubble = getNode('.drop-bubble');

  function showBubble() {
    bubble.style.display = 'block';
  }
  function closeBubble() {
    bubble.style.display = 'none';
  }

  addPackage.addEventListener('mouseover', showBubble);
  addPackage.addEventListener('mouseout', closeBubble);

  //모달창 변수들
  const closeBtn = getNode('.button-close');
  const modal = getNode('.modal-bg');
  const heart = getNode('.heart');

  //모달창 함수
  function showModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    modal.classList.add('visible');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('visible');
    window.location.href = '/src/pages/login/index.html';
  }

  //모달창 나타나기, 없애기
  heart.addEventListener('click', showModal);
  closeBtn.addEventListener('click', closeModal);

  const info = getNode('.information');
  function showInformation() {
    const template = /* html */ `
        <ul class="information-ul">
          <li><a href="">공지사항</a></li>
          <li><a href="">자주하는 질문</a></li>
          <li><a href="">1:1 문의</a></li>
          <li><a href="">대량 주문문의</a></li>
        </ul>
      `;

    info.insertAdjacentHTML('beforeend', template);
  }

  function closeInformation() {
    const infoUl = getNode('.information-ul');
    infoUl.remove();
  }
  info.addEventListener('mouseenter', showInformation);
  info.addEventListener('mouseleave', closeInformation);
}
