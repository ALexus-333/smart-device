import '../../utils/focus-lock.js';

const body = document.body;
const arrayTagA = document.querySelectorAll('a');
const arrayTagInput = document.querySelectorAll('input');
const arrayTagButton = document.querySelectorAll('button');
const arrayTagTextarea = document.querySelectorAll('textarea');
const menuBtn = document.querySelector('.menu__button');
const modal = document.querySelector('.modal');
const closeBtn = modal.querySelector('.modal__close-btn');
const overlay = modal.querySelector('.modal__overlay');
const form = document.querySelector('.form');
const modalForm = document.querySelector('.popup__form');

const setTabindex = (arr, num) => {
  arr.forEach((e) => {
    e.setAttribute('tabindex', num);
  });
};

const createElementsArr = () => {
  const elementsArr = [];
  arrayTagA.forEach((node) => {
    elementsArr.push(node);
  });
  arrayTagInput.forEach((node) => {
    elementsArr.push(node);
  });
  arrayTagButton.forEach((node) => {
    elementsArr.push(node);
  });
  arrayTagTextarea.forEach((node) => {
    elementsArr.push(node);
  });
  return elementsArr;
};

const getFormInputs = (_form) => {
  const inputName = _form.querySelector('input[name="имя"]');
  const inputPhone = _form.querySelector('input[name="телефон"]');
  const inputQuestion = _form.querySelector('textarea[name="вопрос"]');

  return {
    inputName,
    inputPhone,
    inputQuestion,
  };
};

const isPhone = (value) => {
  return /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
};

const onFormSubmit = (formToSubmit) => {
  formToSubmit.addEventListener('submit', (e) => {
    const {inputName, inputPhone, inputQuestion} = getFormInputs(formToSubmit);

    if (!isPhone(inputPhone.value)) {
      e.preventDefault();
    } else {
      localStorage.setItem('имя', inputName.value);
      localStorage.setItem('телефон', inputPhone.value);
      localStorage.setItem('вопрос', inputQuestion.value);
    }
  });
};

const setOnPhoneInputChange = (input) => {
  input.addEventListener('change', (e) => {
    const {value} = e.target;
    if (!value || !isPhone(value)) {
      input.setCustomValidity('Введите номер');
    } else {
      input.setCustomValidity('');
    }
  });
};

const setupPhoneInputs = () => {
  const {inputPhone: formPhoneInput} = getFormInputs(form);
  setOnPhoneInputChange(formPhoneInput);

  const {inputPhone: modalPhoneInput} = getFormInputs(modalForm);
  setOnPhoneInputChange(modalPhoneInput);
};

const submitForm = () => onFormSubmit(form);
const submitModal = () => onFormSubmit(modalForm);

const openModal = () => {
  menuBtn.addEventListener('click', (e) => {
    if (modal) {
      e.preventDefault();
      modal.classList.add('is-active');
      body.style.overflow = 'hidden';
      window.focusLock.lock('.modal');
      setTabindex(createElementsArr(), -1);
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableContent = modal.querySelectorAll(focusableElements);
      setTabindex(focusableContent, 0);
      setTimeout(() => {
        modal.querySelector('input[name="имя"]').focus({focusVisible: true});
      }, 500);
    }
  });
};

const handleClose = () => {
  modal.classList.remove('is-active');
  body.style.overflow = 'visible';
  window.focusLock.unlock('.modal');
  setTabindex(createElementsArr(), 0);
};

const closeModal = () => {
  if (closeBtn) {
    closeBtn.addEventListener('click', () => handleClose());
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      handleClose();
    }
  });
  if (overlay) {
    overlay.addEventListener('click', () => handleClose());
  }
};

export {openModal, closeModal, submitForm, submitModal, setupPhoneInputs};
