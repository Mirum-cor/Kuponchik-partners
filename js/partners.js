const telInput = document.querySelector('#tel');
const phoneUsBtn = document.querySelector('.phone-us');
const getCallBtn = document.querySelector('.input-area').firstElementChild
  .nextElementSibling;
const getCallSection = document.querySelector('.get-call');

const nameInput = document.querySelector('#name');
const companyInput = document.querySelector('#company');
const unpInput = document.querySelector('#unp');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const askQuestionBtn = document.querySelector('#ask-question');
const askContractBtn = document.querySelector('#ask-contract');
const needToFillDivs = makeArrayFromNodelist(
  document.querySelectorAll('.need-to-fill'));

const toTopBtn = document.querySelector('.go-to-top');
const loginBtns = makeArrayFromNodelist(
  document.querySelectorAll('.login-btn'));
const closeBtn = makeArrayFromNodelist(
  document.querySelectorAll('.close-popup'));

const loginAndPasswordRecoverySection = document.querySelector(
  '.login-and-password-recovery');
const passwordRecoveryForm = document.querySelector('.password-recovery');
const recoveryEmailInput = document.querySelector('#recovery-email');
const recoveryEmailBtn = recoveryEmailInput.nextElementSibling;
const passwordWrongDataP = recoveryEmailInput.previousElementSibling;

const forgotPasswordBtn = document.querySelector('#forgot-password');
const loginForm = document.querySelector('.login');
const loginEmailInput = document.querySelector('#login-email');
const loginPasswordInput = document.querySelector('#password');
const loginWrongDataP = document.querySelector('.login-area').firstElementChild
  .nextElementSibling;
const formLoginBtn = document.querySelector('.login-area').lastElementChild
  .lastElementChild.previousElementSibling;

const menuBtn = document.querySelector('#menu-toggle');
const mobileMenuLinks = makeArrayFromNodelist(
  document.querySelectorAll('.menu-item'));

const comparisonBtns = makeArrayFromNodelist(
  document.querySelector('.choose-comparison-btn').children);
const comparisonBlock = [
  document.querySelector('.kuponchik-points'),
  document.querySelector('.paper-adds-points'),
  document.querySelector('.radio-tv-adds-points'),
  document.querySelector('.internet-adds-points'),
];
let currentBlock = 0;

const forms = document.forms;

let timerId = '';
let animationDelay = 0;

$(function () {
  $('#unp').mask('*********', { placeholder: '*' });
});

$(function () {
  $('#phone').mask('+375 (99) 999 99 99', { placeholder: '*' });
});

$(function () {
  $('#tel').mask('+375 (99) 999 99 99', { placeholder: '*' });
});

menuBtn.addEventListener('click', function () {
  if (menuBtn.checked) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

mobileMenuLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    document.body.style.overflow = 'auto';
    menuBtn.checked = false;
  });
});

loginBtns.forEach(function (logBtn) {
  logBtn.addEventListener('click', function () {
    loginAndPasswordRecoverySection.style.visibility = 'visible';
    loginAndPasswordRecoverySection.style.height = '1000vh';
    loginAndPasswordRecoverySection.style.zIndex = '5';
    loginAndPasswordRecoverySection.style.opacity = '1';
    showLoginForm();
    document.body.style.overflow = 'hidden';
  });
});

formLoginBtn.addEventListener('click', function (event) {
  event.preventDefault();
  emailLoginValidation();
  passwordLoginValidation();
  const email = loginEmailInput.value;
  let emailCondition = true;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    emailCondition = !email.match(regexp);
  }
  if (!emailCondition && loginPasswordInput.value !== '') {
    loginWrongDataP.style.opacity = '0';
    forms[0].reset();
    closeLoginForm();
  }
});

loginEmailInput.addEventListener('blur', function () {
  if (loginEmailInput.value !== '') {
    emailLoginValidation();
  }
});

loginPasswordInput.addEventListener('blur', function () {
  if (loginPasswordInput.value !== '') {
    passwordLoginValidation();
  }
});

forgotPasswordBtn.addEventListener('click', function () {
  hideLoginForm();
  passwordRecoveryForm.style.visibility = 'visible';
  passwordRecoveryForm.style.height = '370px';
  passwordRecoveryForm.style.zIndex = '5';
  passwordRecoveryForm.style.opacity = '1';
});

loginAndPasswordRecoverySection.addEventListener('click', function (event) {
  if (event.target.classList.contains('login-and-password-recovery')) {
    if (passwordRecoveryForm.style.opacity === '1') {
      closePasswordRecoveryForm();
    }
    closeLoginForm();
  }
});

recoveryEmailInput.addEventListener('blur', function () {
  if (recoveryEmailInput.value !== '') {
    recoveryEmailValidation();
  }
});

recoveryEmailBtn.addEventListener('click', function (event) {
  event.preventDefault();
  recoveryEmailValidation();
  const email = recoveryEmailInput.value;
  let emailCondition = true;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    emailCondition = !email.match(regexp);
  }
  if (!emailCondition && recoveryEmailInput.value !== '') {
    loginWrongDataP.style.opacity = '0';
    forms[1].reset();
    forms[1].style.opacity = '0';
    forms[1].style.visibility = 'hidden';
    forms[1].style.height = '0';
    forms[1].nextElementSibling.style.opacity = '1';
    forms[1].nextElementSibling.style.visibility = 'visible';
    forms[1].nextElementSibling.style.height = 'auto';
  }
});

closeBtn[0].addEventListener('click', function () {
  closeLoginForm();
});

closeBtn[1].addEventListener('click', function () {
  closePasswordRecoveryForm();
});

closeBtn[2].addEventListener('click', function () {
  closeGetCallPopUp();
});

phoneUsBtn.addEventListener('click', function () {
  getCallSection.style.zIndex = '5';
  getCallSection.style.opacity = '1';
});

telInput.addEventListener('click', function () {
  telInput.selectionStart = phoneInput.selectionEnd = 6;
});

telInput.addEventListener('blur', function (event) {
  if (event.target.value !== '+375 (**) *** ** **') {
    const regexp = /\d/g;
    const phoneMatch = event.target.value.match(regexp);
    if (phoneMatch) {
      const phoneNumber = phoneMatch.join('');
      const condition = phoneNumber.length !== 12;
      telInputValidationBorder(event, condition);
    }
  }
});

getCallBtn.addEventListener('click', function (event) {
  event.preventDefault();
  if (telInput.value === '') {
    telInput.style.borderColor = '#ff8282';
  } else {
    telInput.value = '';
    closeGetCallPopUp();
  }
});

getCallSection.addEventListener('click', function(event) {
  if (event.target.classList.contains('get-call')) {
    closeGetCallPopUp();
  }
});

nameInput.addEventListener('blur', function () {
  if (nameInput.value) {
    const condition = nameInput.value.length < 2;
    validationBorder(nameInput, condition, 0);
  }
});

companyInput.addEventListener('blur', function () {
  if (companyInput.value) {
    const condition = companyInput.value.length < 2;
    validationBorder(companyInput, condition, 1);
  }
});

unpInput.addEventListener('click', function () {
  unpInput.selectionStart = unpInput.selectionEnd = 0;
});

unpInput.addEventListener('keydown', function (event) {
  if (
    event.keyCode == 46 ||
    event.keyCode == 8 ||
    event.keyCode == 9 ||
    event.keyCode == 27 ||
    (event.keyCode == 65 && event.ctrlKey === true) ||
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  } else {
    if (
      (event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105)
    ) {
      event.preventDefault();
    }
  }
});

unpInput.addEventListener('blur', function () {
  if (unpInput.value !== '*********') {
    const regexp = /\d/g;
    const unpMatch = unpInput.value.match(regexp);
    if (unpMatch) {
      const unpNumber = unpMatch.join('');
      const condition = unpNumber.length !== 9;
      validationBorder(unpInput, condition, 2);
    }
  } else {
    unpInput.style.color = '#b1b1b1';
  }
});

emailInput.addEventListener('blur', function () {
  const email = emailInput.value;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    const condition = !email.match(regexp);
    validationBorder(emailInput, condition, 4);
  }
});

phoneInput.addEventListener('click', function () {
  phoneInput.selectionStart = phoneInput.selectionEnd = 6;
});

phoneInput.addEventListener('blur', function () {
  if (phoneInput.value !== '+375 (**) *** ** **') {
    const regexp = /\d/g;
    const phoneMatch = phoneInput.value.match(regexp);
    if (phoneMatch) {
      const phoneNumber = phoneMatch.join('');
      const condition = phoneNumber.length !== 12;
      validationBorder(phoneInput, condition, 3);
    }
  } else {
    phoneInput.style.color = '#b1b1b1';
  }
});

askQuestionBtn.addEventListener('click', function (event) {
  event.preventDefault();
  companyInput.style.borderColor = "#292929";
  unpInput.style.borderColor = "#292929";
  needToFillDivs[1].style.opacity = '0';
  needToFillDivs[2].style.opacity = '0';
  if (nameInput.value === '') {
    validationBeforeSending(nameInput, 0);
  }
  if (phoneInput.value === '') {
    validationBeforeSending(phoneInput, 3);
  }
  if (emailInput.value === '') {
    validationBeforeSending(emailInput, 4);
  }
  if (
    nameInput.value !== '' &&
    phoneInput.value !== '' &&
    emailInput.value !== ''
  ) {
    forms[2].reset();
  }
});

askContractBtn.addEventListener('click', function (event) {
  event.preventDefault();
  if (nameInput.value === '') {
    validationBeforeSending(nameInput, 0);
  }
  if (companyInput.value === '') {
    validationBeforeSending(companyInput, 1);
  }
  if (unpInput.value === '') {
    validationBeforeSending(unpInput, 2);
  }
  if (phoneInput.value === '') {
    validationBeforeSending(phoneInput, 3);
  }
  if (emailInput.value === '') {
    validationBeforeSending(emailInput, 4);
  }
  if (
    nameInput.value !== '' &&
    companyInput.value !== '' &&
    unpInput.value !== '' &&
    phoneInput.value !== '' &&
    emailInput.value !== ''
  ) {
    forms[2].reset();
  }
});

toTopBtn.addEventListener('click', function () {
  window.scrollTo(pageYOffset, 0);
});

comparisonBtns.forEach(function (btn) {
  btn.addEventListener('click', function (event) {
    comparisonBtns.forEach(function (button) {
      button.classList.remove('active-btn');
    });
    comparisonBlock.forEach(function (tar) {
      tar.style.opacity = '0';
    });
    switch (event.target.textContent) {
      case 'Купончик':
        currentBlock = 0;
        break;
      case 'Реклама в печатных СМИ':
        currentBlock = 1;
        break;
      case 'Реклама на Радио/ТВ':
        currentBlock = 2;
        break;
      case 'Интернет-реклама':
        currentBlock = 3;
        break;
    }
    comparisonBtns[currentBlock].classList.add('active-btn');
    comparisonBlock[currentBlock].style.opacity = '1';
  });
});

window.addEventListener('load', function () {
  const introduceElements = makeArrayFromNodelist(
    document.querySelector('.introduce').firstElementChild.children);
  introduceElements.forEach(function (elem) {
    if (elem.nodeName === 'DIV' && elem.nextElementSibling) {
      makeArrayFromNodelist(elem.children).forEach(function (text) {
        text.classList.add('animate__slideInUp');
        text.style.animationDuration = '1s';
        text.style.animationDelay = animationDelay + 'ms';
        setTimeout(function () {
          text.classList.remove('invisible');
        }, animationDelay);
        animationDelay += 500;
      });
    }
    if (elem.nodeName === 'IMG' && screen.width > 550) {
      elem.style.opacity = 1;
    }
  });
});

window.addEventListener('keydown', function (event) {
  switch (event.code) {
    case 'Escape':
      if (loginAndPasswordRecoverySection.style.opacity === '1') {
        if (passwordRecoveryForm.style.opacity === '1') {
          closePasswordRecoveryForm();
        }
        closeLoginForm();
      }
      if (getCallSection.style.opacity === '1') {
        closeGetCallPopUp();
      }
      break;
  }
});

$(window).scroll(function () {
  $('.multifunctional-platform .container').children('h2, h4').each(showAnimation);
  if ($(window).width() > 485) {
    $('.multifunctional-platform .container').children('img').each(changingOpacityAnimation);
    $('.sizes-no-matter .container').children('img').each(changingOpacityAnimation);
  }
  $('.platform-cards').each(showAnimation);
  $('.who-use .container').children('h2').each(showAnimation);
  $('.uses-ul-cover').children('ul').each(showAnimation);
  $('.uses-ul-cover').children('img').each(changingOpacityAnimation);
  $('.turn-clients-to-money .container').children('h2').each(showAnimation);
  $('.how-turn-to-money').children().each(showAnimation);
  $('.sizes-no-matter .container').children('h2, h4').each(showAnimation);
  $('.who-your-client-is').children('img').each(changingOpacityAnimation);
  $('.your-client').children().each(showAnimation);
  $('.influence .container').children('h2').each(showAnimation);
  $('.influence-points').children().each(showAnimation);
  $('.with-you .container').children().each(showAnimation);
  $('.comparison .container').children('h2').each(showAnimation);
  if ($(window).width() < 733) {
    $('.choose-comparison-btn').each(changingOpacityAnimation);
    $('.comparison-points').each(changingOpacityAnimation);
    $('.kuponchik-points').each(changingOpacityAnimation);
  } else {
    $('.comparison-area').children().each(changingOpacityAnimation);
  }
  $('.works-text').children('h2, h4').each(showAnimation);
  if ($(window).width() > 1170) {
    $('.works-text').children('img').each(changingOpacityAnimation);
    $('.beginning-steps').children('img').each(changingOpacityAnimation);
  }
  $('.video-area').children('iframe').each(showAnimation);
  $('.video-area').children('img').each(changingOpacityAnimation);
  $('.works-video').children('a').each(showAnimation);
  $('.beginning-from .container').children('h2').each(showAnimation);
  $('.step').each(showAnimation);
  $('#question-form .container').each(changingOpacityAnimation);
});

function makeArrayFromNodelist(nodelist) {
  const array = [];
  for (let i = 0; i < nodelist.length; i++) {
    array.push(nodelist[i]);
  }
  return array;
}

function showLoginForm() {
  loginForm.style.visibility = 'visible';
  loginForm.style.zIndex = '5';
  loginForm.style.opacity = '1';
  if (screen.width <= 650) {
    loginForm.style.height = '400px';
  } else {
    loginForm.style.height = '500px';
  }
}

function hideLoginForm() {
  loginForm.style.visibility = 'hidden';
  loginForm.style.height = '0';
  loginForm.style.zIndex = '-1';
  loginForm.style.opacity = '0';
}

function closeLoginForm() {
  hideLoginForm();
  loginAndPasswordRecoverySection.style.visibility = 'hidden';
  loginAndPasswordRecoverySection.style.height = '0';
  loginAndPasswordRecoverySection.style.zIndex = '-1';
  loginAndPasswordRecoverySection.style.opacity = '0';
  document.body.style.overflow = 'auto';
}

function closePasswordRecoveryForm() {
  passwordRecoveryForm.style.zIndex = '-1';
  passwordRecoveryForm.style.opacity = '0';
  closeLoginForm();
}

function closeGetCallPopUp() {
  telInput.style.borderColor = '#292929';
  getCallSection.style.zIndex = '-5';
  getCallSection.style.opacity = '0';
}

function emailLoginValidation() {
  const email = loginEmailInput.value;
  let emailCondition = true;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    emailCondition = !email.match(regexp);
  }
  if (emailCondition) {
    loginWrongDataP.style.opacity = '1';
    loginEmailInput.style.border = '1px solid #ff8282';
  } else {
    loginWrongDataP.style.opacity = '0';
    loginEmailInput.style.border = '1px solid #ffffff';
  }
}

function recoveryEmailValidation() {
  const email = recoveryEmailInput.value;
  let emailCondition = true;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    emailCondition = !email.match(regexp);
  }
  if (emailCondition) {
    passwordWrongDataP.style.opacity = '1';
    recoveryEmailInput.style.border = '1px solid #ff8282';
  } else {
    passwordWrongDataP.style.opacity = '0';
    recoveryEmailInput.style.border = '1px solid #ffffff';
  }
}

function passwordLoginValidation() {
  if (loginPasswordInput.value === '') {
    loginWrongDataP.style.opacity = '1';
    loginPasswordInput.style.border = '1px solid #ff8282';
  } else {
    loginPasswordInput.style.border = '1px solid #ffffff';
  }
}

function validationBeforeSending(element, index) {
  element.style.borderColor = '#ff8282';
  needToFillDivs[index].style.opacity = '1';
}

function validationBorder(element, condition, index) {
  if (condition) {
    element.style.color = '#ff8282';
    element.style.borderColor = '#ff8282';
    needToFillDivs[index].style.opacity = '1';
  } else {
    element.style.color = '#292929';
    element.style.borderColor = '#292929';
    needToFillDivs[index].style.opacity = '0';
  }
}

function telInputValidationBorder(event, condition) {
  if (condition) {
    event.target.style.color = '#ff8282';
    event.target.style.borderColor = '#ff8282';
  } else {
    event.target.style.color = '#292929';
    event.target.style.borderColor = '#292929';
  }
}

function changingOpacityAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).fadeTo(0, 1);
  }
}

function showAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).addClass('animate__slideInUp');
    $(this).removeClass('invisible');
  }
}
