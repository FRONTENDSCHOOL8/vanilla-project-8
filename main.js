// import "/src/style/style.css";
import pb from '/src/api/pocketbase.js';
import defaultAuthData from '/src/api/defaultAuthData';
import { getNode, getStorage, setStorage, getPbImageURL } from '/src/lib/';

function clearContents(node) {
  if (typeof node === 'string') node = getNode(node);

  if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
    node.value = '';
    return;
  }

  node.textContent = '';
}

export async function mainjs() {
  if (localStorage.getItem('auth')) {
    const { isAuth, user } = await getStorage('auth');
    if (isAuth) {
      const headerRight = getNode('.header-right');
      clearContents(headerRight);
      const template = /* html */ `
      <li>
      <div class="userName">웰컴 ${user.name}님😘</div>
          </li>
          <li>
            <span class="divider" aria-hidden="true">|</span>
            <button class="logout" type="button">로그아웃</button>
          </li>

          <li>
            <span class="divider" aria-hidden="true">|</span>
            <a class="information" href="/"
              >고객센터
              <img src="/images/header/Icon_down.png" alt="" />
            </a>
          </li>
    `;

      headerRight.insertAdjacentHTML('beforeend', template);
    }
  }

  const logout = getNode('.logout');
  const heart = getNode('.heart');
  if (logout) {
    logout.addEventListener('click', () => {
      pb.authStore.clear();
      setStorage('auth', defaultAuthData);
      window.location.reload();
    }),
      heart.addEventListener('click', () => {
        window.location.href = 'https://www.kurly.com/mypage/pick/list';
      });
  }

  //여기서부터 장바구니 구현
  function renderProductData2() {
    const bubble2 = getNode('.drop-bubble2');
    const cart = getNode('.add-cart');

    const showBubble2 = async () => {
      let template;
      const cartInfo = JSON.parse(localStorage.getItem('cart'));

      if (cartInfo) {
        // cartInfo의 마지막 요소를 가져옵니다.
        const lastItem = cartInfo[cartInfo.length - 1];
        const { brand } = lastItem;
        console.log(lastItem);

        const bubbleText = getNode('.bubble-text2');
        if (bubbleText) {
          clearContents(bubbleText);
        }

        template = /* html */ `
  <div class="bubble-text2">
    <img width="40" height="45" src="${getPbImageURL(
      lastItem
    )}" alt="상품이미지" />
    <div class="bubble-text2-text">
      <p>${brand}</p>
      <span>장바구니에 상품을 담았습니다.</span>
    </div>
  </div>
  `;
        bubble2.insertAdjacentHTML('beforeend', template);

        // 3초 후에 bubbleText를 제거합니다.
        setTimeout(() => {
          if (bubbleText) bubble2.removeChild(bubbleText);
        }, 3000);
      }
    };
    cart.addEventListener('click', showBubble2);
  }
  renderProductData2();
}
