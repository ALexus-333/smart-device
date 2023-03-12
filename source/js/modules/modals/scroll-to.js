const scrollTo = (element) => {
  window.scroll({
    left: 0,
    top: element.offsetTop,
    behavior: 'smooth',
  });
};

const promoBtn = document.querySelector('.promo__button');
const feedback = document.querySelector('.feedback');

const scrollToFeedback = () => {
  if (!feedback) {
    promoBtn.style.display = 'none';
  } else {
    promoBtn.addEventListener('click', () => {
      scrollTo(feedback);
    });
  }
};

export {scrollToFeedback};
