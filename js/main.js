const burger = document.querySelector('.site-nav__burger');
const nav = document.querySelector('.site-nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('site-nav--open');
  });
}
