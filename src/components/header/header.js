import '/src/components/header/header.css';
import { getNode, getStorage } from '/src/lib/index.js';

/**
 * TODO: 함수 컨텍스트는 실행할 때마다 새로 생성됩니다.
 * 그래서 함수 안에 함수를 선언하는 동작은 피하는 것이 좋습니다.
 * 메모리 낭비는 물론이거니와 방대한 컨텍스트(이야기의 흐름)을 무분별하게 공유하게 됩니다.
 * 함수의 입력값과 출력값을 정의하는 훈련을 많이 하는 것이 좋습니다.
 * 그렇지 않으면 하나의 코드가 800~900줄을 넘어가는 것은 시간문제일 것입니다.
 * 본인의 커리어와 취업을 위해 함수를 입력값과 출력값을 선언하는 연습을 많이 해 보시길 권합니다.
 * 반면에 기능을 함수 단위로 명확하게 분리하신 것이 매우 인상적입니다. 추상화를 상당히 이해하신 것 같습니다.
 */

function clearContents(node) {
  if (typeof node === 'string') node = getNode(node);

  if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
    node.value = '';
    return;
  }

  node.textContent = '';
}

function showNavMenu() {
  const navMenu = getNode('.nav-menu-hide1');
  navMenu.style.display = 'block';
}

function closeNavMenu() {
  const navMenu = getNode('.nav-menu-hide1');
  navMenu.style.display = 'none';
}

function showNavMenu2() {
  const navMenu2 = getNode('.nav-menu-hide2');
  navMenu2.style.display = 'block';
}


function closeNavMenu2() {
  const navMenu2 = getNode('.nav-menu-hide2');
  navMenu2.style.display = 'none';
}

function closeAd() {
  const ad = getNode('.header-ad');
  ad.style.display = 'none';
  // 광고가 닫혔다는 정보를 localStorage에 저장합니다.
  localStorage.setItem('adClosed', 'true');
}

function checkAdStatus() {
  const ad = getNode('.header-ad');
  // 페이지 로딩 시 광고 닫힘 상태를 확인합니다.
  const isAdClosed = localStorage.getItem('adClosed');
  if (isAdClosed === 'true') {
    ad.style.display = 'none';
  }
}

//모달창 함수
function showModal(e) {
  e.preventDefault();
  const modal = getNode('.modal-bg');
  modal.classList.remove('hidden');
  modal.classList.add('visible');
}

function closeModal() {
  const modal = getNode('.modal-bg');
  modal.classList.add('hidden');
  modal.classList.remove('visible');
  window.location.href = '/src/pages/login/index.html';
}

function showInformation() {
  const info = getNode('.information');
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


const setSearchAddressEvent = (target, callback) => {
  target.addEventListener('click', handleSetAddress(callback));
};

// 주소지 검색 작은 창에서 검색할 수 있도록 만들기
const handleSetAddress = (callback) => {
  return () => {
    const width = 502;
    const height = 547;
    const popupX = screen.width / 2 - width / 2;
    const popupY = screen.height / 2 - height / 2;
    window.open(
        '/src/pages/address/',
        '_blank',
        `width=${width},height=${height},left=${popupX},top=${popupY}`
    );

    if (callback) callback();
  };
};

//주소 버블 보이게 하기
const showBubble = async () => {
  const bubble = getNode('.drop-bubble');
  let template;
  const address = JSON.parse(await getStorage('address'));

  if (!address) {
    bubble.style.display = 'block';
  } else {
    clearContents(bubble);
    bubble.style.display = 'block';
    template = /* html */ `
      <div class="bubble-text">
      <p>${address['address']} ${address['detail-address']}</p>
    <span class="bubble-text-package">샛별배송</span><br />
      <button class="bubble-search-ad" type="button" >
        배송지 변경
      </button>
  </div>
  `;
    bubble.insertAdjacentHTML('beforeend', template);
    setSearchAddressEvent(getNode('.bubble-search-ad'));
  }
};

const onscroll = function () {
  const category2 = getNode('.fixed2');
  const header = getNode('.header');
  let headerHeight = header.offsetHeight;

  let windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    category2.classList.add('drop');
    category2.style.display = 'block';
  } else {
    category2.classList.remove('drop');
    category2.style.display = 'none';
  }
};

//mouseleave시에 주소 버블 닫게 하기
function closeBubble() {
  const bubble = getNode('.drop-bubble');
  bubble.style.display = 'none';
}

export function headerjs() {
  //각 네비게이션 메뉴 mouseover, mouseout 시에 나타나게 하는 함수
  const category = getNode('.nav-capture');
  category.addEventListener('mouseover', showNavMenu);
  category.addEventListener('mouseout', closeNavMenu);

  const category1 = getNode('.nav-capture2');
  category1.addEventListener('mouseover', showNavMenu2);
  category1.addEventListener('mouseout', closeNavMenu2);

  //맨 위에 있는 보라색 쿠폰 사라지게 하는 함수
  const button = getNode('.header-ad-btn');
  button.addEventListener('click', closeAd);

  // 페이지 로딩 시 광고 상태를 확인합니다.
  checkAdStatus();

  // 아래는 스크롤에 따라 내려가면 카테고리 변화하는 코드
  window.onscroll = onscroll;

  //로그인 실패시, 찜하기 눌렀을 경우, 모달창 변수들
  const closeBtn = getNode('.button-close');
  closeBtn.addEventListener('click', closeModal);

  //모달창 나타나기, 없애기
  const heart = getNode('.heart');
  heart.addEventListener('click', showModal);

  //고객센터 쪽 아래 ul 메뉴 나타내기
  const info = getNode('.information');
  info.addEventListener('mouseenter', showInformation);
  info.addEventListener('mouseleave', closeInformation);

  const addPackage = getNode('.ect-menu-add-package');
  addPackage.addEventListener('mouseenter', showBubble);
  addPackage.addEventListener('mouseleave', closeBubble);

  setSearchAddressEvent(getNode('.bubble-search-ad'));
}
