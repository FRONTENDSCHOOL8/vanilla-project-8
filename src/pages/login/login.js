import { setDocumentTitle, getNode } from '/src/lib/index.js';
// import gsap from 'gsap';

setDocumentTitle('로그인 - 컬리');

function emailReg(text) {
  // 이메일 형식에 맞게 입력했는지 체크
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text)); // 형식에 맞는 경우에만 true 리턴
}

function pwReg(text) {
  const re = /^[~!@#$%^&a-zA-Z0-9]{6,16}$/;
  return re.test(String(text));
}

//이메일, 패스워드, 로그인 버튼에 각각 클래스와 아이디 찾아서 변수 선언
const email = getNode('#email');
const pw = getNode('#password');
const login = getNode('.btn-login');
const user = {
  id: 'asd@naver.com',
  pw: 'spdlqj123!@',
  //예시임 데이터 베이스 불러 와야함
};
//모달창 변수들
const closeBtn = getNode('.button-close');
const modal = getNode('.modal-bg');

function handleLogin(e) {
  e.preventDefault();
  // 이메일 입력조건과 비밀번호 입력조건중  둘다 만족한 경우 로그인 성공
  emailReg(email.value) && pwReg(pw.value) ? userLogin() : showModal();
}

function userLogin() {
  email.value === user.id && pw.value === user.pw
    ? alert('로그인 성공')
    : //(window.location.href = '/') //로그인 후 메인 html로 돌아와야함
      showModal();
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

login.addEventListener('click', handleLogin);
//모달창 나타나기, 없애기
login.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);
