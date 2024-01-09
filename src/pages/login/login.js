// import './login.css';
import PocketBase from 'pocketbase';
import pb from '/src/api/pocketbase.js';
import {
  setDocumentTitle,
  getNode,
  getStorage,
  setStorage,
} from '/src/lib/index.js';

setDocumentTitle('로그인 - 컬리');

function emailReg(text) {
  // 이메일 형식에 맞게 입력했는지 체크
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text)); // 형식에 맞는 경우에만 true 리턴
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text));
}

//이메일, 패스워드, 로그인 버튼에 각각 클래스와 아이디 찾아서 변수 선언
const id = getNode('#email').value;
const pw = getNode('#password').value;
const login = getNode('.btn-login');
const login2 = getNode('.btn-login-wrapper');
//모달창 변수들
const closeBtn = getNode('.button-close');
const modal = getNode('.modal-bg');

function handleLogin1(e) {
  e.preventDefault();
  // 이메일 입력조건과 비밀번호 입력조건중  둘다 만족한 경우 로그인 성공
  emailReg(id) && pwReg(pw) ? handleLogin2() : showModal();
}

async function handleLogin2(e) {
  e.preventDefault();
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
login2.addEventListener('click', handleLogin1);
//모달창 나타나기, 없애기
login.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);
