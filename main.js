// import "/src/style/style.css";
import pb from '/src/api/pocketbase.js';
import defaultAuthData from '/src/api/defaultAuthData';
import {
  getNode,
  getStorage,
  insertLast,
  deleteStorage,
  setStorage,
} from '/src/lib/';

export async function mainjs() {
  if (localStorage.getItem('auth')) {
    const { isAuth, user } = await getStorage('auth');
    console.log(isAuth, user);
    if (isAuth) {
      const template = /* html */ `
      <div class="userName">웰컴 ${user.name}님😘</div>
      <button class="logout" type="button">로그아웃</button>
    `;
      const headerRight = getNode('.header-right');
      console.log(headerRight);
      headerRight.insertAdjacentHTML('beforeend', template);
    }
  }

  const logout = getNode('.logout');

  if (logout) {
    logout.addEventListener('click', () => {
      pb.authStore.clear();
      //왜 콜백함수로 가져왔었죠?
      // deleteStorage("auth");
      setStorage('auth', defaultAuthData);
      //리액트에서는 부분적으로 리로드를 명령어 없이도 자동실행해준다
      window.location.reload();
    });
  }
}
