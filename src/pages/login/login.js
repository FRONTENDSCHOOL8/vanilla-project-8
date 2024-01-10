// import './login.css';
import PocketBase from 'pocketbase';
import pb from '/src/api/pocketbase.js';
import {
  setDocumentTitle,
  getNode,
  getStorage,
  setStorage,
  emailReg,
  pwReg,
} from '/src/lib/index.js';

setDocumentTitle('로그인 - 컬리');

//이메일, 패스워드, 로그인 버튼에 각각 클래스와 아이디 찾아서 변수 선언

const emailInput = getNode('#email');
const passwordInput = getNode('#password');

let emailValue = '';
let passwordValue = '';

emailInput.addEventListener('input', () => (emailValue = emailInput.value));

passwordInput.addEventListener(
  'input',
  () => (passwordValue = passwordInput.value)
);

const login = getNode('.btn-login');

//모달창 변수들
const closeBtn = getNode('.button-close');
const modal = getNode('.modal-bg');

//모달창 함수
function showModal() {
  modal.classList.remove('hidden');
  modal.classList.add('visible');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('visible');
}

//유효성 검사와 등록된 id,pw 로 로그인 하기
login.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(emailValue, passwordValue);

  if (emailReg(emailValue) && pwReg(passwordValue)) {
    handleLogin2();
  } else {
    showModal();
  }
});

async function handleLogin2() {
  const id = emailInput.value;
  const pw = passwordInput.value;
  try {
    const userData = await pb.collection('users').authWithPassword(id, pw);
    // dayeong@naver.com 비번 다영123!@
    const { model, token } = await getStorage('pocketbase_auth');

    setStorage('auth', {
      isAuth: !!model,
      //!!token이어도 상관없음
      user: model,
      token,
    });

    alert('로그인 완료! 메인페이지로 이동합니다.');

    window.location.href = '/index.html';
  } catch {
    alert('인증된 사용자가 아닙니다.');
  }
}

//모달창 나타나기, 없애기
closeBtn.addEventListener('click', closeModal);

const addPackage = getNode('.add-package');
const bubble = getNode('.drop-bubble');

function showBubble() {
  bubble.style.opacity = 1;
}

addPackage.addEventListener('mouseover', showBubble);
//뭐가 틀렸지? 안 나타난다...
