import '/src/components/header/header.css';
import { getNode, getStorage, insertLast } from '/src/lib/index.js';

export function headerjs() {
  function clearContents(node) {
    if (typeof node === 'string') node = getNode(node);

    if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
      node.value = '';
      return;
    }

    node.textContent = '';
  }

  //각 네비게이션 메뉴 mouseover, mouseout 시에 나타나게 하는 함수
  const category = getNode('.nav-capture');
  const category1 = getNode('.nav-capture2');
  const navMenu = getNode('.nav-menu-hide1');
  const navMenu2 = getNode('.nav-menu-hide2');
  //맨 위에 있는 보라색 쿠폰 사라지게 하는 함수
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

  //로그인 실패시, 찜하기 눌렀을 경우, 모달창 변수들
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

  //고객센터 쪽 아래 ul 메뉴 나타내기
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

  //주소 버블 보이게 하기
  const showBubble = async () => {
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

  const addPackage = getNode('.ect-menu-add-package');
  const bubble = getNode('.drop-bubble');

  //mouseleave시에 주소 버블 닫게 하기
  function closeBubble() {
    bubble.style.display = 'none';
  }

  addPackage.addEventListener('mouseenter', showBubble);
  addPackage.addEventListener('mouseleave', closeBubble);

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

  setSearchAddressEvent(getNode('.bubble-search-ad'));
}
