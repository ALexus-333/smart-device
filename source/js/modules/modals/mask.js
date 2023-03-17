import Inputmask from 'inputmask';

const inputs = document.querySelectorAll('input[type="tel"]');

const elementsArr = [];
inputs.forEach((node) => {
  elementsArr.push(node);
});


const createMask = () => {
  elementsArr.forEach((e) => {
    const mask = new Inputmask('+7(999)999-99-99');
    mask.mask(e);
  });
};

export {createMask};
