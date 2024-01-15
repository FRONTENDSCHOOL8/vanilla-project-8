// import validation from '/src/lib/utils/validation';

/* -------------------------------------------------------------------------- */
/*                                     id                                     */
/* -------------------------------------------------------------------------- */

const id = document.querySelector('#id');
const idMessageFormat = document.querySelector('.id .message.format');

function verifyId(){
  if(idReg(this.value)) idMessageFormat.classList.remove('show');
  else idMessageFormat.classList.add('show');
}

function idReg(text){
  const re=/^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,16}$/;
  return re.test(String(text));
}

id.addEventListener('input',verifyId);


/* -------------------------------------------------------------------------- */
/*                                     pwd                                    */
/* -------------------------------------------------------------------------- */

const pwd = document.querySelector("#pwd");
const pwdMessageFormat = document.querySelector(".pwd .message.format");
const pwdMessageLength = document.querySelector(".pwd .message.length");

function handlePwd(){
  let once = false;

  return function(){
    // 아래 조건문은 맨 처음 input 시에만 작동함. 
    // (처음에는 once가 undefined이어서 조건문 작동, 나중에는 once가 계속 true임.)
    if(!once) once=true;

    if(this.value.length<10){
      if(once && this.value===''){
        pwdMessageFormat.classList.add("show");
        pwdMessageLength.classList.remove("show");
      }
      else{
        pwdMessageLength.classList.add("show");
        pwdMessageFormat.classList.remove("show");
      }
    }
    else{
      pwdMessageLength.classList.remove("show");
      if(pwdReg(this.value)){
        pwdMessageFormat.classList.remove("show");
      }
      else{
        pwdMessageFormat.classList.add("show");
      }
    }
  }
}

function pwdReg(text){
  // 영문/숫자/특수문자 중 2가지 이상 조합, 10자리 이상
  const re = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/;
  return re.test(String(text));
}

pwd.addEventListener('input',handlePwd())



/* -------------------------------------------------------------------------- */
/*                                  pwd again                                 */
/* -------------------------------------------------------------------------- */

const pwdAgain = document.querySelector("#pwd-again");
const pwdAgainMessageFormat = document.querySelector(".pwd-again .message.format");
const pwdAgainMessageFill = document.querySelector(".pwd-again .message.fill");

function verifyPwdAgain(){
  if(pwdAgain.value===pwd.value || pwdAgain.value==='') pwdAgainMessageFormat.classList.remove("show");
  else pwdAgainMessageFormat.classList.add("show");
}

pwdAgain.addEventListener('input',verifyPwdAgain);

function fillPwdAgain(){
  let once;

  return function() {
    if(!once) once=true;

    if(once && this.value==='') pwdAgainMessageFill.classList.add("show");
    else pwdAgainMessageFill.classList.remove("show");
  }
}

pwdAgain.addEventListener('input',fillPwdAgain());



/* -------------------------------------------------------------------------- */
/*                                    name                                    */
/* -------------------------------------------------------------------------- */

//name이라고만 변수 선언하면 deprecated됨
const userName = document.querySelector("#name");
const nameMessageFill = document.querySelector(".name .message.fill")

function fillName(){
  let once;

  return function() {
    if(!once) once=true;

    if(once && this.value==='') nameMessageFill.classList.add("show");
    else nameMessageFill.classList.remove("show");
  }
}

userName.addEventListener('input',fillName());



/* -------------------------------------------------------------------------- */
/*                                    email                                   */
/* -------------------------------------------------------------------------- */

const email = document.querySelector("#email");
const emailMessageFormat = document.querySelector(".email .message.format");
const emailMessageFill = document.querySelector(".email .message.fill");

function verifyEmail(){
  if(emailReg(this.value) || this.value==='') emailMessageFormat.classList.remove("show");
  else emailMessageFormat.classList.add("show");
}

function emailReg(text) {
  // 이메일 형식에 맞게 입력했는지 체크
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text)); // 형식에 맞는 경우에만 true 리턴
}

email.addEventListener('input',verifyEmail);


function fillEmail(){
  let once;

  return function() {
    if(!once) once=true;

    if(once && this.value==='') emailMessageFill.classList.add("show");
    else emailMessageFill.classList.remove("show");
  }
}

email.addEventListener('input',fillEmail());



/* -------------------------------------------------------------------------- */
/*                                    birth                                   */
/* -------------------------------------------------------------------------- */

const birth = document.querySelector(".birth .input-wrapper");
const birthFields = document.querySelectorAll(".birth input");

const formatMessages = document.querySelectorAll(".birth .message.format");
const birthMessageFill = document.querySelector(".birth .message.fill");


/* --------------------------------- format --------------------------------- */

//버블링
birth.addEventListener('input',handleBirth);

function handleBirth(){

  //메시지들 초기화 (모두 다 remove)
  formatMessages.forEach(item=>item.classList.remove('show'))

  //변수 지정
  const [year, month, day] = Array.from(birthFields).map(item=>item.value);

  const start = 0;
  let count = 0; 
  switch(start){
    case 0 :
      const thisYear = new Date().getFullYear();
      if(range(year, thisYear-150, thisYear)){
        formatMessages[0].classList.remove('show');
      }
      else{
        //if(year) 조건 안 걸어주면 year가 ''일 때도 여기 실행돼버림. (즉 빈칸인데도 다시 한 번 확인해달라고 뜸)
        if(year){
          formatMessages[0].classList.add('show');
          count++;
        }
      }

    case 1 :
      if(!count){ //연도 메시지가 show돼 있으면 월 input 값은 아예 validation 과정을 거치지 않음
        if(range(month,1,12)){
          formatMessages[1].classList.remove('show');
        }
        else{
          if(month){
            formatMessages[1].classList.add('show');
            count++;
          }
        }
      }

    case 2 :
      if(!count){
        if(range(day,1,31)){
          formatMessages[2].classList.remove('show');
        }
        else{
          if(day){
            formatMessages[2].classList.add('show');
          }
        }
      }
  }

}

/* ---------------------------------- fill ---------------------------------- */

birth.addEventListener('input',fillBirth());
function fillBirth(){

  const [year, month, day] = Array.from(birthFields).map(item=>item.value);

  let once;

  return function(){

    if(!once){ //birthField 셋 중 어느 것도 한 번도 입력된 적 없는 경우에만 실행. (즉 맨 처음에 숫자 하나 입력됐을 때 빼고는 단 한 번도 실행되지 않음.)
      if(Array.from(birthFields).reduce((acc, cur)=>(acc||cur.value),false)){
        once = true;
      }
    }

    else{
      if(!Array.from(birthFields).reduce((acc, cur)=>(acc||cur.value),false)){
        birthMessageFill.classList.add("show");
      }
      else{
        birthMessageFill.classList.remove("show");
      }
    }
  }
}

/* ---------------------------------- 유틸 함수 --------------------------------- */
function range(n, a, b){
  if(n>=a && n<=b) return true;
  else return false;
}

/* -------------------------------------------------------------------------- */
/*                                    phone                                   */
/* -------------------------------------------------------------------------- */

const phone = document.querySelector("#phone");
const phoneMessageFill = document.querySelector(".phone .message.fill");

function fillPhone(){
  let once;

  return function() {
    if(!once) once=true;

    if(once && this.value==='') phoneMessageFill.classList.add("show");
    else phoneMessageFill.classList.remove("show");
  }
}

phone.addEventListener('input',fillPhone());



/* -------------------------------------------------------------------------- */
/*                                    agree                                   */
/* -------------------------------------------------------------------------- */

const [checkboxAll, ...checkboxes] = document.querySelectorAll("input[type='checkbox']");

function handleCheckboxAll(){
  if(checkboxAll.checked){
    checkboxes.forEach((checkbox)=>{
      checkbox.checked = true;
    })
  }
  else{
    checkboxes.forEach((checkbox)=>{
      checkbox.checked = false;
    })
  }
}

checkboxAll.addEventListener('click',handleCheckboxAll);

function handleCheckboxes(){
  let totalChecked = 0;
  for(const checkbox of checkboxes){
    totalChecked += +checkbox.checked;
  }
  totalChecked === checkboxes.length ? checkboxAll.checked = true : checkboxAll.checked = false;
}

checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener('click',handleCheckboxes);
})