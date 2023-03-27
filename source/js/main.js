import {iosVhFix} from './utils/ios-vh-fix';
import {openAccordion} from './modules/modals/accordion';
import {openModal, closeModal, submitForm, submitModal, setupPhoneInputs} from './modules/modals/modal';
import {scrollToFeedback} from './modules/modals/scroll-to';
import {showMore} from './modules/modals/show-more';
import {initPhoneInput} from './modules/form-validate/init-phone-input';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules

  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    openAccordion();
    openModal();
    closeModal();
    setupPhoneInputs();
    submitForm();
    submitModal();
    scrollToFeedback();
    showMore();
    document.querySelectorAll('[type="tel"]'.forEach((input) => {
      initPhoneInput(input.parentElement);
    }));
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
