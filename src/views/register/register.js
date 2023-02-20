import * as Api from '../api.js';
import { validateEmail, validatePassword } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const $nameInput = document.querySelector('#name-input');
const $emailInput = document.querySelector('#email-input');
const $passwordInput = document.querySelector('#password-input');
const $passwordConfirmInput = document.querySelector('#password-confirm-input');

const $nameError = document.querySelector('#name-error');
const $emailError = document.querySelector('#email-error');
const $passwordError = document.querySelector('#password-error');
const $passwordConfirmError = document.querySelector('#password-confirm-error');

const $submitButton = document.querySelector('.submit-button');

// 유효성 검사
const isEmailValid = (email) => validateEmail(email);
const isPasswordValid = (password) => validatePassword(password);
const isPasswordSame = (password, passwordConfirm) => password === passwordConfirm;

// 닉네임 확인
$nameInput.addEventListener('keyup', () => {
  const name = $nameInput.value;
  if (!name) {
    $nameError.classList.remove('correct-input');
    $nameError.innerHTML = '닉네임은 필수정보 입니다.';
  } else {
    $nameError.classList.add('correct-input');
    $nameError.innerHTML = '사용 가능한 닉네임입니다.';
  }
});

// 이메일 확인
$emailInput.addEventListener('keyup', () => {
  const email = $emailInput.value;
  if (!email) {
    $emailError.classList.remove('correct-input');
    $emailError.innerHTML = '이메일은 필수정보 입니다.';
  } else if (!isEmailValid(email)) {
    $emailError.classList.remove('correct-input');
    $emailError.innerHTML = '이메일 주소가 올바르지 않습니다.';
  } else {
    $emailError.classList.add('correct-input');
    $emailError.innerHTML = '사용 가능한 이메일입니다.';
  }
});

// 비밀번호 확인
$passwordInput.addEventListener('keyup', () => {
  const password = $passwordInput.value;
  if (!password) {
    $passwordError.classList.remove('correct-input');
    $passwordError.innerHTML = '비밀번호는 필수정보 입니다.';
  } else if (!isPasswordValid(password)) {
    $passwordError.classList.remove('correct-input');
    $passwordError.innerHTML = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
  } else {
    $passwordError.classList.add('correct-input');
    $passwordError.innerHTML = '사용 가능한 비밀번호입니다.';
  }
});

// 비밀번호 재확인
$passwordConfirmInput.addEventListener('keyup', () => {
  const password = $passwordInput.value;
  const passwordConfirm = $passwordConfirmInput.value;
  if (!isPasswordSame(password, passwordConfirm)) {
    $passwordConfirmError.classList.remove('correct-input');
    $passwordConfirmError.innerHTML = '비밀번호가 일치하지 않습니다.';
  } else {
    $passwordConfirmError.classList.add('correct-input');
    $passwordConfirmError.innerHTML = '비밀번호가 일치합니다.';
  }
});

// 회원가입 진행
$submitButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const nickName = $nameInput.value;
  const email = $emailInput.value;
  const password = $passwordInput.value;
  const passwordConfirm = $passwordConfirmInput.value;

  // 확인
  if (!isEmailValid(email)) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordValid(password)) {
    return alert('비밀번호 형식이 맞지 않습니다.');
  }

  if (!isPasswordSame(password, passwordConfirm)) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // 회원가입 api 요청
  try {
    const data = { nickName: nickName, email: email, password: password };

    await Api.post('/api/register', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});
