import * as Api from '../api.js';
import { validateEmail, validatePassword } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const $emailInput = document.querySelector('#email-input');
const $passwordInput = document.querySelector('#password-input');

const $submitButton = document.querySelector('.submit-button');

const $findPassword = document.querySelector('.find-password');
const $userEmail = document.querySelector('#user-email');
const $sendButton = document.querySelector('.send-button');

// 유효성 검사
const isEmailValid = (email) => validateEmail(email);
const isPasswordValid = (password) => validatePassword(password);

// 로그인 진행
$submitButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = $emailInput.value;
  const password = $passwordInput.value;

  // 잘 입력했는지 확인
  if (!isEmailValid(email)) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordValid(password)) {
    return alert('비밀번호 형식이 맞지 않습니다.');
  }

  if (!isEmailValid(email) && !isPasswordValid(password)) {
    return alert('이메일, 비밀번호 형식이 맞지 않습니다.');
  }

  // 로그인 api 요청
  try {
    const data = { email, password };
    const result = await Api.post('/api/login', data);
    const token = result.token;
    localStorage.setItem('token', token);
    console.log(token);
    alert(`정상적으로 로그인되었습니다.`);

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(err.message);
  }
});

// 비밀번호 찾기
$findPassword.addEventListener('click', async () => {
  $userEmail.style.display = 'block';
  $sendButton.style.display = 'block';
});

$sendButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const userEmail = $userEmail.value;
  console.log(userEmail);

  const data = { EMAIL: userEmail };

  try {
    await Api.post('/api/mail', data);

    alert(`정상적으로 메일이 발송되었습니다.`);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
