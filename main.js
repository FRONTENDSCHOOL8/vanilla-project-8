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
  //로그인 시 보여지는 함수, 로컬스토리지에 연결
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
  // 로그아웃 함수, 로그인시 찜하기 클릭하면 실제 마켓컬리의 찜하기 페이지로 이동
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
}
